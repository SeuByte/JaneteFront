import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bgImage from '../assets/BackGJanete.png'; // Referência de background do seu projeto

// --- FUNÇÕES AUXILIARES DE VALIDAÇÃO DE DOCUMENTOS ---
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
  const digitos = limpo.substring(tamanho);
  let soma = 0, pos = tamanho - 7;
  
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) return false;
  
  tamanho = tamanho + 1;
  numeros = limpo.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(1))) return false;
  
  return true;
};

export default function CadastroJanete() {
  // Estado para alternar estritamente entre as 3 telas das fotos: 1, 2 ou 3
  const [passoAtivo, setPassoAtivo] = useState(1);

  // Estados dos inputs baseados nas imagens
  const [formData, setFormData] = useState({
    perfil: '',
    nomeCompleto: '',
    cpf: '',
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
    politicaPrivacidade: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Cabeçalho padronizado contendo o título idêntico ao das imagens
  const HeaderCadastro = () => (
    <div className="w-full flex flex-col items-center mb-6">
      <img
        src="/JaneteIcon.png"
        alt="Janete Icon"
        className="mb-4 h-24 w-24 rounded-full border border-[#309A20] bg-white object-cover"
      />
      <h2 className="text-xl font-bold text-slate-800 mb-4">Primeiro Acesso? Cadastre-se</h2>
      
      {/* Abas superiores de progresso */}
      <div className="flex w-full justify-center space-x-4 border-b border-slate-200 pb-3 text-xs font-semibold text-slate-400">
        <span className={passoAtivo === 1 ? 'text-[#19b623] border-b-2 border-[#19b623] pb-3 -mb-3.5 font-bold' : ''}>Informações Pessoais</span>
        <span className={passoAtivo === 2 ? 'text-[#19b623] border-b-2 border-[#19b623] pb-3 -mb-3.5 font-bold' : ''}>Endereço</span>
        <span className={passoAtivo === 3 ? 'text-[#19b623] border-b-2 border-[#19b623] pb-3 -mb-3.5 font-bold' : ''}>Crie sua conta</span>
      </div>
    </div>
  );

  // Classes utilitárias compartilhadas vindas dos estilos de formatação do seu front-end
  const inputStyle = "w-full rounded-full border border-lime-400 bg-white px-5 py-2.5 text-start text-sm text-slate-800 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-200";
  const labelStyle = "block text-center text-sm font-semibold text-[#19b623] mb-1";

  return (
    <div className="min-h-screen w-full grid place-items-center bg-no-repeat bg-center bg-cover p-4 font-sans antialiased" style={{ backgroundImage: `url(${bgImage})` }}>
      
      {/* Container adaptado do formato do seu LoginPage/CadastroCliente */}
      <div className="w-full max-w-3xl min-h-[70vh] rounded-[3rem] bg-white/95 p-8 md:p-12 shadow-[0_0.5rem_1.5rem_#ffaa0b] flex flex-col justify-between">
        
        <div>
          {/* PASSO 1: INFORMAÇÕES PESSOAIS (Foto 8c63acbc-341b-4183-9cb8-a6ed7b65d22d.jpg) */}
          {passoAtivo === 1 && (
            <div>
              <HeaderCadastro />
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-6">
                <div>
                  <label className={labelStyle}>Perfil*</label>
                  <select name="perfil" value={formData.perfil} onChange={handleChange} className={`${inputStyle} text-center pl-8`}>
                    <option>Pessoa Física</option>
                    <option>Pessoa Jurídica</option>
                  </select>
                </div>
                                
                <div>
                <label className={labelStyle}>CNPJ/CPF*</label>
                <input 
                  type="text" // Mudado de number para text
                  name="cnpjCpf" 
                  placeholder="000.000.000-00 ou 00.000.000/0001-00" 
                  value={formData.cnpjCpf} // Ajustado o nome para refletir ambos
                  onChange={handleChange} 
                  maxLength={18} // Limita o tamanho máximo com máscara
                  className={inputStyle} 
                  required
                />
              </div>

                <div>
                  <label className={labelStyle}>Nome Completo*</label>
                  <input type="text" name="nomeCompleto" placeholder="Nome Completo" value={formData.nomeCompleto} onChange={handleChange} className={inputStyle } />
                </div>

                <div>
                  <label className={labelStyle}>Data de Nascimento*</label>
                  <input type="date" name="dataNascimento" placeholder="dd/mm/aaaa" value={formData.dataNascimento} onChange={handleChange} className={inputStyle} />
                </div>
                <div>
                  <label className={labelStyle}>Telefone*</label>
                  <input type="text" name="telefone" placeholder="(00) 00000-0000" value={formData.telefone} onChange={handleChange} className={inputStyle} />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
                <Link to="/" className="w-full max-w-xs h-12 flex items-center justify-center rounded-full border border-slate-400 text-slate-600 font-semibold text-sm hover:bg-slate-100 transition tracking-wide">
                  CANCELAR
                </Link>
                <button onClick={() => setSetPassoAtivo(2)} className="w-full max-w-xs h-12 rounded-full bg-[#2fb21e] text-white font-semibold text-sm hover:bg-[#1e8716] transition tracking-wide">
                  PRÓXIMO
                </button>
              </div>
            </div>
          )}

          {/* PASSO 2: ENDEREÇO (Foto c7c86253-981e-465b-b53d-b1684c0cbae7.jpg) */}
          {passoAtivo === 2 && (
            <div>
              <HeaderCadastro />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="md:col-span-1">
                  <label className={labelStyle}>CEP*</label>
                  <input type="text" name="cep" value={formData.cep} onChange={handleChange} className={inputStyle} />
                </div>
                <div className="md:col-span-2 flex items-center justify-center md:justify-start pt-5">
                  <a href="#cep" className="text-xs text-blue-500 font-medium hover:underline">Não sabe o seu CEP? Consulte Aqui</a>
                </div>

                <div className="md:col-span-3">
                  <label className={labelStyle}>Endereço*</label>
                  <input type="text" name="endereco" value={formData.endereco} onChange={handleChange} className={inputStyle} />
                </div>

                <div>
                  <label className={labelStyle}>Número*</label>
                  <input type="text" name="numero" value={formData.numero} onChange={handleChange} className={`${inputStyle} !bg-gray-50 font-bold`} />
                </div>
                <div>
                  <label className={labelStyle}>Complemento</label>
                  <input type="text" name="complemento" placeholder="Complemento" value={formData.complemento} onChange={handleChange} className={inputStyle} />
                </div>
                <div>
                  <label className={labelStyle}>Bairro*</label>
                  <input type="text" name="bairro" value={formData.bairro} onChange={handleChange} className={inputStyle} />
                </div>

                <div>
                  <label className={labelStyle}>Cidade*</label>
                  <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} className={inputStyle} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelStyle}>Estado*</label>
                  <select name="estado" value={formData.estado} onChange={handleChange} className={`${inputStyle} text-center pl-8`}>
                    <option>São Paulo</option>
                    <option>Rio de Janeiro</option>
                    <option>Minas Gerais</option>
                  </select>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center">
                <input type="checkbox" id="cobrancaIgual" name="cobrancaIgual" checked={formData.cobrancaIgual} onChange={handleChange} className="h-4 w-4 text-[#2fb21e] border-lime-400 rounded focus:ring-lime-200" />
                <label htmlFor="cobrancaIgual" className="ml-2 text-xs font-medium text-slate-600">O endereço de cobrança é o mesmo que o endereço de entrega?</label>
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                <button onClick={() => setPassoAtivo(1)} className="w-full max-w-xs h-12 rounded-full border border-slate-400 text-slate-600 font-semibold text-sm hover:bg-slate-100 transition tracking-wide">
                  ANTERIOR
                </button>
                <button onClick={() => setPassoAtivo(3)} className="w-full max-w-xs h-12 rounded-full bg-[#2fb21e] text-white font-semibold text-sm hover:bg-[#1e8716] transition tracking-wide">
                  PRÓXIMO
                </button>
              </div>
            </div>
          )}

          {/* PASSO 3: CRIE SUA CONTA (Foto d47ff2b2-e270-4570-bb73-b9e66a429e9a.jpg) */}
          {passoAtivo === 3 && (
            <div className="flex flex-col items-center">
              <HeaderCadastro />
              
              <div className="w-full max-w-md space-y-4 mt-6">
                <div>
                  <label className={labelStyle}>Email*</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className={`${inputStyle} text-slate-400 bg-slate-50 cursor-not-allowed`} disabled />
                </div>

                <div>
                  <label className={labelStyle}>Senha*</label>
                  <input type="password" name="senha" placeholder="........." value={formData.senha} onChange={handleChange} className={inputStyle} />
                </div>

                <div className="pt-2 space-y-2 flex flex-col items-center text-center">
                  <div className="flex items-center">
                    <input type="checkbox" id="termoAceite" name="termoAceite" checked={formData.termoAceite} onChange={handleChange} className="h-4 w-4 text-[#2fb21e] border-lime-400 rounded" />
                    <label htmlFor="termoAceite" className="ml-2 text-xs text-slate-600">Li e concordo com o <span className="font-bold underline cursor-pointer text-[#19b623]">termo de aceite?*</span></label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="politicaPrivacidade" name="politicaPrivacidade" checked={formData.politicaPrivacidade} onChange={handleChange} className="h-4 w-4 text-[#2fb21e] border-lime-400 rounded" />
                    <label htmlFor="politicaPrivacidade" className="ml-2 text-xs text-slate-600">Li e concordo com a <span className="font-bold underline cursor-pointer text-[#19b623]">Política de Privacidade</span></label>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
                <button onClick={() => setPassoAtivo(2)} className="w-full max-w-xs h-12 rounded-full border border-slate-400 text-slate-600 font-semibold text-sm hover:bg-slate-100 transition tracking-wide">
                  ANTERIOR
                </button>
                <Link to="/home" className="w-full max-w-xs h-12 flex items-center justify-center rounded-full bg-[#2fb21e] text-white font-semibold text-sm hover:bg-[#1e8716] transition tracking-wide">
                  CADASTRAR
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* RODAPÉ DO SEU SITE INTEGRADO COM TEXTO REAL */}
        <footer className="w-full text-center mt-8 pt-4 border-t border-slate-200 text-[10px] text-slate-400 space-y-1">
          <p>Janete Produtos Naturais E-mail: comercial@janeteprodutosnaturais.com.br | Whatsapp Araras: (19) 98860-5981 | Leme: (19) 99916-4520</p>
          <div className="flex justify-center items-center space-x-1 font-bold tracking-wider text-slate-300">
            <span className="text-emerald-600 text-xs font-black">SeuByte &reg;</span> 
          </div>
        </footer>

      </div>
    </div>
  );
}