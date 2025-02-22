import axios from "axios";

const BASE_URL = "https://pablo.informaticamajada.es/";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true; // Para enviar cookies en las solicitudes
axios.defaults.withXSRFToken = true;


// Función para obtener el token CSRF
export const getCsrfToken = async () => {
    try {
        const response = await axios.get("/sanctum/csrf-cookie");
        console.log("CSRF Token obtenido:", response); // Verificar si se obtiene correctamente
        return response; // Retorna la respuesta para ver si hay algún dato adicional que se pueda utilizar
    } catch (error) {
        console.error("Error al obtener el token CSRF:", error.response?.data || error.message);
        throw new Error("No se pudo obtener el token CSRF.");
    }
};

// Función de login
export const login = async (email, password) => {
    try {
        // Primero obtenemos el token CSRF
        await getCsrfToken(); 

        // Luego hacemos el login
        const response = await axios.post("/api/login", { email, password });
        console.log("Login response:", response.data); // 👀 Verificar datos

        return response.data;
    } catch (error) {
        console.error("Error en login:", error.response?.data || error.message);
        throw new Error(`Error ${error.response?.status}: ${error.response?.data.message}`);
    }
};

// Función para obtener los datos del usuario
export const getUser = async () => {
    try {
        const response = await axios.get("/api/user", {
            withCredentials: true,
        });
        console.log("Usuario obtenido:", response.data); 

        return response.data;
    } catch (error) {
        console.error("Error al obtener usuario:", error.response?.data || error.message);
        throw new Error("Usuario no autenticado.");
    }
};


// Función para logout
export const logout = async () => {
    try {
        await axios.post("/api/logout", null, {
            withXSRFToken: true,
        });
    } catch (error) {
        console.error("Error en logout:", error.response?.data || error.message);
    }
};
