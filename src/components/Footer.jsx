import React from "react";
import {
  Instagram,
  Facebook,
  Twitter,
  Send,
} from "lucide-react";

import { NAV_LINKS } from "../data/content.js";
import blushLogo from "../assets/ninelogo.png";
import "../Styles/Footer.css";

export default function Footer() {
  const services = [
    "Hair",
    "Skin",
    "Nails",
    "Grooming",
    "Spa",
    "Bridal",
  ];

  /* =====================================================
     SCROLL TO SECTION
  ===================================================== */

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  /* =====================================================
     CONVERT TEXT TO SECTION ID
  ===================================================== */

  const getSectionId = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  /* =====================================================
     QUICK LINK CLICK
  ===================================================== */

  const handleNavClick = (link) => {
    const id = getSectionId(link);
    scrollToSection(id);
  };

  /* =====================================================
     SERVICE CLICK
  ===================================================== */

  const handleServiceClick = (service) => {
    const serviceId = getSectionId(service);

    const section =
      document.getElementById(serviceId) ||
      document.getElementById("services");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  /* =====================================================
     SOCIAL LINKS
  ===================================================== */

  const socialLinks = {
    Instagram: "https://www.instagram.com/",
    Facebook: "https://www.facebook.com/",
    Twitter: "https://twitter.com/",
  };

  /* =====================================================
     NEWSLETTER
  ===================================================== */

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const input = form.querySelector("input");

    if (!input || !input.value.trim()) {
      return;
    }

    alert("Thank you for subscribing!");

    input.value = "";
  };

  return (
    <footer className="site-footer">
      <div className="wrap">

        {/* =====================================================
            FOOTER GRID
        ===================================================== */}

        <div className="footer-grid">

          {/* =====================================================
              ABOUT
          ===================================================== */}

          <div className="footer-about">

            {/* LOGO + NAME */}
            <div className="footer-logo">
              <img
                src={blushLogo}
                alt="TO THE NINES Logo"
                className="footer-logo-image"
              />

              <span className="footer-logo-name">
                TO THE NINES
              </span>
            </div>

            <p>
              Beauty is for everyone. We make it personal.
            </p>

            <div className="footer-socials">

              <a
                href={socialLinks.Instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>

              <a
                href={socialLinks.Facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook size={15} />
              </a>

              <a
                href={socialLinks.Twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter size={15} />
              </a>

            </div>

          </div>


          {/* =====================================================
              QUICK LINKS
          ===================================================== */}

          <div className="footer-column">

            <h4>Quick Links</h4>

            <ul>

              {NAV_LINKS.map((link) => (
                <li key={link}>

                  <button
                    type="button"
                    className="footer-link-button"
                    onClick={() => handleNavClick(link)}
                  >
                    {link}
                  </button>

                </li>
              ))}

            </ul>

          </div>


          {/* =====================================================
              SERVICES
          ===================================================== */}

          <div className="footer-column">

            <h4>Our Services</h4>

            <ul>

              {services.map((service) => (
                <li key={service}>

                  <button
                    type="button"
                    className="footer-link-button"
                    onClick={() => handleServiceClick(service)}
                  >
                    {service}
                  </button>

                </li>
              ))}

            </ul>

          </div>


          {/* =====================================================
              CONTACT
          ===================================================== */}

          <div className="footer-column">

            <h4>Contact Info</h4>

            <ul>

              <li>
                <a
                  href="tel:+919876543210"
                  className="footer-contact-link"
                >
                  +91 98765 43210
                </a>
              </li>

              <li>
                <a
                  href="mailto:info@thehairspace.com"
                  className="footer-contact-link"
                >
                  info@blushsalon.com
                </a>
              </li>

              <li>
                <button
                  type="button"
                  className="footer-address-button"
                  onClick={() =>
                    window.open(
                      "https://www.google.com/maps/search/?api=1&query=123+Main+Street+Mumbai+400050",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  Aundh
                  <br />
                  Pune - 411067
                </button>
              </li>

            </ul>

          </div>


          {/* =====================================================
              NEWSLETTER
          ===================================================== */}

          <div className="footer-column">

            <h4>Newsletter</h4>

            <p className="newsletter-text">
              Subscribe for updates &amp; offers
            </p>

            <form
              className="newsletter-input"
              onSubmit={handleNewsletterSubmit}
            >

              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
                required
              />

              <button
                type="submit"
                aria-label="Subscribe to newsletter"
              >
                <Send size={14} />
              </button>

            </form>

          </div>

        </div>


        {/* =====================================================
            FOOTER BOTTOM
        ===================================================== */}

        <div className="footer-bottom">

          <span>
            © 2026 TO THE NINES.
            All rights reserved.
          </span>

          <span className="footer-legal">

            <button
              type="button"
              className="footer-text-button"
              onClick={() =>
                scrollToSection("privacy-policy")
              }
            >
              Privacy Policy
            </button>

            <span className="footer-separator">
              &nbsp; | &nbsp;
            </span>

            <button
              type="button"
              className="footer-text-button"
              onClick={() =>
                scrollToSection("terms-and-conditions")
              }
            >
              Terms &amp; Conditions
            </button>

          </span>

        </div>

      </div>
    </footer>
  );
}