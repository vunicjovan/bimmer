import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdvertisementCard.css";

export interface Vehicle {
    id: number;
    type: string;
    name: string;
    year: number;
    mileage: number;
    price: string;
    image?: string;
    author?: string;
    description?: string;
    images?: string[];
}

interface VehicleCardProps {
    vehicle: Vehicle;
}

const AdvertisementCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
    const navigate = useNavigate();

    // Get first image from images array, or fall back to image prop, or use emoji
    const displayImage =
        vehicle.images && vehicle.images.length > 0
            ? vehicle.images[0]
            : vehicle.image || "📷";

    const isImageUrl =
        typeof displayImage === "string" && displayImage.startsWith("http");

    return (
        <div
            className="vehicle-card"
            onClick={() => navigate(`/advertisement/${vehicle.id}`)}
            style={{ cursor: "pointer" }}
        >
            <div className="vehicle-image">
                {isImageUrl ? (
                    <img
                        src={displayImage}
                        alt={vehicle.name}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                ) : (
                    displayImage
                )}
            </div>
            <div className="vehicle-info">
                <h3>{vehicle.name}</h3>
                <p>
                    {vehicle.year} • {vehicle.mileage.toLocaleString()} km
                </p>
                <p className="price">{vehicle.price}</p>
                <p className="type">{vehicle.type}</p>
            </div>
        </div>
    );
};

export default AdvertisementCard;
