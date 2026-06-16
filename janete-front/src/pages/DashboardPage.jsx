import { useEffect, useState } from 'react';
import { getDashboardStats } from '../../services/dashboard_relatorio'; 
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
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
  
  return (
    <div className="dashboard-container">
      <h1>Relatório Geral Janete</h1>
      
      {!dados ? (
        <p>Carregando dados...</p>
      ) : (
        <div className="dashboard-grid">
          <div className="card">
            <h2>Total de Clientes</h2>
            <p>{dados.total_clientes}</p>
          </div>
          
          <div className="card">
            <h2>Receita Total</h2>
            <p>R$ {dados.receita_total.toFixed(2)}</p>
          </div>

          <div className="card">
            <h2>Pedidos Pendentes</h2>
            <p>{dados.pedidos_pendentes}</p>
          </div>
          <div className="card">
            <h2>Pedidos Enviados</h2>
            <p>{dados.pedidos_enviados}</p>
          </div>

          <div className="card full-width">
            <h2> Estoque Baixo</h2>
            <ul className="estoque-lista">
              {dados["relatorio estoque"].baixo_estoque.map((item, index) => (
                <li key={index} className="estoque-item">
                  {item.nome} - <strong>{item.quantidade} unidades</strong>
                </li>
              ))}
            </ul>
          </div>

          <div className="card full-width">
            <h2>Produtos por Grupo (Quantidade)</h2>
            <div style={{ width: '100%', height: 400 }}>
              <ResponsiveContainer>
                <BarChart data={dados.contagem_por_grupo} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  {/* Usamos o _id que vem do seu JSON como o nome da barra */}
                  <XAxis dataKey="_id" interval={0} angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}