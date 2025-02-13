import { useState } from "react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import {
    Button as MaterialButton,
    Dialog,
    DialogBody,
    Typography,
} from "@material-tailwind/react";
import React from "react";
import { FaInfo} from "react-icons/fa";


export default function FormularioDurante() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(() => {
        // Cargar datos previos si existen en localStorage
        const savedData = localStorage.getItem("formularioDurante");
        return savedData ? JSON.parse(savedData) : {
            riego: false,
            remocion: false,
            aporteVerde: false,
            aporteSeco: false,
            cantidadVerde: "",
            tipoAporteVerde: "",
            cantidadSeca: "",
            tipoAporteSeco: "",
            foto: "",
            observaciones: "",
        };
    });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    localStorage.setItem("formularioDurante", JSON.stringify(formData));
    navigate("/formularioDespues"); 
};

const [open, setOpen] = React.useState(false);

const handleOpen = () => setOpen(!open);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl shadow">
        <div className="relative p-6 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-green-500 text-xl font-bold mb-4 text-center">
            Formulario Durante para Compostera 1
          </h2>
          <FaInfo
            className="absolute top-2 right-2 text-sky-600 cursor-pointer"
            onClick={handleOpen}
          />
        </div>

        <Dialog className="bg-gray-200 dark:bg-gray-900" open={open} handler={handleOpen}>
          <DialogBody className="grid place-items-center gap-4 rounded-lg p-6 pb-20 max-h-[90vh] overflow-y-auto">
            <Typography color="red" variant="h4">
              ¡Importante!
            </Typography>
            <Typography color="white" className="text-black dark:text-white text-center font-normal">
              Sigue estos pasos antes de completar el formulario:
            </Typography>
            <ul className="text-black dark:text-white text-sm list-disc pl-6 space-y-2">
              <li><b>Riego Realizado:</b> Verifica si el compost está seco. Si es necesario, añade agua hasta que esté húmedo pero sin encharcar.</li>
              <li><b>Remoción Realizada:</b> Mezcla el compost con una pala o aireador para mejorar la oxigenación.</li>
              <li><b>Aporte Verde:</b> Agrega restos frescos como cáscaras de frutas, verduras o césped recién cortado.</li>
              <li><b>Aporte Seco:</b> Añade hojas secas, aserrín o cartón troceado para equilibrar la humedad.</li>
              <li><b>Cantidad Verde (kg):</b> Usa una báscula o estima la cantidad de material verde añadido.</li>
              <li><b>Tipo de Aporte Verde:</b> Observa qué materiales verdes agregaste (ej. cáscaras de plátano, restos de lechuga).</li>
              <li><b>Cantidad Seca (kg):</b> Usa una báscula o estima la cantidad de material seco añadido.</li>
              <li><b>Tipo de Aporte Seco:</b> Especifica qué materiales secos usaste (ej. hojas secas, cartón, paja).</li>
              <li><b>Foto:</b> Toma una foto del compost para registrar su estado actual.</li>
              <li><b>Observaciones:</b> Anota si notaste algo inusual, como mal olor, plagas o cambios en la textura.</li>
            </ul>
            <MaterialButton variant="gradient" onClick={handleOpen}>
              Entendido
            </MaterialButton>
          </DialogBody>
        </Dialog>

        <form onSubmit={handleSubmit} className="space-y-4">
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
                name="remocion"
                checked={formData.remocion}
                onChange={handleChange}
                className="mr-2"
              />
              Remoción Realizada
            </label>

            <label className="flex items-center text-black dark:text-white">
              <input
                type="checkbox"
                name="aporteVerde"
                checked={formData.aporteVerde}
                onChange={handleChange}
                className="mr-2"
              />
              Aporte Verde
            </label>

            <label className="flex items-center text-black dark:text-white">
              <input
                type="checkbox"
                name="aporteSeco"
                checked={formData.aporteSeco}
                onChange={handleChange}
                className="mr-2"
              />
              Aporte Seco
            </label>
          </div>

          {/* Campos de entrada */}
          <label className="block text-black dark:text-white">
            Cantidad Verde (kg):
            <input
              type="text"
              name="cantidadVerde"
              value={formData.cantidadVerde}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
            />
          </label>

          <label className="block text-black dark:text-white">
            Tipo de Aporte Verde:
            <input
              type="text"
              name="tipoAporteVerde"
              value={formData.tipoAporteVerde}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
            />
          </label>

          <label className="block text-black dark:text-white">
            Cantidad Seca (kg):
            <input
              type="text"
              name="cantidadSeca"
              value={formData.cantidadSeca}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
            />
          </label>

          <label className="block text-black dark:text-white">
            Tipo de Aporte Seco:
            <input
              type="text"
              name="tipoAporteSeco"
              value={formData.tipoAporteSeco}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
            />
          </label>

          <label className="block text-black dark:text-white">
            Foto (URL):
            <input
              type="text"
              name="foto"
              value={formData.foto}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
            />
          </label>

          <label className="block text-black dark:text-white">
            Observaciones:
            <textarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
              rows="3"
            ></textarea>
        </label>
        <div className="flex justify-between">
            <Button texto="Volver a Antes" link="/FormularioAntes" />
            <Button texto="Siguiente Formulario" link="/formularioDespues" />
          </div>
        </form>
      </div>
    </div>
  );
}
