import Card from "../components/Card"
import useFetch from "../hooks/useFetch";

import { useNavigate, useParams } from "react-router-dom";

export default function Composteras() {
  const params = useParams();
  const navigate = useNavigate();

  const { data: centroComposterasData, loading, error } = useFetch(`https://pablo.informaticamajada.es/api/centro/${params.id}/composterasCentro`);

  if (loading) return <p className="text-center text-gray-200">Cargando nombre del centro...</p>;
  if (error) return <p className="text-center text-red-400">Error: {error}</p>;

  const composteras = centroComposterasData;

  const centroNombre = composteras[0].centro.nombre;
  localStorage.setItem("centroid", JSON.stringify(composteras[0].centro.id));

  const centrosGuardados = JSON.parse(localStorage.getItem("centros"));
  const centrosFiltrados  = centrosGuardados.filter((centro) => centro.nombre !== centroNombre);

    const handleChangeCentro = (e) => {
      const centroSeleccionado = e.target.value;
      const centro = centrosGuardados.find((centro) => centro.nombre === centroSeleccionado);

      if (centro) {
        localStorage.setItem("centroid", JSON.stringify(centro.id));
        navigate(`/${centro.id}`);
      }
    };

  return (
    <div className="flex flex-col flex-grow p-4">
      <select onChange={handleChangeCentro} className="rounded-2xl text-center flex justify-center items-center bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-6 mb-4 shadow">
        <option value="{nombre}">{centroNombre}</option>
        {centrosFiltrados.map((centro) => (
          <option key={centro.id} value={centro.nombre}>
            {centro.nombre}
          </option>
        ))}
      </select>

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
