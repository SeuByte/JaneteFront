import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// =========================================================================
// COMPONENTE 1: BANNER DE COOKIES (Mantido unificado para uso externo)
// =========================================================================
export function CookieBanner() {
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    const aceitou = localStorage.getItem('cookiesAceitos');
    if (!aceitou) {
      setMostrar(true);
    }
  }, []);

  const aceitarCookies = () => {
    localStorage.setItem('cookiesAceitos', 'true');
    setMostrar(false);
  };

  if (!mostrar) return null;

  return (
    <div className="bg-slate-50 border border-slate-300 p-6 mb-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm animate-fade-in">
      <div className="text-sm text-slate-700 space-y-1">
        <p className="font-bold text-slate-900 text-xs tracking-wider uppercase flex items-center gap-1.5">
          <span>🛡️</span> Compromisso com a Privacidade e Qualidade
        </p>
        <p>
          Em conformidade com as nossas diretrizes de segurança, registramos dados da sua visita por meio de 
          cookies essenciais para garantir uma navegação confiável, segura e de alta qualidade. Ao clicar em 
          "ENTENDI", você declara o seu expresso consentimento com a nossa coleta e armazenamento seguro de dados.
        </p>
        <div className="text-xs text-slate-500">
          Para mais esclarecimentos sobre segurança, gerenciamento de perfil ou exclusão de dados, consulte a nossa{' '}
          <p className="text-sm text-gray-700">
            Nossa loja utiliza cookies para facilitar o uso do site e melhorar o seu
            desempenho e segurança. Para saber mais consulte nossa{' '}
            <Link
              to="/politica-privacidade"
              onClick={() => {
                console.log('Abrindo Política de Privacidade');
                alert('Abrindo Política de Privacidade e Qualidade');
              }}
              className="font-bold underline text-green-700 hover:text-green-800 transition-colors"
            >
              Política de Privacidade e Qualidade
            </Link>
          </p>
          .
        </div>
      </div>

      <button
        onClick={aceitarCookies}
        className="w-full md:w-auto whitespace-nowrap px-8 py-3 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition font-bold text-xs tracking-wider uppercase shadow-sm"
      >
        ENTENDI
      </button>
    </div>
  );
}

