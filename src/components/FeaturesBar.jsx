import React from "react";
import { FEATURES } from "../data/content.js";
import "../Styles/FeaturesBar.css";

export default function FeaturesBar() {
  return (
    <div className="features-bar">
      <ul>
        {FEATURES.map((f) => (
          <li key={f.title}>
            <f.icon className="f-icon" size={26} />

            <div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}