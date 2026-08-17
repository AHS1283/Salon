import React from "react";
import {
  ArrowUpRight,
  MapPin,
} from "lucide-react";
import "../Styles/OurLocations.css";

const LOCATIONS = [
  {
    number: "01",
    city: "Mumbai",
    area: "Bandra West",
    description:
      "Our signature Lumière space in the heart of Bandra.",
    image:
      "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1200&q=85",
    map:
      "https://www.google.com/maps/search/?api=1&query=Bandra+West+Mumbai",
  },
  {
    number: "02",
    city: "Pune",
    area: "Koregaon Park",
    description:
      "A calm, intimate salon experience in Koregaon Park.",
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=85",
    map:
      "https://www.google.com/maps/search/?api=1&query=Koregaon+Park+Pune",
  },
  {
    number: "03",
    city: "Nashik",
    area: "College Road",
    description:
      "Modern beauty, thoughtful service and Lumière warmth.",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85",
    map:
      "https://www.google.com/maps/search/?api=1&query=College+Road+Nashik",
  },
];

export default function Locations() {
  return (
    <section
      className="ll-section"
      id="locations"
    >
      <div className="ll-container">

        {/* HEADER */}
        <div className="ll-header">

          <div className="ll-header-left">
            <span className="ll-eyebrow">
              OUR LOCATIONS
            </span>

            <h2 className="ll-title">
              Find your
              <span> Lumière.</span>
            </h2>
          </div>

          <div className="ll-header-right">
            <p className="ll-description">
              Discover a Lumière salon near you,
              each thoughtfully designed to offer
              the same signature experience.
            </p>
          </div>

        </div>

        {/* LINE */}
        <div className="ll-heading-line">
          <span></span>
          <i></i>
          <span></span>
        </div>

        {/* LOCATIONS */}
        <div className="ll-grid">

          {LOCATIONS.map((location) => (
            <article
              className="ll-card"
              key={location.number}
            >

              <img
                className="ll-image"
                src={location.image}
                alt={`${location.city} Lumière Salon`}
                loading="lazy"
              />

              <div className="ll-overlay"></div>

              {/* TOP */}
              <div className="ll-top">

                <span className="ll-number">
                  {location.number}
                </span>

                <span className="ll-status">
                  LUMIÈRE SALON
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

                <a
                  href={location.map}
                  target="_blank"
                  rel="noreferrer"
                  className="ll-map-button"
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