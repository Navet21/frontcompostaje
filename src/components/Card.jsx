import { FaLeaf } from "react-icons/fa";
import { Link } from "react-router-dom";

import { IoIosSchool } from "react-icons/io";

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
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center p-6 bg-gradient-to-br from-green-400 to-green-100 dark:from-gray-900 dark:to-dark-highlight rounded-lg shadow-lg hover:shadow-xl mb-4">
      <div className="flex items-center gap-4">
        <div
          id="status-icon"
          className={`text-white dark:text-gray-400 p-2.5 rounded-full border-2 border-gray-200 ${
            mode === "Compostera" && estado === 1
              ? "bg-green-500 dark:bg-green-500 dark:text-gray-200 shadow-md shadow-gray-700/50 dark:shadow-gray-400/50"
              : mode === "Compostera"
              ? "dark:opacity-25"
              : ""
          }`}
        >
          {mode === "Compostera" ? (
            <FaLeaf className="text-2x1" />
          ) : (
            <IoIosSchool className="text-2xl" />
          )}
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-300">
          {mode === "Compostera" ? (
            <>
              <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">
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
            <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Centro: {name}
            </h4>
          )}
        </div>
      </div>
      <Link key={id} to={`/formularioAntes/${id}`}>
        Nuevo Registro
      </Link>
      <button
        onClick={onButtonClick}
        className="flex items-center justify-center gap-2 bg-amber-500 dark:bg-amber-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-btn-primary-hover focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 transform hover:scale-105"
      >
        {mode === "Compostera" ? "Nuevo registro" : "Ver registros"} <i className="fa fa-plus"></i>
      </button>
    </div>
  );
};

export default Card;
