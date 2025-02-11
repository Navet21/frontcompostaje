import { NavLink } from "react-router-dom"

export default function Navbar(){
    return(
        <div className="navbar navbar-dark bg-dark">
            <div className="container">
                <NavLink className="btn btn-outline-primary" to="/frontcompostaje">Composteras</NavLink>
                <NavLink className="btn btn-outline-primary" to="/frontcompostaje/bolos">Bolos</NavLink>
                <NavLink className="btn btn-outline-primary" to="/frontcompostaje/registros">Registros</NavLink>
            </div>
        </div>
    )
}