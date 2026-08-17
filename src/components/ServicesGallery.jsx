import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { SERVICES as FALLBACK_SERVICES } from "../data/content.js";
import "../Styles/Services.css";
import "../Styles/ServicesGallery.css";

const BATCH_SIZE = 9;

// How long to wait between revealing each service card, in ms.
const REVEAL_INTERVAL = 130;

export default function ServicesGallery() {
  const [services, setServices] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [isFallback, setIsFallback] = useState(false);

  const fetchServices = useCallback(async (cursor = null) => {
    const servicesRef = collection(db, "services");

    const q = cursor
      ? query(
          servicesRef,
          orderBy("createdAt", "desc"),
          startAfter(cursor),
          limit(BATCH_SIZE)
        )
      : query(servicesRef, orderBy("createdAt", "desc"), limit(BATCH_SIZE));

    const snap = await getDocs(q);

    const data = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      data,
      lastVisible: snap.docs[snap.docs.length - 1] || null,
      hasMore: snap.docs.length === BATCH_SIZE,
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadInitial() {
      try {
        const { data, lastVisible, hasMore: more } = await fetchServices();
        if (isMounted) {
          if (data.length > 0) {
            setServices(data);
            setLastDoc(lastVisible);
            setHasMore(more);
          } else {
            // No documents in Firestore yet — show the static list instead
            setServices(FALLBACK_SERVICES);
            setHasMore(false);
            setIsFallback(true);
          }
          setInitialLoading(false);
        }
      } catch (err) {
        console.error("Error loading services gallery:", err);
        if (isMounted) {
          // Fetch failed — fall back to the static list so the page never breaks
          setServices(FALLBACK_SERVICES);
          setHasMore(false);
          setIsFallback(true);
          setInitialLoading(false);
        }
      }
    }

    loadInitial();

    return () => {
      isMounted = false;
    };
  }, [fetchServices]);

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);

    try {
      const { data, lastVisible, hasMore: more } = await fetchServices(lastDoc);
      setServices((prev) => [...prev, ...data]);
      setLastDoc(lastVisible);
      setHasMore(more);
    } catch (err) {
      console.error("Error loading more services:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  // Reveal service cards one-by-one, in order, on a fixed timer — independent
  // of actual network/image load speed, so the effect is always sequential.
  useEffect(() => {
    if (services.length === 0 || revealedCount >= services.length) return;

    const timer = setInterval(() => {
      setRevealedCount((prev) => {
        if (prev >= services.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, REVEAL_INTERVAL);

    return () => clearInterval(timer);
  }, [services.length, revealedCount]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const scrollToBooking = () => {
    const section = document.getElementById("booking");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="sg-section">
      <div className="sg-container">

        {/* HEADER */}
        <div className="sg-header">
          <Link to="/#services" className="sg-back-link">
            <ArrowLeft size={14} strokeWidth={1.5} />
            Back
          </Link>

          <span className="luxury-services-eyebrow">ALL SERVICES</span>
          <h1 className="sg-title">
            Every Service,
            <span> One Destination.</span>
          </h1>
        </div>

        {/* GRID — reuses the same luxury-service-card styling as the home preview */}
        <div className="luxury-services-grid sg-grid">

          {initialLoading &&
            Array.from({ length: BATCH_SIZE }).map((_, i) => (
              <div
                key={`sg-skeleton-${i}`}
                className="luxury-service-card luxury-service-skeleton"
              />
            ))}

          {!initialLoading &&
            services.map((service, index) => (
              <article
                className={`luxury-service-card sg-card ${
                  index < revealedCount ? "sg-revealed" : ""
                }`}
                key={service.id || service.title}
              >
                <span className="luxury-service-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="luxury-service-image">
                  <img
                    src={service.img}
                    alt={service.title}
                    loading="lazy"
                  />
                  <div className="luxury-service-image-overlay"></div>
                </div>

                <div className="luxury-service-content">
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>

                  <div className="luxury-service-price">
                    <span>FROM</span>
                    <strong>{service.price}</strong>
                  </div>

                  <button
                    type="button"
                    className="luxury-service-btn"
                    onClick={scrollToBooking}
                  >
                    <span>BOOK NOW</span>
                    <ArrowRight size={13} strokeWidth={1.7} />
                  </button>
                </div>
              </article>
            ))}
        </div>

        {/* LOAD MORE — hidden while showing the static fallback list, or while current batch is still revealing */}
        {!initialLoading && !isFallback && hasMore && revealedCount >= services.length && (
          <div className="sg-load-more-wrap">
            <button
              type="button"
              className="sg-load-more-btn"
              onClick={handleLoadMore}
              disabled={loadingMore}
            >
              {loadingMore ? (
                <>
                  <Loader2 size={14} className="sg-spin" />
                  Loading
                </>
              ) : (
                "Load More"
              )}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
