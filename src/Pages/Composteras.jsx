import Card from "../components/Card"
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";


export default function Composteras() {
  const params = useParams();

  const { data: centroComposterasData, loading, error } = useFetch(`https://pablo.informaticamajada.es/api/centro/${params.id}/composterasCentro`);

  if (loading) return <p className="text-center text-gray-200">Cargando nombre del centro...</p>;
  if (error) return <p className="text-center text-red-400">Error: {error}</p>;

  const composteras = centroComposterasData;

  const centroNombre = composteras[0].centro.nombre;

  return (
    <div className="flex flex-col flex-grow p-4">
      <div className="rounded-2xl flex justify-center items-center bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-6 mb-4 shadow">
        <h2>{centroNombre}</h2>
      </div>

      <div className="flex flex-col flex-grow gap-4">
        {composteras.map(compostera => (
          <Card
            key={compostera.id}
            type={compostera.tipo}
            estado={compostera.ocupada}
            id={compostera.id}
            mode="Compostera"
            onButtonClick={() => console.log(`Botón presionado en Compostera ${compostera.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
