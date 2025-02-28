import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    console.log("Ejecutando useFetch:", { data, loading, error });

    const fetchData = useCallback(async () => {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
            navigate("/");
            return;
        }

        try {
            console.log("Nueva llamada a la API");
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`
                },
            });

            if (!res.ok) throw new Error("Error al consumir la API");

            const data = await res.json();
            setData(data);
        } catch (error) {
            setData([]);
            setError(error.message);
            console.error('Error en la llamada API:', error);
        } finally {
            setLoading(false);
        }
    }, [url, navigate]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error };
};

export default useFetch;
