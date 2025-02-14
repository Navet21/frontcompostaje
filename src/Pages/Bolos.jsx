import { VscGraph } from "react-icons/vsc";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { FaEye } from "react-icons/fa";

export default function Bolos() {
  const { data: bolosData, loading, error } = useFetch("https://pablo.informaticamajada.es/api/bolos");

  if (loading) return <p className="text-center text-gray-200">Cargando Bolos...</p>;
  if (error) return <p className="text-center text-red-400">Error: {error}</p>;

  const bolos = bolosData.data;

  return (
    <div className="p-6 text-black dark:text-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Lista de Bolos</h2>
      <div className="overflow-x-auto">
        <table className="w-full border bg-white dark:bg-gray-800 border-gray-700 rounded-lg text-black dark:text-white">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-black dark:text-gray-300">
              <th className="py-3 px-5 text-left border-b border-gray-300 dark:border-gray-700">Nombre</th>
              <th className="py-3 px-5 text-left border-b border-gray-300 dark:border-gray-700">Ciclo en Curso</th>
              <th className="py-3 px-5 text-left border-b border-gray-300 dark:border-gray-700">Descripcion</th>
              <th className="py-3 px-5 text-center border-b border-gray-300 dark:border-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {bolos.map((bolo, index) => (
              <tr key={bolo.id} className={`text-black dark:text-white border-b border-gray-300 dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-700'}`}>
                <td className="py-3 px-5">{bolo.nombre}</td>
                <td className="py-3 px-5">{bolo.ciclos}</td>
                <td className="py-3 px-5">{bolo.descripcion}</td>
                <td className="py-3 px-5 text-center">
                    <Link to={`${bolo.id}`}>
                        <button className="text-green-500 hover:text-green-700 transition">
                            <VscGraph size={22} />
                        </button>
                    </Link>
                    <Link to={`/registrosBolo/${bolo.id}`}>
                        <button className="text-blue-500 hover:text-blue-700 transition">
                            <FaEye size={22} />
                        </button>
                    </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
