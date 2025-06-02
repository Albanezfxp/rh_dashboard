// src/services/api.ts

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // URL da sua API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepta requisições para adicionar o token se houver
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepta respostas para tratar erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          window.location.href = '/login';
          break;
        case 404:
          return Promise.reject({ message: 'Recurso não encontrado' });
        case 500:
          return Promise.reject({ message: 'Erro interno no servidor' });
        default:
          return Promise.reject(error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
