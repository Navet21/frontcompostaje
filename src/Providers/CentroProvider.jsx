import { createContext, useState} from "react";

export const CentroContext = createContext();

export default function CentroProvider({ children }) {
    const [centroId, setCentroId] = useState(null);

    const updateCentroId = (newCentroId) => {
        setCentroId(newCentroId);
    };

    return (
        <CentroContext.Provider value={{ centroId, updateCentroId }}>
            {children}
        </CentroContext.Provider>
    );
}
