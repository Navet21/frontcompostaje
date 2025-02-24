import axios from "axios";
import { Navigate } from "react-router-dom";

export async function ApiPost(url, data = {}) {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        Navigate("/");
    }

    try {
        const response = await axios.post(url, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error en ApiPost:", error);
        throw error.response?.data || { message: "Error en la solicitud" };
    }
}

export async function ApiPut(url, data = {}) {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        Navigate("/");
    }

    try {
        const response = await axios.put(url, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error en ApiPut:", error);
        throw error.response?.data || { message: "Error en la solicitud" };
    }
}


export async function ApiGet(url = {}) {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        throw new Error("No autorizado. Debes iniciar sesión.");
    }

    try {
        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${authToken}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error en ApiGet:", error);
        throw error.response?.data || { message: "Error en la solicitud" };
    }
}