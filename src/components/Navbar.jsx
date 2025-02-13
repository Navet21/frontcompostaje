import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

import HormigacletaBlanca from "../images/hormigacletaBlanca.png";

export default function Navbar() {
  return (
    <div className="navbar bg-green-700 px-6 py-3 flex items-center">
      <img
        src={HormigacletaBlanca}
        alt="logo"
        className="h-25 w-auto mr-4 dark:invert"
      />

      <div className="flex gap-6 text-white">
        <NavLink
          className="py-2 hover:border-b-2 hover:border-b-green-200 hover:text-blue-700 transition-all"
          to="/"
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
      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </div>
  );
}
