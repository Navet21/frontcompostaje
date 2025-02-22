import axios from "axios";

const BASE_URL = "https://pablo.informaticamajada.es/";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true; // Enviar cookies
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest"; // Indicar que es una solicitud AJAX

// 🔹 Obtener el token CSRF antes de cualquier acción
export const getCsrfToken = async () => {
    try {
        const response = await axios.get("/sanctum/csrf-cookie");
        console.log("✅ CSRF Token obtenido correctamente.");
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
            withCredentials: true
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
            withCredentials: true, // Necesario para autenticación con cookies
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
