import { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const CentroContext = createContext();

export default function CentroProvider({ children }) {
    const { idCentro } = useParams(); // Inicializamos con el valor de la URL porque si no explota
    const [centroId, setCentroId] = useState(idCentro);

    // Si cambia el ID en la URL, actualizamos el contexto
    useEffect(() => {
        if (idCentro) {
            setCentroId(idCentro);
        }
    }, [idCentro]);

    const updateCentroId = (newCentroId) => {
        setCentroId(newCentroId);
    };

    return (
        <CentroContext.Provider value={{ centroId, updateCentroId }}>
            {children}
        </CentroContext.Provider>
    );
}
