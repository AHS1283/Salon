import React, { useEffect, useState } from "react";
import { Calendar, Menu, X, Sparkles } from "lucide-react";
import { NAV_LINKS } from "../data/content.js";
import logo from "../assets/logo.jpg";
import "../Styles/Header.css";

const ID_OVERRIDES = {
  review: "testimonials",
  reviews: "testimonials",
};

const toId = (label) => {
  const key = label.toLowerCase().trim().replace(/\s+/g, "-");
  return ID_OVERRIDES[key] || key;
};

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* -----------------------------------------
     Header scroll effect
  ----------------------------------------- */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* -----------------------------------------
     Prevent page scrolling when menu is open
  ----------------------------------------- */
  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  /* -----------------------------------------
     Navigation
  ----------------------------------------- */
  const handleNavClick = (e, label) => {
    e.preventDefault();

    const id = toId(label);
    const section = document.getElementById(id);

    if (section) {
      const headerOffset =
        window.innerWidth <= 820 ? 70 : 82;

      const sectionPosition =
        section.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;

      window.scrollTo({
        top: sectionPosition,
        behavior: "smooth",
      });
    }

    setNavOpen(false);
  };

  const handleBooking = (e) => {
    handleNavClick(e, "Booking");
  };

  return (
    <header
      className={`site-header ${
        scrolled ? "header-scrolled" : ""
      }`}
    >
      <div className="header-wrap">

        {/* =====================================
            LEFT SIDE — LOGO
        ====================================== */}

        <button
          className="luxury-logo"
          onClick={(e) => handleNavClick(e, "Home")}
          aria-label="Stylette Family Salon Home"
        >
          <img
            className="logo-image"
            src={logo}
            alt="Stylette Family Salon Logo"
          />

          <span className="logo-text-group">
            <span className="logo-main">
              Stylette Family Salon
            </span>

            <span className="logo-sub">
              Hair • Beauty • Confidence
            </span>
          </span>
        </button>

        {/* =====================================
            DESKTOP NAVIGATION
        ====================================== */}

        <nav
          className="desktop-nav"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${toId(link)}`}
              onClick={(e) => handleNavClick(e, link)}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* =====================================
            HEADER ACTIONS
        ====================================== */}

        <div className="header-actions">

          {/* Desktop booking button */}

          <button
            className="header-book-btn"
            onClick={handleBooking}
          >
            <Calendar size={15} />

            <span>
              Book Appointment
            </span>

            <Sparkles
              className="book-sparkle"
              size={13}
            />
          </button>

          {/* Mobile hamburger */}

          <button
            className={`menu-btn ${
              navOpen ? "menu-active" : ""
            }`}
            onClick={() =>
              setNavOpen((prev) => !prev)
            }
            aria-label={
              navOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={navOpen}
          >
            {navOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>

        </div>
      </div>

      {/* =====================================
          MOBILE MENU
      ====================================== */}

      <div
        className={`mobile-menu ${
          navOpen
            ? "mobile-menu-open"
            : ""
        }`}
      >
        <nav
          className="mobile-nav"
          aria-label="Mobile navigation"
        >

          {NAV_LINKS.map((link, index) => (
            <a
              key={link}
              href={`#${toId(link)}`}
              className="mobile-nav-link"
              style={{
                "--nav-index": index,
              }}
              onClick={(e) =>
                handleNavClick(e, link)
              }
            >
              <span className="mobile-nav-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span>
                {link}
              </span>
            </a>
          ))}

          {/* Booking inside hamburger menu */}

          <button
            className="mobile-book-btn"
            onClick={handleBooking}
          >
            <Calendar size={16} />

            <span>
              Book Appointment
            </span>

            <Sparkles size={14} />
          </button>

        </nav>

        {/* Mobile footer */}

        <div className="mobile-menu-footer">
          <span>
            STYLETTE FAMILY SALON
          </span>

          <span>
            HAIR • BEAUTY • CONFIDENCE
          </span>
        </div>
      </div>
    </header>
  );
}