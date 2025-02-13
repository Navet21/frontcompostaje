import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function RegistroAntes() {
    const params = useParams();
    const navigate = useNavigate();
    const { data: registrosData, loading, error } = useFetch(`https://pablo.informaticamajada.es/api/registros/${params.id}/antes`);

    const registros = registrosData?.data || [];

    if (loading) return <p className="text-center text-gray-200">Cargando Registro...</p>;
    if (error) return <p className="text-center text-red-400">Error: {error}</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl">
                <h2 className="text-green-500 text-xl font-bold mb-4 text-center">
                    Datos de Antes del Registro {params.id}
                </h2>

                {registros.map((registro) => (
                    <form key={registro.id} className="space-y-4">
                        <div>
                            <label className="block text-white">Temperatura Ambiente</label>
                            <input type="text" value={registro.temp_ambiente} readOnly className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700" />
                        </div>
                        <div>
                            <label className="block text-white">Temperatura Compostera</label>
                            <input type="text" value={registro.temp_compostera} readOnly className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700" />
                        </div>
                        <div>
                            <label className="block text-white">Nivel de Llenado</label>
                            <input type="text" value={registro.nivel_llenado} readOnly className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700" />
                        </div>
                        <div>
                            <label className="block text-white">Olor</label>
                            <input type="text" value={registro.olor} readOnly className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700" />
                        </div>
                        <div>
                            <label className="block text-white">Humedad</label>
                            <input type="text" value={registro.humedad} readOnly className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700" />
                        </div>
                        <div>
                            <label className="block text-white">Insectos</label>
                            <input type="text" value={registro.insectos ? "Sí" : "No"} readOnly className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700" />
                        </div>
                        {registro.insectos && (
                            <div>
                                <label className="block text-white">Tipos de Insectos</label>
                                <input type="text" value={Array.isArray(registro.tipos_insectos) ? registro.tipos_insectos.join(", ") : "No especificado"} readOnly className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700" />
                            </div>
                        )}
                        {registro.foto && (
                            <div className="mt-4">
                                <label className="block text-white">Foto</label>
                                <img src={registro.foto} alt="Registro" className="w-full h-32 object-cover rounded-md" />
                            </div>
                        )}
                        <div>
                            <label className="block text-white">Observaciones</label>
                            <textarea readOnly className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700">
                                {registro.observaciones}
                            </textarea>
                        </div>
                        <div className="flex justify-between mt-4">
                            <button 
                                onClick={() => navigate(`/registros`)} 
                                className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-2 rounded-lg shadow-md transition-all transform hover:scale-105">
                                Volver a todos los registros
                            </button>
                            <button 
                                onClick={() => navigate(`/registros/${registro.id}/durantes`)} 
                                className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-2 rounded-lg shadow-md transition-all transform hover:scale-105">
                                Ver formulario Durante
                            </button>
                        </div>
                    </form>
                ))}
            </div>
        </div>
    );
}
