import { useState } from 'react'
import { Link } from 'react-router-dom'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'


import '../footer.css'



function footer() {


    return (

        <>



            <div className='backG'>


                <div className='footer-left'>

                    <h2 className='text-amber-50 font-bold'>AJUDA E SUPORTE</h2>
                    <ul className="flex flex-col gap-3 text-lg font-semibold text-[#147C06]">
                        <li>
                            <Link to="/produtos" className="text-white hover:text-yellow-400 font-bold transition-colors block">
                                Produtos
                            </Link>
                        </li>
                        <li>
                            <Link to="/ofertas" className="text-white hover:text-yellow-400 font-bold transition-colors block">
                                Ofertas
                            </Link>
                        </li>
                        <li>
                            <Link to="/dicas" className="text-white hover:text-yellow-400 font-bold transition-colors block">
                                Dicas
                            </Link>
                        </li>
                        <li>
                            <Link to="/QuemSomos" className="text-white hover:text-yellow-400 font-bold transition-colors block">
                                Quem Somos
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className='footer-center'>

                    <a href="https://maps.app.goo.gl/qjCHX4U7MYBDjTjH9">
                        <img src="./MapaJanete.png" alt="" className='maps' />
                    </a>

                    <p className='mt-5 text-1xl'>© 2026 Janete Produtos Naturais. Todos os direitos reservados.</p>

                    <p className='mt-3'>CNPJ: 00.000.000/0001-00 | Rua Joaquim Pesito, 123 - Araras, SP.</p>

                </div>


                <div className='footer-left'>

                    <h2 className='text-amber-50 font-bold'>CONTATO</h2>

                    <div className='flex justify-center items-center mt-3'>

                        <img src="./emailIcon.png" alt="" className='w-5 h-5 mr-2' />

                        <p className='text-amber-50'>janete.naturais@gmail.com</p>

                    </div>


                    <div className='flex justify-center items-center mt-2'>

                        <img src="./telIcon.png" alt="" className='w-5 h-5 mr-2' />

                        <p className='text-amber-50'>(19)98328-4729</p>

                    </div>





                    {/* O bloco da direita vira um flexbox vertical */}
                    <div className='footer-right flex flex-col justify-between h-full min-h-[12rem]'>



                        {/* O mt-auto cria um "pistão" dinâmico que empurra o bloco para o chão do footer, não importa o tamanho da tela */}
                        <div className='divicons flex flex-col items-center mt-auto gap-2'>

                            <h4 className='text-amber-50 font-medium text-2xl'>Nos Siga</h4>
                            
                            <div className='flex items-center gap-4'>
                                <img src="./Instaicon.png" alt="Instagram" className='icns-insta' />
                                <img src="./WhatsIcon.png" alt="WhatsApp" className='icns-whats' />
                                <img src="./faceIcon.png" alt="Facebook" className='icns-face' />
                            </div>
                        </div>

                    </div>


                </div>
            </div>


















        </> // Fecha fragment




    )
}

export default footer;