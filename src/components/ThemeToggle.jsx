import { useState, useEffect } from 'react';

const ThemeToggle = () => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // Recupera el tema guardado en localStorage
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            setTheme('light'); // Por defecto, 'light'
        }
    }, []);

    useEffect(() => {
        // Actualiza la clase del body según el tema
        if (theme === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }

        // Guarda el tema en localStorage
        localStorage.setItem('theme', theme);

        // Actualiza el ícono
        const icon = document.querySelector('.theme-icon');
        if (icon) {
            icon.textContent = theme === 'dark' ? 'dark_mode' : 'sunny';
        }
    }, [theme]);

    const toggleDarkMode = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    return (
        <button className="theme-toggle" onClick={toggleDarkMode}>
            <span className="theme-icon">
                {theme === 'dark' ? 'dark_mode' : 'sunny'}
            </span>
        </button>
    );
};

export default ThemeToggle;
