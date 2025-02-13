import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useParams } from "react-router-dom";

export default function RegistrosBolo() {
    const params = useParams();
    const { data: registrosData, loading, error } = useFetch(`https://pablo.informaticamajada.es/api/registrosBolo/${params.id}`);

    // Manejo de datos nulos
    const registros = registrosData|| [];

    if (loading) return <p className="text-center text-gray-200">Cargando Registros...</p>;
    if (error) return <p className="text-center text-red-400">Error: {error}</p>;

    return (
        <div className="p-6 bg-gray-900 text-gray-200 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Lista de Registros del Bolo Seleccionado</h2>
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-700 rounded-lg">
                    <thead>
                        <tr className="bg-green-600 text-white">
                            <th className="py-3 px-5 text-left border-b border-gray-700">Nº Registro</th>
                            <th className="py-3 px-5 text-center border-b border-gray-700">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registros.map((bolo, index) => (
                            <tr key={bolo.id} className={`border-b border-gray-700 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}`}>
                                <td className="py-3 px-5 text-blue-400 hover:underline">
                                    <Link to={`/registro/${bolo.id}`}>{bolo.id}</Link>
                                </td>
                                <td className="py-3 px-5 text-center">
                                    <Link to={`/registro/${bolo.id}`}>
                                        <button className="text-green-400 hover:text-green-600 transition">
                                            <FaEye size={22} />
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <div className="flex justify-between items-center mt-4">
                <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">Anterior</button>
                <span className="text-gray-300">1</span>
                <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">Siguiente</button>
            </div>
        </div>
    );
}
