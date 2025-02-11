    import { useState } from "react";
    import { Link } from "react-router-dom";

    export default function FormularioDurante() {
    const [formData, setFormData] = useState({
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
            Formulario Durante para Compostera 1
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
            {/* Checkbox opciones */}
            <div className="space-y-2">
                <label className="flex items-center text-white">
                <input
                    type="checkbox"
                    name="riego"
                    checked={formData.riego}
                    onChange={handleChange}
                    className="mr-2"
                />
                Riego Realizado
                </label>

                <label className="flex items-center text-white">
                <input
                    type="checkbox"
                    name="remocion"
                    checked={formData.remocion}
                    onChange={handleChange}
                    className="mr-2"
                />
                Remoción Realizada
                </label>

                <label className="flex items-center text-white">
                <input
                    type="checkbox"
                    name="aporteVerde"
                    checked={formData.aporteVerde}
                    onChange={handleChange}
                    className="mr-2"
                />
                Aporte Verde
                </label>

                <label className="flex items-center text-white">
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
            <label className="block text-white">
                Cantidad Verde (kg):
                <input
                type="text"
                name="cantidadVerde"
                value={formData.cantidadVerde}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700"
                />
            </label>

            <label className="block text-white">
                Tipo de Aporte Verde:
                <input
                type="text"
                name="tipoAporteVerde"
                value={formData.tipoAporteVerde}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700"
                />
            </label>

            <label className="block text-white">
                Cantidad Seca (kg):
                <input
                type="text"
                name="cantidadSeca"
                value={formData.cantidadSeca}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700"
                />
            </label>

            <label className="block text-white">
                Tipo de Aporte Seco:
                <input
                type="text"
                name="tipoAporteSeco"
                value={formData.tipoAporteSeco}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded bg-gray-900 text-white border border-gray-700"
                />
            </label>

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
            <div>
                <Link to={`/formularioAntes/`}>
                    <button>
                        Volver a Antes
                    </button>
                </Link>
                <Link to={`/formularioDespues/`}>
                    <button>
                        Siguiente Formulario
                    </button>
                </Link>
            </div>
            </form>
        </div>
        </div>
    );
    }
