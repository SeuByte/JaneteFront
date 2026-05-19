import { useState } from 'react'
import { Link } from 'react-router-dom'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import '../login.css'

function Login() {
  const [count, setCount] = useState(0)

  return (
    <div className='fundo'>
      <div className='cardzao'>
        <div className='Janete'>
          <img src="/JaneteIcon.png" alt="" className='JaneteIcon' />

     
        <div className='card'>
          <h3>Usuário</h3>
          <input type="email" placeholder='example@gmail.com' />
          <h3>Senha</h3>
          <input type="password" placeholder='*****'/>
           
          <a href="" className='esqueci'>Esqueci a senha</a>
          

          <Link to="" className='Cadastrar'>Entrar</Link>
          
          <div className='login-icons'>

            <img src="/googleIcon.png" className='icon' alt="" />

            <img src="/facebookIcon.png" className='icon' alt="" />

            <img src="/githubIcon.png" className='icon' alt="" />
            

            
          
            {/* Use o Link para navegar para a rota que você criou no App.jsx */}
            
            
            </div>
            </div>
            <p >Não tem uma conta? <Link to="/CadastroPage"></Link>Cadastre aqui</p>
        </div>
      </div>
    </div>
  )
}

export default Login;
