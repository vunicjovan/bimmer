import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/base/header/Header";
import Sidebar from "./components/base/sidebar/Sidebar";
import AdvertisementGrid from "./components/advertisement/advertisement-grid/AdvertisementGrid";
import AdvertisementDetail from "./components/advertisement/advertisement-detail/AdvertisementDetail";
import EmptyState from "./components/base/state/empty-state/EmptyState";
import type { Vehicle } from "./components/advertisement/advertisement-card/AdvertisementCard";

function App() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    useEffect(() => {
        setVehicles([
            {
                id: 1,
                type: "Car",
                name: "BMW 320i",
                year: 2018,
                mileage: 35000,
                price: "$18,000",
                image: "",
                author: "John Doe",
                description: "Well-maintained BMW 320i.",
                images: [
                    "https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/vdat/submodels/bmw_3-series_bmw-3-series-sedan_2018-1640184848756.jpg?fill=18:11&resize=640:*",
                    "https://www.fmdt.info/vehicle/bmw/2018/3-series-320i-32-white.png",
                    "https://di-uploads-pod16.dealerinspire.com/bmwofbloomington/uploads/2018/10/2018-BMW-3-Series-Hero-320i.png",
                ],
            },
            {
                id: 2,
                type: "Motorbike",
                name: "Yamaha R6",
                year: 2020,
                mileage: 1200,
                price: "$11,500",
                image: "",
                author: "Alice Smith",
                description: "Sporty Yamaha R6 in excellent condition.",
                images: [
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2jT8dWdSTnQ9t_4uzOs6N7c2ZCL9BvgiJMQ&s",
                    "https://i.ebayimg.com/images/g/4YEAAOSwhyNgfDUM/s-l400.png",
                ],
            },
            {
                id: 3,
                type: "Boat",
                name: "Bayliner 160",
                year: 2015,
                mileage: 0,
                price: "$8,000",
                image: "",
                author: "Bob Johnson",
                description: "Bayliner 160, perfect for weekends.",
                images: [],
            },
        ]);
    }, []);

    return (
        <div className="app">
            <Header
                theme={theme}
                toggleTheme={() =>
                    setTheme(theme === "light" ? "dark" : "light")
                }
                toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            />

            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="content">
                            <Sidebar isOpen={sidebarOpen} />
                            <main className="main">
                                {vehicles.length === 0 ? (
                                    <EmptyState />
                                ) : (
                                    <AdvertisementGrid vehicles={vehicles} />
                                )}
                            </main>
                        </div>
                    }
                />
                <Route
                    path="/advertisement/:id"
                    element={<AdvertisementDetail vehicles={vehicles} />}
                />
            </Routes>
        </div>
    );
}

export default App;
