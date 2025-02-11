    import { useState } from "react";
    import { Link } from "react-router-dom";


    export default function FormularioDespués() {
    const [formData, setFormData] = useState({
        nivelLlenado: "0%",
        foto: "",
        observaciones: "",
        finCiclo: false,
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
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl">
            <h2 className="text-green-500 text-xl font-bold text-center mb-4">
            Formulario de Después para Compostera 1
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nivel de Llenado */}
            <label className="block text-white">
                Nivel de Llenado:
                <select
                name="nivelLlenado"
                value={formData.nivelLlenado}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700"
                >
                <option value="0%">0%</option>
                <option value="25%">25%</option>
                <option value="50%">50%</option>
                <option value="75%">75%</option>
                <option value="100%">100%</option>
                </select>
            </label>

            {/* Foto (URL) */}
            <label className="block text-white">
                Foto (URL):
                <input
                type="text"
                name="foto"
                value={formData.foto}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700"
                />
            </label>

            {/* Observaciones */}
            <label className="block text-white">
                Observaciones:
                <textarea
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700"
                rows="3"
                ></textarea>
            </label>

            {/* Fin de Ciclo */}
            <label className="flex items-center text-white">
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
                <Link to={`/formularioDurante`}>
                <button>
                    Volver a Durante
                </button>
                </Link>
            </div>
            {/* Botón de Guardar */}
            <Link to={'/'}>
                <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                Enviar
                </button>
            </Link>
            
            </form>
        </div>
        </div>
    );
    }
