import React from "react";
import {
  ArrowUpRight,
  MapPin,
} from "lucide-react";

import { LOCATIONS } from "../data/content.js";
import "../Styles/OurLocations.css";

export default function Locations() {
  return (
    <section
      className="ll-section"
      id="locations"
    >
      <div className="ll-container">

        {/* =========================================
            HEADER
        ========================================== */}

        <div className="ll-header">

          <div className="ll-header-left">

            <span className="ll-eyebrow">
              OUR LOCATIONS
            </span>

            <h2 className="ll-title">
              Find your
              <span> RICHBIT SALON.</span>
            </h2>

          </div>


          <div className="ll-header-right">

            <p className="ll-description">
              Discover a RICHBIT SALON near you,
              each thoughtfully designed to offer
              the same signature experience.
            </p>

          </div>

        </div>


        {/* =========================================
            DECORATIVE LINE
        ========================================== */}

        <div className="ll-heading-line">
          <span></span>
          <i></i>
          <span></span>
        </div>


        {/* =========================================
            LOCATIONS
        ========================================== */}

        <div className="ll-grid">

          {LOCATIONS.map((location) => (

            <article
              className="ll-card"
              key={location.number}
            >

              {/* IMAGE */}

              <img
                className="ll-image"
                src={location.image}
                alt={`${location.city} RICHBIT SALON`}
                loading="lazy"
              />


              {/* OVERLAY */}

              <div className="ll-overlay"></div>


              {/* TOP INFORMATION */}

              <div className="ll-top">

                <span className="ll-number">
                  {location.number}
                </span>

                <span className="ll-status">
                  RICHBIT SALON
                </span>

              </div>


              {/* CONTENT */}

              <div className="ll-content">

                <small className="ll-area">
                  {location.area}
                </small>

                <h3 className="ll-city">
                  {location.city}
                </h3>

                <p className="ll-description">
                  {location.description}
                </p>


                {/* MAP BUTTON */}

                <a
                  href={location.map}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ll-map-button"
                  aria-label={`View ${location.city} salon location on Google Maps`}
                >

                  <MapPin
                    size={11}
                    strokeWidth={1.5}
                  />

                  <span>
                    VIEW LOCATION
                  </span>

                  <ArrowUpRight
                    size={11}
                    strokeWidth={1.5}
                  />

                </a>

              </div>

            </article>

          ))}

        </div>

      </div>
    </section>
  );
}
