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
    <div className="p-6 bg-gray-900 text-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Lista de Bolos</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-gray-300">
              <th className="py-3 px-5 text-left border-b border-gray-700">Nombre</th>
              <th className="py-3 px-5 text-left border-b border-gray-700">Ciclo en Curso</th>
              <th className="py-3 px-5 text-left border-b border-gray-700">Descripcion</th>
              <th className="py-3 px-5 text-center border-b border-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {bolos.map((bolo, index) => (
              <tr key={bolo.id} className={`border-b border-gray-700 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}`}>
                <td className="py-3 px-5">{bolo.nombre}</td>
                <td className="py-3 px-5">{bolo.ciclos}</td>
                <td className="py-3 px-5">{bolo.descripcion}</td>
                <td className="py-3 px-5 text-center">
  <div className="flex items-center justify-center gap-2">
    <Link to={`${bolo.id}`} className="bg-green-500 hover:bg-green-400 text-black p-2 rounded-full shadow-md transition-all transform hover:scale-110 flex items-center justify-center" title="Ver gráfico">
      <VscGraph size={16} />
    </Link>
    <Link to={`/registrosBolo/${bolo.id}`} className="bg-green-500 hover:bg-green-400 text-black p-2 rounded-full shadow-md transition-all transform hover:scale-110 flex items-center justify-center" title="Ver Registros">
      <FaEye size={16} />
    </Link>
  </div>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
