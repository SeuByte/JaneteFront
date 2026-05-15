import { Link, NavLink } from "react-router-dom";

import {
  Home,
  PlusCircle,
  ShoppingCart,
  BarChart3,
  User,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Cadastro",
      path: "/cadastro",
      icon: PlusCircle,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: BarChart3,
    },
    {
      name: "Login",
      path: "/login",
      icon: User,
    },
  ];

  return (
    <header className="w-full bg-[#070b14] px-4 py-4 md:px-6">
      <nav className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-2xl backdrop-blur-md">

        {/* LOGO */}

        <Link
          to="/"
          className="flex items-center gap-3 text-white"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/40 text-cyan-400">
            <ShoppingCart size={22} />
          </div>

          <span className="text-xl font-bold md:text-2xl">
            Janete
          </span>
        </Link>

        {/* DESKTOP MENU */}

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 pb-1 text-base font-medium transition-all ${
                    isActive
                      ? "text-cyan-400"
                      : "text-zinc-300 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={20} />

                    <span>{item.name}</span>

                    {isActive && (
                      <span className="absolute bottom-[-8px] left-0 h-[2px] w-full rounded-full bg-cyan-400" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* MOBILE BUTTON */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white lg:hidden"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* MOBILE MENU */}

      {menuOpen && (
        <div className="mt-3 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#111827] p-5 lg:hidden">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-base transition-all ${
                    isActive
                      ? "bg-cyan-400/10 text-cyan-400"
                      : "text-zinc-300 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />

                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </header>
  );
}