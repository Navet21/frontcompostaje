import { useState, useCallback } from "react";

export const usePost = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const postData = useCallback(async (body) => {
        setLoading(true);
        setError(null);

        try {
            console.log('Enviando datos a la API', body);
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
                },
                body: JSON.stringify(body),
                credentials: 'include',
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
    }, [url]);

    return { data, loading, error, postData };
};

export default usePost;
