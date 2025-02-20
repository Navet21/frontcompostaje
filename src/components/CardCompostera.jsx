import { FaSeedling, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Card = ({ type, estado, id, onButtonClick }) => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const emptyMapping = {
        0: "Vacía",
        1: "Ocupada",
    };

    const comprobarLocal = (e) => {
        e.preventDefault(); // Evita la navegación automática

        if(estado === 0 && type === "aporte"){
            navigate(`/crearBolo/${id}`)
        }
        else{
            if (localStorage.getItem(`formularioAntes${id}`)) {
                setShowModal(true); // Muestra el modal si hay un registro pendiente
            } else {
                limpiarLocalStorage(); // Limpia el localStorage
                onButtonClick();
                navigate(`/formularioAntes/${id}`); // Redirige a la URL normal
            }
        }

        
    };

    const limpiarLocalStorage = () => {
        Object.keys(localStorage).forEach((key) => {
            if (key === `formularioAntes${id}`) {
                localStorage.removeItem(key);
            }
        });
    };

    const empty = emptyMapping[estado] || "Estado desconocido";

    return (
        <div className="flex flex-col sm:flex-row gap-4 mt-3 mr-5 ml-5 justify-between items-center p-6 bg-gradient-to-br from-green-400 to-green-100 dark:from-green-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow-lg hover:shadow-xl mb-4">
            <div className="flex items-center gap-4">
                <div
                    id="status-icon"
                    className={`text-gray-700 dark:text-gray-300 p-2.5 rounded-full border-2 border-gray-600 ${estado === 1 ? "bg-green-500 text-gray-900 dark:text-white shadow-md shadow-gray-700/50" : "opacity-25"}`}
                >
                    <FaSeedling className="text-2xl" />
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                    <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                        Compostera {id}
                    </h4>
                    <p>
                        Tipo: <span className="font-semibold">{type}</span>
                    </p>
                    <p>
                        Estado: <span className="font-semibold">{empty}</span>
                    </p>
                </div>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={comprobarLocal}
                    className="text-nowrap flex items-center justify-center gap-2 bg-amber-500 dark:bg-amber-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-amber-600 dark:hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 transform hover:scale-105 cursor-pointer"
                >
                    Nuevo registro <FaPlus />
                </button>

                {showModal && (
                    <div className="fixed inset-0 z-40 bg-gray-900 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <p className="text-black text-lg font-semibold">
                                Tienes un registro pendiente. ¿Quieres continuar con él?
                            </p>
                            <div className="flex justify-end gap-4 mt-4">
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        navigate(`/formularioAntes/${id}`);
                                    }}
                                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                                >
                                    Sí, continuar
                                </button>
                                <button
                                    onClick={() => {
                                        limpiarLocalStorage();
                                        setShowModal(false);
                                        navigate(`/formularioAntes/${id}`);
                                    }}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                                >
                                    No, eliminar datos
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;
