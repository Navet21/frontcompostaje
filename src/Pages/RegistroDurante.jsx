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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl">
                <h2 className="text-green-500 text-xl font-bold mb-4 text-center">
                    Formulario Durante para Compostera {params.id}
                </h2>

                {registros.map((registro) => {
                    const isAporteVerde = registro.aporte_verde === 1;
                    const isAporteSeco = registro.aporte_seco === 1;

                    return (
                        <form key={registro.id} className="space-y-4">
                            {/* Riego y Remoción */}
                            <div className="flex flex-col space-y-2">
                                <label className="flex items-center text-black dark:text-white">
                                    <input type="checkbox" checked={registro.riego === 1} readOnly className="mr-2" />
                                    Riego Realizado
                                </label>
                                <label className="flex items-center text-black dark:text-white">
                                    <input type="checkbox" checked={registro.remover === 1} readOnly className="mr-2" />
                                    Remoción Realizada
                                </label>
                            </div>

                            {/* Aporte Verde */}
                            <div className="space-y-2">
                                <label className="flex items-center text-black dark:text-white font-bold">
                                    <input type="checkbox" checked={isAporteVerde} readOnly className="mr-2" />
                                    Aporte Verde
                                </label>
                                {isAporteVerde && (
                                    <>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-black dark:text-white">Cantidad Verde (L):</label>
                                                <input type="text" 
                                                    value={registro.cantidad_aporteVLitros ?? "No especificado"} 
                                                    readOnly 
                                                    className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700" 
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-black dark:text-white">Cantidad Verde (kg):</label>
                                                <input type="text" 
                                                    value={registro.cantidad_aporteVKilos ?? "No especificado"} 
                                                    readOnly 
                                                    className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700" 
                                                />
                                            </div>
                                        </div>
                                        <label className="block text-black dark:text-white">Tipo de Aporte Verde:</label>
                                        <input type="text" 
                                            value={registro.tipo_aporteV ?? "No especificado"} 
                                            readOnly 
                                            className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700" 
                                        />
                                    </>
                                )}
                            </div>

                            {/* Aporte Seco */}
                            <div className="space-y-2">
                                <label className="flex items-center text-black dark:text-white font-bold">
                                    <input type="checkbox" checked={isAporteSeco} readOnly className="mr-2" />
                                    Aporte Seco
                                </label>
                                {isAporteSeco && (
                                    <>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-black dark:text-white">Cantidad Seco (L):</label>
                                                <input type="text" 
                                                    value={registro.cantidad_aporteSLitros ?? "No especificado"} 
                                                    readOnly 
                                                    className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700" 
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-black dark:text-white">Cantidad Seco (kg):</label>
                                                <input type="text" 
                                                    value={registro.cantidad_aporteSKilos ?? "No especificado"} 
                                                    readOnly 
                                                    className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700" 
                                                />
                                            </div>
                                        </div>
                                        <label className="block text-black dark:text-white">Tipo de Aporte Seco:</label>
                                        <input type="text" 
                                            value={registro.tipo_aporteS ?? "No especificado"} 
                                            readOnly 
                                            className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700" 
                                        />
                                    </>
                                )}
                            </div>

                            {/* Foto */}
                            {registro.foto && (
                                <div className="mt-4">
                                    <label className="block text-black dark:text-white">Foto:</label>
                                    <img src={`https://pablo.informaticamajada.es/storage/${registro.foto}`} alt="Registro" className="w-full h-64 object-contain rounded-md"
 />
                                </div>
                            )}

                            {/* Observaciones */}
                            <div>
                                <label className="block text-black dark:text-white">Observaciones:</label>
                                <textarea 
                                    readOnly 
                                    value={registro.observaciones ?? ""} 
                                    className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
                                />
                            </div>

  
                        </form>
                    );
                })}
                {/* Botones */}
                <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 w-full mt-4">
                    {/* Volver a Antes */}
                    <button 
                        onClick={() => navigate(`/registros/${params.id}/antes`)} 
                        className="bg-green-700 hover:bg-green-800 transition-colors px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-white text-sm sm:text-base cursor-pointer w-full sm:w-auto">
                        Volver a Antes
                    </button>

                    {/* Siguiente Formulario */}
                    <button 
                        onClick={() => navigate(`/registros/${params.id}/despues`)} 
                        className="bg-green-700 hover:bg-green-800 transition-colors px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-white text-sm sm:text-base cursor-pointer w-full sm:w-auto">
                        Siguiente Formulario
                    </button>
                </div>
            </div>
        </div>
    );
}


