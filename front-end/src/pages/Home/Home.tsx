import { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import './Home.css';
import { type Cargo, type Departamento, type Funcionario } from '../../services/types';
import { ModalAddFuncionario } from '../../components/ModalAddFuncionario/ModalAddFuncionario';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

type MediaSalarialCargo = {
  cargo_id: number;
  cargo_nome: string;
  total_funcionarios: number;
  media_salarial: number;
};

export default function Home() {
  const [aniversariantes, setAniversariantes] = useState<Funcionario[]>([]);
  const [mediaSalariaPorCargo, setMediaSalariaPorCargo] = useState<MediaSalarialCargo[]>([])
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
  const [funcionariosDesligados, setFuncionariosDesligados] = useState<Funcionario[]>([])
  const [funcionariosAtivos, setFuncionariosAtivos] = useState<Funcionario[]>([])
  const [cargos, setCargos] = useState<Cargo[]>([])
  const [totalAtivos, setTotalAtivos] = useState<number>(0);
  const [tempoDeCasa, setTempoDeCasa] = useState([])
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState(false);


  const faixasTempoCasa = {
  '0-1 ano': 0,
  '1-3 anos': 0,
  '3+ anos': 0,
};

tempoDeCasa.forEach((func: any) => {
  const anos = Number(func.anos);
  const meses = Number(func.meses);
  const totalMeses = anos * 12 + meses;

  if (totalMeses <= 12) {
    faixasTempoCasa['0-1 ano']++;
  } else if (totalMeses <= 36) {
    faixasTempoCasa['1-3 anos']++;
  } else {
    faixasTempoCasa['3+ anos']++;
  }
});

  useEffect(() => {
    const fetchData = async () => {
      try {
     axios.get<Funcionario[]>("http://localhost:3000/funcionarios")
      .then(response => {
        const funcionariosData = response.data;
    setFuncionarios(funcionariosData);
    
    const total = funcionariosData.filter(f => f.status === "ATIVO").length;
    setTotalAtivos(total);

      })
      .catch((error) => {
        console.error("Erro ao buscar funcionários:", error);
      });
      axios.get<Funcionario[]>("http://localhost:3000/funcionarios/aniversariante-mes-atual").then(response => {
        setAniversariantes(response.data)
        console.log("aniversariante",aniversariantes)
      }).catch((error) => {
        console.error('Erro ao carregar dados:', error)
      })
      axios.get<Departamento[]>("http://localhost:3000/departamentos").then(response => {
        setDepartamentos(response.data)
        console.log(response.data)
      }).catch((error) => {
        console.error('Erro ao carregar dados:', error)
      })
        axios.get<MediaSalarialCargo[]>("http://localhost:3000/cargos/media-salarial").then(response => {
        setMediaSalariaPorCargo(response.data)
        console.log(response.data)
      }).catch((error) => {
        console.error('Erro ao carregar dados:', error)
      })
         axios.get<[]>("http://localhost:3000/cargos").then(response => {
        setCargos(response.data)
        console.log("cargos", response.data)
      }).catch((error) => {
        console.error('Erro ao carregar dados:', error)
      })
      axios.get<[]>("http://localhost:3000/funcionarios/tempo-de-casa").then(response => {
        setTempoDeCasa(response.data)
        console.log("tempo de casa", response.data)
      }).catch((error) => {
        console.error('Erro ao carregar dados:', error)
      })
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setLoading(false);
      }finally {
      setLoading(false);    
    }
   
    };

    fetchData();
  }, []);

const handleDesligamento = async (e: React.MouseEvent, id: number) => {
  e.preventDefault();
  
  try {
    if (!window.confirm('Tem certeza que deseja desligar este funcionário?')) {
      return;
    }

    const response = await axios.put(`http://localhost:3000/funcionarios/desligamento/${id}`);
    
    setFuncionarios(prevFuncionarios => 
      prevFuncionarios.map(func => 
        func.id === id ? { ...func, status: "INATIVO" } : func
      )
    );
    
    setTotalAtivos(prev => prev - 1);
    
    alert('Funcionário desligado com sucesso!');
    
  } catch (error) {
    console.error('Erro ao desligar funcionário:', error);
    alert('Erro ao desligar funcionário');
  }
};
  const tempoDeCasaBarData = {
  labels: ['0-1 ano', '1-3 anos', '3+ anos'],
  datasets: [
    {
      label: 'Funcionários por Tempo de Casa',
      data: [
        faixasTempoCasa['0-1 ano'],
        faixasTempoCasa['1-3 anos'],
        faixasTempoCasa['3+ anos']
      ],
      backgroundColor: ['#8e44ad', '#f39c12', '#FF6384'],
    },
  ],
};

const tempoDeCasaOptions = {
  responsive: true,
    maintainAspectRatio: false, 
  plugins: {
    title: {
      display: true,
      text: 'Tempo de Casa dos Funcionários',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Funcionários',
      },
      ticks: {
        stepSize: 2, 
      },
    },
    x: {
      title: {
        display: true,
        text: 'Faixa de Tempo de Casa',
      },
    },
  },
};

  const departamentosChartData = {
    labels: departamentos.map(d => d.nome),
    datasets: [
      {
        label: 'Funcionários por Departamento',
data: departamentos.map(d => d.funcionarios?.filter(f => f.status === "ATIVO").length || 0),
    backgroundColor: [
  '#8e44ad', // roxo escuro
  '#2980b9', // azul escuro
  '#27ae60', // verde escuro
  '#f39c12', // amarelo queimado
  '#c0392b',
  '#1abc9c',
  '#FF6382', // vermelho escuro
]
,
        borderWidth: 1  ,
      },
    ],
  };

 const mediaSalarialData = {
  labels: mediaSalariaPorCargo.map(item => item.cargo_nome),
  datasets: [
    {
      label: 'Média Salarial (R$)',
      data: mediaSalariaPorCargo.map(item => item.media_salarial),
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    },
  ],
};

const mediaSalarialOptions = {
  responsive: true,
  maintainAspectRatio: false, 
  layout: {
    padding: {
      top: 20,
      bottom: 10,
    },
  },
  plugins: {
    title: {
      display: true,
      text: 'Média Salarial por Cargo',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      suggestedMax: Math.max(...mediaSalariaPorCargo.map(item => item.media_salarial)) * 1.1, 
      title: {
        display: true,
        text: 'Salário (R$)',
      },
      ticks: {
        stepSize: 1000, 
      },
    },
    x: {
      title: {
        display: true,
        text: 'Cargo',
      },
    },
  },
};


  if (loading) {
    return <div className="loading">Carregando dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
        <div id="header-home-container">
      <h1>PulsoRH</h1>
      <button onClick={() => setModalOpen(true)} id='registerFuncButton'>Adcionar funcionario</button>
      </div>
      <div className="metrics-row">
        <div className="metric-card">
          <h3>Total de Ativos</h3>
          <p className="metric-value">{totalAtivos}</p>
          <p className="metric-change">+5% vs último mês</p>
        </div>
        
        <div className="metric-card">
          <h3>Aniversariantes</h3>
          <p className="metric-value">{aniversariantes.length}</p>
          <p className="metric-change">Este mês</p>
        </div>
        
        <div className="metric-card">
          <h3>Departamentos</h3>
          <p className="metric-value">{departamentos.length}</p>
          <p className="metric-change">Ativos</p>
        </div>
      </div>

      <div className="section">
        <h2>Aniversariantes do Mês</h2>
        <div className="aniversariantes-list">
          {aniversariantes.length > 0 ? (
            aniversariantes.map(func => (
              <div key={func.id} className="aniversariante-card">
                <div className="avatar">{func.nome.charAt(0)}</div>
                <div className="info">
                  <h4>{func.nome}</h4>
                  <p>Aniversário: {new Date(func.data_de_nascimento).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum aniversariante este mês</p>
          )}
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-container">
          <h3>Distribuição por Departamento</h3>
          <Pie data={departamentosChartData}  />
        </div>
                      <div className="chart-container">
  <h3>Tempo de Casa</h3>
  <div style={{ height: '450px', width: '100%' }}>
  <Bar data={tempoDeCasaBarData} options={tempoDeCasaOptions} />
  </div>
</div>
   
      </div>
             <div className="chart-container" id='chart-container-id'>
          <h3>Media salarial por cargo</h3>
<div style={{ height: '450px', width: '100%' }}>
  <Bar data={mediaSalarialData} options={mediaSalarialOptions} />
</div>
        </div>

<div className="section">
  <h2>Funcionários Ativos</h2> {/* Mudei o título para ficar claro */}
  <table className="departamentos-table">
    <thead>
      <tr>
        <th>Funcionário</th>
        <th>Cargo</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      {funcionarios
        .filter(func => func.status === "ATIVO") 
        .map(func => ( 
          <tr key={func.id}>
            <td>{func.nome}</td>
            <td>{func.cargo?.nome}</td>
            <td>
              <div>
            <button onClick={(e) => handleDesligamento(e, func.id)}
 id='btnDesligarFunc'>Desligar</button>
            </div>
            </td>
          </tr>
        ))
      }
    </tbody>
  </table>
</div>
      <div className="section">
        <h2>Departamentos</h2>
        <table className="departamentos-table">
          <thead>
            <tr>
              <th>Departamento</th>
              <th>Funcionários</th>
              <th>% do Total</th>
            </tr>
          </thead>
          <tbody>
            {departamentos.map(depto => ( 
              <tr key={depto.id}>
                <td>{depto.nome}</td>
                <td>{depto.funcionarios?.length}</td>
                <td>{((depto.funcionarios?.length || 0  / totalAtivos) * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalAddFuncionario
    isOpen={modalOpen}
    onClose={() => setModalOpen(false)}
    onSave={(novoFuncionario) => {
    // Enviar para o backend ou atualizar o estado
        console.log(novoFuncionario);
  }}
    departamentos={departamentos}
    cargos={cargos}
/>
    </div>
  );
}