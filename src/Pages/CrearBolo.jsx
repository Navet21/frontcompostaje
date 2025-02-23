import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { useContext } from "react";
import { FormulariosContext } from "../Providers/FormularioProvider";
import axios from "axios";

export default function CrearBolo() {
    const {id} = useContext(FormulariosContext);
    
    
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
    });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const datosBolo = async () => {
    try {
        await axios.get("/sanctum/csrf-cookie");
        const { data } = await axios.get("https://pablo.informaticamajada.es/api/ultimoBolo");
        return data;
    } catch (error) {
        console.error("Error en la petición:", error);
        return null;
    }
};

const obtenerNuevoId = async () => {
    const idBolo = await datosBolo();
    const nuevoId = idBolo?.id ? idBolo.id + 1 : 1;
    console.log("Nuevo ID:", nuevoId);

    return nuevoId;
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const  handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre.trim()) {
        setError("El nombre es obligatorio.");
        return;
    }

    try {
        // Obtener el nuevo ID antes de hacer el post
        const idNuevo = await obtenerNuevoId();
        console.log("ID obtenido para el ciclo:", idNuevo);

        // Construir el objeto ciclo dentro de `handleSubmit()`
        const nuevoCiclo = {
            bolo_id: idNuevo,
            compostera_id: Number(id) || null, // Asegurar que sea un número
        };

        console.log("Datos del ciclo antes de enviar:", nuevoCiclo);

        // Enviar el formulario primero
        await axios.post("https://pablo.informaticamajada.es/api/bolos", formData, {
            withXSRFToken: true,
        });

        console.log("Valor de id antes de asignarlo a compostera_id:", id);
        // Enviar el ciclo solo si compostera_id es válido
        if (nuevoCiclo.compostera_id !== null) {
            await axios.post("https://pablo.informaticamajada.es/api/ciclos", nuevoCiclo, {
                withXSRFToken: true,
            });
        } else {
            console.error("Error: compostera_id no es válido.");
        }

        await axios.put(`https://pablo.informaticamajada.es/api/composteras/${id}`, {ocupada:true})

        console.log("Ambas peticiones fueron exitosas");
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
    }

    setError("");
    console.log("Datos enviados:", formData);
    navigate(`/formularioAntes/${id}`); // Redirigir tras el envío
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-lg shadow">
        <h2 className="text-green-500 text-xl font-bold mb-4 text-center">
          Crear Bolo
        </h2>

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
