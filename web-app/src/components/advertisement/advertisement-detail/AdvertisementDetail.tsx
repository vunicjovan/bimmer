import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Vehicle } from "../advertisement-card/AdvertisementCard";

import { Swiper, SwiperSlide } from "swiper/react";
import {
    Navigation,
    Pagination,
    Thumbs,
    FreeMode,
    Keyboard,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./AdvertisementDetail.css";

interface AdvertisementDetailProps {
    vehicles: Vehicle[];
}

const AdvertisementDetail: React.FC<AdvertisementDetailProps> = ({
    vehicles,
}) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const vehicle = vehicles.find((v) => v.id === Number(id));

    /* -------------------- State -------------------- */
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [fullscreen, setFullscreen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    /* -------------------- Images -------------------- */
    const images =
        vehicle?.images && vehicle.images.length > 0
            ? vehicle.images
            : [
                  "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg",
              ];

    const slidesPerView = Math.min(images.length, 4);
    const canLoop = images.length > 1;

    /* -------------------- ESC handling -------------------- */
    useEffect(() => {
        if (!fullscreen) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setFullscreen(false);
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [fullscreen]);

    if (!vehicle) {
        return (
            <p className="advertisement-not-found">Advertisement not found</p>
        );
    }

    return (
        <div className="advertisement-detail-container">
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Back
            </button>

            <div className="advertisement-top">
                <div className="left-column">
                    <h2>{vehicle.name}</h2>
                    <p className="vehicle-meta">
                        {vehicle.year} • {vehicle.mileage.toLocaleString()} km •{" "}
                        {vehicle.price}
                    </p>
                    <p className="vehicle-author">Author: {vehicle.author}</p>
                </div>

                <div className="right-column">
                    <Swiper
                        modules={[Navigation, Pagination, Thumbs]}
                        navigation
                        pagination={{ clickable: true }}
                        thumbs={{ swiper: thumbsSwiper }}
                        spaceBetween={10}
                        loop={canLoop}
                        onSlideChange={(s) => setCurrentSlide(s.realIndex)}
                        className="main-swiper"
                    >
                        {images.map((img, idx) => (
                            <SwiperSlide key={idx}>
                                <img
                                    src={img}
                                    alt={`${vehicle.name} ${idx + 1}`}
                                    onClick={() => setFullscreen(true)}
                                    style={{ cursor: "pointer" }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {images.length > 1 && (
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            slidesPerView={slidesPerView}
                            spaceBetween={10}
                            freeMode
                            watchSlidesProgress
                            className="thumbs-swiper"
                        >
                            {images.map((img, idx) => (
                                <SwiperSlide key={idx}>
                                    <img src={img} alt={`thumb-${idx}`} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
            </div>

            {/* ---------- Description ---------- */}
            <div className="advertisement-description">
                <h3>Description</h3>
                <p>{vehicle.description}</p>
            </div>

            {/* ---------- Fullscreen ---------- */}
            {fullscreen && (
                <div className="fullscreen-overlay">
                    <div className="fullscreen-counter">
                        {currentSlide + 1} / {images.length}
                    </div>

                    <button
                        className="fullscreen-close"
                        onClick={() => setFullscreen(false)}
                    >
                        ×
                    </button>

                    <Swiper
                        modules={[Navigation, Pagination, Keyboard]}
                        navigation
                        pagination={{ clickable: true }}
                        keyboard={{
                            enabled: true,
                            onlyInViewport: false,
                        }}
                        initialSlide={currentSlide}
                        loop={canLoop}
                        spaceBetween={10}
                        onSlideChange={(s) => setCurrentSlide(s.realIndex)}
                        className="fullscreen-swiper"
                    >
                        {images.map((img, idx) => (
                            <SwiperSlide key={idx}>
                                <img
                                    src={img}
                                    alt={`${vehicle.name} ${idx + 1}`}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    );
};

export default AdvertisementDetail;
