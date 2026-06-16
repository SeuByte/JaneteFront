import { useState } from 'react'
import { Link } from 'react-router-dom'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'


import '../navBar.css'



function NavBar() {


  return (

    <>



      <div className='navebar'>
        <div className='divicons'>
          <img src="./Instaicon.png" alt="" className='icns-insta' />
          <img src="./WhatsIcon.png" alt="" className='icns-whats' />
          <img src="./faceIcon.png" alt="" className='icns-face' />
        </div>
        <div className='navgate'>
          <img src="./telIcon.png" alt="" className='w-5 h-5 mr-1 mt-1' />
          <h4 className='aga4'>(19)98362-5160</h4>
          <h4 className='aga4'>| </h4>
          <button className='btnave'>Login</button>
          <button className='btnave'>Cadastrar</button>
        </div>
      </div>

      <div className='ctnpae'>
        <img src="/JaneteIcon.png" alt="" className='fotoJana' />


        <div className='chubagui flex-1 text-center text-[#147C06] font-medium flex justify-center items-center gap-8'>
            <h3 className='aga3nav'>Produtos</h3>
            <h3 className='aga3nav'>Ofertas</h3>
            <h3 className='aga3nav'>Dicas</h3>
            <h3 className='aga3nav'>Sobre Nós</h3>
            </div>


          <div className='dentroCarrinho text-center text-[#147C06] font-medium'>
            <button className='carrInho'>Meu Carrinho
              <img src="/carIcon.png" alt="" className='fotoCar' />
            </button>
          </div>
      </div>

      <div className='bg-[#147C06] mt-2 h-6 w-full'>
      </div>

<<<<<<< Updated upstream
=======
        <Link to="/" className="hover:opacity-90 transition">
            <img
              src="/JaneteIcon.png"
              alt="Janete Naturais"
              className="w-24 sm:w-32 md:w-40 cursor-pointer"
            />
          </Link>
>>>>>>> Stashed changes




<<<<<<< Updated upstream
=======
            <Link to="/QuemSomos" className="hover:text-yellow-500 transition">
              Quem Somos
            </Link>
          </nav>
>>>>>>> Stashed changes













    </> // Fecha fragment




  )
}

export default NavBar;