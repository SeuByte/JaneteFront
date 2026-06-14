import { useState, useEffect, useRef, useCallback } from "react";
import bannerJanete1 from "../assets/imagem1.png";
import bannerJanete2 from "../assets/imagem2.png";
import bannerJaneteMobile1 from "../assets/imagem1-mobile.png";
import bannerJaneteMobile2 from "../assets/imagem2-mobile.png";

const slides = [
  { img: bannerJanete1, imgMobile: bannerJaneteMobile1, titulo: "Natureza em cada produto" },
  { img: bannerJanete2, imgMobile: bannerJaneteMobile2, titulo: "Natureza em cada produto" },
];

const trustBadges = [
  { icon: "🚚", titulo: "Frete Grátis", subtitulo: "Acima de R$ 99,00" },
  { icon: "🛡️", titulo: "Compra Segura", subtitulo: "100% Protegida" },
  { icon: "💰", titulo: "Melhores Preços", subtitulo: "Garantia de preço" },
  { icon: "🏷️", titulo: "Descontos", subtitulo: "Até 30% OFF" },
];

const categorias = [
  { label: "Ervas", icon: "🌿", bg: "from-green-400 to-green-600" },
  { label: "Sementes", icon: "🌱", bg: "from-lime-400 to-lime-600" },
  { label: "Encapsulados", icon: "💊", bg: "from-blue-400 to-blue-600" },
  { label: "Cosméticos", icon: "🧴", bg: "from-pink-400 to-pink-600" },
  { label: "Chás", icon: "🍵", bg: "from-amber-400 to-amber-600" },
  { label: "Óleos", icon: "🫙", bg: "from-yellow-400 to-yellow-600" },
  { label: "Suplementos", icon: "💪", bg: "from-purple-400 to-purple-600" },
  { label: "Temperos", icon: "🧄", bg: "from-orange-400 to-orange-600" },
];

const porqueItems = [
  { icon: "🏅", titulo: "Qualidade Garantida", desc: "Produtos selecionados com os mais altos padrões", cor: "#147C06" },
  { icon: "💰", titulo: "Preços Competitivos", desc: "Melhores preços do mercado com ofertas especiais", cor: "#d97706" },
  { icon: "🚚", titulo: "Entrega Rápida", desc: "Frete grátis acima de R$ 99 para todo o Brasil", cor: "#2563eb" },
  { icon: "💬", titulo: "Suporte Dedicado", desc: "Equipe especializada pronta para te atender", cor: "#7c3aed" },
];

const garantiaItems = [
  { icon: "💳", titulo: "Parcele sem Juros", desc: "Em até 6x no cartão de crédito" },
  { icon: "🍽️", titulo: "Clube de Assinaturas", desc: "Receba seu kit mensal e descontos exclusivos" },
  { icon: "🔒", titulo: "Pagamento Seguro", desc: "Seus dados protegidos" },
  { icon: "🎁", titulo: "Brinde na 1ª Compra", desc: "Ganhe uma amostra de chá no seu 1º pedido acima de R$ 100" },
];

