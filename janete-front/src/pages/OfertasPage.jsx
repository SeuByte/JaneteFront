import '../ofertas.css';
import bannerOfertas from '../assets/bannerOfertas.png';
import melSilvestre from '../assets/melSilvestre.png';
import cocodelicia from "../assets/cocodelicia.png";
import abelhalavanda from "../assets/abelhalavanda.png";
import cha from '../assets/cha.png';
import propolis from '../assets/propolis.png';
import oleoalecrim from '../assets/oleoalecrim.png';

const ofertas = [
  {
    id: '23432301',
    nome: 'Mel de Abelha Silvestre',
    descricao: 'Mel puro, colhido de flores nativas do cerrado',
    precoOriginal: 'R$45,90',
    precoOferta: 'R$36,72',
    img: melSilvestre,
  },
  {
    id: '23432302',
    nome: 'Óleo de Coco Extra Virgem',
    descricao: 'Prensado a frio, ideal para pele, cabelo e culinária',
    precoOriginal: 'R$32,90',
    precoOferta: 'R$26,32',
    img: cocodelicia,
  },
  {
    id: '23432303',
    nome: 'Sabonete Artesanal de Lavanda',
    descricao: 'Vegano, com óleo essencial de lavanda, hidrata e relaxa',
    precoOriginal: 'R$24,90',
    precoOferta: 'R$19,92',
    img: abelhalavanda,
  },
  {
    id: '23432304',
    nome: 'Chá de Camomila Orgânico',
    descricao: 'Flores 100% orgânicas, auxilia o sono e alivia o estresse',
    precoOriginal: 'R$18,90',
    precoOferta: 'R$15,12',
    img: cha,
  },
  {
    id: '23432305',
    nome: 'Cápsulas de Própolis',
    descricao: 'Própolis verde brasileiro encapsulado, fortalece a imunidade',
    precoOriginal: 'R$59,90',
    precoOferta: 'R$47,92',
    img: propolis,
  },
  {
    id: '23432306',
    nome: 'Óleo Essencial de Alecrim',
    descricao: 'Estimula o couro cabeludo e a memória, 100% puro',
    precoOriginal: 'R$28,90',
    precoOferta: 'R$23,12',
    img: oleoalecrim,
  },
];

export default function Ofertas() {
  return (
    <>
      <section className="ofertasPage">
        <div className="bannerWrapper">
          <img src={bannerOfertas} alt="Banner de Ofertas" className="carroSel" />
        </div>

        <div className="app-content">
          <h1 className="agah1 text-5xl mt-4 font-bold">Ofertas em Destaque</h1>

          <div className="inputBox_container mt-7" />
        </div>

        <div className="cardProdutos mt-12">
          {ofertas.map((produto) => (
            <div
              key={produto.id}
              className="w-60 bg-gray-50 p-3 flex flex-col gap-2 rounded-2xl"
            >
              <div className="relative h-48 w-full overflow-hidden rounded-xl bg-white flex items-center justify-center">
                <span className="InsideCard absolute top-2 left-2 bg-white/90 px-2 py-0.5 rounded-md leading-none z-10">
                  20% OFF
                </span>
                <img
                  src={produto.img}
                  alt={produto.nome}
                  className="w-full h-full object-contain p-3"
                />
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-row justify-between gap-2">
                  <div className="flex flex-col min-w-0">
                    <span className="text-base font-bold leading-tight">{produto.nome}</span>
                    <p className="text-[10px] text-gray-500 leading-tight mt-0.5">{produto.descricao}</p>
                    <p className="text-xs text-gray-400 mt-1">ID: {produto.id}</p>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="font-bold text-green-600">{produto.precoOferta}</span>
                    <span className="font-bold text-xs line-through text-red-800">{produto.precoOriginal}</span>
                  </div>
                </div>
                <button className="hover:bg-green-700 text-gray-50 bg-green-500 py-2 rounded-md cursor-pointer transition-colors">
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="backgroundSection" />
      </section>
    </>
  );
}