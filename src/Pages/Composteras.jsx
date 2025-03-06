import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CentroContext } from "../Providers/CentroProvider";
import useFetch from "../hooks/useFetch";
import CardCompostera from "../components/CardCompostera";
import {
  Dialog,
  DialogBody,
  Typography,
  Button as MaterialButton,
} from "@material-tailwind/react";

export default function Composteras() {
  const navigate = useNavigate();
  const { centroId, updateCentroId } = useContext(CentroContext);
  const { data: centroComposterasData, loading, error } = useFetch(
    `https://pablo.informaticamajada.es/api/centro/${centroId}/composterasCentro`
  );

  const [openDialog, setOpenDialog] = useState(false);

  // Verificar si el usuario ya ha visto el mensaje
  useEffect(() => {
    const verAdvertencia = localStorage.getItem("verAdvertencia");
    if (!verAdvertencia) {
      setOpenDialog(true);
    }
  }, []);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    localStorage.setItem("verAdvertencia", "true"); // Guardar en localStorage
  };

  if (loading)
    return <p className="text-center text-gray-200">Cargando nombre del centro...</p>;
  if (error) return <p className="text-center text-red-400">Error: {error}</p>;

  const composteras = centroComposterasData;
  console.log("sdknaidadiadhaod",composteras);

  const centroNombre = composteras[0].centro.nombre;

  const centrosGuardados = JSON.parse(localStorage.getItem("centros")) || [];
  const centrosFiltrados = centrosGuardados.filter(
    (centro) => centro.nombre !== centroNombre
  );

  const handleChangeCentro = (e) => {
    const centroSeleccionado = e.target.value;
    const centro = centrosGuardados.find((centro) => centro.nombre === centroSeleccionado);

    if (centro) {
      updateCentroId(centro.id);
      navigate(`/${centro.id}`);
    }
  };

  return (
    <div className="flex flex-col flex-grow p-4">
      {/* Dialog de atención */}
      <Dialog
  className="bg-gray-200 dark:bg-gray-900"
  open={openDialog}
  handler={handleCloseDialog}
>
<DialogBody className="grid place-items-center gap-4 rounded-lg p-6 sm:pb-5 pb-[80px] max-h-[90vh] overflow-y-auto">
    {/* Título principal */}
    <h1 className="text-red-600 dark:text-red-400 text-2xl font-bold text-center">
      ⚠ Atención ⚠
    </h1>
    <hr className="w-full border-red-600 dark:border-red-400" />

    {/* Mensaje de advertencia */}
    <Typography className="text-black dark:text-white text-center font-normal">
      Esta aplicación aún está en <span className="text-red-600">fase de pruebas</span>, 
      por eso mismo al final de la misma encontrará un botón que debería redirigirle a nuestro correo: 
      <span className="text-green-700"> biocycle768@gmail.com</span>, en caso de que suceda algún error. 
    </Typography>
    <hr className="w-full border-gray-400 dark:border-gray-600" />

    {/* Errores conocidos */}
    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-300">Errores conocidos:</h2>
    <hr className="w-full border-gray-400 dark:border-gray-600" />
    <ul className="list-disc list-inside text-gray-800 dark:text-gray-400">
      <li> Solo se pueden subir imágenes desde un ordenador </li>
      <li> Número de las composteras </li>
      <li> <span className="text-red-600"> ¡El reporte de errores tiene que ser desde móvil! </span></li>
      <li> Por ahora <span className="text-yellow-400"> ¡Cierra la aplicación cuando termines de usarla! </span></li>
    </ul>

    {/* Novedades o cambios recientes */}
    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-300">🆕 Últimos cambios:</h2>
    <hr className="w-full border-gray-400 dark:border-gray-600" />
    <ul className="list-disc list-inside text-gray-800 dark:text-gray-400">
      <li>El campo de aporte ahora puede ser un decimal</li>
      <li>Explorar otros centros ahora está en la parte superior de la página</li>
    </ul>

    <p className="text-black dark:text-white text-center font-normal">¡Gracias por su paciencia!</p>

    {/* Botón de cierre */}
    <MaterialButton variant="gradient" onClick={handleCloseDialog} className="mb-6 sm:mb-0">
    Entendido
    </MaterialButton>

    {/* Versión en la parte inferior derecha */}
    <div className="absolute bottom-2 right-2 text-xs text-gray-500 dark:text-gray-400">
      v0.5
    </div>
  </DialogBody>
</Dialog>




      {/* Selector de centros */}
      <select
        onChange={handleChangeCentro}
        className="rounded-2xl text-center flex justify-center items-center bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-6 mb-4 shadow"
      >
        <option value="{nombre}">{centroNombre}</option>
        {centrosFiltrados.map((centro) => (
          <option key={centro.id} value={centro.nombre}>
            {centro.nombre}
          </option>
        ))}
      </select>

      {/* Lista de composteras */}
      <div className="flex flex-col flex-grow gap-4">
        {composteras.map((compostera) => (
          <CardCompostera
            key={compostera.id}
            type={compostera.tipo}
            estado={compostera.ocupada}
            id={compostera.id}
            onButtonClick={() => console.log(`Botón presionado en Compostera ${compostera.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
