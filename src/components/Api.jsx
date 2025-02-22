import axios from "axios";

const BASE_URL = "https://pablo.informaticamajada.es/";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true; // Enviar cookies
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest"; // Indicar que es una solicitud AJAX

// 🔹 Interceptar solicitudes para ver el token antes de enviarlas
axios.interceptors.request.use((config) => {
    console.log("🚀 Enviando solicitud a:", config.url);
    console.log("🔑 Headers de la solicitud:", config.headers);
    return config;
}, (error) => {
    return Promise.reject(error);
});

// 🔹 Obtener el token CSRF antes de cualquier acción
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
            console.log("✅ Token CSRF configurado en Axios:", xsrfToken);
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
        // 1️⃣ Obtener el token CSRF antes de hacer login
        await getCsrfToken(); 

        // 2️⃣ Enviar credenciales al backend
        const response = await axios.post("/api/login", { email, password }, {
            withCredentials: true,
            withXSRFToken: true,
        });
        
        console.log("✅ Login exitoso:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error en login:", error.response?.data || error.message);
        throw new Error(`Error ${error.response?.status}: ${error.response?.data.message}`);
    }
};

// 🔹 Obtener datos del usuario autenticado
export const getUser = async () => {
    try {
        const response = await axios.get("/api/user", {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            withCredentials: true, // Necesario para autenticación con cookie
        });

        console.log("👤 Usuario obtenido:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error al obtener usuario:", error.response?.data || error.message);
        throw new Error("Usuario no autenticado.");
    }
};

// 🔹 Logout
export const logout = async () => {
    try {
        await axios.post("/api/logout", null, {
            withCredentials: true,
        });

        console.log("✅ Logout exitoso");
    } catch (error) {
        console.error("❌ Error en logout:", error.response?.data || error.message);
    }
};
