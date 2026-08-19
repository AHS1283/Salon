import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CalendarDays,
  Sparkles,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.js"; // 👈 adjust path if your firebase config file lives elsewhere
import { SERVICES } from "../data/content.js";
import "../Styles/Booking.css";

const SALON_ADDRESS = "123, Main Street, Mumbai - 400050";

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetDirections = () => {
    const query = encodeURIComponent(SALON_ADDRESS);
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${query}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const formData = new FormData(form);

    const booking = {
      name: formData.get("name")?.trim(),
      phone: formData.get("phone")?.trim(),
      service: formData.get("service"),
      date: formData.get("date"),
      time: formData.get("time"),
      message: formData.get("message")?.trim() || "",
      status: "pending", // pending | confirmed | cancelled
      createdAt: serverTimestamp(),
    };

    setLoading(true);

    try {
      await addDoc(collection(db, "bookings"), booking);

      setSubmitted(true);
      form.reset();

      setTimeout(() => {
        setSubmitted(false);
      }, 3500);
    } catch (err) {
      console.error("Error saving booking:", err);
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="booking" id="booking">
      <div className="booking-bg-shape booking-bg-shape-one" />
      <div className="booking-bg-shape booking-bg-shape-two" />

      <div className="wrap booking-wrap">

        {/* =====================================================
            LEFT — BOOKING FORM
        ===================================================== */}

        <div className="booking-content">

          <div className="booking-heading">
            <span className="eyebrow">
              BOOK YOUR APPOINTMENT
            </span>

            <div className="booking-title-row">
              <h2>
                Reserve Your
                <span> Perfect Moment.</span>
              </h2>

              <div className="booking-heading-icon">
                <Sparkles size={18} />
              </div>
            </div>

            <p className="booking-intro">
              Take a moment for yourself. Choose your preferred
              service, date and time, and let our experts take
              care of the rest.
            </p>
          </div>

          <form
            className="booking-form"
            onSubmit={handleSubmit}
          >

            {/* Name + Phone */}
            <div className="booking-form-row">

              <div className="booking-field">
                <label htmlFor="booking-name">
                  Your Name
                </label>

                <input
                  id="booking-name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  autoComplete="name"
                  required
                  disabled={loading}
                />
              </div>

              <div className="booking-field">
                <label htmlFor="booking-phone">
                  Phone Number
                </label>

                <input
                  id="booking-phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                  required
                  disabled={loading}
                />
              </div>

            </div>

            {/* Service + Date */}
            <div className="booking-form-row">

              <div className="booking-field">
                <label htmlFor="booking-service">
                  Select Service
                </label>

                <select
                  id="booking-service"
                  name="service"
                  defaultValue=""
                  required
                  disabled={loading}
                >
                  <option value="" disabled>
                    Choose a service
                  </option>

                  {SERVICES.map((service) => (
                    <option
                      key={service.title}
                      value={service.title}
                    >
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="booking-field">
                <label htmlFor="booking-date">
                  Preferred Date
                </label>

                <div className="booking-input-icon">
                  <CalendarDays size={16} />

                  <input
                    id="booking-date"
                    name="date"
                    type="date"
                    required
                    disabled={loading}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

            </div>

            {/* Time + Message */}
            <div className="booking-form-row">

              <div className="booking-field">
                <label htmlFor="booking-time">
                  Preferred Time
                </label>

                <div className="booking-input-icon">
                  <Clock size={16} />

                  <input
                    id="booking-time"
                    name="time"
                    type="time"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="booking-field">
                <label htmlFor="booking-message">
                  Message
                  <span>Optional</span>
                </label>

                <input
                  id="booking-message"
                  name="message"
                  type="text"
                  placeholder="Anything we should know?"
                  disabled={loading}
                />
              </div>

            </div>

            {/* Submit */}
            <button
              type="submit"
              className="booking-submit"
              disabled={loading}
            >
              <span>
                {loading ? (
                  <Loader2 size={15} className="booking-spin" />
                ) : (
                  <Send size={15} />
                )}
                {loading ? "Booking..." : "Book Appointment"}
              </span>

              <ArrowUpRight
                className="booking-submit-arrow"
                size={17}
              />
            </button>

            {error && (
              <div className="booking-error">
                {error}
              </div>
            )}

            {submitted && (
              <div className="booking-success">
                <span>✓</span>
                Thank you! Your appointment request has been received.
              </div>
            )}

          </form>

          <div className="booking-note">
            <span className="booking-note-dot" />
            We&apos;ll contact you shortly to confirm your appointment.
          </div>

        </div>

        {/* =====================================================
            RIGHT — CONTACT INFORMATION
        ===================================================== */}

        <aside className="contact-info">

          <div className="contact-top">
            <span className="contact-label">
              Blush Salon
            </span>

            <h3>
              Let&apos;s Make
              <br />
              <em>Something Beautiful.</em>
            </h3>

            <p>
              Visit us for a personalized salon experience
              designed around you.
            </p>
          </div>

          <div className="contact-details">

            <a
              href="tel:+919876543210"
              className="contact-line"
            >
              <span className="contact-icon">
                <Phone size={16} />
              </span>

              <span>
                <small>CALL US</small>
                +91 98765 43210
              </span>
            </a>

            <a
              href="mailto:info@blushsalon.com"
              className="contact-line"
            >
              <span className="contact-icon">
                <Mail size={16} />
              </span>

              <span>
                <small>EMAIL US</small>
                info@blushsalon.com
              </span>
            </a>

            <div className="contact-line">
              <span className="contact-icon">
                <MapPin size={16} />
              </span>

              <span>
                <small>VISIT US</small>
                HINJEWADI, PHASE 1
                <br />
                Pune - 411057
              </span>
            </div>

            <div className="contact-line">
              <span className="contact-icon">
                <Clock size={16} />
              </span>

              <span>
                <small>OPENING HOURS</small>
                Monday - Sunday
                <br />
                10:00 AM - 9:00 PM
              </span>
            </div>

          </div>

          <div className="contact-bottom">

            <button
              type="button"
              className="directions-btn"
              onClick={handleGetDirections}
            >
              <span>Get Directions</span>
              <ArrowUpRight size={16} />
            </button>

            <div className="map-box">
              <div className="map-grid" />

              <div className="map-pin">
                <MapPin size={19} />
              </div>

              <span className="map-label">
                PUNE
              </span>
            </div>

          </div>

        </aside>

      </div>
    </section>
  );
}
