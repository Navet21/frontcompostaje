import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

export default function CentrosList() {
  const [centros, setCentros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://pablo.informaticamajada.es/api/centros")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCentros(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los centros:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Cargando centros...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  console.log(centros);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Centros</h2>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/registros")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
        >
          Ir a Registros
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {centros.map((centro) => (
          <Card
            key={centro.id}
            mode="Centro"
            name={centro.nombre}
            onButtonClick={() => console.log(`Centro seleccionado: ${centro.nombre}`)}
          />
        ))}
      </div>
    </div>
  );
}

