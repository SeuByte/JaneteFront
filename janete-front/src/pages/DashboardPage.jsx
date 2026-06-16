import { useEffect, useState } from 'react';
import { getDashboardStats } from '../../services/dashboard_relatorio'; 
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import '../DashboardPage.css';

export default function Dashboard() {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDashboardStats();
        setDados(data);
      } catch (error) {
        console.error("ERRO DETALHADO:", error);
      }
    }
    fetchData();
  }, []);

  if (!dados) {
    return <div className="dashboard-container"><p>Carregando dados...</p></div>;
  }

  const dadosPedidos = [
  {
    name: 'Pendentes',
    value: dados.pedidos_pendentes
  },
  {
    name: 'Aprovados',
    value: dados.pedidos_aprovados
  },
  {
    name: 'Cancelados',
    value: dados.pedidos_cancelados
  }
];

const CORES = [
  '#faad14',
  '#52c41a',
  '#ff4d4f'
];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      
      {/* NAVBAR LATERAL FLUTUANTE */}
      <nav style={{
        position: 'fixed', left: 0, top: 0, height: '100%', width: '60px',
        backgroundColor: '#2c3e50', color: 'white', zIndex: 1000,
        transition: 'width 0.3s', overflow: 'hidden', padding: '20px 0'
      }} 
      onMouseEnter={(e) => e.currentTarget.style.width = '200px'}
      onMouseLeave={(e) => e.currentTarget.style.width = '60px'}
      >
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '50px' }}>
          {['Relatorio', 'Produtos', 'Clientes'].map((item) => (
            <li key={item} style={{ padding: '20px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {item === 'Dashboard' ? '📊' : item === 'Produtos' ? '📦' : '👥'} 
              <span style={{ marginLeft: '15px' }}>{item}</span>
            </li>
          ))}
        </ul>
      </nav>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="dashboard-container" style={{ marginLeft: '80px', flex: 1, padding: '20px' }}>
        <h1 className="title_h1">Relatório Geral Janete</h1>

        <div className="dashboard-grid">
          <div className="card">
            <h2>Total de Clientes</h2>
            <p>{dados.total_clientes}</p>
          </div>

        <div className="card">
          <h2>Total de Produtos</h2>
          <p>{dados.total_produtos}</p>
        </div>

          <div className="card">
            <h2>Receita Total</h2>
            <p>R$ {dados.receita_total.toFixed(2)}</p>
          </div>

          <div className="card">
      <h2>Total de Pedidos</h2>
      <p>{dados.total_pedidos}</p>
    </div>

          <div className="card">
          <h2>Pedidos Pendentes</h2>
          <p>{dados.pedidos_pendentes}</p>
        </div>

          <div className="card">
          <h2>Pedidos Aprovados</h2>
          <p>{dados.pedidos_aprovados}</p>
        </div>

          <div className="card">
          <h2>Pedidos Cancelados</h2>
          <p>{dados.pedidos_cancelados}</p>
        </div>

          <div className="card">
          <h2>Ticket Médio</h2>
          <p>R$ {dados.ticket_medio.toFixed(2)}</p>
        </div>

          <div className="card">
            <h2>Distribuição de Pedidos</h2>
            <div className="grafico-container" style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dadosPedidos} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {dadosPedidos.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card full-width">
            <h2 className="title_h2">TOP 10 Estoque Negativo</h2>
            <div className="grafico-container">
              <ResponsiveContainer>
                <BarChart layout="vertical" data={dados["relatorio estoque"].baixo_estoque} margin={{ left: 100 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="nome" type="category" width={180} tick={{ fontSize: 12, whiteSpace: 'nowrap' }} interval={0} />
                  <Tooltip />
                  <Bar dataKey="quantidade" fill="#ff4d4f" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card full-width">
            <h2 className="title_h2">TOP 10 Estoque Positivo</h2>
            <div className="grafico-container">
              <ResponsiveContainer>
                <BarChart layout="vertical" data={dados["relatorio estoque"].alto_estoque} margin={{ left: 100 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="nome" type="category" width={180} tick={{ fontSize: 12, whiteSpace: 'nowrap' }} interval={0} />
                  <Tooltip />
                  <Bar dataKey="quantidade" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card full-width">
            <h2>Produtos por Grupo (Quantidade)</h2>
            <div className="grafico-container">
              <ResponsiveContainer>
                <BarChart data={dados.contagem_por_grupo} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" interval={0} angle={-45} textAnchor="end" height={80} tick={{ fontSize: 11 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}