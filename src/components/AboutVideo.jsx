import React, { useEffect, useRef } from "react";
import "../Styles/AboutVideo.css";

/* =========================================================
   VIDEO SOURCE
   Apni video file "src/assets" mein daalo aur yahan import
   karo, jaise:

   import salonVideo from "../assets/salon-tour.mp4";

   Poster image (video load hone tak) bhi optional hai.
========================================================= */

import salonVideo from "../assets/salon-tour.mp4";
import posterImage from "../assets/about_sytt.webp";

export default function AboutVideo() {
  const videoRef = useRef(null);

  /* =======================================================
     Kuch mobile browsers autoplay ke liye extra nudge
     maangte hain — safety ke liye ensure kar rahe hain.
  ======================================================= */

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = true;

    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay block hua to kuch nahi karna,
        // poster image already dikh rahi hogi.
      });
    }
  }, []);

  return (
    <section
      className="av-section"
      id="salon-video"
    >
      <div className="av-video-wrap">

        <video
          ref={videoRef}
          className="av-video"
          src={salonVideo}
          poster={posterImage}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

        <div className="av-overlay" />

        <div className="av-content">
          <span className="av-eyebrow">
            THE LUMIÈRE EXPERIENCE
          </span>

          <h2 className="av-title">
            Step Inside
            <span> Our World.</span>
          </h2>

          <p className="av-text">
            A glimpse of the space, the care and the
            craft behind every visit.
          </p>
        </div>

      </div>
    </section>
  );
}
