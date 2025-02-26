import { useState, useContext, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button as MaterialButton, Dialog, DialogBody, Typography } from "@material-tailwind/react";
import { FaInfo } from "react-icons/fa";
import { FormulariosContext } from "../Providers/FormularioProvider"; 
import axios from "axios";

export default function FormularioDurante() {
  // 1. Obtenemos el estado y el dispatch desde el Context.
  //    `datosDurante` es la parte del state que representa el formulario “durante”.
  //    Si no existe, usamos un objeto por defecto.
  const { state, dispatch, id } = useContext(FormulariosContext);
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  //Aqui vamos a obtener el id del ultimo registro + 1 para que asi no haya que hacer 1 llamada a la api de mas 

  const idRegistro = async () => {
    try {
      const { data } = await axios.get(`https://pablo.informaticamajada.es/api/ultimoRegistro`, {
        headers: {
            "Authorization": `Bearer ${authToken}`,
        },
      });
      return data;
    } catch (error) {
      console.error("Error en la petición:", error);
      return null;
    }
  };
  
  const obtenerNuevoId = async () => {
    const RegistroData = await idRegistro();
    console.log("Holaaaa", RegistroData)
    if (!RegistroData) {
      console.log("No se pudo obtener el ID del ultimo registro.");
      return null;
    }
    let nuevoId;
    if(RegistroData.id === null){
      nuevoId = 1;
    }
    else{
      nuevoId = RegistroData.id + 1 // Sumamos 1 porque va a ser el id del 
    }
    console.log("Nuevo ID del registro:", nuevoId);
  
    // Evita actualizar si el ID ya está asignado
    if (!state.registro_id) {
      dispatch({ type: "añadirId_registro", payload: nuevoId });
    }
  
    return nuevoId;
  };
  
  // Ejecutar la función solo cuando ciclo_id sea null
  useEffect(() => {
    if (!state.registro_id) {
      obtenerNuevoId();
    }
  }, [state.registro_id]);

  // El “formData” real está en `state.datosDurante`
  const formData = state.datosDurante || {
    riego: false,
    remover: false,
    aporte_verde: false,
    aporte_seco: false,
    cantidad_aporteVLitros: "",
    cantidad_aporteVKilos: "",
    tipo_aporteV: "",
    cantidad_aporteSLitros: "",
    cantidad_aporteSKilos: "",
    tipo_aporteS: "",
    foto: "",
    observaciones: "",
  };

  // 2. Manejamos la apertura/cierre del diálogo informativo.
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  // 3. Manejo de cambios en los inputs y checkboxes.
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let updatedFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };

    // Si desmarcamos “aporte_verde”, limpiamos sus subcampos
    if (name === "aporte_verde" && !checked) {
      updatedFormData.cantidad_aporteVLitros = "";
      updatedFormData.cantidad_aporteVKilos = "";
      updatedFormData.tipo_aporteV = "";
    }

    // Si desmarcamos “aporte_seco”, limpiamos sus subcampos
    if (name === "aporte_seco" && !checked) {
      updatedFormData.cantidad_aporteSLitros = "";
      updatedFormData.cantidad_aporteSKilos = "";
      updatedFormData.tipo_aporteS = "";
    }

    // Despachamos la acción para actualizar “datosDurante”
    dispatch({
      type: "añadirDatos_durante", // Ajusta según tu reducer
      payload: updatedFormData,
    });
  };

  // 4. Al enviar, simplemente navegamos al siguiente formulario (después).
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/formularioDespues/${id}`);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Actualizas tu estado global con el objeto File
    dispatch({
      type: "añadirDatos_durante",
      payload: {
        ...state.datosDurante,
        foto: file,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl shadow">
        <div className="relative p-6 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-green-500 text-xl font-bold mb-4 text-center">
            Formulario Durante para Compostera {id}
          </h2>
          <FaInfo className="absolute top-2 right-2 text-sky-600 cursor-pointer" onClick={handleOpen} />
        </div>

        {/* Dialogo informativo */}
        <Dialog className="bg-gray-200 dark:bg-gray-900" open={open} handler={handleOpen}>
          <DialogBody className="grid place-items-center gap-4 rounded-lg p-6 sm:pb-5 pb-20 max-h-[90vh] overflow-y-auto">
            <Typography color="red" variant="h4">
              ¡Importante!
            </Typography>
            <Typography color="white" className="text-black dark:text-white text-center font-normal">
              Sigue estos pasos antes de completar el formulario:
            </Typography>
            <ul className="text-black dark:text-white text-sm list-disc pl-6 space-y-2">
              <li><b>Riego Realizado:</b> Verifica si el compost está seco. Si es necesario, añade agua.</li>
              <li><b>Remoción Realizada:</b> Mezcla el compost para mejorar la oxigenación.</li>
              <li><b>Aporte Verde:</b> Agrega restos frescos como cáscaras de frutas.</li>
              <li><b>Aporte Seco:</b> Añade hojas secas, cartón troceado, etc.</li>
              <li><b>Cantidad Verde (kg):</b> Usa una báscula o estima la cantidad.</li>
              <li><b>Tipo de Aporte Verde:</b> Observa qué materiales verdes agregaste.</li>
              <li><b>Cantidad Seca (kg):</b> Usa una báscula o estima la cantidad.</li>
              <li><b>Tipo de Aporte Seco:</b> Especifica qué materiales secos usaste.</li>
              <li><b>Foto:</b> Toma una foto del compost para registrar su estado.</li>
              <li><b>Observaciones:</b> Anota cualquier detalle inusual.</li>
            </ul>
            <MaterialButton variant="gradient" onClick={handleOpen}>
              Entendido
            </MaterialButton>
          </DialogBody>
        </Dialog>

        {/* Formulario */}
        <form encType="multipart/form-data" onSubmit={handleSubmit} className="space-y-4">
          {/* Checkbox opciones */}
          <div className="space-y-2">
            <label className="flex items-center text-black dark:text-white">
              <input
                type="checkbox"
                name="riego"
                checked={formData.riego}
                onChange={handleChange}
                className="mr-2"
              />
              Riego Realizado
            </label>

            <label className="flex items-center text-black dark:text-white">
              <input
                type="checkbox"
                name="remover"
                checked={formData.remover}
                onChange={handleChange}
                className="mr-2"
              />
              Remoción Realizada
            </label>

            <label className="flex items-center text-black dark:text-white">
              <input
                type="checkbox"
                name="aporte_verde"
                checked={formData.aporte_verde}
                onChange={handleChange}
                className="mr-2"
              />
              Aporte Verde
            </label>

            {formData.aporte_verde && (
              <div className="grid grid-cols-2 gap-4 mt-2">
                <label className="block text-black dark:text-white">
                  Cantidad Verde (L):
                  <input
                    required
                    max="100"
                    type="number"
                    name="cantidad_aporteVLitros"
                    value={formData.cantidad_aporteVLitros}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
                  />
                </label>

                <label className="block text-black dark:text-white">
                  Cantidad Verde (kg):
                  <input
                    type="number"
                    max="100"
                    name="cantidad_aporteVKilos"
                    value={formData.cantidad_aporteVKilos}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
                  />
                </label>

                <label className="block text-black dark:text-white">
                  Tipo de Aporte Verde:
                  <input
                    type="text"
                    name="tipo_aporteV"
                    value={formData.tipo_aporteV}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
                  />
                </label>
              </div>
            )}

            <label className="flex items-center text-black dark:text-white">
              <input
                type="checkbox"
                name="aporte_seco"
                checked={formData.aporte_seco}
                onChange={handleChange}
                className="mr-2"
              />
              Aporte Seco
            </label>

            {formData.aporte_seco && (
              <div className="grid grid-cols-2 gap-4 mt-2">
                <label className="block text-black dark:text-white">
                  Cantidad Seco (L):
                  <input
                    required
                    max="100"
                    type="number"
                    name="cantidad_aporteSLitros"
                    value={formData.cantidad_aporteSLitros}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
                  />
                </label>

                <label className="block text-black dark:text-white">
                  Cantidad Seco (kg):
                  <input
                    type="number"
                    max="100"
                    name="cantidad_aporteSKilos"
                    value={formData.cantidad_aporteSKilos}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
                  />
                </label>

                <label className="block text-black dark:text-white">
                  Tipo de Aporte Seco:
                  <input
                    type="text"
                    name="tipo_aporteS"
                    value={formData.tipo_aporteS}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
                  />
                </label>
              </div>
            )}
          </div>

          {/* Campo Foto */}
          <label className="block text-black dark:text-white">
            Foto:
            <input
              type="file"
              accept="image/*"
              name="foto"
              // El value de un input de tipo file no se maneja directamente. 
              // Si necesitas almacenar la ruta/URL, lo harás en handleChange.
              onChange={handleFileChange}
              className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
            />
          </label>

          {/* Observaciones */}
          <label className="block text-black dark:text-white">
            Observaciones:
            <textarea
              placeholder="Rellena con cualquier cosa relevante (ej. plagas, olor, etc.)"
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
              rows="3"
            ></textarea>
          </label>

          {/* Botones de Navegación */}
          <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 w-full">
            <Link to={`/FormularioAntes/${id}`} className="w-full sm:w-auto">
              <button
                type="button"
                className="bg-green-700 hover:bg-green-800 transition-colors px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-white text-sm sm:text-base cursor-pointer w-full sm:w-auto"
              >
                Volver a Antes
              </button>
            </Link>

            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 transition-colors px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-white text-sm sm:text-base cursor-pointer w-full sm:w-auto"
            >
              Siguiente Formulario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}