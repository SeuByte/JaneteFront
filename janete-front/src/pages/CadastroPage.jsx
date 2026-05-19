import { useState } from 'react'
import { Link } from 'react-router-dom'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import '../cadastro.css'

function Cadastro() {
   // function aqui


     // --- ESTADOS PARA O MODAL(PADRÃO PARA MODAL FUNCIONAR)

  // Este é o interruptor de luz da sala do modal.
  // Por padrão é 'false' (luz apagada/modal escondido)
  
  const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className='body'>
            <div className='container'>

                <h2>Cadastro</h2>


                <div className='card'>

                    <div className='arco'>

                        <div className='grupo'>

                            <h3>Nome</h3>
                            <input type="text" placeholder='Gabriel' />
                        </div>


                        <div className='grupo'>
                            <h3>Sobrenome</h3>
                            <input type="text" placeholder='Marques' />
                        </div>
                    </div>

                    <div className='arco'>


                        <div className='grupo'>
                            <h3>EMAIL</h3>
                            <input type="email" placeholder='example@gmail.com' />

                        </div>


                        <div className='grupo'>

                            <h3>Senha</h3>
                            <input type="password" placeholder='*****' />

                        </div>
                    </div>

                    <div className='arco'>

                        <div className='grupo'>
                            <h3>Confirmar Senha</h3>
                            <input type="password" placeholder='*****' />

                        </div>


                        <div className='grupo'>
                            <h3>Data Nascimento</h3>
                            <input type="date" />

                        </div>
                    </div>


                    <div className='login-icons'>

                        <img src="/googleIcon.png" className='icon' alt="" />

                        <img src="/facebookIcon.png" className='icon' alt="" />

                        <img src="/githubIcon.png" className='icon' alt="" />


                    </div>
                    </div>
                        
                        <button onClick={() => setIsModalOpen(true)} className='cadastrar'>
                            Cadastrar
                        </button>
                        
                       
               
          

          {isModalOpen && (
                    <div className='modal-overlay'>
                        <div className='cardCadastro'>
                    <h3 className='h3Cadastro'>CADASTRO REALIZADO COM SUCESSO !</h3>


                    <Link to="/" style={{ textDecoration: 'none', display: 'block', margin:'0'}}> {/*Adicionando rota para voltar a opção de login através da tag LINK*/}
                    <button className='backLogin'>
                    <h3 className='h3Confirm'>Voltar para Login</h3>
                    </button>


                    </Link>
                    </div>
                    </div>
                )}

            </div>
        </div>  // Fecha div body 
    ); // Fecha o return
} // Fecha a função Cadastro

export default Cadastro;