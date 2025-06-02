
import type { Departamento, Funcionario } from './types';
import api from './api';

const apiService = {
  // Funcionários
  getFuncionarios: () => api.get<Funcionario[]>('/funcionarios'),
  getFuncionarioById: (id: number) => api.get<Funcionario>(`/funcionarios/${id}`),
  getAniversariantes: () => api.get<Funcionario[]>('/funcionarios/aniversariantes'),

  // Departamentos
  getDepartamentos: () => api.get<Departamento[]>('/departamentos'),
  getDepartamentosComQuantidade: () => api.get<{ id: number; nome: string; quantidadeFuncionarios: number }[]>('/departamentos/quantidade'),

  // Cargos
  getMediaSalarial: () => api.get<{ cargo: string; mediaSalarial: number }[]>('/cargos/media-salarial'),

  // Autenticação
  login: (credentials: { email: string; password: string }) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
};

export default apiService;
