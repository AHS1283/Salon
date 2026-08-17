import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "../Styles/OurWork.css";

// How many images to show on the home page preview
const PREVIEW_COUNT = 5;

// Generic placeholder used when a single image URL is broken / fails to load
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80";

// Shown only if Firestore has no "works" documents yet, or the fetch fails
const DUMMY_WORKS = [
  {
    id: "dummy-1",
    category: "Hair",
    title: "Signature Hair",
    imageUrl:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "dummy-2",
    category: "Beauty",
    title: "Soft Glam",
    imageUrl:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "dummy-3",
    category: "Nails",
    title: "Modern Nails",
    imageUrl:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "dummy-4",
    category: "Grooming",
    title: "Men's Grooming",
    imageUrl:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "dummy-5",
    category: "Hair",
    title: "Luxury Styling",
    imageUrl:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=85",
  },
];

export default function OurWork() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadedIds, setLoadedIds] = useState({});

  useEffect(() => {
    let isMounted = true;

    async function fetchPreviewImages() {
      try {
        const worksRef = collection(db, "works");
        const q = query(worksRef, orderBy("createdAt", "desc"), limit(PREVIEW_COUNT));
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
            <span className="lw-eyebrow">OUR WORK</span>
            <h2 className="lw-title">
              Crafted with
              <span> Intention.</span>
            </h2>
          </div>

          <div className="lw-header-right">
            <p className="lw-description">
              A glimpse into the artistry, creativity and attention to
              detail behind every Lumière experience.
            </p>
          </div>
        </div>

        {/* DECORATIVE LINE */}
        <div className="lw-heading-line">
          <span></span>
          <i></i>
          <span></span>
        </div>

        {/* IMAGE GRID */}
        <div className="lw-grid">
          {loading &&
            Array.from({ length: PREVIEW_COUNT }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className={`lw-card lw-card-${i + 1} lw-skeleton`}
              />
            ))}

          {!loading &&
            images.map((item, index) => (
              <div
                className={`lw-card lw-card-${index + 1} ${
                  loadedIds[item.id] ? "lw-loaded" : ""
                }`}
                key={item.id}
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <img
                  className="lw-image"
                  src={item.imageUrl || FALLBACK_IMAGE}
                  alt={item.title || item.category || "Lumière work"}
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
