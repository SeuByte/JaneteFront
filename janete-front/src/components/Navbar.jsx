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
          <img src="/telIcon.png" alt="" className="w-5 h-5 mr-1 mt-1" />

          <h4 className="aga4">(19)98362-5160</h4>

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

      <div className="ctnpae">
        <img src="/JaneteIcon.png" alt="" className="fotoJana" />

        <div
          className="
            chubagui
            flex-1
            text-center
            text-[#147C06]
            font-medium
            flex
            justify-center
            items-center
            gap-8
          "
        >
          <h3 className="aga3nav">Produtos</h3>

          <h3 className="aga3nav">Ofertas</h3>

          <h3 className="aga3nav">Dicas</h3>

          <h3 className="aga3nav">Sobre Nós</h3>
        </div>

        <div
          className="
            dentroCarrinho
            text-center
            text-[#147C06]
            font-medium
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
