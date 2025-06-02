export type Cargo = {
  id: number;
  nome: string;
};

export type Departamento = {
  id: number;
  nome: string;
  funcionarios?: Funcionario[];
};

export type Funcionario = {
  id: number;
  nome: string;
  email: string;
  dataAdmissao: string;
  status: string;
  departamentoId: number;
  cargoId: number;
  cpf: string;
  data_de_nascimento: string;
  idade: number;
  salario: number;
  cargo?: Cargo;
  departamento?: Departamento;
};
