import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DUMMY_WORKS } from "../data/content.js";
import "../Styles/OurWork.css";

// How many images to show on the home page preview (4 left + 4 right = 8, all uniform size)
const PREVIEW_COUNT = 8;

// Generic placeholder used when a single image URL is broken / fails to load
const FALLBACK_IMAGE = "";

export default function OurWork() {
  const [images] = useState(DUMMY_WORKS.slice(0, PREVIEW_COUNT));
  const [loadedIds, setLoadedIds] = useState({});

  const handleImageLoaded = (id) => {
    setLoadedIds((prev) => ({ ...prev, [id]: true }));
  };

  const handleImageError = (e) => {
    if (e.target.src !== FALLBACK_IMAGE) {
      e.target.src = FALLBACK_IMAGE;
    }
  };

  return (
    <section className="lw-section" id="our-work">
      <div className="lw-container">
        {/* HEADER */}
        <div className="lw-header">
          <div className="lw-header-left">
            <span className="lw-eyebrow">OUR CRAFT</span>
            <h2 className="lw-title">Our Work</h2>
          </div>

          <div className="lw-header-right">
            <p className="lw-description">
              A glimpse into the artistry, creativity and attention to
              detail behind every Blush Salon  experience.
            </p>
          </div>
        </div>

        {/* DECORATIVE LINE */}
        <div className="lw-heading-line">
          <span></span>
          <i></i>
          <span></span>
        </div>

        {/* IMAGE GRID — 4 images left + 4 images right, all uniform size */}
        <div className="lw-grid">
          {images.map((item, index) => (
            <div
              className={`lw-card ${loadedIds[item.id] ? "lw-loaded" : ""}`}
              key={item.id}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <img
                className="lw-image"
                src={item.imageUrl || FALLBACK_IMAGE}
                alt={item.title || item.category || " work"}
                loading="lazy"
                onLoad={() => handleImageLoaded(item.id)}
                onError={handleImageError}
              />
              <div className="lw-overlay"></div>
            </div>
          ))}
        </div>

        {/* VIEW ALL BUTTON */}
        <div className="lw-bottom">
          <Link to="/our-work" className="lw-view-all-btn">
            View All Works
          </Link>
        </div>
      </div>
    </section>
  );
}