/* ─── Carrossel genérico com dots ─────────────────────────────────────────── */
function CarrosselDots({ items, itensPerPage = 2, renderItem, dotColor = "#147C06" }) {
  const [pagina, setPagina] = useState(0);
  const totalPaginas = Math.ceil(items.length / itensPerPage);
  const visiveis = items.slice(pagina * itensPerPage, pagina * itensPerPage + itensPerPage);

  return (
    <div className="lg:hidden">
      <div
        className="grid gap-3 xs:gap-4"
        style={{ gridTemplateColumns: `repeat(${itensPerPage}, 1fr)` }}
      >
        {visiveis.map((item, i) => renderItem(item, i))}
      </div>

      {totalPaginas > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPaginas }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPagina(i)}
              aria-label={`Página ${i + 1}`}
              style={{
                width: i === pagina ? "20px" : "8px",
                height: "8px",
                borderRadius: "9999px",
                backgroundColor: i === pagina ? dotColor : "#d1d5db",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Hero() {
  const [slide, setSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const slideRef = useRef(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const trocarSlide = useCallback((novoIdx) => {
    setAnimating(true);
    setTimeout(() => {
      const proximo = typeof novoIdx === "function" ? novoIdx(slideRef.current) : novoIdx;
      slideRef.current = proximo;
      setSlide(proximo);
      setAnimating(false);
    }, 350);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      trocarSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [trocarSlide]);

  const atual = slides[slide];

  return (
    <section className="w-full">

      {/* ══ HERO CARROSSEL ══ */}
      <div className="relative h-[280px] xs:h-[340px] sm:h-[380px] lg:h-[520px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${isMobile ? (atual.imgMobile || atual.img) : atual.img}')`,
            opacity: animating ? 0 : 1,
            transform: animating ? "scale(1.03)" : "scale(1)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(1, 50, 32, 0.55)" }} />
        <div
          className="relative h-full flex flex-col justify-center px-4 xs:px-6 sm:px-8 lg:px-16 max-w-xs xs:max-w-sm sm:max-w-md lg:max-w-2xl"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(10px)" : "translateY(0)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
        >
          <span className="text-amber-400 text-[9px] xs:text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-1.5 xs:mb-2 sm:mb-3">
            Janete Produtos Naturais
          </span>
          <h1 className="text-white text-xl xs:text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight drop-shadow-lg mb-2 xs:mb-3 sm:mb-4">
            {atual.titulo}
          </h1>
          {atual.subtitulo && (
            <p className="text-white/90 text-xs xs:text-sm lg:text-lg mb-4 xs:mb-5 sm:mb-8 drop-shadow">
              {atual.subtitulo}
            </p>
          )}
          <div className="flex gap-2 flex-wrap">
            <a href="#categorias" className="bg-amber-500 hover:bg-amber-400 text-white font-semibold px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-full transition-colors text-[11px] xs:text-xs sm:text-sm">
              Ver Categorias
            </a>
            <a href="#porque" className="border border-white/50 hover:bg-white/10 text-white font-semibold px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-full transition-colors text-[11px] xs:text-xs sm:text-sm">
              Por que a Janete?
            </a>
          </div>
        </div>
        <div className="absolute bottom-3 xs:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 xs:gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => trocarSlide(i)} aria-label={`Slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${i === slide ? "bg-amber-400 w-5 xs:w-6" : "bg-white/50 w-2 hover:bg-white/80"}`}
            />
          ))}
        </div>
        <button onClick={() => trocarSlide((slideRef.current - 1 + slides.length) % slides.length)} aria-label="Slide anterior"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-7 h-7 xs:w-8 xs:h-8 lg:w-10 lg:h-10 flex items-center justify-center text-sm xs:text-base lg:text-lg transition-colors">‹</button>
        <button onClick={() => trocarSlide((slideRef.current + 1) % slides.length)} aria-label="Próximo slide"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-7 h-7 xs:w-8 xs:h-8 lg:w-10 lg:h-10 flex items-center justify-center text-sm xs:text-base lg:text-lg transition-colors">›</button>
      </div>

      {/* ══ TRUST BADGES ══ */}
      <div className="bg-amber-600 w-full">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4">
          {trustBadges.map((b, i) => (
            <div key={b.titulo}
              className={`flex items-center gap-2 xs:gap-3 px-3 xs:px-4 sm:px-5 py-2.5 xs:py-3 sm:py-4 hover:bg-amber-500/30 transition-colors
                ${i % 2 === 0 ? "border-r border-amber-500" : ""}
                ${i < 2 ? "border-b border-amber-500 lg:border-b-0" : ""}
                lg:border-r lg:last:border-r-0 lg:border-amber-500`}
            >
              <span className="text-lg xs:text-xl sm:text-2xl shrink-0">{b.icon}</span>
              <div className="min-w-0">
                <p className="text-white font-semibold text-[11px] xs:text-xs sm:text-sm leading-tight truncate">{b.titulo}</p>
                <p className="text-white/80 text-[9px] xs:text-[10px] sm:text-xs truncate">{b.subtitulo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ CATEGORIAS ══ */}
      <div id="categorias" className="bg-white py-6 xs:py-8 sm:py-10 lg:py-12 w-full">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-5 xs:mb-6 sm:mb-8">
            <h2 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">Nossas Categorias</h2>
            <p className="text-gray-500 text-[11px] xs:text-xs sm:text-sm mt-1">Explore nossa linha completa de produtos naturais</p>
          </div>

          {/* Mobile: carrossel com dots — 4 ícones por página */}
          <CarrosselDots
            items={categorias}
            itensPerPage={4}
            dotColor="#147C06"
            renderItem={(cat) => (
              <div key={cat.label} className="flex flex-col items-center gap-1.5 cursor-pointer group">
                <div className={`bg-gradient-to-br ${cat.bg} rounded-full w-14 h-14 xs:w-16 xs:h-16 flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                  {cat.icon}
                </div>
                <span className="text-[9px] xs:text-[10px] font-semibold text-gray-700 text-center uppercase tracking-wide leading-tight">
                  {cat.label}
                </span>
              </div>
            )}
          />

          {/* Desktop: grid 8 colunas */}
          <div className="hidden lg:grid grid-cols-8 gap-4">
            {categorias.map((cat) => (
              <div key={cat.label} className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className={`bg-gradient-to-br ${cat.bg} rounded-full w-20 h-20 flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                  {cat.icon}
                </div>
                <span className="text-xs font-semibold text-gray-700 text-center uppercase tracking-wide leading-tight">{cat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ POR QUE ESCOLHER ══ */}
      <div id="porque" className="py-6 xs:py-8 sm:py-10 lg:py-14 w-full" style={{ backgroundColor: "#f0faf0" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-5 xs:mb-6 sm:mb-10">
            <h2 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">Por que escolher a Janete?</h2>
            <p className="text-gray-500 text-[11px] xs:text-xs sm:text-sm mt-1">Qualidade e cuidado em cada produto</p>
          </div>

          {/* Mobile: carrossel com dots — 2 cards por página */}
          <CarrosselDots
            items={porqueItems}
            itensPerPage={2}
            dotColor="#147C06"
            renderItem={(item) => (
              <div key={item.titulo} className="bg-white rounded-2xl p-3 xs:p-4 flex flex-col items-center text-center gap-2 shadow-sm border border-gray-100">
                <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-full flex items-center justify-center text-xl xs:text-2xl" style={{ backgroundColor: item.cor + "18" }}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-800 text-[11px] xs:text-xs leading-tight">{item.titulo}</h3>
                <p className="text-gray-500 text-[9px] xs:text-[10px] leading-relaxed">{item.desc}</p>
              </div>
            )}
          />

          {/* Desktop: grid 4 colunas */}
          <div className="hidden lg:grid grid-cols-4 gap-5">
            {porqueItems.map((item) => (
              <div key={item.titulo} className="bg-white rounded-2xl p-6 flex flex-col items-center text-center gap-3 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl" style={{ backgroundColor: item.cor + "18" }}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-800 text-sm">{item.titulo}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ NOSSA GARANTIA ══ */}
      <div className="py-5 xs:py-6 sm:py-8 w-full" style={{ backgroundColor: "#ff8706" }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-base xs:text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 xs:mb-5 sm:mb-6">
            Nossa Garantia
          </h2>

          {/* Mobile: carrossel com dots — 2 cards por página */}
          <CarrosselDots
            items={garantiaItems}
            itensPerPage={2}
            dotColor="white"
            renderItem={(item) => (
              <div key={item.titulo} className="bg-white rounded-xl p-3 xs:p-4 flex flex-col items-center text-center gap-1.5 shadow-sm">
                <div className="w-9 h-9 xs:w-10 xs:h-10 rounded-full flex items-center justify-center text-lg xs:text-xl" style={{ backgroundColor: "#ff870618" }}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-800 text-[10px] xs:text-[11px] leading-tight">{item.titulo}</h3>
                <p className="text-gray-400 text-[9px] xs:text-[10px] leading-relaxed">{item.desc}</p>
              </div>
            )}
          />

          {/* Desktop: grid 4 colunas */}
          <div className="hidden lg:grid grid-cols-4 gap-4">
            {garantiaItems.map((item) => (
              <div key={item.titulo} className="bg-white rounded-xl p-4 flex flex-col items-center text-center gap-2 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ backgroundColor: "#ff870618" }}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-800 text-xs">{item.titulo}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}