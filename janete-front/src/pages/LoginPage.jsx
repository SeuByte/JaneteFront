import { Link } from 'react-router-dom'
import bgImage from '../assets/BackGJanete.png'

function Login() {
  return (
    <div className="min-h-screen grid place-items-center bg-no-repeat bg-center bg-cover px-4" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="w-[50vh] h-[80vh] max-w-[28rem] rounded-[4rem] bg-white/95 p-12 shadow-[0_0.5rem_1.5rem_#ffaa0b] flex flex-col items-center justify-start">
        <img
          src="/JaneteIcon.png"
          alt="Janete Icon"
          className="mb-10 h-[18vh] w-[18vh] rounded-full border border-[#309A20] bg-white object-cover"
        />

        <div className="w-full flex flex-col gap-6 text-center">
          <div>
            <h3 className="text-2xl font-semibold text-[#41ab43] mb-2">Usuário</h3>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full rounded-full border border-lime-400 bg-white px-6 py-3 text-center text-base text-slate-800 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
            />
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-[#41ab43] mb-2">Senha</h3>
            <input
              type="password"
              placeholder="*****"
              className="w-full rounded-full border border-lime-400 bg-white px-6 py-3 text-center text-base text-slate-800 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
            />
          </div>

          <div className="flex justify-end text-sm text-blue-500">
            <a href="#" className="hover:text-blue-600 transition">
              Esqueci a senha
            </a>
          </div>

          {/* Corrigido aqui: Removido o 'to' duplicado */}
          <Link
            to="/AreaCliente"
            className="mx-auto mt-2 inline-flex h-12 w-full max-w-xs items-center justify-center rounded-full bg-[#2fb21e] px-6 text-lg font-semibold text-white transition hover:bg-[#1e8716]"
          >
            Entrar
          </Link>

          <p className="mt-8 text-base text-slate-500">Entrar com:</p>

          <div className="mt-3 flex items-center justify-center gap-4">
            <img src="/googleIcon.png" className="h-10 w-10 rounded-full border border-slate-400 bg-white p-2 transition hover:scale-110" alt="Google" />
            <img src="/facebookIcon.png" className="h-10 w-10 rounded-full border border-slate-400 bg-white p-2 transition hover:scale-110" alt="Facebook" />
            <img src="/githubIcon.png" className="h-10 w-10 rounded-full border border-slate-400 bg-white p-2 transition hover:scale-110" alt="GitHub" />
          </div>
        </div>

        <p className="mt-8 text-sm text-slate-600">
          Não tem uma conta?{' '}
          <Link to="/cadastro" className="text-blue-500 hover:text-blue-600">
            Cadastre aqui
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login;