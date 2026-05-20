import { Routes, Route } from "react-router-dom";


{/* Permite que a página deixe de ser estática (pagina unica) e que permita navegar através das rotas */}

import Login from './pages/LoginPage';
import Cadastro from './pages/CadastroPage';
import Home from './pages/HomePage'
import MainLayout from "./layouts/MainLayout.jsx";


export default function App() {

  return (
    
    <Routes>
      
      {/* Aqui o App decide qual 'front' mostrar baseado na URL */}
      <Route path="/" element={<Login/>}/>
       {/**Aqui ele define qual vai ser a página que ira aparecer após iniciar o servidor*/}


      <Route path="/cadastro" element={<Cadastro/>}/>
      {/* Aqui ele move para a aba cadastro após acionada */}
      <Route element={<MainLayout />}>

      <Route path="/home" element={<Home/>}/>
      </Route>
    </Routes>
    
  );
}

