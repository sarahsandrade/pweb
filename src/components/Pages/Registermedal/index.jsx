import axios from 'axios';
import React, { useState } from 'react';
import './index.css';

function MedalRegister() {
  const [formData, setFormData] = useState({
    type: 'gold', // Valor padrão para o tipo de medalha
    country_code: '',
    sportId: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Checa se todos os campos estão preenchidos
    if (!formData.type || !formData.country_code || !formData.sportId) {
      setError('Por favor, preencha todos os campos.');
      setSuccess('');
      return;
    }

    try {
      // Envia os dados para o backend
      const response = await axios.post('http://localhost:8080/medal/register', formData);
      console.log('Medalha registrada com sucesso:', response.data);
      setSuccess('Medalha registrada com sucesso!');
      setError('');
      
      // Limpa o formulário após o registro
      setFormData({
        type: 'gold',
        country_code: '',
        sportId: '',
      });
    } catch (error) {
      console.error('Erro ao registrar medalha:', error);
      setError('Erro ao registrar medalha. Tente novamente.');
      setSuccess('');
    }
  };

  return (
    <div className="medal-register-container">
      <h2>Cadastro de Medalhas</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="type">Tipo de Medalha:</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="gold">Ouro</option>
            <option value="silver">Prata</option>
            <option value="bronze">Bronze</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="country_code">Código do País:</label>
          <input
            type="text"
            id="country_code"
            name="country_code"
            value={formData.country_code}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="sportId">ID do Esporte:</label>
          <input
            type="text"
            id="sportId"
            name="sportId"
            value={formData.sport_id}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <button type="submit">Cadastrar Medalha</button>
      </form>
    </div>
  );
}

export default MedalRegister;
