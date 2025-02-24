import axios from "axios";

const BASE_URL = "https://pablo.informaticamajada.es/";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true; // Asegura que se envían cookies en todas las solicitudes

// Función para obtener el token CSRF
export const getCsrfToken = async () => {
    try {
        const response = await axios.get("/sanctum/csrf-cookie", {
            withCredentials: true,
        });
        console.log("✅ CSRF Token obtenido:", document.cookie);
        return response;
    } catch (error) {
        console.error("❌ Error al obtener el token CSRF:", error.response?.data || error.message);
        throw new Error("No se pudo obtener el token CSRF.");
    }
};

// Función de login
export const login = async (email, password) => {
    try {
        await getCsrfToken(); // Obtener el token CSRF antes del login

        const response = await axios.post("/api/login", { email, password }, {
            withCredentials: true,
        });

        console.log("✅ Login response:", response.data);
        console.log("🔑 Token recibido:", response.data.token);

        // Guardar el token en localStorage o en los headers de axios
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
        localStorage.setItem("authToken", response.data.token);

        return response.data;
    } catch (error) {
        console.error("❌ Error en login:", error.response?.data || error.message);
        throw new Error(`Error ${error.response?.status}: ${error.response?.data.message}`);
    }
};

// Función para obtener los datos del usuario
export const getUser = async () => {
    try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) throw new Error("No hay token almacenado");

        const response = await axios.get("/api/user", {
            withCredentials: true,
        });

        console.log("✅ Usuario obtenido:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error al obtener usuario:", error.response?.data || error.message);
        throw new Error("Usuario no autenticado.");
    }
};

// Función para logout
export const logout = async () => {
    try {
        await axios.post("/api/logout", null, {
            withCredentials: true,
        });

        console.log("✅ Logout exitoso");

        // Limpiar el token
        localStorage.removeItem("authToken");
        delete axios.defaults.headers.common["Authorization"];
    } catch (error) {
        console.error("❌ Error en logout:", error.response?.data || error.message);
    }
};
