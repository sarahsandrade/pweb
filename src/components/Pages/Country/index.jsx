import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.css';

function CountryPage() {
  const { id } = useParams(); // Pega o id do país da URL
  const [country, setCountry] = useState(null);
  const [medals, setMedals] = useState([]);

  const getCountryData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/country/${id}`);
      setCountry(response.data);
      setMedals(response.data.medal); // Assumindo que as medalhas estão dentro do campo `medal` na resposta da API
    } catch (error) {
      console.log('Erro ao buscar dados do país:', error);
    }
  };

  useEffect(() => {
    getCountryData();
  }, [id]);

  return (
    <div className="country-page-container">
      {country ? (
        <>
          <h2>{country.countryName}</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Tipo de Medalha</th>
                <th>Esporte</th>
              </tr>
            </thead>
            <tbody>
              {medals.map((medal, index) => (
                <tr key={index}>
                  <td>{medal.type}</td>
                  <td>{medal.sport}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>Carregando dados do país...</p>
      )}
    </div>
  );
}

export default CountryPage;
