import { useState } from "react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { FaInfo } from "react-icons/fa";
import {
  Button as MaterialButton,
  Dialog,
  DialogBody,
  Typography,
} from "@material-tailwind/react";
import DescargarPDF from "../Pdf/FormularioDespuesPDF"


export default function FormularioDespués() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    // Cargar datos previos si existen en localStorage
    const savedData = localStorage.getItem("formularioDespues");
    return savedData
      ? JSON.parse(savedData)
      : {
          nivel_llenado: "0%",
          foto: "",
          observaciones: "",
          finCiclo: false,
        };
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

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
    localStorage.setItem("formularioDespues", JSON.stringify(formData));
    navigate("/formularioDespues");
  };

  const deletelocal = (e) => {
    e.preventDefault();
    console.log("Local Limpio");
    localStorage.removeItem("formularioAntes");
    localStorage.removeItem("formularioDurante");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl">
        <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-green-500 text-xl font-bold text-center mb-4">
            Formulario de Después para Compostera 1
          </h2>
          <FaInfo
            className="absolute top-2 right-2 text-sky-600 cursor-pointer"
            onClick={handleOpen}
          />
        </div>

        <Dialog className="bg-white dark:bg-gray-900" open={open} handler={handleOpen}>
          <DialogBody className="grid place-items-center gap-4 rounded-lg p-6 pb-20 max-h-[90vh] overflow-y-auto">
            <Typography color="red" variant="h4">
              ¡Importante!
            </Typography>
            <Typography color="black" className="text-center font-normal dark:text-white">
              Sigue estas indicaciones para completar el formulario correctamente:
            </Typography>
            <ul className="text-black dark:text-white text-sm list-disc pl-6 space-y-2">
              <li>
                <b>Nivel de Llenado:</b> Estima cuánto material queda en la compostera después del
                proceso.
              </li>
              <li>
                <b>Foto (URL):</b> Toma una foto del compost finalizado y adjunta el enlace.
              </li>
              <li>
                <b>Observaciones:</b> Anota detalles sobre la apariencia, olor o cualquier cambio
                significativo.
              </li>
              <li>
                <b>Fin de Ciclo:</b> Marca esta opción si el compost ya está listo para ser
                utilizado.
              </li>
            </ul>
            <MaterialButton variant="gradient" onClick={handleOpen}>
              Entendido
            </MaterialButton>
          </DialogBody>
        </Dialog>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nivel de Llenado */}
          <label className="block text-black dark:text-white">
            Nivel de Llenado:
            <select
              name="nivelLlenado"
              value={formData.nivelLlenado}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-700 dark:border-gray-600"
            >
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

          {/* Foto (URL) */}
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

          {/* Observaciones */}
          <label className="block text-black dark:text-white">
              Observaciones:
              <textarea placeholder="Rellena con cualquier cosa que consideres relevante, por ejemplo: tipo de animales" name="observaciones" value={formData.observaciones} onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700" rows="3"></textarea>
          </label>

          {/* Fin de Ciclo */}
          <label className="flex items-center text-black dark:text-white">
            <input
              type="checkbox"
              name="finCiclo"
              checked={formData.finCiclo}
              onChange={handleChange}
              className="mr-2"
            />
            Fin de Ciclo
          </label>
          <div>
            <Button texto="Volver a Durante" link="/formularioDurante" />
          </div>
          {/* Botón de Guardar */}
          <Link to={"/"}>
            <button
              onClick={deletelocal}
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              Enviar
            </button>
          </Link>
        </form>
        <DescargarPDF />
      </div>
    </div>
  );
}
