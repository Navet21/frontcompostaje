import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormulariosContext } from "../Providers/FormularioProvider";
import axios from "axios";

export default function CrearBolo() {
  const { id } = useContext(FormulariosContext);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Obtener token de localStorage
  const getToken = () => localStorage.getItem("authToken");

  const datosBolo = async () => {
    try {
      const { data } = await axios.get("https://pablo.informaticamajada.es/api/ultimoBolo", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return data;
    } catch (error) {
      console.error("Error en la petición:", error);
      return null;
    }
  };

  const obtenerNuevoId = async () => {
    const idBolo = await datosBolo();
    return idBolo?.id ? idBolo.id + 1 : 1;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }

    try {
      const idNuevo = await obtenerNuevoId();
      const nuevoCiclo = {
        bolo_id: idNuevo,
        compostera_id: Number(id) || null,
      };

      // Configuración de headers con el token
      const config = {
        headers: { Authorization: `Bearer ${getToken()}` },
      };

      // Enviar los datos del bolo
      await axios.post("https://pablo.informaticamajada.es/api/bolos", formData, config);

      // Enviar el ciclo solo si compostera_id es válido
      if (nuevoCiclo.compostera_id !== null) {
        await axios.post("https://pablo.informaticamajada.es/api/ciclos", nuevoCiclo, config);
      } else {
        console.error("Error: compostera_id no es válido.");
      }

      // Actualizar la compostera
      await axios.put(`https://pablo.informaticamajada.es/api/composteras/${id}`, { ocupada: true }, config);

      console.log("Ambas peticiones fueron exitosas");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }

    setError("");
    navigate(`/formularioAntes/${id}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-lg shadow">
        <h2 className="text-green-500 text-xl font-bold mb-4 text-center">Crear Bolo</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo Nombre (Obligatorio) */}
          <label className="block text-black dark:text-white">
            Nombre:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
              required
            />
          </label>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Campo Descripción */}
          <label className="block text-black dark:text-white">
            Descripción:
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
              rows="3"
            ></textarea>
          </label>

          {/* Botón Enviar */}
          <button
            type="submit"
            className="w-full bg-gray-900 px-4 py-2 rounded-lg border border-transparent hover:border-indigo-400 text-white cursor-pointer"
          >
            Crear Bolo
          </button>
        </form>
      </div>
    </div>
  );
}
