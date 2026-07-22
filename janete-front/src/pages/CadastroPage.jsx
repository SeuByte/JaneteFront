import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bgImage from '../assets/BackGJanete.png';

// --- CONFIGURAÇÕES E FUNÇÕES AUXILIARES ---

// Array de estados movido para fora do componente para evitar recriações na renderização
const estadosBrasil = [
  { uf: 'AC', nome: 'Acre' },
  { uf: 'AL', nome: 'Alagoas' },
  { uf: 'AP', nome: 'Amapá' },
  { uf: 'AM', nome: 'Amazonas' },
  { uf: 'BA', nome: 'Bahia' },
  { uf: 'CE', nome: 'Ceará' },
  { uf: 'DF', nome: 'Distrito Federal' },
  { uf: 'ES', nome: 'Espírito Santo' },
  { uf: 'GO', nome: 'Goiás' },
  { uf: 'MA', nome: 'Maranhão' },
  { uf: 'MT', nome: 'Mato Grosso' },
  { uf: 'MS', nome: 'Mato Grosso do Sul' },
  { uf: 'MG', nome: 'Minas Gerais' },
  { uf: 'PA', nome: 'Pará' },
  { uf: 'PB', nome: 'Paraíba' },
  { uf: 'PR', nome: 'Paraná' },
  { uf: 'PE', nome: 'Pernambuco' },
  { uf: 'PI', nome: 'Piauí' },
  { uf: 'RJ', nome: 'Rio de Janeiro' },
  { uf: 'RN', nome: 'Rio Grande do Norte' },
  { uf: 'RS', nome: 'Rio Grande do Sul' },
  { uf: 'RO', nome: 'Rondônia' },
  { uf: 'RR', nome: 'Roraima' },
  { uf: 'SC', nome: 'Santa Catarina' },
  { uf: 'SP', nome: 'São Paulo' },
  { uf: 'SE', nome: 'Sergipe' },
  { uf: 'TO', nome: 'Tocantins' }
];

const validarCPF = (cpf) => {
  const limpo = cpf.replace(/\D/g, '');
  if (limpo.length !== 11 || /^(\d)\1+$/.test(limpo)) return false;
  
  let soma = 0, resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(limpo.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(limpo.substring(9, 10))) return false;
  
  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(limpo.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(limpo.substring(10, 11))) return false;
  
  return true;
};

const validarCNPJ = (cnpj) => {
  const limpo = cnpj.replace(/\D/g, '');

  if (limpo.length !== 14 || /^(\d)\1+$/.test(limpo)) return false;

  let tamanho = limpo.length - 2;
  let numeros = limpo.substring(0, tamanho);
  let digitos = limpo.substring(tamanho);

  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  if (resultado !== Number(digitos.charAt(0))) return false;

  tamanho++;
  numeros = limpo.substring(0, tamanho);

  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  return resultado === Number(digitos.charAt(1));
};

// --- COMPONENTE PRINCIPAL ---

