"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Background Music with Eager Mobile Preloading & Always-Visible Top-Right Red Floating Toggle Button
const BackgroundMusic = ({ playTrigger }: { playTrigger: boolean }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.55;

    // Eagerly pre-buffer audio data immediately on mount
    try {
      audio.load();
    } catch { }

    let hasStarted = false;

    const playAudio = () => {
      if (hasStarted || !audio) return;
      audio.play()
        .then(() => {
          hasStarted = true;
          setIsPlaying(true);
          removeListeners();
        })
        .catch(() => { });
    };

    const removeListeners = () => {
      window.removeEventListener("pointerdown", playAudio);
      window.removeEventListener("touchstart", playAudio);
      window.removeEventListener("click", playAudio);
      window.removeEventListener("keydown", playAudio);
    };

    if (playTrigger) playAudio();

    // Listen to user tap to unlock autoplay
    window.addEventListener("pointerdown", playAudio, { passive: true });
    window.addEventListener("touchstart", playAudio, { passive: true });
    window.addEventListener("click", playAudio, { passive: true });
    window.addEventListener("keydown", playAudio, { passive: true });

    return () => {
      removeListeners();
      if (audio) audio.pause();
    };
  }, [playTrigger]);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => { });
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/assets/music/audio-01.mp3"
        loop
        preload="auto"
        playsInline
      />

      {/* Guaranteed Fixed Top-Right Red Music Toggle Button */}
      <button
        onClick={toggleMusic}
        type="button"
        aria-label={isPlaying ? "Mute music" : "Play music"}
        title={isPlaying ? "Mute music" : "Play music"}
        style={{
          position: "fixed",
          top: "16px",
          right: "16px",
          width: "44px",
          height: "44px",
          borderRadius: "9999px",
          backgroundColor: "#76252F",
          color: "#FFFFFF",
          zIndex: 999999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 14px rgba(118, 37, 47, 0.55)",
          border: "2px solid #D4A04A",
          cursor: "pointer",
          outline: "none",
        }}
      >
        {isPlaying ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" fill="currentColor" />
            <circle cx="18" cy="16" r="3" fill="currentColor" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" fill="currentColor" />
            <circle cx="18" cy="16" r="3" fill="currentColor" />
            <line x1="2" y1="2" x2="22" y2="22" stroke="#FFFFFF" strokeWidth="2.5" />
          </svg>
        )}
      </button>
    </>
  );
};

