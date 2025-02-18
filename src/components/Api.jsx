import axios from "axios";

const BASE_URL = "http://ecompostaje.test";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true; // Para enviar cookies en las solicitudes

export const login = async (email, password) => {
    try {
        const response = await axios.post("/api/login", { email, password });
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
        await axios.post("/api/logout", {
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
        const response = await axios.get("/api/user", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener usuario:", error.response?.data || error.message);
        throw new Error("Usuario no autenticado.");
    }
};
