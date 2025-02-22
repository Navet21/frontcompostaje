import axios from "axios";

const BASE_URL = "https://pablo.informaticamajada.es/";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true; // Permitir cookies
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest"; // Indicar que es AJAX
axios.defaults.headers.post["Content-Type"] = "application/json"; // Asegurar Content-Type en POST

// 🔹 Interceptar solicitudes para debug
axios.interceptors.request.use((config) => {
    console.log("🚀 Enviando solicitud a:", config.url);
    console.log("🔑 Headers de la solicitud:", config.headers);
    return config;
}, (error) => Promise.reject(error));

// 🔹 Obtener el token CSRF y almacenarlo en Axios
export const getCsrfToken = async () => {
    try {
        const response = await axios.get("/sanctum/csrf-cookie");

        // 🔹 Obtener el token CSRF desde las cookies manualmente
        const xsrfToken = document.cookie
            .split("; ")
            .find(row => row.startsWith("XSRF-TOKEN"))
            ?.split("=")[1];

        if (xsrfToken) {
            axios.defaults.headers.common["X-XSRF-TOKEN"] = decodeURIComponent(xsrfToken);
            console.log("✅ CSRF Token configurado en Axios:", decodeURIComponent(xsrfToken));
        } else {
            console.warn("⚠️ No se encontró el token CSRF en las cookies.");
        }

        return response;
    } catch (error) {
        console.error("❌ Error al obtener el token CSRF:", error.response?.data || error.message);
        throw new Error("No se pudo obtener el token CSRF.");
    }
};

// 🔹 Función de login con CSRF Token
export const login = async (email, password) => {
    try {
        // 1️⃣ Obtener CSRF solo si no está ya configurado
        if (!axios.defaults.headers.common["X-XSRF-TOKEN"]) {
            await getCsrfToken();
        }

        // 2️⃣ Enviar credenciales al backend
        const response = await axios.post("/api/login", { email, password });

        console.log("✅ Login exitoso:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error en login:", error.response?.data || error.message);
        throw new Error(`Error ${error.response?.status}: ${error.response?.data?.message || "Error desconocido"}`);
    }
};
