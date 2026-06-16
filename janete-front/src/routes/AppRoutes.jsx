import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/HomePage";
import Cadastro from "../pages/CadastroPage";
import Cadastro2 from "../pages/CadrastroP";
import Dashboard from "../pages/DashboardPage";
import Login from "../pages/LoginPage";
import Checkout from "../pages/CheckoutPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} /> 
          
          <Route path="/checkout" element={<Checkout />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastro2" element={<Cadastro2 />} />

      </Routes>
    </BrowserRouter>
  );
}
