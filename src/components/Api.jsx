const BASE_URL = "https://pablo.informaticamajada.es/";

// 🔹 Interceptar solicitudes para debug (similar a interceptors de Axios)
const debugRequest = (url, options) => {
    console.log("🚀 Enviando solicitud a:", url);
    console.log("🔑 Headers de la solicitud:", options.headers);
};

// 🔹 Obtener el token CSRF y almacenarlo en las cookies
export const getCsrfToken = async () => {
    try {
        const url = `${BASE_URL}sanctum/csrf-cookie`;
        const options = {
            method: "GET",
            credentials: "include", // Permitir cookies
        };

        debugRequest(url, options);
        await fetch(url, options);

        // Obtener el token CSRF desde las cookies
        const xsrfToken = document.cookie
            .split("; ")
            .find(row => row.startsWith("XSRF-TOKEN"))
            ?.split("=")[1];

        if (xsrfToken) {
            console.log("✅ CSRF Token configurado:", decodeURIComponent(xsrfToken));
            return decodeURIComponent(xsrfToken);
        } else {
            console.warn("⚠️ No se encontró el token CSRF en las cookies.");
            throw new Error("No se pudo obtener el token CSRF.");
        }
    } catch (error) {
        console.error("❌ Error al obtener el token CSRF:", error);
        throw error;
    }
};

// 🔹 Función de login con CSRF Token
export const login = async (email, password) => {
    try {
        // 1️⃣ Obtener CSRF solo si no está ya configurado
        const xsrfToken = await getCsrfToken();

        // 2️⃣ Enviar credenciales al backend
        const url = `${BASE_URL}api/login`;
        const options = {
            method: "POST",
            credentials: "include", // Permitir cookies
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "X-XSRF-TOKEN": xsrfToken,
            },
            body: JSON.stringify({ email, password }),
        };

        debugRequest(url, options);
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${await response.text()}`);
        }

        const data = await response.json();
        console.log("✅ Login exitoso:", data);
        return data;
    } catch (error) {
        console.error("❌ Error en login:", error.message);
        throw error;
    }
};
