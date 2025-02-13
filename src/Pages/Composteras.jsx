import Card from "../components/Card"
import useFetch from "../hooks/useFetch";


export default function Composteras() {
  const { data: centroData, loading, error } = useFetch("https://pablo.informaticamajada.es/api/centros/1");

  if (loading) return <p className="text-center text-gray-200">Cargando nombre del centro...</p>;
  if (error) return <p className="text-center text-red-400">Error: {error}</p>;

  const Centros = centroData.data;

  return (
    <div className="flex flex-col flex-grow p-4">
      <div className="text-white rounded-2xl flex justify-center items-center bg-gray-700 p-6 mb-4">
        <h2>{Centros.nombre}</h2>
      </div>
      <div className="flex flex-col flex-grow gap-4">
        <Card
          type={11}
          estado={1}
          id={1}
          mode="Compostera"
          onButtonClick={() => console.log("Botón presionado")}
        />
        <Card
          type={22}
          estado={0}
          id={1}
          mode="Compostera"
          onButtonClick={() => console.log("Botón presionado")}
        />
        <Card
          type={33}
          estado={0}
          id={3}
          mode="Compostera"
          onButtonClick={() => console.log("Botón presionado")}
        />
      </div>
    </div>
  )
}
