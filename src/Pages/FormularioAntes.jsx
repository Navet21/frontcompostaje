import { useContext, useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CentroContext } from "../Providers/CentroProvider";
import { FaInfo } from "react-icons/fa";
import {
  Button as MaterialButton,
  Dialog,
  DialogBody,
  Typography,
} from "@material-tailwind/react";
import { FormulariosContext } from "../Providers/FormularioProvider";
import axios from "axios";

export default function FormularioAntes() {
  // Obtenemos el state (que contiene datosAntes) y dispatch para enviar acciones al reducer
  const { state, dispatch, id } = useContext(FormulariosContext);
  const authToken = localStorage.getItem("authToken");
  const { centroId } = useContext(CentroContext); // Usamos el contexto

  //Obtenemos el id del ciclo en el formulario de antes para aligerar la carga de datos en la insercion del registro
  const idCiclo = async () => {
    try {
      const { data } = await axios.get(`https://pablo.informaticamajada.es/api/ultimoCiclo/${id}`, {
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
    const cicloData = await idCiclo();
    if (!cicloData) {
      console.log("No se pudo obtener el ID del ciclo.");
      return null;
    }
    const nuevoId = cicloData.id;
    console.log("Nuevo ID del ciclo:", nuevoId);
  
    // Evita actualizar si el ID ya está asignado
    if (!state.ciclo_id) {
      dispatch({ type: "añadirId_ciclo", payload: nuevoId });
    }
  
    return nuevoId;
  };
  
  // Ejecutar la función solo cuando ciclo_id sea null
  useEffect(() => {
    if (!state.ciclo_id) {
      obtenerNuevoId();
    }
  }, [state.ciclo_id]);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [imagePreview, setImagePreview] = useState(null); // Para almacenar la vista previa de la imagen

  // Accedemos a los datos de "antes" desde el estado global.
  // Si está vacío, usamos un objeto por defecto.
  const formData = state.datosAntes || {
    temp_ambiente: "",
    temp_compostera: "",
    humedad: "",
    nivel_llenado: "",
    olor: "",
    animales: false,
    tipo_animal: [],
    foto: "",
    observaciones: "",
  };

  // Opciones de insectos/animales
  const insectosOpciones = useMemo(
    () => [
      { label: "Mosca", value: "mosca" },
      { label: "Mosquita", value: "mosquita" },
      { label: "Ratón", value: "raton" },
      { label: "Cucaracha", value: "cucaracha" },
      { label: "Larvas", value: "larvas" },
      { label: "Otro", value: "otro" },
    ],
    []
  );

  // Manejo de cambios en los inputs y checkboxes principales
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Creamos un nuevo objeto con la actualización del campo
    let updatedFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };

    // Si se desmarca el checkbox de animales, borramos la lista de tipo_animal
    if (name === "animales" && !checked) {
      updatedFormData.tipo_animal = [];
    }

    // Despachamos la acción para actualizar el estado global (datosAntes)
    dispatch({
      type: "añadirDatos_antes", // o el nombre que uses en tu reducer
      payload: updatedFormData,
    });
  };

  // Manejo de checkboxes para los insectos/animales específicos
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target; 
    // value será "mosca", "mosquita", etc.
  
    const updatedTipoAnimal = [...(formData.tipo_animal || [])];
    if (checked && !updatedTipoAnimal.includes(value)) {
      updatedTipoAnimal.push(value);
    } else if (!checked) {
      const index = updatedTipoAnimal.indexOf(value);
      if (index !== -1) {
        updatedTipoAnimal.splice(index, 1);
      }
    }

    // Despachamos la acción para actualizar "datosAntes"
    dispatch({
      type: "añadirDatos_antes",
      payload: {
        ...formData,
        tipo_animal: updatedTipoAnimal,
      },
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    // Crear una URL temporal para la vista previa
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl); // Guardar la URL en el estado para mostrar la vista previa
  
    // Actualizamos el estado global con el archivo
    dispatch({
      type: "añadirDatos_antes",
      payload: {
        ...state.datosAntes,
        foto: file,
      },
    });
  };

  // Al enviar, simplemente navegamos al formulario "durante"
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/formularioDurante/${id}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl shadow">
        <div className="relative p-6 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-green-500 text-xl font-bold mb-4 text-center">
            Formulario de Antes
          </h2>
          <FaInfo
            className="absolute top-2 right-2 text-sky-600 cursor-pointer"
            onClick={handleOpen}
          />
        </div>

        <Dialog
          className="bg-gray-200 dark:bg-gray-900"
          open={open}
          handler={handleOpen}
        >
          <DialogBody className="grid place-items-center gap-4 rounded-lg p-6 sm:pb-5 pb-20 max-h-[90vh] overflow-y-auto">
            <Typography color="red" variant="h4">
              ¡Importante!
            </Typography>
            <Typography className="text-black dark:text-white text-center font-normal">
              Sigue estas indicaciones para completar el formulario correctamente:
            </Typography>
            <ul className="text-black dark:text-white text-sm list-disc pl-6 space-y-2">
              <li>
                <b>Temperatura:</b> Registra la temperatura ambiente y la de la compostera.
              </li>
              <li>
                <b>Humedad:</b> Señala si la humedad del compost es buena, está en defecto o en exceso.
              </li>
              <li>
                <b>Nivel de Llenado:</b> Indica el porcentaje de llenado de la compostera.
              </li>
              <li>
                <b>Olor:</b> Describe si el compost tiene olor agradable o desagradable.
              </li>
              <li>
                <b>Presencia de Animales:</b> Si hay insectos o roedores, márcalo y especifica cuáles.
              </li>
              <li>
                <b>Observaciones:</b> Anota cualquier detalle relevante sobre el compost.
              </li>
            </ul>
            <MaterialButton variant="gradient" onClick={handleOpen}>
              Entendido
            </MaterialButton>
          </DialogBody>
        </Dialog>
                <form encType="multipart/form-data"  onSubmit={handleSubmit} className="space-y-4">
                    <label className="block text-black dark:text-white">
                        Temperatura Ambiente:
                        <input
                            type="number"
                            max="60"
                            name="temp_ambiente"
                            value={formData.temp_ambiente}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 rounded border border-gray-700"
                        />
                    </label>
          <label className="block text-black dark:text-white">
            Temperatura Compost:
            <input
              type="number"
              max="100"
              name="temp_compostera"
              value={formData.temp_compostera}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded border border-gray-700"
            />
          </label>

          <label className="block text-black dark:text-white">
            Humedad:
            <select
              name="humedad"
              value={formData.humedad}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded border border-gray-700 bg-gray-100 dark:bg-gray-900 text-black dark:text-white"
            >
              <option value="">Seleccione</option>
              <option value="Defecto">Defecto</option>
              <option value="Buena">Buena</option>
              <option value="Exceso">Exceso</option>
            </select>
          </label>

          <label className="block text-black dark:text-white">
            Nivel de Llenado:
            <select
              name="nivel_llenado"
              value={formData.nivel_llenado}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded border border-gray-700 bg-gray-100 dark:bg-gray-900 text-black dark:text-white"
            >
              <option value="">Seleccione</option>
              <option value="0%">0%</option>
              <option value="5%">5%</option>
              <option value="10%">10%</option>
              <option value="15%">15%</option>
              <option value="20%">20%</option>
              <option value="25%">25%</option>
              <option value="30%">30%</option>
              <option value="35%">35%</option>
              <option value="40%">40%</option>
              <option value="45%">45%</option>
              <option value="50%">50%</option>
              <option value="55%">55%</option>
              <option value="60%">60%</option>
              <option value="65%">65%</option>
              <option value="70%">70%</option>
              <option value="75%">75%</option>
              <option value="80%">80%</option>
              <option value="85%">85%</option>
              <option value="90%">90%</option>
              <option value="95%">95%</option>
              <option value="100%">100%</option>
            </select>
          </label>


          <label className="block text-black dark:text-white">
            Olor:
            <select
              name="olor"
              value={formData.olor}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded border border-gray-700 bg-gray-100 dark:bg-gray-900 text-black dark:text-white"
            >
              <option value="">Seleccione</option>
              <option value="sin olor">Sin olor</option>
              <option value="cuadra">Cuadra</option>
              <option value="agradable">Agradable</option>
              <option value="desagradable">Desagradable</option>
            </select>
          </label>

          <label className="block text-black dark:text-white">
            <input
              type="checkbox"
              name="animales"
              checked={formData.animales}
              onChange={handleChange}
              className="mr-2"
            />
            Presencia de animales o insectos
          </label>

          {formData.animales && (
  <div className="grid grid-cols-2 gap-4 mt-2">
    {insectosOpciones.map(({ label, value }) => (
      <label
        key={value}
        className="flex items-center gap-2 cursor-pointer p-3 border-2 rounded-lg transition-all 
                   dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 
                   bg-gray-100 border-gray-300 hover:bg-gray-200"
      >
        <input
          type="checkbox"
          name="tipo_animal"
          value={value}
          checked={formData.tipo_animal?.includes(value)}
          onChange={handleCheckboxChange}
          className="hidden peer"
        />
        <div className="w-5 h-5 border-2 border-gray-400 rounded-md flex items-center justify-center 
                        peer-checked:border-blue-500 peer-checked:bg-blue-500">
          <svg
            className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12l4 4L19 7" />
          </svg>
        </div>
        <span className="text-gray-700 dark:text-gray-300">{label}</span>
      </label>
    ))}
  </div>
)}


          <label className="block text-black dark:text-white">
            Foto:
            <input
              type="file"
              accept="image/jpeg, image/png, image/heic, image/heif"
              name="foto"
              // Aquí, si quieres manejar la URL de la imagen u otro proceso,
              // podrías hacerlo en onChange, pero lo normal es guardarlo en formData
              // y tratarlo cuando envíes los datos a la API, etc.
              onChange={handleFileChange}
              className="w-full mt-1 p-2 rounded border border-gray-700"
            />
          </label>

          {imagePreview && (
  <div className="mt-4">
    <p className="text-black dark:text-white">Vista previa de la imagen:</p>
    <img
      src={imagePreview}
      alt="Vista previa"
      className="w-full h-auto mt-2 rounded"
    />
  </div>
)}

          <label className="block text-black dark:text-white">
            Observaciones:
            <textarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded border border-gray-700"
              rows="3"
            ></textarea>
          </label>

          <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4">
            <Link to={`/${centroId}`} className="w-full sm:w-auto">
              <button className="bg-green-700 hover:bg-green-800 transition-colors px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-white text-sm sm:text-base cursor-pointer w-full sm:w-auto">
                Volver
              </button>
            </Link>
            <button className="bg-green-700 hover:bg-green-800 transition-colors px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-white text-sm sm:text-base cursor-pointer w-full sm:w-auto">
              Siguiente Formulario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
