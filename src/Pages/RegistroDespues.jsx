import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { CentroContext } from "../Providers/CentroProvider";
import { useContext } from "react";

export default function RegistroDespues() {
    const navigate = useNavigate();
    const params = useParams();
    const { data: registrosData, loading, error } = useFetch(`https://pablo.informaticamajada.es/api/registros/${params.id}/despues`);

    const { centroId } = useContext(CentroContext); // Usamos el contexto

    // Manejo de datos nulos
    const registros = registrosData?.data || [];

    const bolos = localStorage.getItem("bolos");

    let volver = `/registros/${centroId}`;

    if(bolos){
        console.log("Vienes desde bolos wapo")
        volver = `/bolos`;
    } else{
        console.log("Vienes desde registros wapo")
        volver = `/registros/${centroId}`;
    }

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
                                    src={`https://pablo.informaticamajada.es/storage/${registro.foto}`} 
                                    alt="Registro" 
                                    className="w-full h-64 object-contain rounded-md"
                                    />
                            </div>
                        )}
                        <div>
                            <label className="block text-black dark:text-white">Observaciones</label>
                            <textarea 
                                readOnly 
                                value={registro.observaciones ?? ""} 
                                className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700"
                            />
                        </div>
                    </form>
                ))}
                <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 w-full mt-4">
                    {/* Ver formulario Durante */}
                    <button 
                        onClick={() => navigate(`/registros/${params.id}/durantes`)} 
                        className="bg-green-700 hover:bg-green-800 transition-colors px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-white text-sm sm:text-base cursor-pointer w-full sm:w-auto">
                        Ver formulario Durante
                    </button>

                    {/* Volver a Formularios */}
                    <button 
                        onClick={() => navigate(`${volver}`)} 
                        className="bg-green-700 hover:bg-green-800 transition-colors px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-white text-sm sm:text-base cursor-pointer w-full sm:w-auto">
                        Volver a Formularios
                    </button>
                </div>
            </div>
        </div>
    );
}
