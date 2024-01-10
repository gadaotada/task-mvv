/* Theme provider for light/dark mode basic implementation no libs used */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} });

type ThemeProviderProps = {
    children: ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        // lets keep things simple and use the local storage
        localStorage.setItem('theme-mvv', newTheme);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme-mvv') || 'light';
        setTheme(savedTheme);
    }, []);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
