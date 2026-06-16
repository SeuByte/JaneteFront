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

  // Dados para o Gráfico de Pizza (Donut)
  const dadosPedidos = [
    { name: 'Pendentes', value: dados.pedidos_pendentes },
    { name: 'Enviados', value: dados.pedidos_enviados },
  ];
  const CORES = ['#faad14', '#4CAF50'];

  return (
    <div className="dashboard-container">
      <h1 className="title_h1">Relatório Geral Janete</h1>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Total de Clientes</h2>
          <p>{dados.total_clientes}</p>
        </div>

        <div className="card">
          <h2>Receita Total</h2>
          <p>R$ {dados.receita_total.toFixed(2)}</p>
        </div>

        {/* Novo Card do Gráfico de Pizza */}
        <div className="card">
          <h2>Distribuição de Pedidos</h2>
          <div className="grafico-container" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dadosPedidos}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
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
  );
}