import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";

export default function BoloEditable() {
    const authToken = localStorage.getItem("authToken");
    const params = useParams();
    const navigate = useNavigate();

    const { data: registrosData, loading, error } = useFetch(
        `https://pablo.informaticamajada.es/api/bolos/${params.id}/`
    );
    const [formData, setFormData] = useState({ nombre: "", descripcion: "" });
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        if (registrosData) {
        setFormData({
            nombre: registrosData.data.nombre || "",
            descripcion: registrosData.data.descripcion || "",
        });
        setInitialData({
            nombre: registrosData.nombre || "",
            descripcion: registrosData.descripcion || "",
        });
        }
    }, [registrosData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
        formData.nombre === initialData.nombre &&
        formData.descripcion === initialData.descripcion
        ) {
        alert("No has modificado ningún dato.");
        return;
        }

        try {
        await axios.put(
            `https://pablo.informaticamajada.es/api/bolos/${params.id}`,
            formData,
            {
            headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
            },
            }
        );

        navigate(`/bolos`);
        } catch (error) {
        console.error("Error en la actualización:", error);
        }
    };

    if (loading)
        return <p className="text-center text-gray-200">Cargando Registro...</p>;
    if (error)
        return <p className="text-center text-red-400">Error: {error}</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-lg shadow">
            <h2 className="text-green-500 text-xl font-bold mb-4 text-center">
            Editar el Bolo {initialData?.nombre}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
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

            <button
                type="submit"
                className="w-full bg-gray-900 px-4 py-2 rounded-lg border border-transparent hover:border-indigo-400 text-white cursor-pointer"
            >
                Editar Bolo
            </button>
            </form>
        </div>
        </div>
    );
    }
