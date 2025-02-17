import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

import HormigacletaBlanca from "../images/hormigacletaBlanca.png";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const centroId = localStorage.getItem("centroid");

  return (
    <nav className="z-40 bg-gradient-to-r from-green-700 via-green-800 to-green-900 px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
      <NavLink to={`/${centroId}`}>
      <img
          src={HormigacletaBlanca}
          alt="logo"
          className="sm:h-25 h-15 w-auto mr-4 dark:invert"
        />
        </NavLink>
        <div className="hidden md:flex gap-6 text-white">
          <NavLink
            className="py-2 hover:border-b-2 hover:border-b-green-200 hover:text-blue-700 transition-all"
            to={`/${centroId}`}
          >
            Composteras
          </NavLink>
          <NavLink
            className="py-2 hover:border-b-2 hover:border-b-green-200 hover:text-blue-700 transition-all"
            to="/bolos"
          >
            Bolos
          </NavLink>
          <NavLink
            className="py-2 hover:border-b-2 hover:border-b-green-200 hover:text-blue-700 transition-all"
            to="/registros"
          >
            Registros
          </NavLink>
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="ml-auto hidden md:block">
        <ThemeToggle />
      </div>

      {/* Hamburger Menu */}
      <div className="ml-auto md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-200"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white flex flex-col items-start px-6 py-3 md:hidden">
          <NavLink
            className="py-2 w-full hover:bg-green-600 hover:text-blue-700 transition-all"
            to={`/${centroId}`}
            onClick={() => setMenuOpen(false)}
          >
            Composteras
          </NavLink>
          <NavLink
            className="py-2 w-full hover:bg-green-600 hover:text-blue-700 transition-all"
            to="/bolos"
            onClick={() => setMenuOpen(false)}
          >
            Bolos
          </NavLink>
          <NavLink
            className="py-2 w-full hover:bg-green-600 hover:text-blue-700 transition-all"
            to="/registros"
            onClick={() => setMenuOpen(false)}
          >
            Registros
          </NavLink>
          <div className="mt-4">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