export default function CadastroJanete() {
  const navigate = useNavigate();

  const [passoAtivo, setPassoAtivo] = useState(1);

  const [formData, setFormData] = useState({
    perfil: 'Pessoa Física',
    cnpjCpf: '',
    nomeCompleto: '',
    dataNascimento: '',
    telefone: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cobrancaIgual: true,
    email: '',
    senha: '',
    termoAceite: true,
    politicaPrivacidade: true,
  });

  const buscarCEP = async (cep) => {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert('CEP não encontrado');
        return;
      }

      setFormData((prev) => ({
        ...prev,
        endereco: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        estado: data.uf || '',
        complemento: data.complemento || '',
      }));
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
    }
  };

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    let valor = value;

    if (name === 'cep') {
      valor = value
        .replace(/\D/g, '')
        .replace(/^(\d{5})(\d)/, '$1-$2')
        .slice(0, 9);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : valor,
    }));

    if (name === 'cep') {
      const cepLimpo = valor.replace(/\D/g, '');
      if (cepLimpo.length === 8) {
        buscarCEP(cepLimpo);
      }
    }
  };

  const handleCadastro = () => {
  if (!formData.email) {
    alert("Informe o e-mail.");
    return;
  }

  if (!formData.senha) {
    alert("Informe a senha.");
    return;
  }

  if (!formData.termoAceite) {
    alert("Aceite os Termos de Uso.");
    return;
  }

  if (!formData.politicaPrivacidade) {
    alert("Aceite a Política de Privacidade.");
    return;
  }

  alert("Cadastro realizado com sucesso!");

  navigate("/login");
};

  const inputStyle = `
    w-full
    rounded-2xl
    border
    border-slate-300
    bg-white
    px-5
    py-3
    text-slate-700
    outline-none
    transition
    focus:border-[#2fb21e]
    focus:ring-4
    focus:ring-green-100
  `;

  const labelStyle = 'block text-sm font-semibold text-[#19b623] mb-2';

  const HeaderCadastro = () => (
    <div className="w-full flex flex-col items-center">
      <img
        src="/JaneteIcon.png"
        alt="Janete"
        className="
          h-28
          w-28
          rounded-full
          border-2
          border-[#2fb21e]
          bg-white
          p-2
          shadow-lg
          object-cover
        "
      />

      <h2 className="mt-5 text-3xl font-bold text-slate-800 text-center">
        Primeiro Acesso?
      </h2>

      <p className="text-slate-500 text-sm mt-2 text-center">
        Cadastre-se para acessar a plataforma
      </p>

      {/* Stepper */}
      <div className="flex items-center justify-center gap-4 mt-8">
        {[1, 2, 3].map((passo) => (
          <div
            key={passo}
            className={`
              h-11 w-11 rounded-full flex items-center justify-center
              font-bold transition-all
              ${
                passoAtivo >= passo
                  ? 'bg-[#2fb21e] text-white'
                  : 'bg-slate-200 text-slate-500'
              }
            `}
          >
            {passo}
          </div>
        ))}
      </div>

      <div className="mt-3 text-sm text-slate-600 font-medium text-center">
        {passoAtivo === 1 && 'Informações Pessoais'}
        {passoAtivo === 2 && 'Endereço'}
        {passoAtivo === 3 && 'Criar Conta'}
      </div>
    </div>
  );

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div
          className="
            w-full
            max-w-5xl
            rounded-[2.5rem]
            bg-white/85
            backdrop-blur-md
            border
            border-white/40
            shadow-2xl
            p-6
            md:p-10
          "
        >
          <HeaderCadastro />

          {/* PASSO 1 */}
          {passoAtivo === 1 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
                <div>
                  <label className={labelStyle}>Perfil*</label>
                  <select
                    name="perfil"
                    value={formData.perfil}
                    onChange={handleChange}
                    className={inputStyle}
                  >
                    <option value="Pessoa Física">Pessoa Física</option>
                    <option value="Pessoa Jurídica">Pessoa Jurídica</option>
                  </select>
                </div>

                <div>
                  <label className={labelStyle}>CPF / CNPJ*</label>
                  <input
                    type="text"
                    name="cnpjCpf"
                    value={formData.cnpjCpf}
                    onChange={handleChange}
                    placeholder="000.000.000-00"
                    className={inputStyle}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelStyle}>Nome Completo*</label>
                  <input
                    type="text"
                    name="nomeCompleto"
                    value={formData.nomeCompleto}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className={labelStyle}>Data de Nascimento*</label>
                  <input
                    type="date"
                    name="dataNascimento"
                    value={formData.dataNascimento}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className={labelStyle}>Telefone*</label>
                  <input
                    type="text"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    placeholder="(19) 99999-9999"
                    className={inputStyle}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
                <Link
                  to="/"
                  className="
                    w-full md:w-56 h-12 rounded-2xl border border-slate-300
                    flex items-center justify-center font-semibold
                    hover:bg-slate-50 transition
                  "
                >
                  Cancelar
                </Link>

                <button
                  onClick={() => setPassoAtivo(2)}
                  className="
                    w-full md:w-56 h-12 rounded-2xl bg-gradient-to-r
                    from-[#2fb21e] to-[#49d234] text-white font-semibold
                    shadow-lg hover:scale-[1.02] transition
                  "
                >
                  Próximo
                </button>
              </div>
            </>
          )}

          {/* PASSO 2 */}
          {passoAtivo === 2 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
                <div>
                  <label className={labelStyle}>CEP*</label>
                  <input
                    type="text"
                    name="cep"
                    value={formData.cep}
                    onChange={handleChange}
                    placeholder="00000-000"
                    maxLength={9}
                    className={inputStyle}
                  />
                </div>

                <div className="md:col-span-2 flex items-end pb-3">
                  <a href="https://buscacepinter.correios.com.br/" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 font-medium hover:underline">
                    Não sabe o seu CEP? Consulte Aqui
                  </a>
                </div>

                <div className="md:col-span-3">
                  <label className={labelStyle}>Endereço*</label>
                  <input
                    type="text"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className={labelStyle}>Número*</label>
                  <input
                    type="text"
                    name="numero"
                    value={formData.numero}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className={labelStyle}>Complemento</label>
                  <input
                    type="text"
                    name="complemento"
                    value={formData.complemento}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className={labelStyle}>Bairro*</label>
                  <input
                    type="text"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className={labelStyle}>Cidade*</label>
                  <input
                    type="text"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className={labelStyle}>Estado*</label>
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    className={inputStyle}
                  >
                    <option value="">Selecione</option>
                    {estadosBrasil.map((estado) => (
                      <option key={estado.uf} value={estado.uf}>
                        {estado.nome}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    name="cobrancaIgual"
                    checked={formData.cobrancaIgual}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#2fb21e] border-slate-300 rounded focus:ring-[#2fb21e]"
                  />
                  Endereço de cobrança igual ao de entrega
                </label>
              </div>

              <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
                <button
                  onClick={() => setPassoAtivo(1)}
                  className="
                    w-full md:w-56 h-12 rounded-2xl border border-slate-300
                    hover:bg-slate-50 transition
                  "
                >
                  Anterior
                </button>

                <button
                  onClick={() => setPassoAtivo(3)}
                  className="
                    w-full md:w-56 h-12 rounded-2xl bg-gradient-to-r
                    from-[#2fb21e] to-[#49d234] text-white font-semibold shadow-lg
                  "
                >
                  Próximo
                </button>
              </div>
            </>
          )}

          {/* PASSO 3 */}
          {passoAtivo === 3 && (
            <>
              <div className="max-w-xl mx-auto mt-10 space-y-5">
                <div>
                  <label className={labelStyle}>Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className={labelStyle}>Senha*</label>
                  <input
                    type="password"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer text-slate-600">
                    <input
                      type="checkbox"
                      name="termoAceite"
                      checked={formData.termoAceite}
                      onChange={handleChange}
                      className="h-4 w-4 text-[#2fb21e] border-slate-300 rounded focus:ring-[#2fb21e]"
                    />
                    Li e concordo com os <span className="font-bold underline text-[#19b623]">termos de uso.*</span>
                  </label>

                  <label className="flex items-center gap-2 text-sm cursor-pointer text-slate-600">
                    <input
                      type="checkbox"
                      name="politicaPrivacidade"
                      checked={formData.politicaPrivacidade}
                      onChange={handleChange}
                      className="h-4 w-4 text-[#2fb21e] border-slate-300 rounded focus:ring-[#2fb21e]"
                    />
                    Li e concordo com a <span className="font-bold underline text-[#19b623]">Política de Privacidade.*</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
                <button
                  onClick={() => setPassoAtivo(2)}
                  className="
                    w-full md:w-56 h-12 rounded-2xl border border-slate-300
                    hover:bg-slate-50 transition
                  "
                >
                  Anterior
                </button>

                <button
            onClick={handleCadastro}
            className="
              w-full md:w-56 h-12 rounded-2xl bg-gradient-to-r
              from-[#2fb21e] to-[#49d234] text-white font-semibold
              flex items-center justify-center shadow-lg hover:scale-[1.02] transition
             "
              >
                Cadastrar
                  </button>
              </div>
            </>
          )}

          {/* RODAPÉ DO SITE */}
          <footer className="w-full text-center mt-12 pt-4 border-t border-slate-200 text-[10px] text-slate-400 space-y-1">
            <p>Janete Produtos Naturais E-mail: comercial@janeteprodutosnaturais.com.br | Whatsapp Araras: (19) 98860-5981 | Leme: (19) 99916-4520</p>
            <div className="flex justify-center items-center space-x-1 font-bold tracking-wider text-slate-300">
              <span className="text-emerald-600 text-xs font-black">SeuByte &reg;</span> 
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
}