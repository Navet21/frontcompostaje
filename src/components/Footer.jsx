import { FaExclamationTriangle } from "react-icons/fa";

export default function Footer() {
    return (
        <div className="footer bg-gradient-to-l from-green-700 via-green-800 to-green-900 text-white text-center py-2">
            <p>&copy; 2025 BioCycle Todos los derechos reservados.</p>

            <a href="mailto:biocycle768@gmail.com?Subject=Reporte%20de%20Error" className="inline-flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition">
                <FaExclamationTriangle />
                <span>Reportar Error</span>
            </a>
        </div>
    );
}
