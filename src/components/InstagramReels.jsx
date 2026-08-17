import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Instagram,
  Play,
  X,
  Volume2,
  VolumeX,
} from "lucide-react";

import "../Styles/InstagramReels.css";

/* =========================================================
   FALLBACK POSTER
   (video load hone tak yeh dikhta hai)
========================================================= */

const FALLBACK_THUMB =
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=85";


/* =========================================================
   REELS DATA
   Direct MP4 video URLs
   NOTE: ab "thumbnailUrl" sirf poster (loading placeholder)
   ke liye use hota hai, image card pe dikhti nahi.
   Real video hi thumbnail ki jagah dikhega.
========================================================= */

const REELS = [
  {
    id: "reel-1",
    title: "Hair Transformation",
    category: "HAIR",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=85",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    instagramLink: "https://www.instagram.com/",
  },

  {
    id: "reel-2",
    title: "Salon Moments",
    category: "BEHIND THE SCENES",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=85",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    instagramLink: "https://www.instagram.com/",
  },

  {
    id: "reel-3",
    title: "Beauty Ritual",
    category: "BEAUTY",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=85",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    instagramLink: "https://www.instagram.com/",
  },

  {
    id: "reel-4",
    title: "Nail Details",
    category: "NAILS",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=85",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    instagramLink: "https://www.instagram.com/",
  },

  {
    id: "reel-5",
    title: "Men's Grooming",
    category: "GROOMING",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=85",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    instagramLink: "https://www.instagram.com/",
  },

  {
    id: "reel-6",
    title: "Lumière Ambience",
    category: "AMBIENCE",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=900&q=85",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    instagramLink: "https://www.instagram.com/",
  },
];


/* =========================================================
   REEL CARD
========================================================= */

