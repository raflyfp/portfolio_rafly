import { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import SpaceBackground from '../Components/SpaceBackground';
import SpaceCursor from '../Components/SpaceCursor';

export default function PortfolioLayout({ children, cvFiles = [], brandName = 'Rafly.Dev', profilePhotoUrl = null }) {
    const [theme, setTheme] = useState(() => {
        if (typeof window === 'undefined') {
            return 'dark';
        }

        return window.localStorage.getItem('portfolio-theme') || 'dark';
    });

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle('theme-light', theme === 'light');
        root.classList.toggle('theme-dark', theme === 'dark');
        root.style.colorScheme = theme;
        window.localStorage.setItem('portfolio-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
    };

    return (
        <div className={`theme-${theme} min-h-screen overflow-hidden bg-[#050506] text-white antialiased transition-colors duration-500`}>
            <SpaceBackground theme={theme} />
            <SpaceCursor />

            <Navbar
                cvFiles={cvFiles}
                brandName={brandName}
                profilePhotoUrl={profilePhotoUrl}
                theme={theme}
                onThemeToggle={toggleTheme}
            />
            <main className="relative z-10">{children}</main>
        </div>
    );
}