// =========================================================================
// COMPONENTE 2: PÁGINA COMPLETA DA POLÍTICA DE PRIVACIDADE E QUALIDADE
// =========================================================================
export default function PoliticaPrivacidade() {
  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen font-['Inter',_sans-serif]">
      
      {/* Container Principal */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* CORPO DO TEXTO JURÍDICO */}
        <main className="bg-white p-8 md:p-12 rounded-xl border border-slate-200 shadow-sm">
          
          <div className="border-b border-slate-200 pb-6 mb-10">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Política de Privacidade e Qualidade
            </h1>
          </div>

          {/* SEÇÃO 1 */}
          <section id="introducao" className="mb-12 scroll-mt-24">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2 mb-4 border-b pb-2 border-slate-100">
              <span className="text-base">1.</span> Política de Privacidade
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-[15px]">
              <p>
                Nós sabemos que você se preocupa com a forma com que suas informações
                são utilizadas e compartilhadas, e agradecemos a sua confiança de que
                cuidaremos delas de forma sensata.
              </p>
              <p>
                Estamos empenhados em salvaguardar a sua privacidade ao utilizar nossos
                serviços digitais.
              </p>
              <p>
                Apresentamos nossa Política de Privacidade e Qualidade, que tem a finalidade de
                deixar o mais claro possível a nossa política de coleta e
                compartilhamento de dados, informando sobre os dados coletados e como
                os utilizamos na nossa plataforma.
              </p>
            </div>
          </section>

          {/* SEÇÃO 2 */}
          <section id="consentimento" className="mb-12 scroll-mt-24">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2 mb-4 border-b pb-2 border-slate-100">
              <span className="text-base">2.</span> Consentimento
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-[15px]">
              <p>
                Ao acessar e interagir com nossa loja, efetuando o seu cadastro ou realizando o 
                checkout de pagamento, você declara o seu <strong className="text-slate-900 font-semibold">EXPRESSO CONSENTIMENTO</strong>
                para procedermos com o tratamento de dados pessoais quando julgarmos
                adequado à estrita prestação de nossos serviços.
              </p>
              <p>
                Se pedirmos suas informações pessoais por uma razão secundária (como ações de marketing ou informativos),
                nos comprometemos formalmente a solicitar o seu consentimento prévio ou fornecer-lhe a oportunidade de dizer não.
              </p>
            </div>
          </section>

          {/* SEÇÃO 3 */}
          <section id="coleta" className="mb-12 scroll-mt-24">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2 mb-4 border-b pb-2 border-slate-100">
              <span className="text-base">3.</span> Coleta de Dados
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-[15px]">
              <p>
                Ao navegar em nossa loja, efetuar o cadastro ou concluir uma compra,
                coletamos as informações pessoais essenciais que você nos fornece como parte do
                processo, tais como seu nome completo, endereço de entrega e e-mail.
              </p>
              <p>
                Quando você navega pela nossa loja, recebemos automaticamente o protocolo de
                internet do seu computador (endereço IP) a fim de obter informações técnicas básicas sobre o seu navegador e sistema operacional.
              </p>
              <p>
                Podemos registrar e armazenar temporariamente comunicações diretas realizadas com nossa equipe de suporte por
                e-mail, mensagens de texto, telefone ou qualquer outro meio com fins exclusivos de auditoria de qualidade.
              </p>
              <p>
                Ao submeter seus dados para pagamento, as informações são processadas por intermediadores transparentes e homologados. 
                <span className="font-medium text-slate-900"> Nós nunca armazenamos dados completos de cartões de crédito ou débito</span> em nosso banco de dados local.
              </p>
            </div>
          </section>

          {/* SEÇÃO 4 */}
          <section id="armazenamento" className="mb-12 scroll-mt-24">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2 mb-4 border-b pb-2 border-slate-100">
              <span className="text-base">4.</span> Armazenamento de Dados
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-[15px]">
              <p>
                Os dados coletados podem ser armazenados e processados em território nacional ou em
                infraestruturas de nuvem internacionais utilizadas estritamente para garantir a resiliência e alta disponibilidade operacional dos serviços.
              </p>
              <p>
                Seus dados são criptografados e hospedados em servidores robustos, protegidos por firewalls modernos, permanecendo guardados apenas pelo
                prazo mínimo exigido pelas legislações fiscal e civil aplicáveis.
              </p>
            </div>
          </section>

          {/* SEÇÃO 5 */}
          <section id="divulgacao" className="mb-12 scroll-mt-24">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2 mb-4 border-b pb-2 border-slate-100">
              <span className="text-base">5.</span> Divulgação e Compartilhamento
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-[15px]">
              <p>
                Seus dados pessoais só serão compartilhados com terceiros quando houver exigência legal, determinação de 
                autoridades judiciais competentes ou para viabilizar o cumprimento de rotinas operacionais cruciais envolvidas diretamente na prestação dos serviços (como operadoras de logística de entrega).
              </p>
              <p>
                Nossos parceiros e prestadores de serviços terceirizados operam sob contratos de confidencialidade rígidos e irão coletar ou utilizar suas informações unicamente para realizar as tarefas delegadas.
              </p>
            </div>
          </section>

          {/* SEÇÃO 6 */}
          <section id="cookies" className="mb-12 scroll-mt-24">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2 mb-4 border-b pb-2 border-slate-100">
              <span className="text-base">6.</span> Cookies
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-[15px]">
              <p>
                Registramos dados de sua visita por meio de cookies e tecnologias
                semelhantes para otimizar a usabilidade, reforçar a segurança das sessões e avaliar o desempenho técnico do nosso ecossistema.
              </p>
              <p>
                Os cookies são pequenos fragmentos de texto enviados ao seu dispositivo que ajudam a reconhecer seu navegador, 
                personalizar suas preferências de exibição e viabilizar funcionalidades essenciais de login.
              </p>
              <p>
                Lembramos que em nenhuma circunstância os nossos cookies causam qualquer tipo de dano físico ou lógico ao seu aparelho. 
                Você possui total liberdade para remover ou bloquear cookies diretamente nas configurações de privacidade do seu navegador.
              </p>
            </div>
          </section>

          {/* SEÇÃO 7 */}
          <section id="seguranca" className="mb-12 scroll-mt-24">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2 mb-4 border-b pb-2 border-slate-100">
              <span className="text-base">7.</span> Segurança
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-[15px]">
              <p>
                Adotamos medidas técnicas avançadas e rigorosos padrões administrativos para blindar e salvaguardar seus 
                dados pessoais contra perdas, extravios, roubos ou acessos não autorizados de qualquer natureza.
              </p>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 my-4 text-amber-900 text-sm flex items-start space-x-3">
                <span className="text-base mt-0.5">⚠️</span>
                <div>
                  <p className="font-bold mb-0.5">Aviso Importante de Responsabilidade</p>
                  <p className="text-amber-800">
                    O sigilo de acesso ao seu perfil pessoal é de sua inteira responsabilidade por meio da sua senha cadastrada. 
                    A nossa equipe jamais solicitará a sua senha secreta por e-mail, telefone ou WhatsApp. Nunca compartilhe a sua credencial.
                  </p>
                </div>
              </div>

              <p>
                A segurança e a proteção dos dispositivos físicos utilizados para navegar na nossa plataforma (como a presença de antivírus ativos no seu computador ou telemóvel) também correm por conta exclusiva do usuário.
              </p>
            </div>
          </section>

          {/* SEÇÃO 8 */}
          <section id="controle" className="mb-12 scroll-mt-24">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2 mb-4 border-b pb-2 border-slate-100">
              <span className="text-base">8.</span> Como Acessar e Controlar suas Informações
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-[15px]">
              <p>
                O usuário possui pleno direito de gerenciar seus dados. Você poderá realizar a retificação ou atualização imediata de quase todas as suas informações diretamente no menu <span className="font-medium text-slate-900">"Alterar Dados Cadastrais"</span> dentro da sua Área do Cliente.
              </p>
              <p>
                Para solicitações adicionais complexas, relatórios de transparência ou requisições de exclusão total e definitiva de dados com base na LGPD, você poderá entrar em contato direto conosco através do canal FALE CONOSCO.
              </p>
            </div>
          </section>

          {/* SEÇÃO 9 */}
          <section id="alteracoes" className="mb-6 scroll-mt-24">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2 mb-4 border-b pb-2 border-slate-100">
              <span className="text-base">9.</span> Alterações na Política
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-[15px]">
              <p>
                Esta política de privacidade e qualidade poderá passar por revisões ou modificações estruturais a qualquer momento para se adequar a novas tecnologias ou legislações. 
              </p>
              <p>
                As atualizações surtem pleno efeito imediatamente a partir do momento da sua publicação oficial nesta mesma página. Recomendamos fortemente a leitura periódica deste documento.
              </p>
            </div>
          </section>

        </main>
      </div>

    </div>
  );
}