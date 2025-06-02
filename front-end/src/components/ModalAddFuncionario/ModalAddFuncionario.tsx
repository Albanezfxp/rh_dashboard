import React, { useState } from 'react';
import type { Cargo, Departamento, Funcionario } from '../../services/types';
import './ModalAddFuncionario.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (funcionario: Omit<Funcionario, 'id' | 'cargo' | 'departamento'>) => void;
  departamentos: Departamento[];
  cargos: Cargo[];
};

export const ModalAddFuncionario: React.FC<ModalProps> = ({ isOpen, onClose, onSave, departamentos, cargos }) => {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    cpf: '',
    data_de_nascimento: '',
    dataAdmissao: '',
    salario: 0,
    status: 'ATIVO',
    departamentoId: 0,
    cargoId: 0,
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'salario' ? parseFloat(value) : value });
  };

  const calcularIdade = (data: string) => {
    const nascimento = new Date(data);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!form.cpf || !form.dataAdmissao || !form.data_de_nascimento || !form.departamentoId || !form.email || !form.nome || !form.salario || !form.status) {
        toast.warning("Preencha todos os campos obrigatórios.");
        return;
      }

      const cpfLimpo = form.cpf.replace(/\D/g, '');

      if (cpfLimpo.length !== 11) {
        toast.warning("CPF inválido. Deve conter 11 dígitos.");
        return;
      }

      const cpfFormated = cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        toast.warning("E-mail inválido.");
        return;
      }

      const idade = calcularIdade(form.data_de_nascimento);

      const payload = {
        nome: form.nome.trim(),
        email: form.email.trim(),
        cpf: cpfFormated,
        data_de_nascimento: new Date(form.data_de_nascimento).toISOString(),
        dataAdmissao: new Date(form.dataAdmissao).toISOString(),
        salario: Number(form.salario),
        status: form.status,
        idade,
        departamentoId: Number(form.departamentoId),
        cargoId: Number(form.cargoId),
      };

      console.log("Enviando payload:", payload); 

      await axios.post('http://localhost:3000/funcionarios', payload);
      toast.success("Funcionário cadastrado com sucesso!");
      setTimeout(() => onClose(), 1000);
    } catch (error) {
      console.error("Erro ao salvar funcionário:", error);
      toast.error("Erro ao cadastrar funcionário.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Adicionar Funcionário</h2>
        <form onSubmit={handleSubmit} className="form">

          <label htmlFor="nome">Nome</label>
          <input type="text" id="nome" name="nome" value={form.nome} onChange={handleChange} required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />

          <label htmlFor="cpf">CPF</label>
          <input type="text" id="cpf" name="cpf" value={form.cpf} onChange={handleChange} required />

          <label htmlFor="data_de_nascimento">Data de Nascimento</label>
          <input type="date" id="data_de_nascimento" name="data_de_nascimento" value={form.data_de_nascimento} onChange={handleChange} required />

          <label htmlFor="dataAdmissao">Data de Admissão</label>
          <input type="date" id="dataAdmissao" name="dataAdmissao" value={form.dataAdmissao} onChange={handleChange} required />

          <label htmlFor="salario">Salário</label>
          <input type="number" id="salario" name="salario" value={form.salario} onChange={handleChange} required />

          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={form.status} onChange={handleChange}>
            <option value="ATIVO">Ativo</option>
            <option value="INATIVO">Inativo</option>
            <option value="FERIAS">Férias</option>
            <option value="LICENSA">Licença</option>
            <option value="AFASTADO">Afastado</option>
          </select>

          <label htmlFor="departamentoId">Departamento</label>
          <select id="departamentoId" name="departamentoId" value={form.departamentoId} onChange={handleChange} required>
            <option value="">Selecione o departamento</option>
            {departamentos.map(dep => (
              <option key={dep.id} value={dep.id}>{dep.nome}</option>
            ))}
          </select>

          <label htmlFor="cargoId">Cargo</label>
          <select id="cargoId" name="cargoId" value={form.cargoId} onChange={handleChange} required>
            <option value="">Selecione o cargo</option>
            {cargos.map(cargo => (
              <option key={cargo.id} value={cargo.id}>{cargo.nome}</option>
            ))}
          </select>

          <div className="modal-actions">
            <button type="submit">Salvar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};
