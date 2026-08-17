import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { SERVICES as FALLBACK_SERVICES } from "../data/content.js";
import "../Styles/Services.css";

// How many services to show on the home page preview
const PREVIEW_COUNT = 6;

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchPreviewServices() {
      try {
        const servicesRef = collection(db, "services");
        const q = query(servicesRef, orderBy("createdAt", "desc"), limit(PREVIEW_COUNT));
        const snap = await getDocs(q);

        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (isMounted) {
          setServices(
            data.length > 0 ? data : FALLBACK_SERVICES.slice(0, PREVIEW_COUNT)
          );
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching services preview:", err);
        if (isMounted) {
          // Fetch failed — fall back to the static list so the section never breaks
          setServices(FALLBACK_SERVICES.slice(0, PREVIEW_COUNT));
          setLoading(false);
        }
      }
    }

    fetchPreviewServices();

    return () => {
      isMounted = false;
    };
  }, []);

  const scrollToBooking = () => {
    const section = document.getElementById("booking");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="luxury-services" id="services">
      <div className="luxury-services-wrap">

        {/* =====================================================
            SECTION HEADING
        ===================================================== */}

        <div className="luxury-services-heading">

          <span className="luxury-services-eyebrow">
            OUR SERVICES
          </span>

          <h2>
            Everything You Need.
            <br />
            <span>All in One Place.</span>
          </h2>

          <div className="luxury-heading-line">
            <span></span>
            <i></i>
            <span></span>
          </div>

        </div>


        {/* =====================================================
            SERVICES GRID
        ===================================================== */}

        <div className="luxury-services-grid">

          {loading &&
            Array.from({ length: PREVIEW_COUNT }).map((_, i) => (
              <div
                key={`service-skeleton-${i}`}
                className="luxury-service-card luxury-service-skeleton"
              />
            ))}

          {!loading &&
            services.map((service, index) => {

            return (
              <article
                className="luxury-service-card"
                key={service.id || service.title}
                style={{
                  "--service-delay": `${index * 0.08}s`,
                }}
              >

                {/* =================================================
                    CARD NUMBER
                ================================================= */}

                <span className="luxury-service-number">
                  {String(index + 1).padStart(2, "0")}
                </span>


                {/* =================================================
                    SERVICE IMAGE
                ================================================= */}

                <div className="luxury-service-image">

                  <img
                    src={service.img}
                    alt={service.title}
                    loading="lazy"
                  />

                  <div className="luxury-service-image-overlay"></div>

                </div>


                {/* =================================================
                    SERVICE CONTENT
                ================================================= */}

                <div className="luxury-service-content">

                  <h3>
                    {service.title}
                  </h3>

                  <p>
                    {service.desc}
                  </p>


                  {/* =============================================
                      PRICE
                  ============================================= */}

                  <div className="luxury-service-price">

                    <span>
                      FROM
                    </span>

                    <strong>
                      {service.price}
                    </strong>

                  </div>


                  {/* =============================================
                      BOOK BUTTON
                  ============================================= */}

                  <button
                    type="button"
                    className="luxury-service-btn"
                    onClick={scrollToBooking}
                  >

                    <span>
                      BOOK NOW
                    </span>

                    <ArrowRight
                      size={13}
                      strokeWidth={1.7}
                    />

                  </button>

                </div>

              </article>
            );

          })}

        </div>


        {/* =====================================================
            VIEW ALL SERVICES
        ===================================================== */}

        <div className="luxury-services-cta">

          <Link
            to="/services"
            className="luxury-view-services"
          >

            <span>
              VIEW ALL SERVICES
            </span>

            <ArrowRight
              size={14}
              strokeWidth={1.6}
            />

          </Link>

        </div>

      </div>
    </section>
  );
}
