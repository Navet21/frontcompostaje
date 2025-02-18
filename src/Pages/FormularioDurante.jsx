import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Button as MaterialButton,
    Dialog,
    DialogBody,
    Typography,
} from "@material-tailwind/react";
import { FaInfo } from "react-icons/fa";

export default function FormularioDurante() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    // Usamos un useRef para almacenar el estado actual y poder actualizar el localStorage en tiempo real
    const formDataRef = useRef(
        JSON.parse(localStorage.getItem("formularioDurante")) || {
            riego: false,
            remover: false,
            aporte_verde: false,
            aporte_seco: false,
            cantidad_aporteVLitros: "",
            cantidad_aporteVKilos: "",
            tipo_aporteV: "",
            cantidad_aporteSLitros: "",
            cantidad_aporteSKilos: "",
            tipo_aporteS: "",
            foto: "",
            observaciones: "",
        }
    );

    const [formData, setFormData] = useState(formDataRef.current);

    // Cada vez que formData cambie, actualizamos el localStorage
    useEffect(() => {
        localStorage.setItem("formularioDurante", JSON.stringify(formDataRef.current));
    }, [formData]);

    // Función para manejar los cambios de los inputs y checkboxes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => {
            // Si no hay ningún cambio, no hacemos nada
            if (prev[name] === (type === "checkbox" ? checked : value)) return prev;

            const newFormData = {
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            };

            // Si desmarcamos aporte verde, limpiamos sus subcampos
            if (name === "aporte_verde" && !checked) {
                newFormData.cantidad_aporteVLitros = "";
                newFormData.cantidad_aporteVKilos = "";
                newFormData.tipo_aporteV = "";
            }

            // Si desmarcamos aporte seco, limpiamos sus subcampos
            if (name === "aporte_seco" && !checked) {
                newFormData.cantidad_aporteSLitros = "";
                newFormData.cantidad_aporteSKilos = "";
                newFormData.tipo_aporteS = "";
            }

            formDataRef.current = newFormData;
            return newFormData;
        });
    };

    // Al enviar, guardamos en localStorage y navegamos al siguiente formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos enviados:", formData);
        navigate("/formularioDespues");
    };

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
                    <DialogBody className="grid place-items-center gap-4 rounded-lg p-6 sm:pb-5 pb-20 max-h-[90vh] overflow-y-auto">
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
                                name="remover"
                                checked={formData.remover}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Remoción Realizada
                        </label>

                        <label className="flex items-center text-black dark:text-white">
                            <input
                                type="checkbox"
                                name="aporte_verde"
                                checked={formData.aporte_verde}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Aporte Verde
                        </label>

                        {formData.aporte_verde && (
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                <label className="block text-black dark:text-white">
                                    Cantidad Verde (L):
                                    <input
                                        required
                                        type="text"
                                        name="cantidad_aporteVLitros"
                                        value={formData.cantidad_aporteVLitros}
                                        onChange={handleChange}
                                        className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
                                    />
                                </label>

                                <label className="block text-black dark:text-white">
                                    Cantidad Verde (kg):
                                    <input
                                        type="text"
                                        name="cantidad_aporteVKilos"
                                        value={formData.cantidad_aporteVKilos}
                                        onChange={handleChange}
                                        className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
                                    />
                                </label>

                                <label className="block text-black dark:text-white">
                                    Tipo de Aporte Verde:
                                    <input
                                        type="text"
                                        name="tipo_aporteV"
                                        value={formData.tipo_aporteV}
                                        onChange={handleChange}
                                        className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
                                    />
                                </label>
                            </div>
                        )}

                        <label className="flex items-center text-black dark:text-white">
                            <input
                                type="checkbox"
                                name="aporte_seco"
                                checked={formData.aporte_seco}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Aporte Seco
                        </label>

                        {formData.aporte_seco && (
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                <label className="block text-black dark:text-white">
                                    Cantidad Seco (L):
                                    <input
                                        required
                                        type="text"
                                        name="cantidad_aporteSLitros"
                                        value={formData.cantidad_aporteSLitros}
                                        onChange={handleChange}
                                        className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
                                    />
                                </label>

                                <label className="block text-black dark:text-white">
                                    Cantidad Seco (kg):
                                    <input
                                        type="text"
                                        name="cantidad_aporteSKilos"
                                        value={formData.cantidad_aporteSKilos}
                                        onChange={handleChange}
                                        className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
                                    />
                                </label>

                                <label className="block text-black dark:text-white">
                                    Tipo de Aporte Seco:
                                    <input
                                        type="text"
                                        name="tipo_aporteS"
                                        value={formData.tipo_aporteS}
                                        onChange={handleChange}
                                        className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
                                    />
                                </label>
                            </div>
                        )}
                    </div>

                    <label className="block text-black dark:text-white">
                        Foto:
                        <input
                            type="file"
                            accept="image/*"
                            name="foto"
                            // El 'value' no se maneja directamente en inputs de tipo file.
                            // Si quieres controlarlo, tendrías que usar un input no controlado
                            // o crear un 'URL' local de la imagen para visualizarla.
                            onChange={handleChange}
                            className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
                        />
                    </label>

                    <label className="block text-black dark:text-white">
                        Observaciones:
                        <textarea
                            placeholder="Rellena con cualquier cosa que consideres relevante, por ejemplo: tipo de animales"
                            name="observaciones"
                            value={formData.observaciones}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
                            rows="3"
                        ></textarea>
                    </label>

                    <div className="flex justify-between">
                        <Link to={`/FormularioAntes`}>
                            <button className="bg-gray-900 px-4 py-2 rounded-lg border border-transparent hover:border-indigo-400 text-white cursor-pointer">
                                Volver a Antes
                            </button>
                        </Link>
                        <button
                            type="submit"
                            className="bg-gray-900 px-4 py-2 rounded-lg border border-transparent hover:border-indigo-400 text-white cursor-pointer"
                        >
                            Siguiente Formulario
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
