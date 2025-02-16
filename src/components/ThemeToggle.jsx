import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
    const obtenerModoSistema = () => {
        const temaGuardado = localStorage.getItem("theme");
        if (temaGuardado) return temaGuardado;
        
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    };

    const [theme, setTheme] = useState(obtenerModoSistema);

    useEffect(() => {
        // Aplica el tema al <html> en lugar del <body>
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        // Guarda el tema en localStorage
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleDarkMode = () => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    };

    return (
        <button
            className="theme-toggle p-2 bg-gray-200 dark:bg-gray-800 rounded-full"
            onClick={toggleDarkMode}
        >
            {theme === "dark" ? (
                <FaMoon className="text-blue-400" size={20} />
            ) : (
                <FaSun className="text-yellow-500" size={20} />
            )}
        </button>
    );
};

export default ThemeToggle;