function ReelCard({ reel, onOpen }) {
  const videoRef = useRef(null);
  const cardRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);


  /* =======================================================
     PLAY VIDEO
  ======================================================= */

  const playVideo = async () => {
    const video = videoRef.current;

    if (!video || !reel.videoUrl || videoError) {
      return;
    }

    try {
      video.muted = true;
      video.playsInline = true;

      await video.play();

      setIsPlaying(true);
    } catch (error) {
      console.warn("Video could not play:", error);
      setIsPlaying(false);
    }
  };


  /* =======================================================
     PAUSE VIDEO
  ======================================================= */

  const pauseVideo = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.pause();

    setIsPlaying(false);
  };


  /* =======================================================
     AUTOPLAY WHEN REEL ENTERS VIEWPORT
     (Mobile / scroll ke through — user jaise hi reel
     tak pahunchta hai, video khud play ho jaata hai)
  ======================================================= */

  useEffect(() => {
    const card = cardRef.current;

    if (!card || !reel.videoUrl) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playVideo();
          } else {
            pauseVideo();
          }
        });
      },
      {
        threshold: 0.55,
      }
    );

    observer.observe(card);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reel.videoUrl, videoError]);


  /* =======================================================
     HOVER (DESKTOP) — reset + play from start
  ======================================================= */

  const handleMouseEnter = async () => {
    const video = videoRef.current;

    if (!video || !reel.videoUrl || videoError) {
      return;
    }

    try {
      video.currentTime = 0;
    } catch (error) {
      // Ignore reset error
    }

    playVideo();
  };


  const handleMouseLeave = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    // Viewport observer will keep it playing on mobile;
    // on desktop mouse leave pauses it.
    pauseVideo();

    try {
      video.currentTime = 0;
    } catch (error) {
      // Ignore reset error
    }
  };


  /* =======================================================
     VIDEO ERROR
  ======================================================= */

  const handleVideoError = () => {
    console.warn(
      `Video failed to load for reel: ${reel.title}`
    );

    setVideoError(true);
    setIsPlaying(false);
  };


  /* =======================================================
     VIDEO PLAYING / PAUSE STATE SYNC
  ======================================================= */

  const handleVideoPlaying = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };


  /* =======================================================
     OPEN MODAL (sound ke saath)
  ======================================================= */

  const handleClick = () => {
    onOpen(reel, true);
  };


  return (
    <article
      ref={cardRef}
      className={`lr-card ${
        isPlaying && !videoError
          ? "lr-card-playing"
          : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >

      <div className="lr-image-wrap">

        {/* =================================================
            VIDEO (real video hi thumbnail hai — koi
            static image ab dikhti nahi)
        ================================================= */}

        {!videoError && reel.videoUrl ? (
          <video
            ref={videoRef}
            className="lr-preview-video lr-preview-video-visible"
            src={reel.videoUrl}
            muted
            loop
            playsInline
            preload="auto"
            poster={
              reel.thumbnailUrl ||
              FALLBACK_THUMB
            }
            onError={handleVideoError}
            onPlaying={handleVideoPlaying}
            onPause={handleVideoPause}
          />
        ) : (
          <img
            className="lr-image"
            src={
              reel.thumbnailUrl ||
              FALLBACK_THUMB
            }
            alt={
              reel.title ||
              "Lumière Reel"
            }
            loading="lazy"
          />
        )}


        {/* =================================================
            OVERLAY
        ================================================= */}

        <div className="lr-overlay"></div>


        {/* =================================================
            TOP
        ================================================= */}

        <div className="lr-top">

          <span className="lr-instagram">
            <Instagram
              size={12}
              strokeWidth={1.6}
            />
          </span>

          <span className="lr-reel-label">
            REEL
          </span>

        </div>


        {/* =================================================
            PLAY BUTTON
            (sirf tab dikhta hai jab video pause ho)
        ================================================= */}

        {!isPlaying && (
          <span className="lr-play">
            <Play
              size={15}
              fill="currentColor"
              strokeWidth={1.2}
            />
          </span>
        )}


        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="lr-content">

          <span className="lr-category">
            {reel.category ||
              "LUMIÈRE"}
          </span>

          <h3 className="lr-card-title">
            {reel.title ||
              "Lumière Moments"}
          </h3>

          <span className="lr-watch">
            WATCH REEL

            <ArrowUpRight
              size={11}
              strokeWidth={1.5}
            />
          </span>

        </div>

      </div>

    </article>
  );
}


/* =========================================================
   REEL MODAL
========================================================= */

function ReelModal({
  reel,
  startWithSound,
  onClose,
}) {
  const modalVideoRef = useRef(null);

  const [isMuted, setIsMuted] =
    useState(!startWithSound);


  /* =======================================================
     BODY SCROLL LOCK
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

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow = "";

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [reel, onClose]);


  /* =======================================================
     PLAY MODAL VIDEO
  ======================================================= */

  useEffect(() => {
    if (!reel) {
      return;
    }

    const video =
      modalVideoRef.current;

    if (!video) {
      return;
    }

    video.muted =
      !startWithSound;

    setIsMuted(
      !startWithSound
    );

    const playVideo =
      async () => {
        try {
          await video.play();
        } catch (error) {
          console.warn(
            "Modal autoplay failed:",
            error
          );
        }
      };

    playVideo();

  }, [
    reel,
    startWithSound,
  ]);


  if (!reel) {
    return null;
  }


  /* =======================================================
     SOUND TOGGLE
  ======================================================= */

  const toggleSound =
    async () => {
      const video =
        modalVideoRef.current;

      if (!video) {
        return;
      }

      const nextMuted =
        !video.muted;

      video.muted =
        nextMuted;

      setIsMuted(
        nextMuted
      );

      try {
        await video.play();
      } catch (error) {
        console.warn(error);
      }
    };


  /* =======================================================
     INSTAGRAM
  ======================================================= */

  const openInstagram =
    () => {
      if (!reel.instagramLink) {
        return;
      }

      window.open(
        reel.instagramLink,
        "_blank",
        "noopener,noreferrer"
      );
    };


  return (
    <div
      className="lr-modal-overlay"
      onClick={onClose}
    >

      <div
        className="lr-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* CLOSE */}

        <button
          type="button"
          className="lr-modal-close"
          onClick={onClose}
          aria-label="Close reel"
        >
          <X
            size={18}
            strokeWidth={1.6}
          />
        </button>


        {/* VIDEO */}

        <div className="lr-modal-video-wrap">

          <video
            ref={modalVideoRef}
            className="lr-modal-video"
            src={reel.videoUrl}
            controls
            autoPlay
            muted={!startWithSound}
            loop
            playsInline
            preload="auto"
            poster={
              reel.thumbnailUrl ||
              FALLBACK_THUMB
            }
          />


          {/* SOUND */}

          <button
            type="button"
            className="lr-sound-button"
            onClick={toggleSound}
            aria-label={
              isMuted
                ? "Turn sound on"
                : "Mute video"
            }
          >

            {isMuted ? (
              <VolumeX
                size={16}
                strokeWidth={1.5}
              />
            ) : (
              <Volume2
                size={16}
                strokeWidth={1.5}
              />
            )}

          </button>

        </div>


        {/* INFO */}

        <div className="lr-modal-info">

          <div className="lr-modal-text">

            <span className="lr-modal-category">
              {reel.category ||
                "LUMIÈRE"}
            </span>

            <h3>
              {reel.title ||
                "Lumière Moments"}
            </h3>

          </div>


          <button
            type="button"
            className="lr-modal-ig-link"
            onClick={
              openInstagram
            }
          >

            <Instagram
              size={13}
              strokeWidth={1.6}
            />

            <span>
              VIEW ON INSTAGRAM
            </span>

            <ArrowUpRight
              size={12}
              strokeWidth={1.5}
            />

          </button>

        </div>


        {/* SOUND HINT */}

        <div className="lr-modal-sound-hint">

          {isMuted ? (
            <VolumeX
              size={11}
              strokeWidth={1.5}
            />
          ) : (
            <Volume2
              size={11}
              strokeWidth={1.5}
            />
          )}

          <span>
            {isMuted
              ? "Tap sound to unmute"
              : "Sound is on"}
          </span>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function InstagramReels() {

  const [activeReel, setActiveReel] =
    useState(null);

  const [startWithSound, setStartWithSound] =
    useState(false);


  /* =======================================================
     OPEN
  ======================================================= */

  const openReel = (
    reel,
    withSound = true
  ) => {
    setStartWithSound(
      withSound
    );

    setActiveReel(
      reel
    );
  };


  /* =======================================================
     CLOSE
  ======================================================= */

  const closeReel = () => {
    setActiveReel(null);
    setStartWithSound(false);
  };


  return (
    <>
      <section
        className="lr-section"
        id="instagram-reels"
      >

        <div className="lr-container">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="lr-header">

            <div className="lr-header-left">

              <span className="lr-eyebrow">
                INSTAGRAM
              </span>

              <h2 className="lr-title">
                Life at
                <span>
                  {" "}Lumière.
                </span>
              </h2>

            </div>


            <div className="lr-header-right">

              <p className="lr-description">
                Follow our latest
                transformations,
                salon moments and
                beautiful details
                from inside Lumière.
              </p>


              <a
                className="lr-follow"
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >

                <Instagram
                  size={13}
                  strokeWidth={1.6}
                />

                <span>
                  FOLLOW US
                </span>

                <ArrowUpRight
                  size={12}
                  strokeWidth={1.5}
                />

              </a>

            </div>

          </div>


          {/* =================================================
              DECORATIVE LINE
          ================================================= */}

          <div className="lr-heading-line">

            <span></span>

            <i></i>

            <span></span>

          </div>


          {/* =================================================
              REELS
          ================================================= */}

          <div className="lr-track">

            {REELS.map(
              (reel) => (
                <ReelCard
                  key={reel.id}
                  reel={reel}
                  onOpen={
                    openReel
                  }
                />
              )
            )}

          </div>


          {/* MOBILE HINT */}

          <div className="lr-swipe">

            <span></span>

            <p>
              EXPLORE OUR REELS
            </p>

            <span></span>

          </div>

        </div>

      </section>


      {/* =====================================================
          MODAL
      ===================================================== */}

      <ReelModal
        reel={activeReel}
        startWithSound={
          startWithSound
        }
        onClose={
          closeReel
        }
      />

    </>
  );
}
