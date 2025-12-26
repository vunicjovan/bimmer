import React from "react";
import type { Vehicle } from "../advertisement-card/AdvertisementCard";
import AdvertisementCard from "../advertisement-card/AdvertisementCard";
import "./AdvertisementGrid.css";

interface VehicleGridProps {
    vehicles: Vehicle[];
}

const AdvertisementGrid: React.FC<VehicleGridProps> = ({ vehicles }) => (
    <div className="vehicle-grid">
        {vehicles.map((v) => (
            <AdvertisementCard key={v.id} vehicle={v} />
        ))}
    </div>
);

export default AdvertisementGrid;
