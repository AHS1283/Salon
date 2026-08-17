import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import "../Styles/WorksGallery.css";

const BATCH_SIZE = 12;

// Generic placeholder used when a single image URL is broken / fails to load
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80";

// Shown only if the "works" collection is empty, or the fetch fails
const DUMMY_WORKS = [
  { id: "dummy-1", category: "Hair", imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=85" },
  { id: "dummy-2", category: "Beauty", imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=85" },
  { id: "dummy-3", category: "Nails", imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=85" },
  { id: "dummy-4", category: "Grooming", imageUrl: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=85" },
  { id: "dummy-5", category: "Hair", imageUrl: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=85" },
  { id: "dummy-6", category: "Beauty", imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=85" },
  { id: "dummy-7", category: "Nails", imageUrl: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=900&q=85" },
  { id: "dummy-8", category: "Grooming", imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=85" },
  { id: "dummy-9", category: "Hair", imageUrl: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=85" },
  { id: "dummy-10", category: "Beauty", imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=900&q=85" },
  { id: "dummy-11", category: "Nails", imageUrl: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=900&q=85" },
  { id: "dummy-12", category: "Hair", imageUrl: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=900&q=85" },
];

export default function WorksGallery() {
  const [images, setImages] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [isFallback, setIsFallback] = useState(false);

  // How long to wait between revealing each image card, in ms.
  // Higher = slower/more visible one-by-one effect.
  const REVEAL_INTERVAL = 130;

  const fetchImages = useCallback(async (cursor = null) => {
    const worksRef = collection(db, "works");

    const q = cursor
      ? query(
          worksRef,
          orderBy("createdAt", "desc"),
          startAfter(cursor),
          limit(BATCH_SIZE)
        )
      : query(worksRef, orderBy("createdAt", "desc"), limit(BATCH_SIZE));

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
        const { data, lastVisible, hasMore: more } = await fetchImages();
        if (isMounted) {
          if (data.length > 0) {
            setImages(data);
            setLastDoc(lastVisible);
            setHasMore(more);
          } else {
            // No documents in Firestore yet — show dummy images instead
            setImages(DUMMY_WORKS);
            setHasMore(false);
            setIsFallback(true);
          }
          setInitialLoading(false);
        }
      } catch (err) {
        console.error("Error loading works gallery:", err);
        if (isMounted) {
          // Fetch failed — show dummy images so the page never looks empty/broken
          setImages(DUMMY_WORKS);
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
  }, [fetchImages]);

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);

    try {
      const { data, lastVisible, hasMore: more } = await fetchImages(lastDoc);
      setImages((prev) => [...prev, ...data]);
      setLastDoc(lastVisible);
      setHasMore(more);
    } catch (err) {
      console.error("Error loading more works:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  // Reveal images one-by-one, in order, on a fixed timer — independent of
  // actual network/image load speed, so the effect is always visibly sequential.
  useEffect(() => {
    if (images.length === 0 || revealedCount >= images.length) return;

    const timer = setInterval(() => {
      setRevealedCount((prev) => {
        if (prev >= images.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, REVEAL_INTERVAL);

    return () => clearInterval(timer);
  }, [images.length, revealedCount]);

  const handleImageError = (e) => {
    if (e.target.src !== FALLBACK_IMAGE) {
      e.target.src = FALLBACK_IMAGE;
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="wg-section">
      <div className="wg-container">
        {/* HEADER */}
        <div className="wg-header">
          <Link to="/#our-work" className="wg-back-link">
            <ArrowLeft size={14} strokeWidth={1.5} />
            Back
          </Link>

          <span className="wg-eyebrow">ALL WORK</span>
          <h1 className="wg-title">
            Every Detail,
            <span> On Display.</span>
          </h1>
        </div>

        <div className="wg-heading-line">
          <span></span>
          <i></i>
          <span></span>
        </div>

        {/* GRID */}
        <div className="wg-grid">
          {initialLoading &&
            Array.from({ length: BATCH_SIZE }).map((_, i) => (
              <div key={`wg-skeleton-${i}`} className="wg-card wg-skeleton" />
            ))}

          {!initialLoading &&
            images.map((item, index) => (
              <div
                className={`wg-card ${index < revealedCount ? "wg-loaded" : ""}`}
                key={item.id}
              >
                <img
                  className="wg-image"
                  src={item.imageUrl || FALLBACK_IMAGE}
                  alt={item.title || item.category || "Lumière work"}
                  loading="lazy"
                  onError={handleImageError}
                />
                {item.category && (
                  <span className="wg-category">{item.category}</span>
                )}
              </div>
            ))}
        </div>

        {/* LOAD MORE — hidden while showing dummy fallback images, or while current batch is still revealing */}
        {!initialLoading && !isFallback && hasMore && revealedCount >= images.length && (
          <div className="wg-load-more-wrap">
            <button
              type="button"
              className="wg-load-more-btn"
              onClick={handleLoadMore}
              disabled={loadingMore}
            >
              {loadingMore ? (
                <>
                  <Loader2 size={14} className="wg-spin" />
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
