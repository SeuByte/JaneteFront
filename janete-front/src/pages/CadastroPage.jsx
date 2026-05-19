import { useState } from 'react'
import { Link } from 'react-router-dom'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import '../cadastro.css'
 
 
 
 
 
 function Cadastro() {
  return (

 <div className='fundo'>
      <div className='cardzao'>
        <div className='Janete'>
          <img src="/JaneteIcon.png" alt="" className='JaneteIcon' />
</div>
     
        <div className='card'>
          <h3>Usuário</h3>
          <input type="email" placeholder='example@gmail.com' />
          <h3>Senha</h3>
          <input type="password" placeholder='*****'/>
           
          <a href="" className='esqueci'>Esqueci a senha</a>
          

          <Link to="/cadastro" className='Cadastrar'>Entrar</Link>
          
          <div className='login-icons'>

            <img src="/googleIcon.png" className='icon' alt="" />

            <img src="/facebookIcon.png" className='icon' alt="" />

            <img src="/githubIcon.png" className='icon' alt="" />
            

            
          
            {/* Use o Link para navegar para a rota que você criou no App.jsx */}
            
            
            </div>
            <p >Não tem uma conta? <a href="" className='CadastrEAqui' >Cadastre aqui</a>
            </p>
        </div>
      </div>
    </div>
  )
}

export default Cadastro;