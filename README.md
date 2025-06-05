# 📊 Projeto RH Dashboard

O **RH Dashboard** é um sistema web desenvolvido para facilitar a gestão de Recursos Humanos, com foco em visualização e controle de informações como funcionários, cargos, departamentos, avaliações, férias e aniversariantes do mês.

---

## 🚀 Funcionalidades Principais

- 📋 **Cadastro e Listagem de Funcionários**  
  Inclui nome, e-mail, cargo, departamento, data de admissão, status (ativo/inativo), etc.

- 📌 **Filtragem Avançada**  
  Pesquisa de funcionários por email.

- 📁 **Exportação de Relatórios**  
  Geração e download de relatórios em formato CSV, incluindo aniversariantes do mês.

- 🎂 **Aniversariantes do Mês**  
  Visualização dos colaboradores ativos que fazem aniversário no mês atual.

- 📈 **Gráficos e Métricas**  
  Utilização de bibliotecas como Chart.js para exibir dados de forma visual.

---

## 🧱 Tecnologias Utilizadas

- **Frontend:** React + TypeScript
- **Backend:** Node.js + Express + Prisma ORM
- **Banco de Dados:** PostgreSQL
- **Visualização de Dados:** Chart.js
- **Estilização:** Tailwind CSS
- **Outros:** html2canvas, Axios, CSV Generator, etc.

---

## 🗃️ Estrutura do Projeto

```
rh_dashboard/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── dtos/
│   │   ├── prisma/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── assets/
```

---

## 📄 Scripts Úteis

```bash
# Instalar dependências
npm install

# Rodar o frontend
npm run dev

# Rodar o backend (ex: com ts-node-dev)
npm run start:dev

# Gerar build de produção
npm run build
```

---

## 🙋‍♂️ Autor

Desenvolvido por Gabriel Albanez — Projeto acadêmico e profissional para gestão de RH moderno e visual.

---

## 📃 Licença

Este projeto está licenciado sob a **MIT License**.
