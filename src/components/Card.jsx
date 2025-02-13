import { FaSeedling, FaPlus, FaEye } from "react-icons/fa";
import { IoIosSchool } from "react-icons/io";
import { Link } from "react-router-dom";

const compostera_id = 1;

const Card = ({ type, estado, id, name, onButtonClick, mode }) => {
    const typeMapping = {
        11: "Aporte",
        22: "Degradación",
        33: "Maduración",
    };

    const emptyMapping = {
        0: "Vacía",
        1: "Ocupada",
    };

    const typeName = typeMapping[type] || "Desconocido";
    const empty = emptyMapping[estado] || "Estado desconocido";

    return (
        <div className="flex flex-col sm:flex-row gap-4 mt-3 mr-5 ml-5 justify-between items-center p-6 bg-gradient-to-t from-green-700 to-gray-800 text-gray-300 rounded-lg shadow-lg hover:shadow-xl mb-4">
            <div className="flex items-center gap-4">
                <div
                    id="status-icon"
                    className={`text-gray-300 p-2.5 rounded-full border-2 border-gray-600 ${
                        mode === "Compostera" && estado === 1
                            ? "bg-green-500 text-gray-900 shadow-md shadow-gray-700/50"
                            : mode === "Compostera"
                            ? "opacity-25"
                            : ""
                    }`}
                >
                    {mode === "Compostera" ? (
                        <FaSeedling className="text-2xl" />
                    ) : (
                        <IoIosSchool className="text-2xl" />
                    )}
                </div>
                <div className="text-sm text-gray-300">
                    {mode === "Compostera" ? (
                        <>
                            <h4 className="text-xl font-bold text-gray-100">
                                Compostera {id}
                            </h4>
                            <p>
                                Tipo: <span className="font-semibold">{typeName}</span>
                            </p>
                            <p>
                                Estado: <span className="font-semibold">{empty}</span>
                            </p>
                        </>
                    ) : (
                        <h4 className="text-xl font-bold text-gray-100">
                            Centro: {name}
                        </h4>
                    )}
                </div>
            </div>

            <div className="flex gap-2">
                <Link key={compostera_id} to={`/formularioAntes`}>
                    <button
                        onClick={onButtonClick}
                        className="flex items-center justify-center gap-2 bg-amber-500 dark:bg-amber-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-btn-primary-hover focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 transform hover:scale-105"
                    >
                        {mode === "Compostera" ? (
                          <>
                            Nuevo registro <FaPlus />
                          </>
                        ) : (
                          <>
                            Ver registros <FaEye />
                          </>
                        )}                    
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Card;
