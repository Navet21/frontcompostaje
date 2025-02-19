import { createContext, useState, useEffect } from "react";

export const CentroContext = createContext();

export default function CentroProvider({ children }) {
    const [centroId, setCentroId] = useState(localStorage.getItem("centroid") || "");

    useEffect(() => {
      const handleStorageChange = () => {
        setCentroId(localStorage.getItem("centroid") || "");
      };
  
      // Escuchar cambios en localStorage
      window.addEventListener("storage", handleStorageChange);
  
      // Escuchar cambios manuales dentro de la misma pestaña
      const interval = setInterval(() => {
        const newCentroId = localStorage.getItem("centroid") || "";
        if (newCentroId !== centroId) {
          setCentroId(newCentroId);
        }
      }, 500); // Verificar cada 500ms (puedes ajustarlo)
  
      return () => {
        window.removeEventListener("storage", handleStorageChange);
        clearInterval(interval);
      };
    }, [centroId]);

  return (
    <CentroContext.Provider value={{centroId}}>
      {children}
    </CentroContext.Provider>
  );
}
