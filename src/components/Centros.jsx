import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import MapaCentros from "./MapaCentros";
import CardCentro from "./CardCentros";

export default function CentrosList() {
  const { data: centros, loading, error } = useFetch("https://pablo.informaticamajada.es/api/centrosPublicos");
  const navigate = useNavigate();

  if (loading) return <p className="text-center text-gray-200">Cargando centros...</p>;
  if (error) return <p className="text-center text-red-400">Error: {error}</p>;

  const centroId = localStorage.getItem("centroid");


  if (!centros || centros.length === 0) {
    return <p className="text-center text-gray-400">No hay centros disponibles.</p>;
  }
  console.log(centros);

  return (
    <div className="p-4">
      <h2 className="text-black dark:text-white text-2xl font-bold mb-6 text-center">Lista de Centros</h2>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate(`/registros/${centroId}`)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
        >
          Volver a tus registros
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {centros.map((centro) => (
          <CardCentro
            key={centro.id}
            id={centro.id}
            name={centro.nombre}
            onButtonClick={() => console.log(`Centro seleccionado: ${centro.nombre}`)}
          />
        ))}
      </div>
      <MapaCentros></MapaCentros>
    </div>
  );
}

