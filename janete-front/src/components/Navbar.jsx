import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

import "../navBar.css";

function NavBar() {
  const navigate = useNavigate();

  const logado = localStorage.getItem("token");

  function abrirPerfil() {
    navigate("/usuario");
  }

  return (
    <>
      <div className="navebar">
        <div className="divicons">
          <img src="/Instaicon.png" alt="" className="icns-insta" />

          <img src="/WhatsIcon.png" alt="" className="icns-whats" />

          <img src="/faceIcon.png" alt="" className="icns-face" />
        </div>

        <div className="navgate flex items-center gap-3">
          <img src="/telIcon.png" alt="" className="w-5 h-5  mt-1" />

          <h4 className="aga4">(19)3352-2262</h4>

          <h4 className="aga4">|</h4>

          {!logado ? (
            <>
              <Link to="/login">
                <button className="btnave">Login</button>
              </Link>

              <Link to="/cadastro">
                <button className="btnave">Cadastrar</button>
              </Link>
            </>
          ) : (
            <button
              onClick={abrirPerfil}
              className="
    ml-1
    flex
    items-center
    justify-center
    w-[42px]
    h-[42px]
    rounded-full
    overflow-hidden
    transition
    hover:opacity-80
  "
            >
              <FaUserCircle size={42} color="white" />
            </button>
          )}
        </div>
      </div>

      {/* Alterado para flex, largura total e padding horizontal */}
      <div className="ctnpae flex items-center w-full px-4">
        
        {/* Bloco da Logo alterado */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img src="/JaneteIcon.png" alt="" className="fotoJana" />
          </Link>
        </div>
        
        {/* Bloco do Menu alterado */}
        <div
          className="
            chubagui
            flex-1
            flex
            justify-center
            items-center
            gap-8
            text-[#147C06]
            font-medium
          "
        >
          <Link to="/produtos" className="aga3nav">
            Produtos
          </Link>

          <Link to="/ofertas" className="aga3nav">
            Ofertas
          </Link>

          <Link to="/dicas" className="aga3nav">
            Dicas
          </Link>

          <Link to="/quemSomos" className="aga3nav">
            Quem Somos
          </Link>
        </div>

        {/* Bloco do Carrinho alterado */}
        <div
          className="
            dentroCarrinho
            flex-shrink-0
            flex
            justify-end
            items-center
          "
        >
          <button className="carrInho">
            Meu Carrinho
            <img src="/carIcon.png" alt="" className="fotoCar" />
          </button>
        </div>
      </div>

      <div
        className="
          bg-[#147C06]
       
          h-6
          w-full
        "
      />
    </>
  );
}

export default NavBar;