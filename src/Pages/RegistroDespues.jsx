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
        <div className="p-6 bg-gray-900 text-gray-200 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Datos Después</h2>

            {registros.map((registro) => (
                <form key={registro.id} className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
                    <div>
                        <label className="block text-gray-300">Nivel de Llenado</label>
                        <input type="text" value={registro.nivel_llenado} readOnly className="w-full p-2 rounded bg-gray-700 text-gray-200" />
                    </div>
                    {registro.foto && (
                        <div className="mt-4">
                            <label className="block text-gray-300">Foto</label>
                            <img src={registro.foto} alt="Registro" className="w-full h-32 object-cover rounded-md" />
                        </div>
                    )}
                    <div>
                        <label className="block text-gray-300">Observaciones</label>
                        <textarea readOnly className="w-full p-2 rounded bg-gray-700 text-gray-200">{registro.observaciones}</textarea>
                    </div>
                    <div className="flex justify-center space-x-4 mt-6">
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
    );
}
