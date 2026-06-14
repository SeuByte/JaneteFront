import { useState } from 'react'
import { Link } from 'react-router-dom'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'


import '../footer.css'



function footer() {


    return (

        <>



            <footer className="bg-[#147C06] text-white">

            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

            {/* Ajuda */}
            <div>
                <h2 className="font-bold text-xl mb-4">
                AJUDA E SUPORTE
                </h2>

                <ul className="space-y-2">
                <li>Produtos e Ofertas</li>
                <li>Dicas e Receitas</li>
                <li>Sobre Nós</li>
                </ul>
            </div>

            {/* Localização */}
            <div className="text-center">

                <a href="https://maps.app.goo.gl/qjCHX4U7MYBDjTjH9">

                <img
                    src="./MapaJanete.png"
                    alt="Mapa"
                    className="mx-auto rounded-lg w-full max-w-[280px]"
                />

                </a>

                <p>Janete Produtos Naturais E-mail: comercial@janeteprodutosnaturais.com.br | Whatsapp Araras: (19) 98860-5981 | Leme: (19) 99916-4520</p>
                <div className="flex justify-center items-center space-x-1 font-bold tracking-wider text-slate-300">
                <span className="text-emerald-600 text-xs font-black">SeuByte &reg;</span> 
                </div>

            </div>

            {/* Coluna 3: Contato e Redes Sociais (Direita) */}
                <div className='flex flex-col items-center md:items-end text-center md:text-right space-y-6 w-full'>
                
                {/* Bloco de Contato alinhado à direita */}
                <div className='space-y-3 w-full flex flex-col items-center md:items-end'>
                    <h2 className='text-white font-bold text-lg tracking-wide border-b-2 border-[#147C06] pb-1 w-fit'>
                    CONTATO
                    </h2>
                    
                    <div className='flex items-center md:flex-row-reverse gap-2 text-sm'>
                    <img src="./emailIcon.png" alt="Email" className='w-4 h-4 md:ml-2' />
                    <span>janete.naturais@gmail.com</span>
                    </div>

                    <div className='flex items-center md:flex-row-reverse gap-2 text-sm'>
                    <img src="./telIcon.png" alt="Telefone" className='w-4 h-4 md:ml-2' />
                    <span>(19) 98328-4729</span>
                    </div>
                </div>

                {/* Redes Sociais alinhadas à direita */}
                <div className='pt-4 w-full flex flex-col items-center md:items-end border-t border-gray-800 md:border-t-0'>
                    <h4 className='text-white font-semibold text-md mb-2'>Nos Siga</h4>
                    <div className='flex items-center gap-4 bg-gray-900/50 p-2 rounded-lg px-4'>
                    <img src="./Instaicon.png" alt="Instagram" className='w-6 h-6 hover:scale-110 transition-transform cursor-pointer' />
                    <img src="./WhatsIcon.png" alt="WhatsApp" className='w-6 h-6 hover:scale-110 transition-transform cursor-pointer' />
                    <img src="./faceIcon.png" alt="Facebook" className='w-6 h-6 hover:scale-110 transition-transform cursor-pointer' />
                    </div>
                </div>

            </div>

            </footer>

        </> // Fecha fragment




    )
}

export default footer;