import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaInfo } from "react-icons/fa";
import {
    Button as MaterialButton,
    Dialog,
    DialogBody,
    Typography,
} from "@material-tailwind/react";
import DescargarPDF from "../Pdf/FormularioAntesPDF"

// Función para quitar tildes y pasar a minúsculas
const normalizeText = (text) => {
    return text
        .normalize("NFD") // Separa acentos de letras
        .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
        .toLowerCase();
};

export default function FormularioAntes() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const formDataRef = useRef(
        JSON.parse(localStorage.getItem("formularioAntes")) || {
            temp_ambiente: "",
            temp_compostera: "",
            humedad: "",
            nivel_llenado: "",
            olor: "",
            animales: false,
            tipo_animal: [],
            foto: "",
            observaciones: "",
        }
    );

    const [formData, setFormData] = useState(formDataRef.current);

    useEffect(() => {
        localStorage.setItem("formularioAntes", JSON.stringify(formDataRef.current));
    }, [formData]);

    const insectosOpciones = useMemo(
        () => [
            { label: "Mosca", value: "mosca" },
            { label: "Mosquita", value: "mosquita" },
            { label: "Ratón", value: "raton" },
            { label: "Cucaracha", value: "cucaracha" },
            { label: "Larvas", value: "larvas" },
            { label: "Otros", value: "otros" },
        ],
        []
    );

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => {
            if (prev[name] === (type === "checkbox" ? checked : value)) return prev;
            const newFormData = { ...prev, [name]: type === "checkbox" ? checked : value };
            formDataRef.current = newFormData;
            return newFormData;
        });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prev) => {
            const normalizedValue = normalizeText(value);
            if (checked && prev.tipo_animal.includes(normalizedValue)) return prev;
            const newFormData = {
                ...prev,
                tipo_animal: checked
                    ? [...prev.tipo_animal, normalizedValue]
                    : prev.tipo_animal.filter((item) => item !== normalizedValue),
            };
            formDataRef.current = newFormData;
            return newFormData;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/formularioDurante");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl shadow">
                <div className="relative p-6 rounded-lg shadow-md w-full max-w-2xl">
                    <h2 className="text-green-500 text-xl font-bold mb-4 text-center">Formulario de Antes</h2>
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
                        <Typography className="text-black dark:text-white text-center font-normal">
                            Sigue estas indicaciones para completar el formulario correctamente:
                        </Typography>
                        <ul className="text-black dark:text-white text-sm list-disc pl-6 space-y-2">
                            <li><b>Temperatura:</b> Registra la temperatura ambiente y la de la compostera.</li>
                            <li><b>Humedad:</b> Señala si la humedad del compost es buena, está en defecto o en exceso.</li>
                            <li><b>Nivel de Llenado:</b> Indica el porcentaje de llenado de la compostera.</li>
                            <li><b>Olor:</b> Describe si el compost tiene olor agradable o desagradable.</li>
                            <li><b>Presencia de Animales:</b> Si hay insectos o roedores, márcalo y especifica cuáles.</li>
                            <li><b>Observaciones:</b> Anota cualquier detalle relevante sobre el compost.</li>
                        </ul>
                        <MaterialButton variant="gradient" onClick={handleOpen}>
                            Entendido
                        </MaterialButton>
                    </DialogBody>
                </Dialog>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block text-black dark:text-white">
                        Temperatura Ambiente:
                        <input type="text" name="temp_ambiente" value={formData.temp_ambiente} onChange={handleChange}
                            className="w-full mt-1 p-2 rounded border border-gray-700" />
                    </label>

                    <label className="block text-black dark:text-white">
                        Temperatura Compost:
                        <input type="text" name="temp_compostera" value={formData.temp_compostera} onChange={handleChange}
                            className="w-full mt-1 p-2 rounded border border-gray-700" />
                    </label>

                    <label className="block text-black dark:text-white">
                      Humedad:
                      <select
                        name="humedad"
                        value={formData.humedad}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 rounded border border-gray-700 bg-gray-100 dark:bg-gray-900 text-black dark:text-white"
                      >
                        <option value="">Seleccione</option>
                        <option value="defecto">Defecto</option>
                        <option value="buena">Buena</option>
                        <option value="exceso">Exceso</option>
                      </select>
                    </label>

                    <label className="block text-black dark:text-white">
                      Nivel de Llenado:
                      <select
                        name="nivel_llenado"
                        value={formData.nivel_llenado}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 rounded border border-gray-700 bg-gray-100 dark:bg-gray-900 text-black dark:text-white"
                      >
                        <option value="">Seleccione</option>
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

                    <label className="block text-black dark:text-white">
                      Olor:
                      <select
                        name="olor"
                        value={formData.olor}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 rounded border border-gray-700 bg-gray-100 dark:bg-gray-900 text-black dark:text-white"
                      >
                        <option value="">Seleccione</option>
                        <option value="inoloro">Sin olor</option>
                        <option value="cuadra">Cuadra</option>
                        <option value="agradable">Agradable</option>
                        <option value="desagradable">Desagradable</option>
                      </select>
                    </label>


                    <label className="block text-black dark:text-white">
                        <input type="checkbox" name="animales" checked={formData.animales} onChange={handleChange} className="mr-2" />
                        Presencia de animales o insectos
                    </label>

                    {formData.animales && (
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            {insectosOpciones.map(({ label, value }) => (
                                <label key={value} className="flex items-center gap-2 cursor-pointer p-2 border-2">
                                    <input
                                        type="checkbox"
                                        name="tipo_animal"
                                        value={label}
                                        checked={formData.tipo_animal.includes(value)}
                                        onChange={handleCheckboxChange}
                                    />
                                    <span className="text-black dark:text-white">{label}</span>
                                </label>
                            ))}
                        </div>
                    )}

                    <label className="block text-black dark:text-white">
                        Foto:
                        <input type="file" accept="image/*" name="foto" onChange={handleChange}
                            className="w-full mt-1 p-2 rounded border border-gray-700" />
                    </label>

                    <label className="block text-black dark:text-white">
                        Observaciones:
                        <textarea name="observaciones" value={formData.observaciones} onChange={handleChange}
                            className="w-full mt-1 p-2 rounded border border-gray-700" rows="3"></textarea>
                    </label>

                    <div className="flex justify-between">
                        <Link to={`/`}>
                            <button className="bg-gray-900 px-4 py-2 rounded-lg text-white cursor-pointer">
                                Volver
                            </button>
                        </Link>
                        <button className="bg-gray-900 px-4 py-2 rounded-lg text-white cursor-pointer">
                            Siguiente Formulario
                        </button>
                    </div>
                </form>
                <DescargarPDF />
            </div>
        </div>
    );
}
