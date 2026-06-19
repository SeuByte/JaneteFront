import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Certifique-se de instalar: npm install axios
import { CookieBanner } from './PoliticaPrivacidade';
import NavBar from '../components/Navbar'; 
import Footer from '../components/Footer';

// Instância do Axios
const api = axios.create({
  baseURL: 'http://localhost:5173/AreaCliente',
  //baseURL: 'https://janeteprodutosnaturais.com.br/', // Substitua pela URL da sua API
});

// Adiciona o token de autenticação em cada requisição automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default function AlterarDados() {
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState('ultimoPedido');
  const [abaEndereco, setAbaEndereco] = useState('lista');
  const [loading, setLoading] = useState(true);
  const [carregandoPedidos, setCarregandoPedidos] = useState(false);
  const [carregandoVales, setCarregandoVales] = useState(false);
  const [carregandoEnderecos, setCarregandoEnderecos] = useState(false);

  // Estados para os pedidos vindo do banco
  const [pedidos, setPedidos] = useState([]);
  const [ultimoPedido, setUltimoPedido] = useState(null);

  // Estados para o Vale Compra
  const [saldoVale, setSaldoVale] = useState(0);
  const [valesCompra, setValesCompra] = useState([]);

  // Estados para a Gestão de Endereços
  const [enderecos, setEnderecos] = useState([]);
  const [idEnderecoEdicao, setIdEnderecoEdicao] = useState(null); // Controla se estamos editando ou criando
  const [novoEndereco, setNovoEndereco] = useState({
    identificacao: '',
    tipo: '',
    destinatario: '',
    telefone: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: ''
  });

  // Estado unificado contendo os dados do cliente e endereço principal (Incluindo CNPJ)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    cnpj: '',
    nascimento: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: ''
  });

  // 1. ESTADO PARA ALTERAR SENHA
  const [senhaData, setSenhaData] = useState({
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: ''
  });

  // 1. ESTADO PARA ALTERAR E-MAIL
  const [emailData, setEmailData] = useState({
    emailAtual: '',
    novoEmail: '',
    confirmarEmail: ''
  });

  // Função para carregar o histórico de pedidos
  const carregarPedidos = async () => {
    try {
      setCarregandoPedidos(true);
      const response = await api.get('/cliente/pedidos');
      console.log('Pedidos recebidos:', response.data);

      const listaPedidos = response.data.pedidos || [];
      setPedidos(listaPedidos);

      if (listaPedidos.length > 0) {
        setUltimoPedido(listaPedidos[0]);
      } else {
        setUltimoPedido(null);
      }
    } catch (error) {
      console.error(error);
      setPedidos([]);
      setUltimoPedido(null);
    } finally {
      setCarregandoPedidos(false);
    }
  };

  // Função para carregar os vales compra e saldo
  const carregarValeCompra = async () => {
    try {
      setCarregandoVales(true);
      const response = await api.get('/cliente/vale-compra');
      setSaldoVale(response.data.saldo || 0);
      setValesCompra(response.data.vales || []);
    } catch (error) {
      console.error('Erro ao carregar vale compra:', error);
    } finally {
      setCarregandoVales(false);
    }
  };

  // Função para carregar endereços do MongoDB
  const carregarEnderecos = async () => {
    try {
      setCarregandoEnderecos(true);
      const response = await api.get('/cliente/enderecos');
      setEnderecos(response.data.enderecos || []);
    } catch(error){
      console.error(error);
      setEnderecos([]);
      alert(error.response?.data?.mensagem || 'Erro ao carregar endereços');
    } finally {
      setCarregandoEnderecos(false);
    }
  };

  // BUSCAR INFORMAÇÕES NO BANCO DE DADOS (Ao carregar a página)
  useEffect(() => {
    async function carregarDadosCliente() {
      try {
        setLoading(true);
        
        // Rota que retorna os dados do usuário logado baseado no Token
        const response = await api.get('/cliente/perfil'); 
        
        // Mapeia os dados do banco para o estado do formulário (Incluindo CNPJ)
        setFormData({
          nome: response.data.nome || '',
          email: response.data.email || '',
          cpf: response.data.cpf || '',
          cnpj: response.data.cnpj || '',
          nascimento: response.data.nascimento || '',
          cep: response.data.cep || '',
          endereco: response.data.endereco || '',
          numero: response.data.numero || '',
          complemento: response.data.complemento || '',
          bairro: response.data.bairro || '',
          cidade: response.data.cidade || '',
          estado: response.data.estado || ''
        });

        // 2. Carrega o e-mail atual para o estado de alteração de e-mail
        setEmailData(prev => ({
          ...prev,
          emailAtual: response.data.email || ''
        }));

        // Busca os pedidos e o saldo do vale compra aproveitando o carregamento inicial
        await carregarPedidos();
        await carregarValeCompra();

      } catch (error) {
        console.error('Erro ao buscar dados do cliente:', error);
        alert('Sessão expirada ou erro ao carregar dados. Faça login novamente.');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    }

    carregarDadosCliente();
  }, [navigate]);

  // Função auxiliar para buscar CEP automaticamente (Perfil Principal)
  const buscarCEP = async (cepLimpo) => {
    if (cepLimpo.length !== 8) return;
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setFormData((prev) => ({
          ...prev,
          endereco: data.logradouro || '',
          bairro: data.bairro || '',
          cidade: data.localidade || '',
          estado: data.uf || '',
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
    }
  };

  // Função auxiliar para buscar CEP automaticamente (Gestão de Endereços)
  const buscarCEPEndereco = async (cepLimpo) => {
    if (cepLimpo.length !== 8) return;
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setNovoEndereco((prev) => ({
          ...prev,
          endereco: data.logradouro || '',
          bairro: data.bairro || '',
          cidade: data.localidade || '',
          estado: data.uf || '',
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar o CEP do endereço:", error);
    }
  };

  // Manipulador de inputs genérico para o formulário principal
  const handleChange = (e) => {
    const { name, value } = e.target;
    let valor = value;

    // Máscara automática de CNPJ
    if (name === 'cnpj') {
      valor = value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .slice(0, 18);
    }

    // Máscara automática de CPF
    if (name === 'cpf') {
      valor = value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1-$2')
        .slice(0, 14);
    }

    if (name === 'cep') {
      valor = value
        .replace(/\D/g, '')
        .replace(/^(\d{5})(\d)/, '$1-$2')
        .slice(0, 9);
      
      const cepLimpo = valor.replace(/\D/g, '');
      if (cepLimpo.length === 8) {
        buscarCEP(cepLimpo);
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: valor
    }));
  };

  // Manipulador de inputs para a sub-aba Novo/Editar Endereço
  const handleEnderecoChange = (e) => {
    const { name, value } = e.target;
    let valor = value;

    if (name === 'cep') {
      valor = value
        .replace(/\D/g, '')
        .replace(/^(\d{5})(\d)/, '$1-$2')
        .slice(0, 9);
      
      const cepLimpo = valor.replace(/\D/g, '');
      if (cepLimpo.length === 8) {
        buscarCEPEndereco(cepLimpo);
      }
    }

    setNovoEndereco((prev) => ({
      ...prev,
      [name]: valor
    }));
  };

  // FUNÇÃO PARA ATUALIZAR OS DADOS NO BANCO
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/cliente/atualizar', formData);
      alert('Dados cadastrais atualizados com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      alert(error.response?.data?.mensagem || 'Erro ao salvar alterações.');
    }
  };

  // 2. FUNÇÃO PARA ALTERAR SENHA NO BANCO
  const alterarSenha = async (e) => {
    e.preventDefault();

    if (senhaData.novaSenha !== senhaData.confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    try {
      const response = await api.put('/cliente/alterar-senha', {
        senhaAtual: senhaData.senhaAtual,
        novaSenha: senhaData.novaSenha
      });

      alert(response.data.mensagem || 'Senha alterada com sucesso!');
      
      setSenhaData({
        senhaAtual: '',
        novaSenha: '',
        confirmarSenha: ''
      });
      setAbaAtiva('ultimoPedido'); // Redireciona para o início da dashboard
    } catch (error) {
      alert(error.response?.data?.mensagem || 'Erro ao alterar senha.');
    }
  };

  // 3. FUNÇÃO PARA ALTERAR E-MAIL NO BANCO
  const alterarEmail = async (e) => {
    e.preventDefault();

    if (emailData.novoEmail !== emailData.confirmarEmail) {
      alert('Os e-mails não coincidem.');
      return;
    }

    try {
      const response = await api.put('/cliente/alterar-email', {
        novoEmail: emailData.novoEmail
      });

      alert(response.data.mensagem || 'E-mail alterado com sucesso!');

      // Atualiza o formulário principal e o e-mail atual em tela simultaneamente
      setFormData(prev => ({
        ...prev,
        email: emailData.novoEmail
      }));

      setEmailData({
        emailAtual: emailData.novoEmail,
        novoEmail: '',
        confirmarEmail: ''
      });

      setAbaAtiva('ultimoPedido');
    } catch (error) {
      alert(error.response?.data?.mensagem || 'Erro ao alterar e-mail.');
    }
  };

  // FUNÇÕES DE GESTÃO DE ENDEREÇOS
  const salvarEndereco = async (e) => {
    e.preventDefault();
    try {
      if (idEnderecoEdicao) {
        await api.put(`/cliente/enderecos/${idEnderecoEdicao}`, novoEndereco);
        alert('Endereço atualizado com sucesso!');
      } else {
        await api.post('/cliente/enderecos', novoEndereco);
        alert('Endereço cadastrado com sucesso!');
      }
      resetarFormEndereco();
      carregarEnderecos();
      setAbaEndereco('lista');
    } catch (error) {
      console.error('Erro ao salvar endereço:', error);
      alert(error.response?.data?.mensagem || 'Erro ao salvar endereço.');
    }
  };

  const editarEndereco = (endereco) => {
    setIdEnderecoEdicao(endereco._id);
    setNovoEndereco({
      identificacao: endereco.identificacao || '',
      tipo: endereco.tipo || '',
      destinatario: endereco.destinatario || '',
      telefone: endereco.telefone || '',
      cep: endereco.cep || '',
      endereco: endereco.endereco || '',
      numero: endereco.numero || '',
      complemento: endereco.complemento || '',
      bairro: endereco.bairro || '',
      cidade: endereco.cidade || '',
      estado: endereco.estado || ''
    });
    setAbaEndereco('novo');
  };

  const excluirEndereco = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este endereço?')) return;
    try {
      await api.delete(`/cliente/enderecos/${id}`);
      alert('Endereço excluído com sucesso!');
      carregarEnderecos();
    } catch (error) {
      console.error('Erro ao excluir endereço:', error);
      alert('Erro ao excluir endereço.');
    }
  };

  const alterarTipoUsoEndereco = async (id, tipoUso) => {
    try {
      await api.put(`/cliente/enderecos/${id}`, { [tipoUso]: true });
      carregarEnderecos();
    } catch (error) {
      console.error(`Erro ao definir endereço como ${tipoUso}:`, error);
    }
  };

  const resetarFormEndereco = () => {
    setIdEnderecoEdicao(null);
    setNovoEndereco({
      identificacao: '',
      tipo: '',
      destinatario: '',
      telefone: '',
      cep: '',
      endereco: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: ''
    });
  };

  // FUNÇÃO DE LOGOUT
  const handleLogout = () => {
    const confirmarSaida = window.confirm('Deseja realmente sair?');
    
    if (confirmarSaida) {
      localStorage.removeItem('token');
      navigate('/'); // Redireciona para a tela de Home (raiz)
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium">Carregando seus dados...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col justify-between font-['Inter',_sans-serif]">
      
      <NavBar />
      
      <div className="max-w-7xl w-full mx-auto px-4 py-8 flex-grow">
        
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Minha Conta</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          
          {/* Menu Lateral */}
          <aside className="md:col-span-1 border-r border-gray-200 pr-4 space-y-1">
            <button
              onClick={() => setAbaAtiva('ultimoPedido')}
              className={`w-full flex items-center space-x-3 p-2.5 text-sm rounded text-left transition-colors
              ${abaAtiva === 'ultimoPedido'
                ? 'font-bold bg-gray-100 border-l-4 border-gray-900 text-gray-900'
                : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <span className="text-lg">☀️</span>
              <span>Último pedido</span>
            </button>
            
            <button
              onClick={() => {
                setAbaAtiva('pedidos');
                carregarPedidos();
              }}
              className={`w-full flex items-center space-x-3 p-2.5 text-sm rounded text-left transition-colors
              ${abaAtiva === 'pedidos'
                ? 'font-bold bg-gray-100 border-l-4 border-gray-900 text-gray-900'
                : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <span className="text-lg">📄</span>
              <span>Consultar meus pedidos</span>
            </button>
            
            <button
              onClick={() => {
                setAbaAtiva('valeCompra');
                carregarValeCompra();
              }}
              className={`w-full flex items-center space-x-3 p-2.5 text-sm rounded text-left transition-colors
              ${abaAtiva === 'valeCompra'
                ? 'font-bold bg-gray-100 border-l-4 border-gray-900 text-gray-900'
                : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <span className="text-lg">💰</span>
              <span>Vale Compra</span>
            </button>
            
            <button
              onClick={() => setAbaAtiva('pessoais')}
              className={`w-full flex items-center space-x-3 p-2.5 text-sm rounded text-left transition-colors
              ${(abaAtiva === 'pessoais' || abaAtiva === 'endereco')
                ? 'font-bold bg-gray-100 border-l-4 border-gray-900 text-gray-900'
                : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <span className="text-lg">📝</span>
              <span>Alterar dados cadastrais</span>
            </button>
            
            <button
              onClick={() => {
                setAbaAtiva('enderecos');
                resetarFormEndereco();
                carregarEnderecos();
                setAbaEndereco('lista');
              }}
              className={`w-full flex items-center space-x-3 p-2.5 text-sm rounded text-left transition-colors
              ${abaAtiva === 'enderecos'
                ? 'font-bold bg-gray-100 border-l-4 border-gray-900 text-gray-900'
                : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <span className="text-lg">📍</span>
              <span>Gestão de Endereços</span>
            </button>
            
            <button
              onClick={() => setAbaAtiva('alterarSenha')}
              className={`w-full flex items-center space-x-3 p-2.5 text-sm rounded text-left transition-colors
              ${abaAtiva === 'alterarSenha'
                ? 'font-bold bg-gray-100 border-l-4 border-gray-900 text-gray-900'
                : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <span className="text-lg">🔒</span>
              <span>Alterar senha</span>
            </button>
            
            <button
              onClick={() => setAbaAtiva('alterarEmail')}
              className={`w-full flex items-center space-x-3 p-2.5 text-sm rounded text-left transition-colors
              ${abaAtiva === 'alterarEmail'
                ? 'font-bold bg-gray-100 border-l-4 border-gray-900 text-gray-900'
                : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <span className="text-lg">✉️</span>
              <span>Alterar e-mail</span>
            </button>
            
            <button 
              onClick={handleLogout} 
              className="w-full flex items-center space-x-3 p-2.5 text-sm text-red-600 hover:bg-red-50 rounded transition-colors text-left"
            >
              <span className="text-lg">🚪</span>
              <span>Desconectar</span>
            </button>
          </aside>

          {/* Área Principal de Conteúdo */}
          <main className="md:col-span-3 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            
            {/* Abas Superiores (Dados Cadastrais) */}
            {(abaAtiva === 'pessoais' || abaAtiva === 'endereco') && (
              <div className="flex space-x-6 border-b border-gray-200 mb-6">
                <button 
                  type="button"
                  onClick={() => setAbaAtiva('pessoais')}
                  className={`pb-2 text-sm font-semibold focus:outline-none transition-colors ${
                    abaAtiva === 'pessoais' 
                      ? 'text-green-700 border-b-2 border-green-700' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  Informações Pessoais
                </button>
                <button 
                  type="button"
                  onClick={() => setAbaAtiva('endereco')}
                  className={`pb-2 text-sm font-medium focus:outline-none transition-colors ${
                    abaAtiva === 'endereco' 
                      ? 'text-green-700 border-b-2 border-green-700 font-semibold' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  Endereço
                </button>
              </div>
            )}

            {/* ABA: ÚLTIMO PEDIDO */}
            {abaAtiva === 'ultimoPedido' && (
              <div className="bg-white">
                <h2 className="text-xl font-bold mb-6 text-gray-900">Último Pedido</h2>
                {!ultimoPedido ? (
                  <div className="bg-gray-100 p-4 rounded text-gray-600">
                    Nenhum pedido encontrado!
                  </div>
                ) : (
                  <div className="space-y-4 border border-gray-200 p-5 rounded-lg max-w-md">
                    <div>
                      <span className="text-gray-500 text-sm block">Número do Pedido</span>
                      <strong className="text-lg text-gray-900">#{ultimoPedido.numero_pedido || ultimoPedido.numero}</strong>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                      <div>
                        <span className="text-gray-500 text-xs block">Data</span>
                        <strong className="text-sm text-gray-800">{ultimoPedido.data_pedido || ultimoPedido.data}</strong>
                      </div>
                      <div>
                        <span className="text-gray-500 text-xs block">Status</span>
                        <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded mt-0.5">
                          {ultimoPedido.status}
                        </span>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-gray-500 text-sm">Total do Pedido</span>
                      <strong className="text-xl text-orange-600">
                        R$ {typeof ultimoPedido.total === 'number' ? ultimoPedido.total.toFixed(2) : ultimoPedido.total}
                      </strong>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ABA: HISTÓRICO DE PEDIDOS */}
            {abaAtiva === 'pedidos' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Histórico de Pedidos
                </h2>

                {carregandoPedidos ? (
                  <div className="bg-gray-100 p-4 rounded text-center text-gray-600">
                    Carregando pedidos...
                  </div>
                ) : pedidos.length === 0 ? (
                  <div className="bg-gray-100 p-4 rounded text-center font-semibold text-gray-600">
                    Nenhum pedido encontrado!
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200 min-w-[600px]">
                      <thead>
                        <tr className="bg-gray-100 border-b border-gray-200">
                          <th className="p-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Pedido</th>
                          <th className="p-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Data</th>
                          <th className="p-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="p-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Valor</th>
                          <th className="p-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pedidos.map((pedido) => (
                          <tr key={pedido.id || pedido.numero_pedido} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="p-3 text-sm font-bold text-gray-900">
                              #{pedido.numero_pedido || pedido.numero}
                            </td>
                            <td className="p-3 text-sm text-gray-600">
                              {pedido.data_pedido || pedido.data}
                            </td>
                            <td className="p-3 text-sm">
                              <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2 py-0.5 rounded">
                                {pedido.status}
                              </span>
                            </td>
                            <td className="p-3 text-sm font-bold text-gray-800">
                              R$ {typeof pedido.total === 'number' ? Number(pedido.total).toFixed(2) : pedido.total}
                            </td>
                            <td className="p-3 text-sm">
                              <button
                                type="button"
                                className="bg-green-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-green-700 transition-colors"
                                onClick={() => alert(`Visualizando pedido ${pedido.numero_pedido || pedido.numero}`)}
                              >
                                Visualizar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* ABA: VALE COMPRA */}
            {abaAtiva === 'valeCompra' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Vale Comra
                </h2>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <p className="text-gray-500 text-sm font-medium">Saldo disponível</p>
                  <h3 className="text-4xl font-bold text-green-700 mt-2">
                    R$ {typeof saldoVale === 'number' ? saldoVale.toFixed(2) : parseFloat(saldoVale).toFixed(2)}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2">
                    Ganhe 1% de volta em todas as compras aprovadas ("Pago" ou "Entregue"). <br />
                    Validade dos créditos: 30 dias a partir da data de geração.
                  </p>
                </div>

                {carregandoVales ? (
                  <div className="bg-gray-100 p-4 rounded text-center text-gray-600">
                    Carregando extrato de vales...
                  </div>
                ) : valesCompra.length === 0 ? (
                  <div className="bg-gray-100 p-4 rounded text-center text-gray-600 font-medium">
                    Nenhum vale compra disponível no momento.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200 min-w-[500px]">
                      <thead>
                        <tr className="bg-gray-100 border-b border-gray-200">
                          <th className="p-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Pedido</th>
                          <th className="p-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Valor Compra</th>
                          <th className="p-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Crédito (1%)</th>
                          <th className="p-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Expira em</th>
                        </tr>
                      </thead>
                      <tbody>
                        {valesCompra.map((vale) => (
                          <tr key={vale._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="p-3 text-sm font-medium text-gray-900">
                              #{vale.pedidoId}
                            </td>
                            <td className="p-3 text-sm text-gray-600">
                              R$ {Number(vale.valorCompra).toFixed(2)}
                            </td>
                            <td className="p-3 text-sm text-green-700 font-bold">
                              + R$ {Number(vale.valorCredito).toFixed(2)}
                            </td>
                            <td className="p-3 text-sm text-gray-600">
                              {new Date(vale.dataExpiracao).toLocaleDateString('pt-BR')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* GESTÃO DE ENDEREÇOS */}
            {abaAtiva === 'enderecos' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestão de Endereços</h2>
                
                <div className="flex border-b mb-6">
                  <button
                    type="button"
                    onClick={() => setAbaEndereco('lista')}
                    className={`pb-3 px-4 transition-colors text-sm focus:outline-none ${
                      abaEndereco === 'lista'
                        ? 'border-b-2 border-green-700 text-green-700 font-bold'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Lista de Endereços
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (abaEndereco !== 'novo') resetarFormEndereco();
                      setAbaEndereco('novo');
                    }}
                    className={`pb-3 px-4 transition-colors text-sm focus:outline-none ${
                      abaEndereco === 'novo'
                        ? 'border-b-2 border-green-700 text-green-700 font-bold'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {idEnderecoEdicao ? 'Editar Endereço' : 'Novo Endereço'}
                  </button>
                </div>

                {abaEndereco === 'lista' && (
                  <div>
                    {carregandoEnderecos ? (
                      <div className="bg-gray-100 p-4 rounded text-center text-gray-600">
                        Carregando seus endereços...
                      </div>
                    ) : enderecos.length === 0 ? (
                      <div className="bg-gray-100 p-4 rounded text-gray-600 text-center font-medium">
                        Nenhum endereço cadastrado.
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-4">
                        {enderecos.map((endereco) => (
                          <div key={endereco._id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold uppercase text-gray-900 text-sm">
                                  {endereco.destinatario}
                                </h3>
                                {endereco.identificacao && (
                                  <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                                    {endereco.identificacao} ({endereco.tipo || 'Geral'})
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-600 space-y-0.5">
                                <p>{endereco.endereco}, {endereco.numero}</p>
                                {endereco.complemento && <p className="text-xs italic">Comp: {endereco.complemento}</p>}
                                <p>{endereco.bairro}</p>
                                <p>{endereco.cidade} - {endereco.estado}</p>
                                <p className="font-medium text-gray-800 mt-1">CEP: {endereco.cep}</p>
                                {endereco.telefone && <p className="text-xs">Tel: {endereco.telefone}</p>}
                              </div>
                            </div>

                            <div>
                              <div className="grid grid-cols-2 gap-3 mt-5">
                                <button 
                                  type="button"
                                  onClick={() => alterarTipoUsoEndereco(endereco._id, 'entrega')}
                                  className={`rounded py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                                    endereco.entrega 
                                      ? 'bg-green-700 text-white shadow-sm' 
                                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                  }`}
                                >
                                  {endereco.entrega ? '✓ Entrega Padrão' : 'Definir Entrega'}
                                </button>

                                <button 
                                  type="button"
                                  onClick={() => alterarTipoUsoEndereco(endereco._id, 'cobranca')}
                                  className={`rounded py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                                    endereco.cobranca 
                                      ? 'bg-blue-700 text-white shadow-sm' 
                                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                  }`}
                                >
                                  {endereco.cobranca ? '✓ Cobrança Padrão' : 'Definir Cobrança'}
                                </button>
                              </div>

                              <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-100">
                                <button
                                  type="button"
                                  className="border border-gray-300 rounded py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                  onClick={() => editarEndereco(endereco)}
                                >
                                  Editar
                                </button>
                                <button
                                  type="button"
                                  className="border border-red-200 text-red-600 rounded py-1.5 text-xs font-medium hover:bg-red-50 transition-colors"
                                  onClick={() => excluirEndereco(endereco._id)}
                                >
                                  Excluir
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {abaEndereco === 'novo' && (
                  <form onSubmit={salvarEndereco} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Identificação (Ex: Minha Casa, Trabalho)</label>
                        <input
                          type="text"
                          name="identificacao"
                          value={novoEndereco.identificacao}
                          onChange={handleEnderecoChange}
                          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none text-sm"
                          placeholder="Ex: Apartamento, Escritório"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Tipo do Endereço</label>
                        <select
                          name="tipo"
                          value={novoEndereco.tipo}
                          onChange={handleEnderecoChange}
                          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none text-sm bg-white"
                        >
                          <option value="">Selecione</option>
                          <option value="Casa">Casa</option>
                          <option value="Trabalho">Trabalho</option>
                          <option value="Outro">Outro</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Destinatário *</label>
                        <input
                          type="text"
                          name="destinatario"
                          value={novoEndereco.destinatario}
                          onChange={handleEnderecoChange}
                          required
                          placeholder="Nome de quem vai receber"
                          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Telefone de Contato *</label>
                        <input
                          type="text"
                          name="telefone"
                          value={novoEndereco.telefone}
                          onChange={handleEnderecoChange}
                          required
                          placeholder="(00) 00000-0000"
                          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                      <div className="w-full md:w-1/3">
                        <label className="block text-xs font-bold text-gray-700 mb-1">CEP *</label>
                        <input
                          type="text"
                          name="cep"
                          value={novoEndereco.cep}
                          onChange={handleEnderecoChange}
                          maxLength={9}
                          required
                          placeholder="00000-000"
                          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none text-sm"
                        />
                      </div>
                      <div className="pt-2">
                        <a href="https://buscacepinter.correios.com.br/" target="_blank" rel="noopener noreferrer" className="text-xs text-green-700 font-medium hover:underline">
                          Não sabe o seu CEP? <span className="underline font-semibold">Consulte Aqui.</span>
                        </a>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Endereço *</label>
                      <input
                        type="text"
                        name="endereco"
                        value={novoEndereco.endereco}
                        onChange={handleEnderecoChange}
                        required
                        placeholder="Rua, Avenida, Praça..."
                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none text-sm uppercase"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Número *</label>
                        <input
                          type="text"
                          name="numero"
                          value={novoEndereco.numero}
                          onChange={handleEnderecoChange}
                          required
                          placeholder="Nº"
                          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Complemento</label>
                        <input
                          type="text"
                          name="complemento"
                          value={novoEndereco.complemento}
                          onChange={handleEnderecoChange}
                          placeholder="Apto, Bloco, Fundo (Opcional)"
                          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Bairro *</label>
                        <input
                          type="text"
                          name="bairro"
                          value={novoEndereco.bairro}
                          onChange={handleEnderecoChange}
                          required
                          placeholder="Bairro"
                          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none text-sm uppercase"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Cidade *</label>
                        <input
                          type="text"
                          name="cidade"
                          value={novoEndereco.cidade}
                          onChange={handleEnderecoChange}
                          required
                          placeholder="Cidade"
                          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none text-sm uppercase"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Estado *</label>
                        <input
                          type="text"
                          name="estado"
                          value={novoEndereco.estado}
                          onChange={handleEnderecoChange}
                          required
                          placeholder="Ex: SP ou São Paulo"
                          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          resetarFormEndereco();
                          setAbaEndereco('lista');
                        }}
                        className="px-6 py-2.5 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors uppercase tracking-wider"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-2.5 rounded font-bold text-sm uppercase tracking-wider shadow-sm"
                      >
                        {idEnderecoEdicao ? 'SALVAR ALTERAÇÕES' : 'SALVAR ENDEREÇO'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* ABA: ALTERAR SENHA */}
            {abaAtiva === 'alterarSenha' && (
              <div>
                <h2 className="text-xl font-bold mb-6 text-gray-900">Alterar Minha Senha</h2>
                
                <form onSubmit={alterarSenha} className="space-y-5 max-w-md">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Senha Atual *</label>
                    <input
                      type="password"
                      value={senhaData.senhaAtual}
                      onChange={(e) => setSenhaData({ ...senhaData, senhaAtual: e.target.value })}
                      required
                      placeholder="Sua senha atual aqui"
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Nova Senha *</label>
                    <input
                      type="password"
                      value={senhaData.novaSenha}
                      onChange={(e) => setSenhaData({ ...senhaData, novaSenha: e.target.value })}
                      required
                      placeholder="Nova senha (mínimo 6 caracteres)"
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Confirmar Nova Senha *</label>
                    <input
                      type="password"
                      value={senhaData.confirmarSenha}
                      onChange={(e) => setSenhaData({ ...senhaData, confirmarSenha: e.target.value })}
                      required
                      placeholder="Confirme sua nova senha"
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none text-sm"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-center pt-4 space-y-3 md:space-y-0">
                    <button
                      type="button"
                      onClick={() => {
                        setSenhaData({ senhaAtual: '', novaSenha: '', confirmarSenha: '' });
                        setAbaAtiva('ultimoPedido');
                      }}
                      className="w-full md:w-auto px-8 py-2.5 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors uppercase tracking-wider"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white px-10 py-2.5 rounded font-bold text-sm uppercase tracking-wider shadow-sm transition-colors"
                    >
                      MUDAR SENHA
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* CONTEÚDO DA ABA: ALTERAR E-MAIL */}
            {abaAtiva === 'alterarEmail' && (
              <div>
                <h2 className="text-xl font-bold mb-6 text-gray-900">
                  Alterar E-mail
                </h2>

                <form onSubmit={alterarEmail} className="space-y-5 max-w-md">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      E-mail Atual
                    </label>
                    <input
                      type="email"
                      value={emailData.emailAtual}
                      disabled
                      className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-500 text-sm cursor-not-allowed focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Novo E-mail *
                    </label>
                    <input
                      type="email"
                      value={emailData.novoEmail}
                      onChange={(e) => setEmailData({ ...emailData, novoEmail: e.target.value })}
                      required
                      placeholder="Insira o seu novo e-mail"
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Confirmar Novo E-mail *
                    </label>
                    <input
                      type="email"
                      value={emailData.confirmarEmail}
                      onChange={(e) => setEmailData({ ...emailData, confirmarEmail: e.target.value })}
                      required
                      placeholder="Confirme o novo e-mail"
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none text-sm"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-center pt-4 space-y-3 md:space-y-0">
                    <button
                      type="button"
                      onClick={() => {
                        setEmailData(prev => ({ ...prev, novoEmail: '', confirmarEmail: '' }));
                        setAbaAtiva('ultimoPedido');
                      }}
                      className="w-full md:w-auto px-8 py-2.5 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors uppercase tracking-wider"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white px-10 py-2.5 rounded font-bold text-sm uppercase tracking-wider shadow-sm transition-colors"
                    >
                      ALTERAR E-MAIL
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* FORMULÁRIO CADASTRAL ORIGINAL */}
            {(abaAtiva === 'pessoais' || abaAtiva === 'endereco') && (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {abaAtiva === 'pessoais' && (
                  <>
                    <div>
                      <label htmlFor="nome" className="block text-xs font-bold text-gray-700 mb-1">Nome Completo / Razão Social*</label>
                      <input 
                        type="text" 
                        id="nome" 
                        name="nome" 
                        value={formData.nome} 
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border-b border-b-gray-300 focus:border-b-gray-900 focus:outline-none text-sm tracking-wide uppercase font-medium bg-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-xs font-bold text-gray-700 mb-1">Email*</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border-b border-b-gray-300 focus:border-b-gray-900 focus:outline-none text-sm bg-transparent"
                        />
                      </div>
                      
                      {/* LÓGICA DE DETECÇÃO CPF / CNPJ - AGORA TOTALMENTE EDITÁVEL */}
                      {formData.cnpj ? (
                        <div>
                          <label htmlFor="cnpj" className="block text-xs font-bold text-gray-700 mb-1">CNPJ*</label>
                          <input 
                            type="text" 
                            id="cnpj" 
                            name="cnpj" 
                            value={formData.cnpj} 
                            onChange={handleChange}
                            placeholder="00.000.000/0000-00"
                            required
                            className="w-full px-3 py-2 border-b border-b-gray-300 focus:border-b-gray-900 focus:outline-none text-sm bg-transparent"
                          />
                        </div>
                      ) : (
                        <div>
                          <label htmlFor="cpf" className="block text-xs font-bold text-gray-700 mb-1">CPF*</label>
                          <input 
                            type="text" 
                            id="cpf" 
                            name="cpf" 
                            value={formData.cpf} 
                            onChange={handleChange}
                            placeholder="000.000.000-00"
                            required
                            className="w-full px-3 py-2 border-b border-b-gray-300 focus:border-b-gray-900 focus:outline-none text-sm bg-transparent"
                          />
                        </div>
                      )}
                    </div>

                    <div className="md:w-1/2 md:pr-3">
                      <label htmlFor="nascimento" className="block text-xs font-bold text-gray-700 mb-1">
                        {formData.cnpj ? 'Data de Abertura*' : 'Data de Nascimento*'}
                      </label>
                      <input 
                        type="text" 
                        id="nascimento" 
                        name="nascimento" 
                        value={formData.nascimento} 
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border-b border-b-gray-300 focus:border-b-gray-900 focus:outline-none text-sm bg-transparent"
                      />
                    </div>
                  </>
                )}

                {abaAtiva === 'endereco' && (
                  <div className="space-y-5">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                      <div className="w-full md:w-1/3">
                        <label htmlFor="cep" className="block text-xs font-bold text-gray-700 mb-1">CEP *</label>
                        <input 
                          type="text" 
                          id="cep" 
                          name="cep" 
                          value={formData.cep} 
                          onChange={handleChange}
                          maxLength={9}
                          required
                          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none text-sm"
                        />
                      </div>
                      <div className="pt-2">
                        <a href="https://buscacepinter.correios.com.br/" target="_blank" rel="noopener noreferrer" className="text-xs text-green-700 font-medium hover:underline">
                          Não sabe o seu CEP? <span className="underline font-semibold">Consulte Aqui.</span>
                        </a>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="endereco" className="block text-xs font-bold text-gray-700 mb-1">Endereço *</label>
                      <input 
                        type="text" 
                        id="endereco" 
                        name="endereco" 
                        value={formData.endereco} 
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none text-sm uppercase"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="numero" className="block text-xs font-bold text-gray-700 mb-1">Número *</label>
                        <input 
                          type="text" 
                          id="numero" 
                          name="numero" 
                          value={formData.numero} 
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="complemento" className="block text-xs font-bold text-gray-700 mb-1">Complemento</label>
                        <input 
                          type="text" 
                          id="complemento" 
                          name="complemento" 
                          value={formData.complemento} 
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="bairro" className="block text-xs font-bold text-gray-700 mb-1">Bairro *</label>
                        <input 
                          type="text" 
                          id="bairro" 
                          name="bairro" 
                          value={formData.bairro} 
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none text-sm uppercase"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <label htmlFor="cidade" className="block text-xs font-bold text-gray-700 mb-1">Cidade *</label>
                        <input 
                          type="text" 
                          id="cidade" 
                          name="cidade" 
                          value={formData.cidade} 
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none text-sm uppercase"
                        />
                      </div>

                      <div>
                        <label htmlFor="estado" className="block text-xs font-bold text-gray-700 mb-1">Estado *</label>
                        <input 
                          type="text" 
                          id="estado" 
                          name="estado" 
                          value={formData.estado} 
                          onChange={handleChange}
                          required
                          placeholder="Ex: São Paulo"
                          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col md:flex-row justify-between items-center pt-6 space-y-3 md:space-y-0">
                  <button 
                    type="button" 
                    onClick={() => setAbaAtiva('ultimoPedido')}
                    className="w-full md:w-auto px-12 py-2.5 border border-gray-400 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors uppercase tracking-wider"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="w-full md:w-auto px-16 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded text-sm font-bold transition-colors uppercase tracking-wider shadow-sm"
                  >
                    Alterar
                  </button>
                </div>

              </form>
            )}
          </main>
        </div>
      </div>

      <Footer />

    </div>
  );
}