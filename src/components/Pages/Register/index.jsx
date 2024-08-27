import axios from 'axios';
import React, { useState } from 'react';
import './index.css';

function Register() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    cpf: '',
    dataNascimento: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Checa se todos os campos estão preenchidos
    if (!formData.nome || !formData.email || !formData.senha || !formData.cpf || !formData.dataNascimento) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Envia os dados para o backend
      const response = await axios.post('http://localhost:8080/auth/register', formData);
      console.log('Usuário registrado com sucesso:', response.data);
      // Limpa o formulário após o registro
      setFormData({
        nome: '',
        email: '',
        senha: '',
        cpf: '',
        dataNascimento: ''
      });
      setError('');
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      setError('Erro ao registrar usuário. Tente novamente.');
    }
  };

  return (
    <div className="register-container">
      <h2>Registrar Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dataNascimento">Data de Nascimento:</label>
          <input
            type="date"
            id="dataNascimento"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;
