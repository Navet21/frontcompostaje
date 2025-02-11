import { NavLink } from "react-router-dom"

export default function Navbar(){
    return(
        <div className="navbar navbar-dark bg-dark">
            <div className="container">
                <NavLink className="btn btn-outline-primary" to="/">Composteras</NavLink>
                <NavLink className="btn btn-outline-primary" to="/bolos">Bolos</NavLink>
                <NavLink className="btn btn-outline-primary" to="/registros">Registros</NavLink>
            </div>
        </div>
    )
}