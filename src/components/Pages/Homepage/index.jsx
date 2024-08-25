import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bronze from '../../medals/bronze.png';
import ouro from '../../medals/ouro.png';
import prata from '../../medals/prata.png';
import Topbar from '../../Topbar/Topbar';
import './index.css';

function Home() {
  const  [countries, setCountries] = useState([])
  let posicion = 0;

  const getCountries = async () => {

    try {
      const response = await axios.get('http://localhost:8080/country/all',
          {
            params: {
              size:50,
            }
          }
        );
        const data = response.data.content
        setCountries(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCountries();
  }, [])

  const calcularTotais = (medalhas) => {
    const totais = { Gold: 0, Silver: 0, Bronze: 0 };
    if(medalhas.length===0){
      return totais
    }
    medalhas.forEach(medalha => {
      totais[medalha.type]++;
    });
    return totais;
  };

  return (
 <div>
  <Topbar/>
  <div className='container'>
  <table className="table table-striped">
      <thead>
        <tr>
          <th> </th>
          <th>País</th>
          <th> <img src={ouro} alt="Ouro" width="25" height="25" /></th>
          <th><img src={prata} alt="Prata" width="25" height="25" /></th>
          <th><img src={bronze} alt="Bronze" width="25" height="25" /></th>
          <th>Total</th>
          <th>Seguir</th>
        </tr>
      </thead>
      <tbody>
        {countries.map(country => (
          <tr key={country.id}>
            <td>{++posicion}</td>
            <td>
            <Link to={`/country/${country.id}`}>{country.name}</Link>
            </td>
            <td>{calcularTotais(country.medals).Gold}</td>
            <td>{calcularTotais(country.medals).Silver}</td>
            <td>{calcularTotais(country.medals).Bronze}</td>
            <td>{country.medals.length}</td>
            <td> <input type="checkbox"id={country.id}/></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
 </div>   
  );
};


export default Home;