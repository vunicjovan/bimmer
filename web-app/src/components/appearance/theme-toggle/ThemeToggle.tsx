import React from "react";
import "./ThemeToggle.css";

interface ThemeToggleProps {
    theme: "light" | "dark";
    toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => (
    <label className="theme-toggle">
        <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
        />
        <span className="slider" />
    </label>
);

export default ThemeToggle;
