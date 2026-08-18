import React from "react";
import {
  Instagram,
  Twitter,
  Facebook,
  Check,
  Calendar,
} from "lucide-react";

import { TEAM, WHY_US } from "../data/content.js";
import "../Styles/Team.css";

export default function Team() {
  return (
    <section className="team" id="team">
      <div className="wrap">

        <span className="eyebrow">OUR EXPERTS</span>

        <h2 style={{ marginBottom: 30 }}>
          Meet Our Talented Team
        </h2>

        {/* =====================================================
            TEAM MEMBERS
        ===================================================== */}
        <div className="team-grid">
          {TEAM.map((m) => (
            <div className="team-card" key={m.name}>

              <div className="ph">
                <img src={m.img} alt={m.name} />
              </div>

              <h4>{m.name}</h4>

              <p>{m.role}</p>

              <div className="socials">
                <Instagram size={14} />
                <Twitter size={14} />
                <Facebook size={14} />
              </div>

            </div>
          ))}
        </div>


        {/* =====================================================
            WHY CHOOSE US — LAST SECTION
        ===================================================== */}
        <div className="why-card">

          <div className="why-content">

            <div className="why-heading">
              <span className="why-eyebrow">
                THE HAIR SPACE
              </span>

              <h3>
                Why Choose Us?
              </h3>

              <p>
                Experience personalized beauty care with
                our talented professionals and premium services.
              </p>
            </div>


            <ul>
              {WHY_US.map((t) => (
                <li key={t}>
                  <span className="why-check">
                    <Check size={14} />
                  </span>

                  <span>{t}</span>
                </li>
              ))}
            </ul>


            <button className="btn btn-dark">
              <Calendar size={15} />
              Book Appointment
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
