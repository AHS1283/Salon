import React, { useEffect, useState } from "react";
import { Calendar, ArrowRight, Star } from "lucide-react";
import { TEAM } from "../data/content.js";
import salonHero from "../assets/about_ex.png";
import "./Hero.css";

function Stars() {
  return (
    <div className="hero-stars">
      {[1, 2, 3, 4, 5].map((star, index) => (
        <Star
          key={star}
          className="hero-star"
          size={13}
          fill="#D7A044"
          color="#D7A044"
          strokeWidth={1.5}
          style={{
            "--star-delay": `${1.05 + index * 0.08}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(timer);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      className={`lumiere-hero ${mounted ? "is-mounted" : ""}`}
      id="home"
    >
      {/* FULL BACKGROUND IMAGE */}
      <div className="lumiere-hero-background">
        <img
          src={salonHero}
          alt="Luxury salon interior"
          className="lumiere-hero-bg-image"
        />
      </div>

      {/* OVERLAY */}
      <div className="lumiere-hero-overlay"></div>

      {/* CONTENT */}
      <div className="lumiere-hero-inner">
        <div className="lumiere-hero-content">
          <div className="lumiere-hero-text">

            <div
              className="lumiere-eyebrow lumiere-reveal"
              style={{ "--d": "0.1s" }}
            >
              <span className="lumiere-eyebrow-line"></span>
              FEEL CONFIDENT.
            </div>

            <h1
              className="lumiere-reveal"
              style={{ "--d": "0.25s" }}
            >
              <span className="lumiere-line">
                Look Good.
              </span>
              <br />
              <span className="lumiere-line">
                <span className="lumiere-accent">
                  Feel Amazing.
                </span>
              </span>
            </h1>

            <p
              className="lumiere-reveal"
              style={{ "--d": "0.45s" }}
            >
              Expert care for everyone. Hair, skin, nails &amp; more –
              <br className="desktop-only" />
              all in one premium salon experience.
            </p>

            <div
              className="lumiere-hero-buttons lumiere-reveal"
              style={{ "--d": "0.6s" }}
            >
              <button
                type="button"
                className="lumiere-btn lumiere-btn-primary"
                onClick={() => scrollToSection("booking")}
              >
                <Calendar size={14} strokeWidth={1.8} />

                <span>BOOK APPOINTMENT</span>

                <ArrowRight
                  className="lumiere-btn-arrow"
                  size={14}
                  strokeWidth={1.8}
                />

                <span className="lumiere-btn-shine"></span>
              </button>

              <button
                type="button"
                className="lumiere-btn lumiere-btn-secondary"
                onClick={() => scrollToSection("services")}
              >
                <span>EXPLORE SERVICES</span>

                <ArrowRight
                  className="lumiere-btn-arrow"
                  size={14}
                  strokeWidth={1.8}
                />
              </button>
            </div>

            <div
              className="lumiere-client-rating lumiere-reveal"
              style={{ "--d": "0.78s" }}
            >
              <div className="lumiere-avatar-group">
                {TEAM.slice(0, 4).map((person, index) => (
                  <img
                    key={person.name || index}
                    src={person.img}
                    alt={person.name || "Salon team member"}
                    style={{ "--i": index }}
                  />
                ))}
              </div>

              <div className="lumiere-rating-content">
                <strong>5K+ Happy Clients</strong>

                <div className="lumiere-rating-row">
                  <Stars />
                  <span>4.8</span>
                  <small>(1200+ Reviews)</small>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}