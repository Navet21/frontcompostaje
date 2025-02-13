import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function RegistroDurante() {
    const navigate = useNavigate();
    const params = useParams();
    const { data: registrosData, loading, error } = useFetch(`https://pablo.informaticamajada.es/api/registros/${params.id}/durantes`);

    const registros = registrosData?.data || [];

    if (loading) return <p className="text-center text-gray-200">Cargando Registro...</p>;
    if (error) return <p className="text-center text-red-400">Error: {error}</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl">
                <h2 className="text-green-500 text-xl font-bold mb-4 text-center">
                    Datos Durante del Registro {params.id}
                </h2>

                {registros.map((registro) => (
                    <form key={registro.id} className="space-y-4">
                        <div>
                            <label className="block text-white">Riego</label>
                            <input type="text" value={registro.riego ? "Sí" : "No"} readOnly className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700" />
                        </div>
                        <div>
                            <label className="block text-white">Remover</label>
                            <input type="text" value={registro.remover ? "Sí" : "No"} readOnly className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700" />
                        </div>
                        <div>
                            <label className="block text-white">Aporte Verde</label>
                            <input type="text" value={registro.aporte_verde ? "Sí" : "No"} readOnly className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700" />
                        </div>
                        {registro.aporte_verde && (
                            <div>
                                <label className="block text-white">Cantidad Aporte Verde</label>
                                <input type="text" value={registro.cantidad_aporteV || "No especificado"} readOnly className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700" />
                            </div>
                        )}
                        <div>
                            <label className="block text-white">Tipo Aporte Verde</label>
                            <input type="text" value={registro.tipo_aporteV || "No especificado"} readOnly className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700" />
                        </div>
                        <div>
                            <label className="block text-white">Aporte Seco</label>
                            <input type="text" value={registro.aporte_seco ? "Sí" : "No"} readOnly className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700" />
                        </div>
                        {registro.aporte_seco && (
                            <div>
                                <label className="block text-white">Cantidad Aporte Seco</label>
                                <input type="text" value={registro.cantidad_aporteS || "No especificado"} readOnly className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700" />
                            </div>
                        )}
                        <div>
                            <label className="block text-white">Tipo Aporte Seco</label>
                            <input type="text" value={registro.tipo_aporteS || "No especificado"} readOnly className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700" />
                        </div>
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
                                onClick={() => navigate(`/registros/${registro.id}/antes`)} 
                                className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-2 rounded-lg shadow-md transition-all transform hover:scale-105">
                                Ver formulario Antes
                            </button>
                            <button 
                                onClick={() => navigate(`/registros/${registro.id}/despues`)} 
                                className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-2 rounded-lg shadow-md transition-all transform hover:scale-105">
                                Ver formulario Después
                            </button>
                        </div>
                    </form>
                ))}
            </div>
        </div>
    );
}
