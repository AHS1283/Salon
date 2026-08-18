import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { DUMMY_WORKS } from "../data/content.js";
import "../Styles/OurWork.css";

// How many images to show on the home page preview (4 left + 4 right = 8, all uniform size)
const PREVIEW_COUNT = 8;

// Generic placeholder used when a single image URL is broken / fails to load
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80";

export default function OurWork() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadedIds, setLoadedIds] = useState({});

  useEffect(() => {
    let isMounted = true;

    async function fetchPreviewImages() {
      try {
        const worksRef = collection(db, "works");
        const q = query(
          worksRef,
          orderBy("createdAt", "desc"),
          limit(PREVIEW_COUNT),
        );
        const snap = await getDocs(q);

        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (isMounted) {
          if (data.length > 0) {
            setImages(data);
          } else {
            // No documents in Firestore yet — show dummy images instead
            setImages(DUMMY_WORKS);
          }
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching works preview:", err);
        if (isMounted) {
          // Fetch failed — show dummy images so the section never looks empty/broken
          setImages(DUMMY_WORKS);
          setLoading(false);
        }
      }
    }

    fetchPreviewImages();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleImageLoaded = (id) => {
    setLoadedIds((prev) => ({ ...prev, [id]: true }));
  };

  const handleImageError = (e) => {
    if (e.target.src !== FALLBACK_IMAGE) {
      e.target.src = FALLBACK_IMAGE;
    }
  };

  return (
    <section className="lw-section" id="our-work">
      <div className="lw-container">
        {/* HEADER */}
        <div className="lw-header">
          <div className="lw-header-left">
            <span className="lw-eyebrow">OUR CRAFT</span>
            <h2 className="lw-title">Our Work</h2>
          </div>

          <div className="lw-header-right">
            <p className="lw-description">
              A glimpse into the artistry, creativity and attention to detail
              behind every Stylette Family Salon experience.
            </p>
          </div>
        </div>

        {/* DECORATIVE LINE */}
        <div className="lw-heading-line">
          <span></span>
          <i></i>
          <span></span>
        </div>

        {/* IMAGE GRID — 4 images left + 4 images right, all uniform size */}
        <div className="lw-grid">
          {loading &&
            Array.from({ length: PREVIEW_COUNT }).map((_, i) => (
              <div key={`skeleton-${i}`} className="lw-card lw-skeleton" />
            ))}

          {!loading &&
            images.map((item, index) => (
              <div
                className={`lw-card ${loadedIds[item.id] ? "lw-loaded" : ""}`}
                key={item.id}
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <img
                  className="lw-image"
                  src={item.imageUrl || FALLBACK_IMAGE}
                  alt={
                    item.title || item.category || "Stylette Family Salon work"
                  }
                  loading="lazy"
                  onLoad={() => handleImageLoaded(item.id)}
                  onError={handleImageError}
                />
                <div className="lw-overlay"></div>
              </div>
            ))}
        </div>

        {/* VIEW ALL BUTTON */}
        <div className="lw-bottom">
          <Link to="/our-work" className="lw-view-all-btn">
            View All Works
          </Link>
        </div>
      </div>
    </section>
  );
}
