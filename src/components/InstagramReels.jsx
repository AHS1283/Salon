import React, { useEffect, useRef, useState } from "react";
/*
  NOTE FOR CONTENT DATA (data/content.js):
  Har REELS item mein ab ek naya optional field add karein —

    previewVideoUrl: "/videos/reel-1-preview.mp4"

  Yeh aapki khud ki hosted mp4 file honi chahiye (public/videos
  folder mein daal ke, ya kisi CDN/S3 par upload karke). Agar
  yeh field nahi diya, card grid automatically thumbnailUrl
  wali static image hi dikhayega — koi crash nahi hoga.

  Video file recommendations:
    - Format: mp4 (H.264), muted (audio ki zaroorat nahi,
      kyunki grid preview hamesha muted autoplay hota hai)
    - Duration: 3-6 second looping clip best rehta hai
    - Size: 1-3MB per file (compress karein, warna grid slow
      load hoga)
*/

import {
  ArrowUpRight,
  Instagram,
  Play,
  X,
} from "lucide-react";

import { REELS } from "../data/content.js";

import "../Styles/InstagramReels.css";


/* =========================================================
   FALLBACK IMAGE
========================================================= */

const FALLBACK_THUMB =
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=85";


/* =========================================================
   INSTAGRAM EMBED SCRIPT LOADER
   -----------------------------------------------------------
   Instagram reels/posts ko iframe mein "src" daal ke load
   karna kaam NAHI karta (Instagram blank/broken embed deta
   hai). Instagram sirf apne official embed.js widget se
   hi properly render hota hai. Yeh script:
     1. Instagram ka embed.js sirf ek baar load karta hai
     2. Jab bhi naya <blockquote class="instagram-media">
        DOM mein aaye, window.instgrm.Embeds.process() call
        karke usse actual embed (iframe) mein convert karta hai
========================================================= */

let instagramScriptPromise = null;

function loadInstagramEmbedScript() {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  // Script already loaded / loading — reuse the same promise
  if (instagramScriptPromise) {
    return instagramScriptPromise;
  }

  instagramScriptPromise = new Promise((resolve, reject) => {
    // Agar script tag pehle se hai (e.g. hot reload), sirf
    // process() call karke resolve kar do
    const existing = document.querySelector(
      'script[src="https://www.instagram.com/embed.js"]'
    );

    if (existing && window.instgrm) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Failed to load Instagram embed.js"));

    document.body.appendChild(script);
  });

  return instagramScriptPromise;
}


/* =========================================================
   REEL CARD
   -----------------------------------------------------------
   Card grid mein hum video preview (agar available ho) ya
   fallback thumbnail image dikhate hain — actual Instagram
   embed sirf modal khulne par load hota hai.
========================================================= */

