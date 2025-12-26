import React from "react";
import "./Sidebar.css";

interface SidebarProps {
    isOpen: boolean;
    onSearch?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onSearch }) => (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2>Search</h2>

        <div className="filter">
            <label>Vehicle type</label>
            <select>
                <option>Any</option>
                <option>Car</option>
                <option>Motorbike</option>
                <option>Boat</option>
            </select>
        </div>

        <div className="filter">
            <label>Production year</label>
            <input type="number" placeholder="From" />
            <input type="number" placeholder="To" />
        </div>

        <div className="filter">
            <label>Mileage (km)</label>
            <input type="number" placeholder="Max mileage" />
        </div>

        <button onClick={onSearch}>Search</button>
    </aside>
);

export default Sidebar;
