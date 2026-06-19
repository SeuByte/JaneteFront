import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/HomePage";
import Cadastro from "../pages/CadastroPage";
import Cadastro2 from "../pages/CadrastroP";
import Dashboard from "../pages/DashboardPage";
import Login from "../pages/LoginPage";
import Checkout from "../pages/CheckoutPage";
import Listadeclientes from "../pages/Listadeclientes";
<<<<<<< HEAD
import Produtos from "../pages/ProdutosPage"
=======
import ProdutosPage from "../pages/ProdutosPage";
>>>>>>> b1f2417 (Adicionei imagens de produtos em destaque na página home)

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/inicial" element={<Home />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/produtos" element={<ProdutosPage/>} />
           
        </Route>
        
        <Route path="/listadeclientes" element={<Listadeclientes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastro2" element={<Cadastro2 />} />

      </Routes>
    </BrowserRouter>
  );
}
