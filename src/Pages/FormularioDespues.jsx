import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaInfo } from "react-icons/fa";
import {
  Button as MaterialButton,
  Dialog,
  DialogBody,
  Typography,
} from "@material-tailwind/react";

import Button from "../components/Button"; // Asumes que este es tu botón personalizado
import { FormulariosContext } from "../Providers/FormularioProvider"; // Ajusta la ruta según tu proyecto

export default function FormularioDespués() {
  // 1. Obtenemos `state`, `dispatch` y `id` del contexto
  const { state, dispatch, id } = useContext(FormulariosContext);
  const navigate = useNavigate();

  // 2. Leemos "formData" desde `state.datosDespues` (o un objeto por defecto si está vacío)
  const formData = state.datosDespues || {
    nivel_llenado: "0%",
    foto: "",
    observaciones: "",
    finCiclo: false,
  };

  // 3. Manejo del diálogo “¡Importante!”
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  // 4. Cuando cambia un input, creamos un nuevo objeto y despachamos “añadirDatos_despues”
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    const updatedFormData = {
      ...formData,
      [name]: newValue,
    };

    dispatch({
      type: "añadirDatos_despues",
      payload: updatedFormData,
    });
  };

  // 5. Al enviar, simplemente podrías navegar a otra ruta, o hacer más lógica
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    // Podrías despachar otra acción para “finalizar” o algo similar
    navigate(`/finalizar/${id}`); 
    // O redirigir a donde prefieras
  };

  // 6. Ejemplo de limpiar localStorage (opcional)
  //    Si quieres “resetear” todo, en vez de localStorage.removeItem,
  //    podrías despachar una acción para limpiar los 3 formularios en tu reducer.
  const deletelocal = (e) => {
    e.preventDefault();
    console.log("Limpiamos el estado global y localStorage");
    // Ejemplo: Despachamos una acción “limpiar_todo”
    dispatch({ type: "limpiar_todo" });
    // Luego navegas al Home
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl">
        <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-green-500 text-xl font-bold text-center mb-4">
            Formulario de Después para Compostera {id}
          </h2>
          <FaInfo
            className="absolute top-2 right-2 text-sky-600 cursor-pointer"
            onClick={handleOpen}
          />
        </div>

        <Dialog className="bg-white dark:bg-gray-900" open={open} handler={handleOpen}>
          <DialogBody className="grid place-items-center gap-4 rounded-lg p-6 sm:pb-5 pb-20 max-h-[90vh] overflow-y-auto">
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
                <b>Foto:</b> Toma una foto del compost finalizado y adjunta el enlace o archivo.
              </li>
              <li>
                <b>Observaciones:</b> Anota detalles sobre la apariencia, olor o cualquier cambio
                significativo.
              </li>
              <li>
                <b>Fin de Ciclo:</b> Marca esta opción si el compost ya está listo para su uso.
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
              name="nivel_llenado"
              value={formData.nivel_llenado}
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

          {/* Foto */}
          <label className="block text-black dark:text-white">
            Foto:
            <input
              type="file"
              accept="image/*"
              name="foto"
              // El "value" de un input file no se controla. 
              // Almacenas la info en onChange si quieres guardarla en formData.
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
            />
          </label>

          {/* Observaciones */}
          <label className="block text-black dark:text-white">
            Observaciones:
            <textarea
              placeholder="Rellena con detalles relevantes, por ejemplo: color, olor, etc."
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
              rows="3"
            ></textarea>
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

          {/* Volver a Durante */}
          <div>
            <Button texto="Volver a Durante" link={`/formularioDurante/${id}`} />
          </div>

          {/* Botón Enviar / Limpiar */}
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              Enviar
            </button>

            <button
              onClick={deletelocal}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              Limpiar Todo y Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
