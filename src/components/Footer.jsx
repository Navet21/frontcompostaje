import { Link } from "react-router-dom"

export default function Footer(){
    return(
        <div className="footer bg-gradient-to-l from-green-700 via-green-800 to-green-900 text-white text-center py-2">
            <p>&copy; 2025 BioCycle Todos los derechos reservados.</p>
            
            <Link to="/error">
                <p>Errores</p>
            </Link>
        </div>
    )
}