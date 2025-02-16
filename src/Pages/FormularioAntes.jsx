import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaInfo } from "react-icons/fa";
import DescargarPDF from "../Pdf/FormularioAntesPDF"
import {
  Button as MaterialButton,
  Dialog,
  DialogBody,
  Typography,
} from "@material-tailwind/react";

export default function FormularioAntes() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [formData, setFormData] = useState(() => {
    // Cargar datos previos si existen en localStorage
    const savedData = localStorage.getItem("formularioAntes");
    return savedData ? JSON.parse(savedData) : {
      temp_ambiente: "",
      temp_compostera: "",
      nivel_llenado: "",
      olor: "",
      animales: false,
      tipo_animal: [],
      humedad: "",
      foto: "",
      observaciones: "",
    };
  });

  // const handleCheckboxChange = (e) => {
  //   const { value, checked } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     tipoInsecto: checked
  //       ? [...prev.tipoInsecto, value] // Agrega si está seleccionado
  //       : prev.tipoInsecto.filter((insecto) => insecto !== value), // Elimina si se deselecciona
  //   }));
  // };


  const handleChange = (e) => {
    const { name, value, type, checked, options } = e.target;
  
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
        ...(name === "animales" && !checked ? { tipo_animal: [] } : {}), // Si se desmarca "animales", limpia el array
      }));
    } else if (e.target.multiple) {
      // Si el input es un <select multiple>
      const selectedValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
  
      setFormData((prev) => ({
        ...prev,
        [name]: selectedValues,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    localStorage.setItem("formularioAntes", JSON.stringify(formData));
    navigate("/formularioDurante"); // Redirigir a siguiente formulario
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl shadow">
      <div className="relative p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-green-500 text-xl font-bold mb-4 text-center">
          Formulario de Antes para Compostera 1
        </h2>
        <FaInfo 
          className="absolute top-2 right-2 text-sky-600 cursor-pointer" 
          onClick={handleOpen} 
        />
      </div>

        <Dialog className="bg-gray-200 dark:bg-gray-900" open={open} handler={handleOpen}>
        <DialogBody className="grid place-items-center gap-4 rounded-lg p-6 sm:pb-5 pb-20 max-h-[90vh] overflow-y-auto">
          <Typography color="red" variant="h4">
            ¡Importante!
          </Typography>
          <Typography color="white" className="text-black dark:text-white text-center font-normal">
            Sigue estas indicaciones para completar el formulario correctamente:
          </Typography>
          <ul className="text-black dark:text-white text-sm list-disc pl-6 space-y-2">
            <li><b>Riego Realizado:</b> Si el compost está seco, añade agua hasta que tenga una humedad adecuada.</li>
            <li><b>Remoción Realizada:</b> Usa una pala o aireador para mezclar el material y mejorar la oxigenación.</li>
            <li><b>Aporte Verde:</b> Agrega residuos frescos como restos de frutas, verduras o césped recién cortado.</li>
            <li><b>Aporte Seco:</b> Añade materiales secos como hojas secas, cartón o aserrín para equilibrar la humedad.</li>
            <li><b>Cantidad Verde (kg):</b> Usa una báscula o estima la cantidad de material verde añadido.</li>
            <li><b>Tipo de Aporte Verde:</b> Especifica qué tipo de residuos verdes agregaste (ej. cáscaras de frutas, poda).</li>
            <li><b>Cantidad Seca (kg):</b> Usa una báscula o estima la cantidad de material seco añadido.</li>
            <li><b>Tipo de Aporte Seco:</b> Describe qué materiales secos agregaste (ej. hojas secas, papel triturado).</li>
            <li><b>Foto:</b> Toma una foto del compost para registrar su estado después de los aportes.</li>
            <li><b>Observaciones:</b> Anota cualquier cambio observado, como temperatura, humedad o presencia de insectos.</li>
          </ul>
          <MaterialButton variant="gradient" onClick={handleOpen}>
            Entendido
          </MaterialButton>
        </DialogBody>
      </Dialog>

        <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-black dark:text-white">
        Temperatura Ambiente:
            <input type="text" name="temp_ambiente" value={formData.temp_ambiente} onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700" />
          </label>

          <label className="block text-black dark:text-white">
          Temperatura Compost:
            <input type="text" name="temp_compostera" value={formData.temp_compostera} onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700" />
          </label>
          
          <label className="block text-black dark:text-white">
          Humedad:
            <select name="humedad" value={formData.humedad} onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700">
              <option value="">Seleccione</option>
              <option value="Defecto">Defecto</option>
              <option value="Buena">Buena</option>
              <option value="Exceso">Exceso</option>
            </select>
          </label>

          <label className="block text-black dark:text-white">
          Nivel de Llenado:
            <select name="nivel_llenado" value={formData.nivel_llenado} onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700">
              <option value="0%">0%</option>
              <option value="10%">10%</option>
              <option value="20%">20%</option>
              <option value="30%">30%</option>
              <option value="40%">40%</option>
              <option value="50%">50%</option>
              <option value="60%">60%</option>
              <option value="70%">70%</option>
              <option value="80%">80%</option>
              <option value="90%">90%</option>
              <option value="100%">100%</option>
            </select>
          </label>

          <label className="block text-black dark:text-white">
          Olor:
            <select name="olor" value={formData.olor} onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700">
              <option value="">Seleccione</option>
              <option value="Inoloro">Sin olor</option>
              <option value="Cuadra">Cuadra</option>
              <option value="Agradable">Agradable</option>
              <option value="Desagradable">Desagradable</option>
            </select>
          </label>

          <label className="block text-black dark:text-white">
          <input type="checkbox" name="animales" checked={formData.animales} onChange={handleChange} className="mr-2" />
            Presencia de animales o insectos
          </label>

          {formData.animales && (
            <div className="grid grid-cols-2 gap-4 mt-2">
              <select multiple name="tipo_animal"  value={formData.tipo_animal} onChange={handleChange} id="animal" className="w-full p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700 h-32">
                <option value="Mosca">Mosca</option>
                <option value="Mosquita">Mosquita</option>
                <option value="Raton">Raton</option>
                <option value="Cucaracha">Cucaracha</option>
                <option value="Larvas">Larvas</option>
                <option value="Otros">Otros (Especifica cuales)</option>
              </select>
            </div>
          )}

          <label className="block text-black dark:text-white">
            Foto:
            <input
              type="file"
              accept="image/*"
              name="foto"
              value={formData.foto}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
            />
          </label>

          <label className="block text-black dark:text-white">
              Observaciones:
            <textarea placeholder="Rellena con cualquier cosa que consideres relevante, por ejemplo: tipo de animales" name="observaciones" value={formData.observaciones} onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700" rows="3"></textarea>
          </label>

          <div className="flex justify-between">
            <Link to={`/`}>
              <button className="bg-gray-900 px-4 py-2 rounded-lg border border-transparent hover:border-indigo-400 text-white cursor-pointer">
                Volver a Composteras
              </button>
            </Link>

            <button className="bg-gray-900 px-4 py-2 rounded-lg border border-transparent hover:border-indigo-400 text-white cursor-pointer">
            Siguiente Formulario
            </button>
          </div>
        </form>
        <DescargarPDF />
      </div>
    </div>
  );
}