import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/HomePage";
import Cadastro from "../pages/CadasteoPage";
import Dashboard from "../pages/DashboardPage";
import Login from "../pages/LoginPage";
import Checkout from "../pages/CheckoutPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}