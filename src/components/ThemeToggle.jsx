import { useState, useEffect } from 'react';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        // Aplica el tema al <html> en lugar del <body>
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Guarda el tema en localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleDarkMode = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    return (
        <button
            className="theme-toggle p-2 bg-gray-200 dark:bg-gray-800 rounded-full"
            onClick={toggleDarkMode}
        >
            <span className="theme-icon">
                {theme === 'dark' ? '🌙' : '☀️'}
            </span>
        </button>
    );
};

export default ThemeToggle;
