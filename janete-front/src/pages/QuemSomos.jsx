import React from 'react';

export default function QuemSomos() {
  return (
    // Removido o min-h-screen e flex-col que eram usados para prender o footer,
    // já que o App.jsx ou o layout global se encarregará disso agora.
    <div className="bg-gray-50 text-gray-800 font-['Inter',_sans-serif]">
      
      {/* A NAVBAR FOI REMOVIDA DAQUI 
        Porque ela já está a ser renderizada globalmente pelo App.jsx
      */}

      {/* Conteúdo Principal */}
      <main>
        
        {/* Banner de Introdução */}
        <section className="bg-gradient-to-r from-[#147C06] to-[#1b9e08] text-white py-16 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Nossa História, Sua Saúde
            </h1>
            <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto font-light">
              Conheça a trajetória da Janete Produtos Naturais e nosso compromisso em levar mais bem-estar para a sua mesa.
            </p>
          </div>
        </section>

        {/* Bloco Institucional: Quem Somos e Missão */}
        <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Texto Sobre Nós */}
          <div className="space-y-6">
            <div className="inline-block bg-green-100 text-[#147C06] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Desde 2010 a transformar vidas
            </div>
            <h2 className="text-3xl font-bold text-gray-950">
              O início de um propósito saudável
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              A **Janete Produtos Naturais** nasceu do desejo profundo de reconectar as pessoas com o que a terra produz de melhor. Acreditamos que a alimentação consciente e o uso de elementos naturais são as chaves para uma vida mais equilibrada, longeva e feliz.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Selecionamos a dedo cada produtor, grão, suplemento e produto que entra em nosso catálogo, garantindo procedência, pureza e o máximo de valor nutricional para você e sua família.
            </p>
          </div>

          {/* Imagem Ilustrativa / Card Visual */}
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-[#147C06] rounded-2xl opacity-20 blur-lg"></div>
            <div className="relative bg-white border border-gray-100 p-8 rounded-2xl shadow-xl flex flex-col justify-center items-center text-center space-y-4">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-3xl">
                🍃
              </div>
              <blockquote className="text-xl italic font-medium text-gray-800">
                "Alimentar-se bem é uma forma de respeito pelo próprio corpo."
              </blockquote>
              <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">
                — Janete Produtos Naturais
              </p>
            </div>
          </div>

        </section>

        {/* Pilares: Missão, Visão e Valores */}
        <section className="bg-white border-y border-gray-100 py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Missão */}
              <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 space-y-4 hover:shadow-md transition-shadow">
                <div className="text-2xl">🎯</div>
                <h3 className="text-xl font-bold text-gray-900">Missão</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Disponibilizar alimentos e produtos naturais de altíssima qualidade de forma acessível, promovendo a saúde preventiva e o bem-estar contínuo dos nossos clientes.
                </p>
              </div>

              {/* Visão */}
              <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 space-y-4 hover:shadow-md transition-shadow">
                <div className="text-2xl">👁️</div>
                <h3 className="text-xl font-bold text-gray-900">Visão</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Ser a principal referência em e-commerce de produtos saudáveis na região de Araras/SP e expandir nossa comunidade de apaixonados por vida natural para todo o Brasil.
                </p>
              </div>

              {/* Valores */}
              <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 space-y-4 hover:shadow-md transition-shadow">
                <div className="text-2xl">🤝</div>
                <h3 className="text-xl font-bold text-gray-900">Valores</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Integridade na origem dos produtos, respeito ao meio ambiente, transparência total com o consumidor e paixão diária por promover uma vida mais leve.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Chamada para Ação (CTA) */}
        <section className="max-w-7xl mx-auto px-6 py-16 text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-950">
            Quer começar a mudar seus hábitos hoje?
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Explore nossa curadoria de ofertas e descubra opções incríveis de alimentos a granel, chás e suplementos.
          </p>
          <div>
            <button className="bg-[#147C06] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-[#116605] hover:scale-105 transition-all uppercase tracking-wide text-sm">
              Conhecer Nossos Produtos
            </button>
          </div>
        </section>

      </main>

      {/* O FOOTER FOI REMOVIDO DAQUI 
        Porque ele já está a ser renderizada globalmente pelo App.jsx
      */}

    </div>
  );
}