function ReelCard({ reel, onOpen }) {
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef(null);

  const thumbnail = reel.thumbnailUrl || FALLBACK_THUMB;

  // previewVideoUrl = aapki khud ki hosted .mp4 file
  // (Instagram ka direct video kabhi use na karein — woh
  // signed/expiring CDN link hota hai aur ToS ke against hai)
  const hasVideo = Boolean(reel.previewVideoUrl) && !videoError;

  const handleClick = () => {
    if (!reel.instagramLink) {
      return;
    }

    onOpen(reel);
  };

  /* =======================================================
     HOVER = PLAY, MOUSE HATTE HI = PAUSE + RESET
  ======================================================= */

  const handleMouseEnter = () => {
    if (!hasVideo) return;

    setIsPlaying(true);

    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // autoplay-on-hover kuch browsers strict mode mein
        // block kar sakte hain — silently ignore karte hain
      });
    }
  };

  const handleMouseLeave = () => {
    if (!hasVideo) return;

    setIsPlaying(false);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <article
      className={`lr-card ${isPlaying ? "lr-card-playing" : ""}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="lr-image-wrap">
        {hasVideo ? (
          <video
            ref={videoRef}
            className="lr-preview-video"
            src={reel.previewVideoUrl}
            poster={!imageError ? thumbnail : undefined}
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setVideoError(true)}
          />
        ) : !imageError ? (
          <img
            className="lr-image"
            src={thumbnail}
            alt={reel.title || "TO THE NINES Instagram Reel"}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="lr-image lr-image-fallback">
            <Instagram size={32} strokeWidth={1.4} />
          </div>
        )}

        <div className="lr-overlay"></div>

        <div className="lr-top">
          <span className="lr-instagram">
            <Instagram size={12} strokeWidth={1.6} />
          </span>

          <span className="lr-reel-label">REEL</span>
        </div>

        <span className="lr-play">
          <Play size={15} fill="currentColor" strokeWidth={1.2} />
        </span>

        <div className="lr-content">
          <span className="lr-watch">
            WATCH REEL
            <ArrowUpRight size={11} strokeWidth={1.5} />
          </span>
        </div>
      </div>
    </article>
  );
}


/* =========================================================
   REEL MODAL
   -----------------------------------------------------------
   Instagram ka official <blockquote class="instagram-media"
   data-instgrm-permalink> markup use hota hai. embed.js load
   hone ke baad window.instgrm.Embeds.process() call karte hi
   Instagram khud is blockquote ko replace karke actual
   working iframe bana deta hai.
========================================================= */

function ReelModal({ reel, onClose }) {
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const embedContainerRef = useRef(null);

  /* =======================================================
     BODY LOCK + ESC
  ======================================================= */

  useEffect(() => {
    if (!reel) {
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [reel, onClose]);

  /* =======================================================
     LOAD + PROCESS INSTAGRAM EMBED WHENEVER REEL CHANGES
  ======================================================= */

  useEffect(() => {
    if (!reel || !reel.instagramLink) {
      return;
    }

    let cancelled = false;
    setStatus("loading");

    loadInstagramEmbedScript()
      .then(() => {
        if (cancelled) return;

        if (window.instgrm && window.instgrm.Embeds) {
          window.instgrm.Embeds.process();
        }

        setTimeout(() => {
          if (!cancelled) setStatus("ready");
        }, 600);
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [reel]);

  if (!reel) {
    return null;
  }

  const openInstagram = () => {
    if (!reel.instagramLink) {
      return;
    }

    window.open(reel.instagramLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="lr-modal-overlay" onClick={onClose}>
      <div
        className="lr-modal lr-instagram-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="lr-modal-close"
          onClick={onClose}
          aria-label="Close reel"
        >
          <X size={18} strokeWidth={1.6} />
        </button>

        <div className="lr-modal-instagram-wrap" ref={embedContainerRef}>
          {status === "loading" && (
            <div className="lr-instagram-loading">
              <Instagram size={28} strokeWidth={1.4} />
              <span>Loading Reel...</span>
            </div>
          )}

          {reel.instagramLink ? (
            <div
              className="lr-modal-instagram-embed"
              style={{
                display: status === "loading" ? "none" : "flex",
              }}
            >
              <blockquote
                key={reel.instagramLink}
                className="instagram-media"
                data-instgrm-permalink={reel.instagramLink}
                data-instgrm-version="14"
                style={{
                  background: "#FFF",
                  border: 0,
                  margin: "0 auto",
                  width: "100%",
                }}
              >
                <a
                  href={reel.instagramLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  View this reel on Instagram
                </a>
              </blockquote>
            </div>
          ) : (
            <div className="lr-instagram-error">
              <Instagram size={30} strokeWidth={1.4} />
              <span>Invalid Instagram Reel URL.</span>
            </div>
          )}
        </div>

        <div className="lr-modal-info">
          <div className="lr-modal-text">
            <span className="lr-modal-category">
              {reel.category || "TO THE NINES"}
            </span>

            <h3>{reel.title || "TO THE NINES Moments"}</h3>
          </div>

          <button
            type="button"
            className="lr-modal-ig-link"
            onClick={openInstagram}
          >
            <Instagram size={13} strokeWidth={1.6} />
            <span>VIEW ON INSTAGRAM</span>
            <ArrowUpRight size={12} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function InstagramReels() {
  const [activeReel, setActiveReel] = useState(null);

  const openReel = (reel) => setActiveReel(reel);
  const closeReel = () => setActiveReel(null);

  return (
    <>
      <section className="lr-section" id="instagram-reels">
        <div className="lr-container">
          <div className="lr-header">
            <div className="lr-header-left">
              <span className="lr-eyebrow">INSTAGRAM</span>

              <h2 className="lr-title">
                Life at<span> TO THE NINES.</span>
              </h2>
            </div>

            <div className="lr-header-right">
              <p className="lr-description">
                Follow our latest transformations, salon moments and
                beautiful details from inside TO THE NINES.
              </p>

              <a
                className="lr-follow"
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram size={13} strokeWidth={1.6} />
                <span>FOLLOW US</span>
                <ArrowUpRight size={12} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div className="lr-heading-line">
            <span></span>
            <i></i>
            <span></span>
          </div>

          <div className="lr-track">
            {REELS.map((reel) => (
              <ReelCard key={reel.id} reel={reel} onOpen={openReel} />
            ))}
          </div>

          <div className="lr-swipe">
            <span></span>
            <p>EXPLORE OUR REELS</p>
            <span></span>
          </div>
        </div>
      </section>

      <ReelModal reel={activeReel} onClose={closeReel} />
    </>
  );
}