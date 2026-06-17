import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/HomePage";
import Cadastro from "../pages/CadastroPage";
import Usuarios from "../pages/UsuariosPage";
import Dashboard from "../pages/DashboardPage";
import Login from "../pages/LoginPage";
import Checkout from "../pages/CheckoutPage";
import Listadeclientes from "../pages/Listadeclientes";
import Produtos from "../pages/ProdutosPage"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} /> 
          
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/produtos" element={<Produtos />} />
           
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route path="/listadeclientes" element={<Listadeclientes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/usuario" element={<Usuarios />} />

      </Routes>
    </BrowserRouter>
  );
}
