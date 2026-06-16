import { useEffect, useState } from 'react';
import { getDashboardStats } from '../../services/dashboard_relatorio'; 
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
            <h2>⚠️ Estoque Baixo</h2>
            <ul className="estoque-lista">
              {dados["relatorio estoque"].baixo_estoque.map((item, index) => (
                <li key={index} className="estoque-item">
                  {item.nome} - <strong>{item.quantidade} unidades</strong>
                </li>
              ))}
            </ul>
          </div>

          <div className="card full-width">
            <h2>📦 Produtos por Grupo</h2>
            <div className="grupos-grid">
              {dados.contagem_por_grupo.map((grupo, index) => (
                <div key={index} className="grupo-item">
                  <strong>{grupo._id}</strong>: {grupo.total}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}