import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import larvas from "../images/larvas.jpg";
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
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [formData, setFormData] = useState(() => {
    // Cargar datos previos si existen en localStorage
    const savedData = localStorage.getItem("formularioAntes");
    return savedData ? JSON.parse(savedData) : {
      temperaturaAmbiente: "",
      temperaturaCompost: "",
      nivelLlenado: "",
      olor: "",
      insectos: false,
      tipoInsecto: [],
      humedad: "",
      fotos: "",
      observaciones: "",
    };
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
      ...(name === "insectos" && !checked ? { tipoInsecto: [] } : {}),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    localStorage.setItem("formularioAntes", JSON.stringify(formData));
    navigate("/formularioDurante"); // Redirigir a siguiente formulario
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-green-500 text-xl font-bold mb-4 text-center">
          Formulario de Antes para Compostera 1
        </h2>
        <FaInfo className="absolute top-2 right-2 text-sky-600 cursor-pointer" onClick={handleOpen} />

        <ComponenteDialog open={open} handleOpen={handleOpen} title="¡Importante!" content={
          <ul className="text-white text-sm list-disc pl-6 space-y-2">
            <li><b>Riego Realizado:</b> Si el compost está seco, añade agua.</li>
            <li><b>Remoción Realizada:</b> Usa una pala para oxigenar.</li>
            <li><b>Aporte Verde:</b> Agrega residuos frescos.</li>
            <li><b>Aporte Seco:</b> Añade hojas secas o cartón.</li>
          </ul>
        } />

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-white">
            Temperatura Ambiente:
            <input type="text" name="temperaturaAmbiente" value={formData.temperaturaAmbiente} onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700" />
          </label>

          <label className="block text-white">
            Temperatura Compost:
            <input type="text" name="temperaturaCompost" value={formData.temperaturaCompost} onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700" />
          </label>

          <label className="block text-white">
            Nivel de Llenado:
            <select name="nivelLlenado" value={formData.nivelLlenado} onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700">
              <option value="">Seleccione</option>
              <option value="Bajo">Bajo</option>
              <option value="Medio">Medio</option>
              <option value="Alto">Alto</option>
            </select>
          </label>

          <label className="block text-white">
            Olor:
            <select name="olor" value={formData.olor} onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700">
              <option value="">Seleccione</option>
              <option value="Neutro">Neutro</option>
              <option value="Fuerte">Fuerte</option>
              <option value="Desagradable">Desagradable</option>
            </select>
          </label>

          <label className="flex items-center text-white">
            <input type="checkbox" name="insectos" checked={formData.insectos} onChange={handleChange} className="mr-2" />
            Insectos
          </label>

          {formData.insectos && (
            <div className="grid grid-cols-2 gap-4 mt-2">
              {insectosOpciones.map((insecto) => (
                <label key={insecto.id} className={`relative cursor-pointer rounded-lg overflow-hidden ${
                  formData.tipoInsecto.includes(insecto.id) ? "border-4 border-green-600" : "border-4 border-transparent"
                }`}>
                  <input type="checkbox" name="tipoInsecto" value={insecto.id} checked={formData.tipoInsecto.includes(insecto.id)}
                    onChange={handleCheckboxChange} className="hidden" />
                  <img src={insecto.imagen} alt={insecto.nombre} className="w-full h-32 object-cover rounded-lg" />
                  <div className="absolute bottom-0 w-full bg-black/50 text-white text-center py-1">{insecto.nombre}</div>
                </label>
              ))}
            </div>
          )}

          <label className="block text-white">
            Observaciones:
            <textarea name="observaciones" value={formData.observaciones} onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700" rows="3"></textarea>
          </label>

          <div className="flex justify-between">
            <Link to={`/`}>
              <button className="bg-gray-900 px-4 py-2 rounded-lg border border-transparent hover:border-indigo-400 text-white">
                Volver a Composteras
              </button>
            </Link>

            <button type="submit" className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg">
              Siguiente Formulario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
