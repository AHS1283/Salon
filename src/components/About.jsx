import React from "react";
import {
  UserRound,
  Package,
  Circle,
  Flower2,
  ArrowRight,
} from "lucide-react";
import "./About.css";

import aboutImage from "../assets/hairvilla_about.webp";

const FEATURES = [
  {
    icon: UserRound,
    title: "Expert",
    subtitle: "Professionals",
    text: "Trained & certified beauty experts",
  },
  {
    icon: Package,
    title: "Premium",
    subtitle: "Products",
    text: "High quality products for best results",
  },
  {
    icon: Circle,
    title: "Unisex",
    subtitle: "Services",
    text: "Tailored for men and women",
  },
  {
    icon: Flower2,
    title: "Relaxing",
    subtitle: "Environment",
    text: "Comfortable, clean & peaceful space",
  },
];

export default function About() {
  const scrollToServices = () => {
    const section = document.getElementById("services");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="about-section" id="about">
      <div className="about-container">

        {/* IMAGE */}
        <div className="about-image-wrapper">
          <img
            src={aboutImage}
            alt="Lumière Salon interior"
            loading="lazy"
          />

          <div className="about-image-overlay" />
        </div>

        {/* CONTENT */}
        <div className="about-content">
          <span className="about-eyebrow">
            ABOUT US
          </span>

          <h2>
            Beauty for
            <br />
            Everyone
          </h2>

          <p>
            Personalized beauty care designed to help
            you look and feel your best.
          </p>

          <button
            type="button"
            className="about-learn-btn"
            onClick={scrollToServices}
          >
            <span>LEARN MORE</span>
            <ArrowRight size={14} strokeWidth={1.7} />
          </button>
        </div>

        {/* FEATURES */}
        <div className="about-features">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                className="about-feature"
                key={feature.title}
              >
                <div className="about-feature-icon">
                  <Icon size={21} strokeWidth={1.4} />
                </div>

                <h3>
                  {feature.title}
                  <br />
                  {feature.subtitle}
                </h3>

                <p>{feature.text}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}