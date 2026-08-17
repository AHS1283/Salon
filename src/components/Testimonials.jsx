import React, { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  X,
  PenLine,
} from "lucide-react";
import { TESTIMONIALS } from "../data/content.js";
import "../Styles/Testimonials.css";

function Stars({ count = 5 }) {
  return (
    <span className="stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, i) => (
        <Star
          key={`star-${i}`}
          size={14}
          fill="#D5A447"
          color="#D5A447"
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [userReviews, setUserReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    text: "",
    rating: "5",
  });

  const [error, setError] = useState("");

  const allTestimonials = useMemo(
    () => [...TESTIMONIALS, ...userReviews],
    [userReviews]
  );

  const totalReviews = allTestimonials.length;

  const visibleReviews = useMemo(() => {
    if (!totalReviews) return [];

    const isMobile =
      typeof window !== "undefined" && window.innerWidth <= 700;

    const itemsToShow = isMobile ? 1 : 3;

    return Array.from(
      {
        length: Math.min(itemsToShow, totalReviews),
      },
      (_, i) => allTestimonials[(idx + i) % totalReviews]
    );
  }, [allTestimonials, idx, totalReviews]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handlePrevious = () => {
    if (totalReviews <= 1) return;

    setIdx((current) =>
      current === 0 ? totalReviews - 1 : current - 1
    );
  };

  const handleNext = () => {
    if (totalReviews <= 1) return;

    setIdx((current) =>
      current === totalReviews - 1 ? 0 : current + 1
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const text = form.text.trim();

    if (!name || !text) {
      setError("Please fill in your name and review.");
      return;
    }

    const newReview = {
      name,
      text,
      rating: Number(form.rating),
      img: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name
      )}&background=D5A447&color=fff`,
    };

    setUserReviews((prev) => [...prev, newReview]);

    setForm({
      name: "",
      text: "",
      rating: "5",
    });

    setError("");
    setShowForm(false);

    setIdx(allTestimonials.length);
  };

  const handleCloseModal = () => {
    setShowForm(false);
    setError("");
  };

  return (
    <section className="testimonials" id="testimonials">
      <div className="wrap">

        {/* Header */}
        <div className="testimonials-heading">
          <span className="eyebrow">
            WHAT OUR CLIENTS SAY
          </span>

          <h2 className="testimonials-title">
            Loved By Our Clients
          </h2>

          <p className="testimonials-subtitle">
            Real experiences from clients who trust our
            expertise and attention to detail.
          </p>
        </div>

        {/* Testimonials */}
        {totalReviews > 0 && (
          <div className="testimonials-row">

            {/* Previous */}
            <button
              type="button"
              className="t-arrow t-prev"
              onClick={handlePrevious}
              aria-label="Previous testimonials"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Cards */}
            <div className="t-cards">
              {visibleReviews.map((t, i) => (
                <article
                  className="t-card"
                  key={`${t.name}-${t.text}-${idx}-${i}`}
                >
                  <div className="t-card-top">
                    <span className="t-quote">
                      “
                    </span>

                    <Stars count={t.rating || 5} />
                  </div>

                  <p className="t-review">
                    {t.text}
                  </p>

                  <div className="t-person">
                    <img
                      src={t.img}
                      alt={t.name}
                      loading="lazy"
                    />

                    <div className="t-person-info">
                      <b>{t.name}</b>

                      <span>Verified Client</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Next */}
            <button
              type="button"
              className="t-arrow t-next"
              onClick={handleNext}
              aria-label="Next testimonials"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Review CTA */}
        <div className="testimonials-review-cta">
          <button
            type="button"
            className="review-trigger"
            onClick={() => {
              setShowForm(true);
              setError("");
            }}
          >
            <PenLine size={15} />
            Write a Review
          </button>
        </div>

        {/* Modal */}
        {showForm && (
          <div
            className="review-modal-overlay"
            onClick={handleCloseModal}
            role="presentation"
          >
            <div
              className="review-modal"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="review-modal-title"
            >
              <button
                type="button"
                className="review-close"
                onClick={handleCloseModal}
                aria-label="Close review form"
              >
                <X size={19} />
              </button>

              <div className="review-modal-heading">
                <span>YOUR EXPERIENCE</span>

                <h3 id="review-modal-title">
                  Write a Review
                </h3>

                <p>
                  We'd love to hear about your experience.
                </p>
              </div>

              <form onSubmit={handleSubmit}>

                {/* Name */}
                <div className="review-field">
                  <label htmlFor="review-name">
                    Your Name
                  </label>

                  <input
                    id="review-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Jane Doe"
                    autoComplete="name"
                  />
                </div>

                {/* Rating */}
                <div className="review-field">
                  <label htmlFor="review-rating">
                    Rating
                  </label>

                  <select
                    id="review-rating"
                    name="rating"
                    value={form.rating}
                    onChange={handleChange}
                  >
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <option
                        key={rating}
                        value={rating}
                      >
                        {rating} Star
                        {rating > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Review */}
                <div className="review-field">
                  <label htmlFor="review-text">
                    Your Review
                  </label>

                  <textarea
                    id="review-text"
                    name="text"
                    value={form.text}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your experience..."
                  />
                </div>

                {error && (
                  <p
                    className="review-error"
                    role="alert"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="review-submit"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}