import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { TiDocumentText } from "react-icons/ti";
import { useState, useEffect } from "react";
import { FaBackward } from "react-icons/fa";
import { HiFastForward } from "react-icons/hi";

export default function Registros() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const params = useParams();

    const { data: registrosData, loading, error } = useFetch(`https://pablo.informaticamajada.es/api/centros/${params.id}/bolosUsuarios?page=${currentPage}`);

    useEffect(() => {
        if (registrosData?.meta?.last_page) {
            setTotalPages(registrosData.meta.last_page);
        }
    }, [registrosData]);
    
    localStorage.removeItem("bolos")

    // ✅ Obtener registros o manejar datos vacíos
    const registros = registrosData?.data || [];

    if (loading) return <p className="text-center text-gray-200">Cargando Registros...</p>;
    if (error) return <p className="text-center text-red-400">Error: {error}</p>;

    // ✅ Filtrar por nombre del bolo en tiempo real
    const filteredRegistros = searchTerm
        ? registros.filter(registro =>
            registro.ciclo?.bolo?.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : registros;

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="p-6 text-gray-900 dark:text-gray-200 rounded-lg shadow-lg">
          <input
                    type="text"
                    placeholder="Buscar por bolo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-500 rounded px-4 py-2 text-black dark:text-white bg-gray-100 dark:bg-gray-900"
                />
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Lista de Registros</h2>

            <div className="overflow-x-auto">
                <table className="w-full border border-gray-700 dark:border-gray-600 rounded-lg">
                    <thead>
                        <tr className="bg-green-600 dark:bg-green-700 text-white">
                            <th className="py-3 px-5 text-left border-b border-gray-700 dark:border-gray-600">Usuario</th>
                            <th className="py-3 px-5 text-left border-b border-gray-700 dark:border-gray-600">Bolo</th>
                            <th className="py-3 px-5 text-left border-b border-gray-700 dark:border-gray-600">Fecha</th>
                            <th className="py-3 px-5 text-center border-b border-gray-700 dark:border-gray-600">Ver registros</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRegistros.length > 0 ? (
                            filteredRegistros.map((registro, index) => (
                                <tr key={registro.id} className={`border-b border-gray-700 dark:border-gray-600 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-700'}`}>
                                    {/* Nombre del usuario */}
                                    <td className="py-3 px-5">
                                        {registro.user?.name ?? "Sin Usuario"}
                                    </td>

                                    {/* Nombre del bolo */}
                                    <td className="py-3 px-5">
                                        {registro.ciclo?.bolo?.nombre ?? "Sin Bolo"}
                                    </td>

                                    {/* Fecha Formateada */}
                                    <td className="py-3 px-5">
                                        {registro.created_at 
                                            ? new Date(registro.created_at).toLocaleDateString("es-ES") 
                                            : "Sin Fecha"}
                                    </td>

                                    {/* Acciones */}
                                    <td className="py-3 px-5 text-center flex justify-center gap-2">
                                        <Link to={`/registros/${registro.id}/antes`} className="bg-yellow-500 hover:bg-yellow-400 text-white p-2 rounded-full shadow-md transition-all transform hover:scale-110 flex items-center justify-center" title="Ver Antes">
                                            <FaBackward size={16} />
                                        </Link>
                                        <Link to={`/registros/${registro.id}/durantes`} className="bg-green-500 hover:bg-green-400 text-white p-2 rounded-full shadow-md transition-all transform hover:scale-110 flex items-center justify-center" title="Ver Durante">
                                            <TiDocumentText size={16} />
                                        </Link>
                                        <Link to={`/registros/${registro.id}/despues`} className="bg-blue-500 hover:bg-blue-400 text-white p-2 rounded-full shadow-md transition-all transform hover:scale-110 flex items-center justify-center" title="Ver Después">
                                            <HiFastForward size={16} />
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-3 text-gray-500">No se encontraron registros.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* 🔹 Paginación (solo si no hay búsqueda activa) */}
            {searchTerm === "" && totalPages > 1 && (
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : 'bg-gray-700 dark:bg-gray-600 text-white hover:bg-gray-600 dark:hover:bg-gray-500'}`}
                    >
                        Anterior
                    </button>
                
                    <div className="flex gap-2">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                disabled={currentPage === index + 1}
                                className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || registros.length < 15}
                        className={`px-4 py-2 rounded ${currentPage === totalPages || registros.length < 15 ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : 'bg-gray-700 dark:bg-gray-600 text-white hover:bg-gray-600 dark:hover:bg-gray-500'}`}
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
}
