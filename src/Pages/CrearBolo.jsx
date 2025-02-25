import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { useContext } from "react";
import { FormulariosContext } from "../Providers/FormularioProvider";
import axios from "axios";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Swal from 'sweetalert2'

export default function CrearBolo() {
    const {id} = useContext(FormulariosContext);
    const authToken = localStorage.getItem("authToken");
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
    });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const datosBolo = async () => {
    try {
        const { data } = await axios.get("https://pablo.informaticamajada.es/api/ultimoBolo", {
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
    const idBolo = await datosBolo();
    const nuevoId = idBolo?.id ? idBolo.id + 1 : 1;
    console.log("Nuevo ID:", nuevoId);

    return nuevoId;
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

    setLoading(true); // Activar pantalla de carga

    try {
        const idNuevo = await obtenerNuevoId();
        console.log("ID obtenido para el ciclo:", idNuevo);

        const nuevoCiclo = {
            bolo_id: idNuevo,
            compostera_id: Number(id) || null, 
        };

        console.log("Datos del ciclo antes de enviar:", nuevoCiclo);

        await axios.post("https://pablo.informaticamajada.es/api/bolos", formData, {
            headers: { "Authorization": `Bearer ${authToken}` },
        });

        if (nuevoCiclo.compostera_id !== null) {
            await axios.post("https://pablo.informaticamajada.es/api/ciclos", nuevoCiclo, {
                headers: { "Authorization": `Bearer ${authToken}` },
            });
        } else {
            console.error("Error: compostera_id no es válido.");
        }

        await axios.put(
            `https://pablo.informaticamajada.es/api/composteras/${id}`, 
            { ocupada: true },
            { headers: { Authorization: `Bearer ${authToken}` } }
        );

        console.log("Ambas peticiones fueron exitosas");
        setError("");
        
        Swal.fire({
            title: "Bolo creado con éxito",
            icon: "success",
            draggable: true
        });

        navigate(`/formularioAntes/${id}`);
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
    } finally {
        setLoading(false); // Desactivar pantalla de carga
    }
};


    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
        {loading ? (
            <DotLottieReact
                src="https://lottie.host/bde4db23-2115-4204-af20-1c47d6fcc8cd/sYD52bikvs.lottie"
                loop
                autoplay
                className="w-80 h-80"
            />
        ) : (
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
        )}
    </div>
    );
}
