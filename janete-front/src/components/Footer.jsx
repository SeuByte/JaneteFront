import { useState } from 'react'
import { Link } from 'react-router-dom'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'

import '../footer.css'

function Footer() { // Alterado para Maiúsculo (padrão React)
    return (
        <>
            <footer className="w-full">
                <div className="bg-[#147C06] h-5"></div>
                <div className="bg-[#222] text-white">
                    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">

                        {/* Ajuda - Sempre o primeiro (Celular e Desktop) */}
                        <div className="order-1">
                            <h2 className="text-3xl font-bold mb-6">
                                Ajuda e Suporte
                            </h2>
                            <ul className="space-y-4 text-lg">
                                <li className="hover:text-yellow-400 cursor-pointer">
                                    Produtos e Ofertas
                                </li>
                                <li className="hover:text-yellow-400 cursor-pointer">
                                    Dicas e Receitas
                                </li>
                                <li className="hover:text-yellow-400 cursor-pointer">
                                    Sobre Nós
                                </li>
                            </ul>
                        </div>

                        {/* Contato - Segundo no celular, terceiro no Desktop */}
                        <div className="order-2 xl:order-3">
                            <h2 className="text-3xl font-bold mb-6">
                                Contato
                            </h2>
                            <div className="space-y-5 text-lg">
                                <div className="flex items-center gap-3">
                                    <img src="./emailIcon.png" className="w-6 h-6" />
                                    <span>janete.naturais@gmail.com</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <img src="./telIcon.png" className="w-6 h-6" />
                                    <span>(19) 98328-4729</span>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-2xl font-semibold mb-4">
                                    Nos Siga
                                </h3>
                                <div className="flex gap-5">
                                    <img src="./Instaicon.png" className="w-12 h-12 hover:scale-110 transition" />
                                    <img src="./WhatsIcon.png" className="w-12 h-12 hover:scale-110 transition" />
                                    <img src="./faceIcon.png" className="w-12 h-12 hover:scale-110 transition" />
                                </div>
                            </div>
                        </div>

                        {/* Mapa - Terceiro no celular, segundo no Desktop */}
                        <div className="text-center order-3 xl:order-2">
                            <a href="https://maps.app.goo.gl/qjCHX4U7MYBDjTjH9">
                                <img
                                    src="./MapaJanete.png"
                                    alt="Mapa"
                                    className="w-full max-w-[420px] mx-auto rounded-xl shadow-lg hover:scale-105 transition"
                                    />
                            </a>
                            <p className="mt-6 text-lg">
                                © 2026 Janete Produtos Naturais
                            </p>
                            <p className="mt-2 text-base">
                                Rua Joaquim Pesito, 123 - Araras/SP
                            </p>
                            <div className="flex justify-center items-center space-x-1 font-bold tracking-wider text-slate-300 flex flex-col gap-4 mt-4">
                            <span className="text-emerald-600 text-xs font-black">SeuByte &reg;</span> 
                            </div>
                        </div>

                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;