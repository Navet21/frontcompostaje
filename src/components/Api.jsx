import axios from "axios";

const BASE_URL = "http://localhost/";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true; // Para enviar cookies en las solicitudes
axios.defaults.withXSRFToken = true;

export const login = async (email, password) => {
    try {
        await axios.get("/sanctum/csrf-cookie"); // Obtener token CSRF primero
        const response = await axios.post("/api/login", { email, password });

        console.log("Login response:", response.data); // 👀 Verificar datos

        return response.data;
    } catch (error) {
        console.error("Error en login:", error.response?.data || error.message);
        throw new Error(`Error ${error.response?.status}: ${error.response?.data.message}`);
    }
};

export const logout = async () => {
    try {
        await axios.post("/api/logout", null, {
            withXSRFToken: true,
        });
    } catch (error) {
        console.error("Error en logout:", error.response?.data || error.message);
    }
};

export const getUser = async () => {
    try {
        const response = await axios.get("/api/user");

        console.log("Usuario obtenido:", response.data); // 👀 Verificar en consola

        return response.data;
    } catch (error) {
        console.error("Error al obtener usuario:", error.response?.data || error.message);
        throw new Error("Usuario no autenticado.");
    }
};
