import { FaEye } from "react-icons/fa";
import { IoIosSchool } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const CardCentro = ({ id, name }) => {
    const navigate = useNavigate();

    // Determinar la URL de destino del botón
    const buttonUrl = `/centro/${id}/registros`;

    return (
        <div className="flex flex-col sm:flex-row gap-4 mt-3 mr-5 ml-5 justify-between items-center p-6 bg-gradient-to-br from-green-400 to-green-100 dark:from-green-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow-lg hover:shadow-xl mb-4">
            <div className="flex items-center gap-4">
                <div
                    id="status-icon"
                    className="text-gray-700 dark:text-gray-300 p-2.5 rounded-full border-2 border-gray-600"
                >
                    <IoIosSchool className="text-2xl" />
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                    <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                        Centro: {name}
                    </h4>
                </div>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => navigate(buttonUrl)}
                    className="text-nowrap flex items-center justify-center gap-2 bg-amber-500 dark:bg-amber-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-amber-600 dark:hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 transform hover:scale-105 cursor-pointer"
                >
                    Ver registros <FaEye />
                </button>
            </div>
        </div>
    );
};

export default CardCentro;
