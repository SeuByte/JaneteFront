import { useState } from 'react'
import { Link } from 'react-router-dom'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'


import '../navBar.css'

function NavBar() {
  return (
    <>
      {/* DIV PRINCIPAL QUE ESTAVA SEM FECHAMENTO */}
      <div className="w-full shadow-md">

        {/* Barra Superior */}
        <div className="bg-[#147C06] text-white">
          <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row justify-between items-center gap-2">
            
            <div className="flex gap-4">
              <img src="./Instaicon.png" alt="" className="w-7 h-7 hover:scale-110 transition" />
              <img src="./WhatsIcon.png" alt="" className="w-7 h-7 hover:scale-110 transition" />
              <img src="./faceIcon.png" alt="" className="w-7 h-7 hover:scale-110 transition" />
            </div>

            <div className="flex flex-wrap justify-center items-center gap-3 text-sm md:text-base">
              <span>(19) 98362-5160</span>

              <Link
                to="/login"
                className="bg-white text-[#147C06] px-4 py-2 rounded-lg font-semibold hover:shadow-lg"
              >
                Entrar
              </Link>

              <Link
                to="/cadastro"
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:shadow-lg"
              >
                Cadastrar
              </Link>
            </div>

          </div>
        </div>

        {/* Principal */}
        <div className="max-w-7xl mx-auto px-1 py-1 flex flex-col lg:flex-row items-center justify-between gap-6">

          <img
            src="/JaneteIcon.png"
            alt="Janete Naturais"
            className="w-24 sm:w-32 md:w-40"
          />

          <nav className="flex flex-wrap justify-center gap-4 md:gap-8 text-lg font-semibold text-[#147C06]">
            {/* Adicionado o atributo 'to' para evitar erros */}
            <Link to="/produtos" className="hover:text-yellow-500 transition">
              Produtos
            </Link>

            <Link to="/ofertas" className="hover:text-yellow-500 transition">
              Ofertas
            </Link>

            <Link to="/dicas" className="hover:text-yellow-500 transition">
              Dicas
            </Link>

            <Link to="/sobre" className="hover:text-yellow-500 transition">
              Sobre Nós
            </Link>
          </nav>

          <button className="flex items-center gap-2 bg-[#147C06] text-white px-5 py-3 rounded-xl hover:scale-105 transition">
            Meu Carrinho
            <img src="/carIcon.png" className="w-5 h-5" alt="Carrinho" />
          </button>

        </div>

        
        <div className='bg-[#147C06] mt-2 h-6 w-full'></div>

      </div> {/* <--- ESSA FOI A DIV QUE FECHEI AQUI */}
    </>
  )
}

export default NavBar