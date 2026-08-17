import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { GALLERY, GALLERY_TABS } from "../data/content.js";
import "../Styles/Gallery.css";

export default function Gallery() {
  const [tab, setTab] = useState("All");

  const filtered =
    tab === "All"
      ? GALLERY
      : GALLERY.filter((item) => item.cat === tab);

  return (
    <section className="luxury-gallery" id="gallery">
      <div className="luxury-gallery-wrap">

        {/* =========================
            HEADER
        ========================= */}
        <div className="gallery-header">

          <div className="gallery-header-left">
            <span className="gallery-eyebrow">
              OUR GALLERY
            </span>

            <h2>
              Beauty in
              <span> Every Detail.</span>
            </h2>
          </div>

          <div className="gallery-header-right">
            <p>
              Explore our salon, beauty work and relaxing
              atmosphere — thoughtfully designed for every visit.
            </p>
          </div>

        </div>


        {/* =========================
            DECORATIVE LINE
        ========================= */}
        <div className="gallery-heading-line">
          <span></span>
          <i></i>
          <span></span>
        </div>


        {/* =========================
            FILTER TABS
        ========================= */}
        <div className="gallery-filter-wrap">

          <div className="gallery-filter">
            {GALLERY_TABS.map((item) => (
              <button
                key={item}
                type="button"
                className={tab === item ? "active" : ""}
                onClick={() => setTab(item)}
              >
                {item}
              </button>
            ))}
          </div>

        </div>


        {/* =========================
            GALLERY
        ========================= */}
        <div
          className={`luxury-gallery-grid ${
            filtered.length < 5 ? "gallery-small-grid" : ""
          }`}
          key={tab}
        >

          {filtered.map((item, index) => (
            <article
              className={`gallery-card gallery-card-${index + 1}`}
              key={`${item.cat}-${index}`}
              style={{
                "--gallery-delay": `${index * 0.08}s`,
              }}
            >

              <img
                src={item.img}
                alt={`${item.cat} at Lumière`}
                loading="lazy"
              />

              {/* IMAGE DARKEN */}
              <div className="gallery-card-shade"></div>


              {/* TOP CATEGORY */}
              <div className="gallery-category">
                <span>{item.cat}</span>
              </div>


              {/* BOTTOM CONTENT */}
              <div className="gallery-card-content">

                <div>
                  <span className="gallery-card-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>
                    {item.cat}
                  </h3>
                </div>

                <button
                  type="button"
                  className="gallery-arrow"
                  aria-label={`View ${item.cat}`}
                >
                  <ArrowUpRight
                    size={17}
                    strokeWidth={1.5}
                  />
                </button>

              </div>

            </article>
          ))}

        </div>


        {/* =========================
            BOTTOM CTA
        ========================= */}
        <div className="gallery-bottom">

          <div className="gallery-bottom-line"></div>

          <button
            type="button"
            className="gallery-view-button"
          >
            <span>VIEW FULL GALLERY</span>

            <ArrowUpRight
              size={15}
              strokeWidth={1.5}
            />
          </button>

          <div className="gallery-bottom-line"></div>

        </div>

      </div>
    </section>
  );
}