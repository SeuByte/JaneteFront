import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    // TROCAMOS 'h-screen' POR 'min-h-screen' PARA PERMITIR QUE A TELA ESTIQUE
    // ADICIONAMOS 'm-0 p-0 overflow-x-hidden' PARA BLINDAR AS LATERAIS
    <div className="flex flex-col min-h-screen w-full m-0 p-0 overflow-x-hidden bg-transparent">
      <Navbar />

  
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}