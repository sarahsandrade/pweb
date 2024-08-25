import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Country(){
    const { id } = useParams(); 
    const [country, setCountry] = useState(null);
  
    useEffect(() => {
      const fetchCountry = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/country/${id}`);
          setCountry(response.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchCountry();
    }, [id]); // O useEffect é executado novamente se o 'id' mudar
  
    if (!country) return <div>Loading...</div>;
  
    return (
      <div>
        <h1>{country.name}</h1>
        <h2>Medalhas:</h2>
        <ul>
          {country.medals.map((medal, index) => (
            <li key={index}>
              {medal.type} - {medal.sport}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default Country
  