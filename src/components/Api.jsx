import axios from "axios";

const BASE_URL = "http://localhost/";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true; // Para enviar cookies en las solicitudes

export const login = async (email, password) => {
    try {
        await axios.get("/sanctum/csrf-cookie"); // Obtener token CSRF primero
        const response = await axios.post("/api/login", { email, password });

        console.log("Login response:", response.data); // 👀 Verificar datos

        localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

        return response.data;
    } catch (error) {
        console.error("Error en login:", error.response?.data || error.message);
        throw new Error(`Error ${error.response?.status}: ${error.response?.data.message}`);
    }
};


export const logout = async () => {
    try {
        await axios.post("/api/logout", null, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
    } catch (error) {
        console.error("Error en logout:", error.response?.data || error.message);
    }
};

export const getUser = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No hay token, usuario no autenticado.");

        const response = await axios.get("/api/user", {
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Usuario obtenido:", response.data); // 👀 Verificar en consola

        return response.data;
    } catch (error) {
        console.error("Error al obtener usuario:", error.response?.data || error.message);
        throw new Error("Usuario no autenticado.");
    }
};

