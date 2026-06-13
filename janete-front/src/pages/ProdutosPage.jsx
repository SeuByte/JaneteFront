import '../produtos.css';

export default function Produtos() {
  return (
    <>
      {/* Esta div serve APENAS para segurar o background */}
      <div className="app-background" />
      
      {/* Todo o conteúdo da sua página de produtos vai aqui dentro */}
      <div className="app-content">
        <h1>Nossos Produtos</h1>
        {/* Adicione aqui a sua lista de produtos, cards, etc. */}
        <p>O conteúdo da página vai rolar aqui por cima do fundo.</p>
      </div>
    </>
  );
}