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
        <DialogBody className="relative grid place-items-center gap-4 rounded-lg p-6 max-h-[90vh] overflow-y-auto">
          {/* Título principal */}
          <h1 className="text-red-600 dark:text-red-400 text-2xl font-bold text-center">
            ⚠ Atención ⚠
            <hr />
          </h1>

          {/* Mensaje de advertencia */}
          <Typography className="text-black dark:text-white text-center font-normal">
            Esta aplicación aún está en <label className="text-red-600">fase de pruebas</label>, 
            por eso mismo al final de la misma encontrará un botón que debería redirigirle a nuestro correo: 
            <label className="text-green-700"> biocycle768@gmail.com</label>, en caso de que suceda algún error. <hr />

            ¡Gracias por su paciencia!
          </Typography>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-300">Errores conocidos:<hr /></h2>
          <ul className="list-disc list-inside text-gray-800 dark:text-gray-400">
          <li> Solo se pueden subir imágenes desde un ordenador </li>
          <li> Por ahora <label className="text-yellow-400"> ¡Cierra la aplicación cuando termines de usarla! </label></li>
          </ul>

          {/* Novedades o cambios recientes */}
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-300">
            🆕 Cambios desde la presentación: <hr />
          </h2>
          <ul className="list-disc list-inside text-gray-800 dark:text-gray-400">
            <li>Botón de error para contactar con nosotros</li>
            <li>Ahora no puedes ver bolos de otros centros desde bolos</li>
            <li> Error que te obligaba a volver a iniciar sesión al salir de una compostera</li>
          </ul>

          {/* Botón de cierre */}
          <MaterialButton variant="gradient" onClick={handleCloseDialog}>
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
