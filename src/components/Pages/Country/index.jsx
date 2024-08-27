import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import bronzeMedal from '../../medals/bronze.png';
import goldMedal from '../../medals/ouro.png';
import silverMedal from '../../medals/prata.png';
import './index.css';

function CountryMedals() {
  const { id } = useParams();
  const [countryData, setCountryData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCountryMedals = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/country/medals/${id}`);
        setCountryData(response.data);
      } catch (error) {
        console.error('Erro ao carregar as medalhas do país:', error);
        setError('Erro ao carregar as medalhas do país. Tente novamente.');
      }
    };

    fetchCountryMedals();
  }, [id]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!countryData) {
    return <p>Carregando...</p>;
  }

  const { country, countryCode, medalsG, medalsS, medalsB } = countryData;

  return (
    <div className="country-medals-container">
      <h2>Medalhas de {country} ({countryCode})</h2>
      <table className="medals-table">
        <thead>
          <tr>
            <th>Tipo de Medalha</th>
            <th>Esporte</th>
          </tr>
        </thead>
        <tbody>
          {medalsG.map((medal, index) => (
            <tr key={`gold-${index}`}>
              <td><img src={goldMedal} alt="Ouro" className="medal-icon" /></td>
              <td>{medal.sport}</td>
            </tr>
          ))}
          {medalsS.map((medal, index) => (
            <tr key={`silver-${index}`}>
              <td><img src={silverMedal} alt="Prata" className="medal-icon" /></td>
              <td>{medal.sport}</td>
            </tr>
          ))}
          {medalsB.map((medal, index) => (
            <tr key={`bronze-${index}`}>
              <td><img src={bronzeMedal} alt="Bronze" className="medal-icon" /></td>
              <td>{medal.sport}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CountryMedals;
