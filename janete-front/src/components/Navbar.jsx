import { useState } from 'react'
import { Link } from 'react-router-dom'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'


import '../navBar.css'



function NavBar() {


  return (

    <>



      <div className="bg-white shadow-md">

      {/* Topo */}
      <div className="bg-[#147C06] text-white px-4 py-2 flex flex-col md:flex-row justify-between items-center gap-2">

        <div className="flex gap-3">
          <img src="./Instaicon.png" alt="Instagram" className="w-6 h-6 cursor-pointer" />
          <img src="./WhatsIcon.png" alt="WhatsApp" className="w-6 h-6 cursor-pointer" />
          <img src="./faceIcon.png" alt="Facebook" className="w-6 h-6 cursor-pointer" />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3">
          <span>(19) 98362-5160</span>

          <Link
            to="/login"
            className="bg-white text-[#147C06] px-4 py-1 rounded-md"
          >
            Login
          </Link>

          <Link
            to="/cadastro"
            className="bg-yellow-400 text-black px-4 py-1 rounded-md"
          >
            Cadastrar
          </Link>
        </div>

      </div>

      {/* Menu */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col lg:flex-row items-center justify-between gap-5">

        <img
          src="/JaneteIcon.png"
          alt="Janete Naturais"
          className="w-28 md:w-36"
        />

        <nav className="flex flex-wrap justify-center gap-6 text-[#147C06] font-semibold">
          <Link to="/produtos">Produtos</Link>
          <Link to="/ofertas">Ofertas</Link>
          <Link to="/dicas">Dicas</Link>
          <Link to="/sobre">Sobre Nós</Link>
        </nav>

        <Link
          to="/carrinho"
          className="flex items-center gap-2 bg-[#147C06] text-white px-4 py-2 rounded-lg"
        >
          Meu Carrinho
          <img
            src="/carIcon.png"
            alt="Carrinho"
            className="w-5 h-5"
          />
        </Link>

      </div>

      </div>

    </> // Fecha fragment




  )
}

export default NavBar;