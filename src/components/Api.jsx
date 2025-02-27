const BASE_URL = "http://localhost";

// 🔹 Función para guardar y recuperar el token desde localStorage
const saveToken = (token) => localStorage.setItem("authToken", token);
const getToken = () => localStorage.getItem("authToken");
const removeToken = () => localStorage.removeItem("authToken");


// 🔹 Función para hacer login y guardar el token
export const login = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${await response.text()}`);
        }

        const data = await response.json();
        console.log("✅ Login exitoso, token recibido:", data.token);

        // Guardar el token en localStorage
        saveToken(data.token);

        return data;
    } catch (error) {
        console.error("❌ Error en login:", error.message);
        throw error;
    }
};

// 🔹 Función para cerrar sesión
export const logout = async () => {
    try {
        const token = getToken();
        if (!token) throw new Error("No hay token almacenado.");

        const response = await fetch(`${BASE_URL}/api/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${await response.text()}`);
        }

        console.log("✅ Logout exitoso.");
        removeToken();
    } catch (error) {
        console.error("❌ Error en logout:", error.message);
    }
};

// 🔹 Función para obtener datos del usuario autenticado
export const getUser = async () => {
    try {
        const token = getToken();
        if (!token) throw new Error("No hay token almacenado.");

        const response = await fetch(`${BASE_URL}/api/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // Enviar token en cada solicitud protegida
            },
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${await response.text()}`);
        }

        const userData = await response.json();
        console.log("👤 Usuario autenticado:", userData);
        localStorage.setItem("usuarioId", userData.id);

        return userData;
    } catch (error) {
        console.error("❌ Error al obtener usuario:", error.message);
        throw new Error("Usuario no autenticado.");
    }
};
