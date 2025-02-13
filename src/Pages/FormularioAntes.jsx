import { useState } from "react";
import { Link } from "react-router-dom";
import larvas from "../images/larvas.jpg"
import hormigas from "../images/hormigas.jpg";
import mosquitos from "../images/mosquitos.jpg";
import gusanos from "../images/gusano.jpg";
import React from "react";
import { FaInfo} from "react-icons/fa";

import {
  Button,
  Dialog,
  DialogBody,
  Typography,
} from "@material-tailwind/react";

export default function FormularioAntes() {

  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);

  const [formData, setFormData] = useState({
    temperaturaAmbiente: "",
    temperaturaCompost: "",
    nivelLlenado: "",
    olor: "",
    insectos: false,
    tipoInsecto: "",
    humedad: "",
    fotos: "",
    observaciones: "",
  });

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      tipoInsecto: checked
        ? [...prev.tipoInsecto, value] // Agrega si está seleccionado
        : prev.tipoInsecto.filter((insecto) => insecto !== value), // Elimina si se deselecciona
    }));
  };

  const insectosOpciones = [
    { id: "larva", nombre: "Larvas", imagen: larvas },
    { id: "hormiga", nombre: "Hormigas", imagen: hormigas },
    { id: "mosquito", nombre: "Mosquitos", imagen: mosquitos },
    { id: "gusano", nombre: "Gusanos", imagen: gusanos },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "insectos" && !checked ? { tipoInsecto: "" } : {}),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl">
      <div className="relative bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-green-500 text-xl font-bold mb-4 text-center">
          Formulario de Antes para Compostera 1
        </h2>
        <FaInfo 
          className="absolute top-2 right-2 text-sky-600 cursor-pointer" 
          onClick={handleOpen} 
        />
      </div>


      <Dialog className="bg-gray-900" open={open} handler={handleOpen}>
  <DialogBody className="grid place-items-center gap-4 rounded-lg p-6 pb-20 max-h-[90vh] overflow-y-auto">
    <Typography color="red" variant="h4">
      ¡Importante!
    </Typography>
    <Typography color="white" className="text-center font-normal">
      Sigue estas indicaciones para completar el formulario correctamente:
    </Typography>
    <ul className="text-white text-sm list-disc pl-6 space-y-2">
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
    <Button variant="gradient" onClick={handleOpen}>
      Entendido
    </Button>
  </DialogBody>
</Dialog>



        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Temperatura Ambiente */}
          <label className="block text-white">
            Temperatura Ambiente:
            <input
              type="text"
              name="temperaturaAmbiente"
              value={formData.temperaturaAmbiente}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700"
            />
          </label>

          {/* Temperatura Compost */}
          <label className="block text-white">
            Temperatura Compost:
            <input
              type="text"
              name="temperaturaCompost"
              value={formData.temperaturaCompost}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700"
            />
          </label>

          {/* Nivel de Llenado */}
          <label className="block text-white">
            Nivel de Llenado:
            <select
              name="nivelLlenado"
              value={formData.nivelLlenado}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700"
            >
              <option value="">Seleccione</option>
              <option value="Bajo">Bajo</option>
              <option value="Medio">Medio</option>
              <option value="Alto">Alto</option>
            </select>
          </label>

          {/* Olor */}
          <label className="block text-white">
            Olor:
            <select
              name="olor"
              value={formData.olor}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700"
            >
              <option value="">Seleccione</option>
              <option value="Neutro">Neutro</option>
              <option value="Fuerte">Fuerte</option>
              <option value="Desagradable">Desagradable</option>
            </select>
          </label>

          {/* Insectos Checkbox */}
          <label className="flex items-center text-white">
            <input
              type="checkbox"
              name="insectos"
              checked={formData.insectos}
              onChange={handleChange}
              className="mr-2"
            />
            Insectos
          </label>

          {/* Opciones de insectos */}
          {formData.insectos && (
            <div className="grid grid-cols-2 gap-4 mt-2">
            {insectosOpciones.map((insecto) => (
              <label
                key={insecto.id}
                className={`relative cursor-pointer rounded-lg overflow-hidden ${
                  formData.tipoInsecto.includes(insecto.id) ? "border-4 border-green-600" : "border-4 border-transparent"
                }`}
              >
                {/* Checkbox oculto */}
                <input
                  type="checkbox"
                  name="tipoInsecto"
                  value={insecto.id}
                  checked={formData.tipoInsecto.includes(insecto.id)}
                  onChange={handleCheckboxChange}
                  className="hidden"
                />
          
                {/* Imagen de fondo */}
                <img src={insecto.imagen} alt={insecto.nombre} className="w-full h-32 object-cover rounded-lg" />
          
                {/* Nombre del insecto con fondo */}
                <div className="absolute bottom-0 w-full bg-black/50 text-white text-center py-1">
                  {insecto.nombre}
                </div>
              </label>
            ))}
          </div>
          )}

          {/* Humedad */}
          <label className="block text-white">
            Humedad:
            <select
              name="humedad"
              value={formData.humedad}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700"
            >
              <option value="">Seleccione</option>
              <option value="Seca">Seca</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </select>
          </label>

          {/* Fotos Iniciales */}
          <label className="block text-white">
            Fotos Iniciales (URL):
            <input
              type="text"
              name="fotos"
              value={formData.fotos}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700"
            />
          </label>

          {/* Observaciones */}
          <label className="block text-white">
            Observaciones Iniciales:
            <textarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700"
              rows="3"
            ></textarea>
          </label>
          <div>
            <Link to={`/`}>
            <button className="rounded-lg border border-transparent px-4 py-2 text-base font-medium bg-gray-900 cursor-pointer transition-colors duration-300 hover:border-indigo-400 focus:outline focus:outline-4 focus:outline-blue-500">
            Volver a Composteras
              </button>
            </Link>
            <Link to={`/formularioDurante/`}>
            <button className="rounded-lg border border-transparent px-4 py-2 text-base font-medium bg-gray-900 cursor-pointer transition-colors duration-300 hover:border-indigo-400 focus:outline focus:outline-4 focus:outline-blue-500">
            Siguiente Formulario
              </button>
            </Link>
          </div>
          {/* Botón de Enviar */}
          
        </form>
      </div>
    </div>
  );
}