import { Link } from 'react-router-dom'
import bgImage from '../assets/BackGJanete.png'

function Cadastro() {
  return (
    <div className="min-h-screen grid place-items-center bg-no-repeat bg-center bg-cover px-4" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="w-[50vh] h-[80vh] max-w-[32rem] rounded-[4rem] bg-white/95 p-12 shadow-[0_0.5rem_1.5rem_#ffaa0b] flex flex-col items-center justify-start">
        <img
          src="/JaneteIcon.png"
          alt="Janete Icon"
          className="mb-10 h-[18vh] w-[18vh] rounded-full border border-[#309A20] bg-white object-cover"
        />

        <div className="w-full space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-center text-xl font-semibold text-[#19b623]">Nome</label>
              <input
                type="text"
                className="rounded-full border border-lime-400 bg-white px-6 py-3 text-center text-base text-slate-800 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-center text-xl font-semibold text-[#19b623]">Sobrenome</label>
              <input
                type="text"
                className="rounded-full border border-lime-400 bg-white px-6 py-3 text-center text-base text-slate-800 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-center text-xl font-semibold text-[#19b623]">Email</label>
              <input
                type="email"
                className="rounded-full border border-lime-400 bg-white px-6 py-3 text-center text-base text-slate-800 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-center text-xl font-semibold text-[#19b623]">Telefone</label>
              <input
                type="text"
                className="rounded-full border border-lime-400 bg-white px-6 py-3 text-center text-base text-slate-800 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-center text-xl font-semibold text-[#19b623]">Senha</label>
              <input
                type="password"
                className="rounded-full border border-lime-400 bg-white px-6 py-3 text-center text-base text-slate-800 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-center text-xl font-semibold text-[#19b623]">Confirmar Senha</label>
              <input
                type="password"
                className="rounded-full border border-lime-400 bg-white px-6 py-3 text-center text-base text-slate-800 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Link
              to="/"
              className="inline-flex h-14 w-full max-w-xs items-center justify-center rounded-full bg-[#2fb21e] px-6 text-lg font-semibold text-white transition hover:bg-[#1e8716]"
            >
              Cadastrar
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cadastro;
