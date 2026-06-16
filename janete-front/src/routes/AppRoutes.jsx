import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/HomePage";
import Cadastro from "../pages/CadastroPage";
import Cadastro2 from "../pages/CadrastroP";
import Dashboard from "../pages/DashboardPage";
import Login from "../pages/LoginPage";
import Checkout from "../pages/CheckoutPage";
<<<<<<< Updated upstream
=======
import PoliticaPrivacidade from "../pages/PoliticaPrivacidade";
import QuemSomos from "../pages/QuemSomos";
import FaleConosco from "../pages/FaleConosco";
>>>>>>> Stashed changes

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/checkout" element={<Checkout />} />
<<<<<<< Updated upstream
=======
          <Route path="/PoliticaPrivacidade" element={<PoliticaPrivacidade />} />
          <Route path="/QuemSomos" element={<QuemSomos />} />
          <Route path="/FaleConosco" element={<FaleConosco/>} />
>>>>>>> Stashed changes
        </Route>
        
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastro2" element={<Cadastro2 />} />

      </Routes>
    </BrowserRouter>
  );
}
