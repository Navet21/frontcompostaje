import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const usePost = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const postData = useCallback(async (body) => {
        setLoading(true);
        setError(null);

        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
            navigate("/");
            return;
        }

        try {
            console.log("Enviando datos a la API", body);
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`
                },
                body: JSON.stringify(body),
            });

            if (!res.ok) throw new Error("Error al consumir la API");

            const responseData = await res.json();
            setData(responseData);
        } catch (error) {
            setError(error.message);
            setData(null);
            return null;
        } finally {
            setLoading(false);
        }
    }, [url, navigate]);

    return { data, loading, error, postData };
};

export default usePost;
