import React from "react";
import ThemeToggle from "../../appearance/theme-toggle/ThemeToggle";
import bimmerLogo from "../../../assets/images/bimmer-logo-transparent.png";
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
        <img src={bimmerLogo} alt="Bimmer Logo" className="logo-image" />
        <div className="header-actions">
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                ☰
            </button>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
    </header>
);

export default Header;
