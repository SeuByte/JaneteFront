import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Usuarios() {
  const navigate = useNavigate();

  // Estado para controlar a aba ativa ('pessoais' ou 'endereco')
  const [abaAtiva, setAbaAtiva] = useState("pessoais");

  // Estado para controlar os dados do formulário
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "000.000.000-00",
    nascimento: "00/00/0000",
  });

  // Função para atualizar os campos do formulário conforme o usuário digita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Função disparada ao enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados enviados:", formData);
    alert("Dados atualizados com sucesso! (Verifique o console)");
  };

  // Função para simular o logout do usuário
  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("logado");

    sessionStorage.clear();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col justify-between font-['Inter',_sans-serif]">
      {/* Container Principal */}
      <div className="max-w-7xl w-full mx-auto px-4 py-8 flex-grow">
        {/* Título Centralizado */}
        <div className="text-center mb-2">
          <h1 className="text-2xl font-bold text-gray-900">
            Alterar Dados Cadastrais
          </h1>
        </div>

        {/* Breadcrumb */}
        <div className="text-center text-xs text-gray-500 mb-8">
          <Link to="/home" className="hover:underline">
            Home
          </Link>{" "}
          &gt;{" "}
          <span className="hover:underline cursor-pointer">
            Área do Cliente
          </span>{" "}
          &gt;{" "}
          <span className="text-gray-900 font-medium">
            Alterar Dados Cadastrais
          </span>
        </div>

        {/* Layout de Duas Colunas (Menu Lateral + Conteúdo) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Menu Lateral (Navegação com Link do react-router-dom) */}
          <aside className="md:col-span-1 border-r border-gray-200 pr-4 space-y-1">
            <Link
              to="/ultimo-pedido"
              className="flex items-center space-x-3 p-2.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors"
            >
              <span className="text-lg">☀️</span>
              <span>Último pedido</span>
            </Link>

            <Link
              to="/pedidos"
              className="flex items-center space-x-3 p-2.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors"
            >
              <span className="text-lg">📄</span>
              <span>Consultar meus pedidos</span>
            </Link>

            <Link
              to="/vale-compra"
              className="flex items-center space-x-3 p-2.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors"
            >
              <span className="text-lg">🔄</span>
              <span>Vale Compra</span>
            </Link>

            <Link
              to="/cliente"
              className="flex items-center space-x-3 p-2.5 text-sm font-bold text-gray-900 bg-gray-100 rounded border-l-4 border-gray-900 transition-colors"
            >
              <span className="text-lg">📝</span>
              <span>Alterar dados cadastrais</span>
            </Link>

            <Link
              to="/enderecos"
              className="flex items-center space-x-3 p-2.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors"
            >
              <span className="text-lg">📍</span>
              <span>Gestão de Endereços</span>
            </Link>

            <Link
              to="/alterar-senha"
              className="flex items-center space-x-3 p-2.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors"
            >
              <span className="text-lg">🔒</span>
              <span>Alterar senha</span>
            </Link>

            <Link
              to="/alterar-email"
              className="flex items-center space-x-3 p-2.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors"
            >
              <span className="text-lg">✉️</span>
              <span>Alterar e-mail</span>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 p-2.5 text-sm text-red-600 hover:bg-red-50 rounded transition-colors text-left"
            >
              <span className="text-lg">🚪</span>
              <span>Desconectar</span>
            </button>
          </aside>

          {/* Área do Formulário */}
          <main className="md:col-span-3 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            {/* Abas (Tabs) */}
            <div className="flex space-x-6 border-b border-gray-200 mb-6">
              <button
                type="button"
                onClick={() => setAbaAtiva("pessoais")}
                className={`pb-2 text-sm font-semibold focus:outline-none transition-colors ${
                  abaAtiva === "pessoais"
                    ? "text-green-700 border-b-2 border-green-700"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Informações Pessoais
              </button>
              <button
                type="button"
                onClick={() => setAbaAtiva("endereco")}
                className={`pb-2 text-sm font-medium focus:outline-none transition-colors ${
                  abaAtiva === "endereco"
                    ? "text-green-700 border-b-2 border-green-700 font-semibold"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Endereço
              </button>
            </div>

            {/* Conteúdo Condicional das Abas */}
            {abaAtiva === "pessoais" ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nome Completo */}
                <div>
                  <label
                    htmlFor="nome"
                    className="block text-xs font-bold text-gray-700 mb-1"
                  >
                    Nome Completo*
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border-b border-gray-300 focus:border-gray-900 focus:outline-none text-sm tracking-wide uppercase font-medium bg-transparent"
                  />
                </div>

                {/* Grid de Email e CPF */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold text-gray-700 mb-1"
                    >
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border-b border-gray-300 focus:border-gray-900 focus:outline-none text-sm bg-transparent"
                    />
                  </div>

                  {/* CPF */}
                  <div>
                    <label
                      htmlFor="cpf"
                      className="block text-xs font-bold text-gray-700 mb-1"
                    >
                      CPF*
                    </label>
                    <input
                      type="text"
                      id="cpf"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border-b border-gray-300 focus:border-gray-900 focus:outline-none text-sm bg-transparent"
                    />
                  </div>
                </div>

                {/* Data de Nascimento */}
                <div className="md:w-1/2 md:pr-3">
                  <label
                    htmlFor="nascimento"
                    className="block text-xs font-bold text-gray-700 mb-1"
                  >
                    Data de Nascimento*
                  </label>
                  <input
                    type="text"
                    id="nascimento"
                    name="nascimento"
                    value={formData.nascimento}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border-b border-gray-300 focus:border-gray-900 focus:outline-none text-sm bg-transparent"
                  />
                </div>

                {/* Botões de Ação */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-6 space-y-3 md:space-y-0">
                  {/* Botão Cancelar */}
                  <button
                    type="button"
                    onClick={() => alert("Operação cancelada")}
                    className="w-full md:w-auto px-12 py-2.5 border border-gray-400 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors uppercase tracking-wider"
                  >
                    Cancelar
                  </button>

                  {/* Botão Alterar */}
                  <button
                    type="submit"
                    className="w-full md:w-auto px-16 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded text-sm font-bold transition-colors uppercase tracking-wider shadow-sm"
                  >
                    Alterar
                  </button>
                </div>
              </form>
            ) : (
              // Conteúdo simulado para a aba de Endereço
              <div className="text-gray-500 text-sm py-8 text-center">
                Formulário de Endereço (Implemente aqui se necessário).
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Rodapé */}
      <footer className="w-full text-center mt-12 pt-4 border-t border-slate-200 text-[10px] text-slate-400 space-y-1">
        <p>
          Janete Produtos Naturais E-mail:
          comercial@janeteprodutosnaturais.com.br | Whatsapp Araras: (19)
          98860-5981 | Leme: (19) 99916-4520
        </p>
        <div className="flex justify-center items-center space-x-1 font-bold tracking-wider text-slate-300">
          <span className="text-emerald-600 text-xs font-black">
            SeuByte &reg;
          </span>
        </div>
      </footer>
    </div>
  );
}
