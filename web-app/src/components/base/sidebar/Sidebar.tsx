import React from "react";
import "./Sidebar.css";

interface SidebarProps {
    isOpen: boolean;
    onPost?: () => void;
    onSearch?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onPost, onSearch }) => (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="service">
            <button onClick={onPost}>Post Advertisement</button>
        </div>

        <div className="service">
            <button onClick={onSearch}>Search Advertisements</button>
        </div>

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

        <div className="sidebar-bottom">
            <small>
                <a href="/sign-in" className="sidebar-link">
                    Sign in
                </a>
                {" | "}
                New to Bimmer?{" "}
                <a href="/sign-up" className="sidebar-link">
                    Sign up!
                </a>
            </small>
        </div>
    </aside>
);

export default Sidebar;
