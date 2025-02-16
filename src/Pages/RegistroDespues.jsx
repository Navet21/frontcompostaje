import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function RegistroDespues() {
    const navigate = useNavigate();
    const params = useParams();
    const { data: registrosData, loading, error } = useFetch(`https://pablo.informaticamajada.es/api/registros/${params.id}/despues`);

    // Manejo de datos nulos
    const registros = registrosData?.data || [];

    if (loading) return <p className="text-center text-gray-200">Cargando Registro...</p>;
    if (error) return <p className="text-center text-red-400">Error: {error}</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl">
                <h2 className="text-green-500 text-xl font-bold mb-4 text-center">
                    Datos Después del Registro {params.id}
                </h2>

                {registros.map((registro) => (
                    <form key={registro.id} className="space-y-4">
                        <div>
                            <label className="block text-black dark:text-white">Nivel de Llenado</label>
                            <input 
                                type="text" 
                                value={registro.nivel_llenado} 
                                readOnly 
                                className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700" 
                            />
                        </div>
                        {registro.foto && (
                            <div className="mt-4">
                                <label className="block text-black dark:text-white">Foto</label>
                                <img 
                                    src={registro.foto} 
                                    alt="Registro" 
                                    className="w-full h-32 object-cover rounded-md"
                                />
                            </div>
                        )}
                        <div>
                            <label className="block text-black dark:text-white">Observaciones</label>
                            <textarea 
                                readOnly 
                                className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700"
                            >
                                {registro.observaciones}
                            </textarea>
                        </div>
                        <div className="flex justify-between mt-4">
                            <button 
                                onClick={() => navigate(`/registros/${registro.id}/antes`)} 
                                className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-2 rounded-lg shadow-md transition-all transform hover:scale-105">
                                Ver formulario Antes
                            </button>
                            <button 
                                onClick={() => navigate(`/registros`)} 
                                className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-2 rounded-lg shadow-md transition-all transform hover:scale-105">
                                Volver a Formularios
                            </button>
                        </div>
                    </form>
                ))}
            </div>
        </div>
    );
}
