import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bronze from '../../medals/bronze.png';
import ouro from '../../medals/ouro.png';
import prata from '../../medals/prata.png';
import Topbar from '../../Topbar/Topbar';
import './index.css';

function Home() {
  const [countries, setCountries] = useState([]);
  const [medals, setMedals] = useState({});

  const getCountries = async () => {
    try {
      const response = await axios.get('http://localhost:8080/country/all');
      const data = response.data;
      setCountries(data);

      const medalsPromises = data.map(country => getMedals(country.id));
      const medalsData = await Promise.all(medalsPromises);

      const medalsObject = medalsData.reduce((acc, medalData) => {
        acc[medalData.id] = medalData;
        return acc;
      }, {});

      setMedals(medalsObject);

      // Ordena os países pela quantidade de medalhas de ouro
      const sortedCountries = [...data].sort((a, b) => {
        const goldA = medalsObject[a.id]?.qtdGold || 0;
        const goldB = medalsObject[b.id]?.qtdGold || 0;
        return goldB - goldA;
      });

      setCountries(sortedCountries);
    } catch (error) {
      console.log(error);
    }
  };

  const getMedals = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/country/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div>
      <Topbar />
      <div className='container'>
        <table className="table table-striped">
          <thead>
            <tr>
              <th> </th>
              <th>País</th>
              <th><img src={ouro} alt="Ouro" width="25" height="25" /></th>
              <th><img src={prata} alt="Prata" width="25" height="25" /></th>
              <th><img src={bronze} alt="Bronze" width="25" height="25" /></th>
              <th>Total</th>
              <th>Seguir</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country, index) => (
              <tr key={country.id}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/country/${country.id}`}>{country.countryName}</Link>
                </td>
                <td>{medals[country.id]?.qtdGold || 0}</td>
                <td>{medals[country.id]?.qtdSilver || 0}</td>
                <td>{medals[country.id]?.qtdBronze || 0}</td>
                <td>{medals[country.id]?.totalMedals || 0}</td>
                <td><input type="checkbox" id={country.id} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
