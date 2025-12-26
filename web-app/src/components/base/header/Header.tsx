import React from "react";
import ThemeToggle from "../../appearance/theme-toggle/ThemeToggle";
import "./Header.css";

interface HeaderProps {
    theme: "light" | "dark";
    toggleTheme: () => void;
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({
    theme,
    toggleTheme,
    toggleSidebar,
}) => (
    <header className="header">
        <h1 className="logo">Bimmer</h1>
        <div className="header-actions">
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                ☰
            </button>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
    </header>
);

export default Header;