export default function Home() {
  const [coupleLoaded, setCoupleLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/assets/images/couple.webp";
    if (img.complete) {
      setCoupleLoaded(true);
    }
    const img2 = new Image();
    img2.src = "/assets/images/when-where.webp";
  }, []);

  return (
    <main className="relative w-full max-w-full overflow-x-hidden bg-[#F2E2CB] text-[#1A0F0A] selection:bg-[#B38838]/20">
      {/* Background Music with Floating Red Button */}
      <BackgroundMusic playTrigger={coupleLoaded} />

      {/* SECTION 1: Couple Portrait Frame */}
      <section className="relative w-full min-h-[100dvh] overflow-hidden flex flex-col items-center justify-center p-0 sm:p-4 select-none bg-[#F2E2CB]">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          style={{
            aspectRatio: "2/3",
            width: "min(100%, calc(96dvh * 2 / 3))",
            height: "auto",
            maxHeight: "96dvh",
            maxWidth: "100%",
            margin: "0 auto",
          }}
          className="relative overflow-hidden flex items-center justify-center select-none"
        >
          {/* Background Palace Border Frame */}
          <motion.img
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            src="/assets/images/couple-border.webp"
            alt="Royal Arch Room"
            className="w-full h-full object-contain pointer-events-none select-none block"
          />

          {/* Couple Image */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 15,
              pointerEvents: "none",
            }}
          >
            <div
              className="absolute inset-x-8 inset-y-12 rounded-full bg-[#EAD5BA]/50 filter blur-3xl scale-105 pointer-events-none"
              aria-hidden="true"
            />
            <img
              src="/assets/images/couple.webp"
              alt="Kerfegar & Zenobia"
              onLoad={() => setCoupleLoaded(true)}
              className="w-auto h-[74%] max-w-[78%] object-contain filter drop-shadow(0 8px 24px rgba(44,30,24,0.14))"
              style={{
                WebkitMaskImage: "linear-gradient(to bottom, black 72%, rgba(0,0,0,0.85) 86%, transparent 100%)",
                maskImage: "linear-gradient(to bottom, black 72%, rgba(0,0,0,0.85) 86%, transparent 100%)",
              }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2: Luxury Wedding Stationery Card (Wedding paper background with subtle corner radius) */}
      <section className="relative w-full min-h-[100dvh] overflow-hidden flex flex-col items-center justify-center py-8 select-text bg-[#F2E2CB]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col items-center justify-center text-center select-text shadow-[0_16px_45px_-10px_rgba(44,30,24,0.14),0_2px_10px_rgba(44,30,24,0.05)] border border-[#D4A04A]/45"
          style={{
            width: "calc(100% - 32px)",
            maxWidth: "420px",
            margin: "0 auto",
            boxSizing: "border-box",
            background: "linear-gradient(160deg, #FDF9F2 0%, #F7EFE2 50%, #FAF4E8 100%)",
            boxShadow: "0 16px 45px -10px rgba(44, 30, 24, 0.14), 0 2px 10px rgba(44, 30, 24, 0.05), inset 0 0 25px rgba(212, 160, 74, 0.05)",
            borderRadius: "14px",
            paddingTop: "76px",
            paddingBottom: "76px",
            paddingLeft: "20px",
            paddingRight: "20px",
            gap: "22px",
          }}
        >
          {/* Inner Elegant Gold Hairline Border Frame (Classic Luxury Wedding Stationery Card) */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: "12px",
              borderRadius: "8px",
              border: "1px solid rgba(212, 160, 74, 0.38)",
              boxSizing: "border-box",
            }}
          />

          {/* 1. Introductory Paragraph */}
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 600,
              fontSize: "17px",
              color: "#000000",
              lineHeight: 1.45,
              margin: 0,
              padding: 0,
            }}
          >
            We would love for you to join us<br />
            on our most auspicious day<br />
            as we celebrate the marriage of:
          </p>

          {/* 2. Couple Block */}
          <div className="flex flex-col items-center" style={{ margin: "2px 0" }}>
            <h2
              className="font-script select-text"
              style={{
                fontSize: "54px",
                color: "#000000",
                lineHeight: 1,
                margin: 0,
                padding: 0,
              }}
            >
              Zenobia
            </h2>
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: "15px",
                color: "#000000",
                margin: "4px 0 2px 0",
                padding: 0,
                lineHeight: 1.2,
              }}
            >
              (daughter of Rashmi &amp; Yazdi Wadia)
            </p>

            <span
              className="font-script select-text"
              style={{
                fontSize: "26px",
                color: "#B38838",
                lineHeight: 1,
                margin: "4px 0",
              }}
            >
              &amp;
            </span>

            <h2
              className="font-script select-text"
              style={{
                fontSize: "54px",
                color: "#000000",
                lineHeight: 1,
                margin: 0,
                padding: 0,
              }}
            >
              Kerfegar
            </h2>
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: "15px",
                color: "#000000",
                margin: "4px 0 2px 0",
                padding: 0,
                lineHeight: 1.2,
              }}
            >
              (son of Ruzeen &amp; Kersi Daruwala)
            </p>
          </div>

          {/* 3. Blessings Paragraph */}
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 600,
              fontSize: "17px",
              color: "#000000",
              lineHeight: 1.45,
              margin: 0,
              padding: 0,
            }}
          >
            We warmly welcome your blessings<br />
            and your company.
          </p>

          {/* 4. Closing Toast */}
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: "16px",
              color: "#000000",
              lineHeight: 1.4,
              margin: 0,
              padding: 0,
            }}
          >
            Let&apos;s raise a glass to life and love together!
          </p>
        </motion.div>
      </section>

      {/* SECTION 3: When & Where Section (Semi-bold, elegant spacing, centered button) */}
      <section className="relative w-full min-h-[100dvh] overflow-hidden flex flex-col items-center justify-center p-0 sm:p-4 select-none bg-[#F2E2CB]">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 22 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{
            aspectRatio: "2/3",
            width: "min(100%, calc(96dvh * 2 / 3))",
            height: "auto",
            maxHeight: "96dvh",
            maxWidth: "100%",
            margin: "0 auto",
          }}
          className="relative flex items-center justify-center select-none"
        >
          {/* Background Frame Image */}
          <img
            src="/assets/images/when-where.webp"
            alt="When & Where Illustration"
            className="w-full h-full object-contain pointer-events-none select-none block"
          />

          {/* Content Container (Positioned in open arch area with natural medium spacing) */}
          <div
            style={{
              position: "absolute",
              top: "60.5%",
              left: "6%",
              right: "6%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              zIndex: 20,
            }}
          >
            {/* Heading: When & Where */}
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontWeight: 700,
                fontSize: "27px",
                color: "#000000",
                margin: 0,
                padding: 0,
                lineHeight: 1.15,
                letterSpacing: "0.02em",
              }}
            >
              When &amp; Where
            </h2>

            {/* Subtitle: CEREMONY & CELEBRATION (Semi-bold) */}
            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 600,
                fontSize: "11.5px",
                color: "#76252F",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginTop: "10px",
                marginBottom: 0,
                padding: 0,
                lineHeight: 1,
              }}
            >
              CEREMONY &amp; CELEBRATION
            </p>

            {/* Time: Join us at 6:30 PM (Semi-bold) */}
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: "18.5px",
                color: "#76252F",
                marginTop: "11px",
                marginBottom: 0,
                padding: 0,
                lineHeight: 1.15,
              }}
            >
              Join us at 6:30 PM
            </p>

            {/* Event 1: Drinks at Dabmeher (Semi-bold) */}
            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                color: "#000000",
                marginTop: "10px",
                marginBottom: 0,
                padding: 0,
                lineHeight: 1.25,
              }}
            >
              Drinks at Dabmeher
            </p>

            {/* Event 2: Dinner at Dum Pukht Restaurant (Semi-bold) */}
            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                color: "#000000",
                marginTop: "5px",
                marginBottom: 0,
                padding: 0,
                lineHeight: 1.25,
              }}
            >
              Dinner at Dum Pukht Restaurant
            </p>

            {/* Location Button (Shifted down into visual center of bottom gap) */}
            <div style={{ marginTop: "24px" }}>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.google.com/maps/search/?api=1&query=Dum+Pukht+Restaurant+Toronto"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "38px",
                  padding: "0 28px",
                  backgroundColor: "#76252F",
                  color: "#FFFFFF",
                  borderRadius: "999px",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "11.5px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  boxShadow: "0 3px 10px rgba(118, 37, 47, 0.4)",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5E1219")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#76252F")}
              >
                LOCATION
              </motion.a>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
