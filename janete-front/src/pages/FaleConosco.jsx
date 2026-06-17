import React, { useState } from 'react';

const estadosBrasil = [
    { uf: 'AC', nome: 'Acre' }, { uf: 'AL', nome: 'Alagoas' }, { uf: 'AP', nome: 'Amapá' },
    { uf: 'AM', nome: 'Amazonas' }, { uf: 'BA', nome: 'Bahia' }, { uf: 'CE', nome: 'Ceará' },
    { uf: 'DF', nome: 'Distrito Federal' }, { uf: 'ES', nome: 'Espírito Santo' }, { uf: 'GO', nome: 'Goiás' },
    { uf: 'MA', nome: 'Maranhão' }, { uf: 'MT', nome: 'Mato Grosso' }, { uf: 'MS', nome: 'Mato Grosso do Sul' },
    { uf: 'MG', nome: 'Minas Gerais' }, { uf: 'PA', nome: 'Pará' }, { uf: 'PB', nome: 'Paraíba' },
    { uf: 'PR', nome: 'Paraná' }, { uf: 'PE', nome: 'Pernambuco' }, { uf: 'PI', nome: 'Piauí' },
    { uf: 'RJ', nome: 'Rio de Janeiro' }, { uf: 'RN', nome: 'Rio Grande do Norte' }, { uf: 'RS', nome: 'Rio Grande do Sul' },
    { uf: 'RO', nome: 'Rondônia' }, { uf: 'RR', nome: 'Roraima' }, { uf: 'SC', nome: 'Santa Catarina' },
    { uf: 'SP', nome: 'São Paulo' }, { uf: 'SE', nome: 'Sergipe' }, { uf: 'TO', nome: 'Tocantins' }
  ];

export default function FaleConosco() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    estado: '',
    cidade: '',
    descricao: '',
    assunto: '',
    mensagem: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados enviados:', formData);
    // Aqui você pode adicionar a lógica de envio para o seu backend ou serviço de e-mail
  };

  return (
    <div className="bg-white min-h-screen font-['Inter',_sans-serif] text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Título Centralizado com Linha Divisória Inferior */}
        <div className="text-center border-b border-gray-200 pb-6 mb-10">
          <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide text-gray-900">
            Fale Conosco
          </h1>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Campo: Nome */}
          <div>
            <label htmlFor="nome" className="block text-sm font-bold text-gray-700 mb-1">
              Nome*
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              required
              placeholder="Seu Nome"
              value={formData.nome}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#147C06] focus:border-[#147C06]"
            />
          </div>

          {/* Campo: E-mail */}
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">
              E-mail*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="example@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#147C06] focus:border-[#147C06]"
            />
          </div>

          {/* Linha Tripla: Telefone, Estado e Cidade */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Telefone */}
            <div>
              <label htmlFor="telefone" className="block text-sm font-bold text-gray-700 mb-1">
                Telefone*
              </label>
              <input
                type="text"
                id="telefone"
                name="telefone"
                required
                placeholder="(00) 00000-0000"
                value={formData.telefone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#147C06] focus:border-[#147C06]"
              />
            </div>

            {/* Estado */}
            <div>
              <label htmlFor="estado" className="block text-sm font-bold text-gray-700 mb-1">
                Estado*
              </label>
              <select
                id="estado"
                name="estado"
                required
                value={formData.estado}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#147C06] focus:border-[#147C06]"
              >
                <option value="">Selecione</option>
                <option value="SP">São Paulo (SP)</option>
                <option value="RJ">Rio de Janeiro (RJ)</option>
                <option value="MG">Minas Gerais (MG)</option>
                {/* Adicione outros estados conforme sua necessidade */}
              </select>
            </div>

            {/* Cidade */}
            <div>
              <label htmlFor="cidade" className="block text-sm font-bold text-gray-700 mb-1">
                Cidade*
              </label>
              <input
                type="text"
                id="cidade"
                name="cidade"
                required
                placeholder="Cidade"
                value={formData.cidade}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#147C06] focus:border-[#147C06]"
              />
            </div>

          </div>

          {/* Linha Dupla: Descrição e Assunto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Descrição (Dropdown) */}
            <div>
              <label htmlFor="descricao" className="block text-sm font-bold text-gray-700 mb-1">
                Descrição*
              </label>
              <select
                id="descricao"
                name="descricao"
                required
                value={formData.descricao}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#147C06] focus:border-[#147C06]"
              >
                <option value="">Selecione</option>
                <option value="reclamacao">Reclamação</option>
                <option value="sugestao">Sugestão</option>
                <option value="duvida">Dúvida</option>
                <option value="elogio">Elogio</option>
              </select>
            </div>

            {/* Assunto */}
            <div>
              <label htmlFor="assunto" className="block text-sm font-bold text-gray-700 mb-1">
                Assunto*
              </label>
              <input
                type="text"
                id="assunto"
                name="assunto"
                required
                placeholder="Assunto"
                value={formData.assunto}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#147C06] focus:border-[#147C06]"
              />
            </div>

          </div>

          {/* Campo: Mensagem */}
          <div>
            <label htmlFor="mensagem" className="block text-sm font-bold text-gray-700 mb-1">
              Mensagem*
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              required
              rows="6"
              value={formData.mensagem}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#147C06] focus:border-[#147C06] resize-y"
            ></textarea>
          </div>

          {/* Botão de Envio Laranja Centralizado */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="w-full sm:w-80 bg-[#F26522] hover:bg-[#e05313] text-white font-bold py-3 px-6 rounded-md shadow-md transition-colors uppercase tracking-wider text-sm"
            >
              Enviar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}