import { useEffect, useState } from "react";
import { VscGraph } from "react-icons/vsc";

export default function Bolos() {
  const [bolos, setBolos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://pablo.informaticamajada.es/api/bolos")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setBolos(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los bolos:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Cargando Bolos...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Bolos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="py-2 px-4">Nombre</th>
              <th className="py-2 px-4">Ciclo en Curso</th>
              <th className="py-2 px-4">Estado</th>
              <th className="py-2 px-4">Fecha Inicio</th>
              <th className="py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {bolos.map((bolo) => (
              <tr key={bolo.id} className="border-t border-gray-200">
                <td className="py-2 px-4 text-center">{bolo.nombre}</td>
                <td className="py-2 px-4 text-center">{bolo.ciclo_en_curso}</td>
                <td className="py-2 px-4 text-center">{bolo.estado}</td>
                <td className="py-2 px-4 text-center">{bolo.fecha_inicio}</td>
                <td className="py-2 px-4 text-center">
                  <button className="text-blue-500 hover:text-blue-700">
                    <VscGraph size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}