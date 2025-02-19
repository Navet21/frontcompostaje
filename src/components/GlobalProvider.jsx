import { createContext } from "react";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
    return (
        <GlobalContext.Provider value={{  }}>
            {children}
        </GlobalContext.Provider>
    );
}
