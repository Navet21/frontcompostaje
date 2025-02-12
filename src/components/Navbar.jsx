import { NavLink } from "react-router-dom"

export default function Navbar(){
    return(
        <div className="navbar bg-green-700">
            <img src="./public/hormigacletaBlanca.png" alt="" />
            <div className="container flex gap-4 text-white">
                <NavLink className="py-6 hover:border-b-2 hover:border-b-green-200 hover:text-blue-700 transition-all" to="/">Composteras</NavLink>
                <NavLink className="py-6 hover:border-b-2 hover:border-b-green-200 hover:text-blue-700 transition-all" to="/bolos">Bolos</NavLink>
                <NavLink className="py-6 hover:border-b-2 hover:border-b-green-200 hover:text-blue-700 transition-all" to="/registros">Registros</NavLink>
            </div>
        </div>
    )
}
