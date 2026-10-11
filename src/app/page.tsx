"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";



// Authentic Wedding Rose Petal Rain: Cascading Red & Crimson Rose Petals Floating Over the Couple
const RosePetalRain = () => {
  const petals = [
    { id: 1, left: "4%", size: 22, duration: 6.8, delay: -1.2, color: "#8E1624", sway: 32, rotZ: 380 },
    { id: 2, left: "10%", size: 26, duration: 7.4, delay: -4.5, color: "#B31B2C", sway: -36, rotZ: -420 },
    { id: 3, left: "17%", size: 20, duration: 6.5, delay: -2.8, color: "#761522", sway: 26, rotZ: 340 },
    { id: 4, left: "24%", size: 25, duration: 7.8, delay: -0.6, color: "#C92438", sway: -30, rotZ: -360 },
    { id: 5, left: "31%", size: 21, duration: 6.3, delay: -5.1, color: "#9E1B2B", sway: 28, rotZ: 400 },
    { id: 6, left: "38%", size: 28, duration: 7.2, delay: -3.3, color: "#B31B2C", sway: -38, rotZ: -440 },
    { id: 7, left: "45%", size: 23, duration: 6.6, delay: -1.8, color: "#D9384E", sway: 24, rotZ: 320 },
    { id: 8, left: "52%", size: 27, duration: 7.5, delay: -6.0, color: "#8E1624", sway: -34, rotZ: -390 },
    { id: 9, left: "59%", size: 20, duration: 6.9, delay: -4.0, color: "#761522", sway: 28, rotZ: 350 },
    { id: 10, left: "66%", size: 26, duration: 7.1, delay: -0.8, color: "#B31B2C", sway: -36, rotZ: -410 },
    { id: 11, left: "73%", size: 22, duration: 6.4, delay: -5.5, color: "#C92438", sway: 30, rotZ: 370 },
    { id: 12, left: "80%", size: 25, duration: 7.6, delay: -2.2, color: "#9E1B2B", sway: -28, rotZ: -330 },
    { id: 13, left: "87%", size: 21, duration: 6.7, delay: -4.8, color: "#8E1624", sway: 32, rotZ: 420 },
    { id: 14, left: "94%", size: 24, duration: 7.3, delay: -1.5, color: "#B31B2C", sway: -32, rotZ: -380 },
    { id: 15, left: "7%", size: 23, duration: 6.5, delay: -3.7, color: "#D9384E", sway: 26, rotZ: 360 },
    { id: 16, left: "21%", size: 20, duration: 7.8, delay: -6.2, color: "#761522", sway: -24, rotZ: -340 },
    { id: 17, left: "35%", size: 27, duration: 6.3, delay: -2.0, color: "#8E1624", sway: 34, rotZ: 430 },
    { id: 18, left: "49%", size: 22, duration: 7.1, delay: -4.2, color: "#C92438", sway: -28, rotZ: -370 },
    { id: 19, left: "63%", size: 26, duration: 6.8, delay: -0.2, color: "#B31B2C", sway: 35, rotZ: 390 },
    { id: 20, left: "77%", size: 19, duration: 7.7, delay: -5.8, color: "#9E1B2B", sway: -22, rotZ: -320 },
    { id: 21, left: "91%", size: 24, duration: 6.4, delay: -3.0, color: "#8E1624", sway: 30, rotZ: 410 },
    { id: 22, left: "14%", size: 22, duration: 7.0, delay: -1.0, color: "#B31B2C", sway: 28, rotZ: 360 },
    { id: 23, left: "42%", size: 25, duration: 6.6, delay: -5.3, color: "#761522", sway: -30, rotZ: -380 },
    { id: 24, left: "70%", size: 21, duration: 7.2, delay: -2.5, color: "#C92438", sway: 27, rotZ: 350 },
    { id: 25, left: "28%", size: 24, duration: 6.9, delay: -3.9, color: "#8E1624", sway: -29, rotZ: -400 },
    { id: 26, left: "56%", size: 20, duration: 7.3, delay: -0.9, color: "#B31B2C", sway: 33, rotZ: 380 },
    { id: 27, left: "84%", size: 26, duration: 6.7, delay: -4.6, color: "#9E1B2B", sway: -35, rotZ: -420 },
  ];

  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden" 
      style={{ zIndex: 30 }}
    >
      <style>{`
        @keyframes roseFallKeyframe {
          0% {
            transform: translateY(-50px) translateX(0) rotate(0deg) rotateX(0deg) rotateY(0deg);
            opacity: 0;
          }
          6% {
            opacity: 0.96;
          }
          90% {
            opacity: 0.92;
          }
          100% {
            transform: translateY(960px) translateX(var(--sway)) rotate(var(--rotZ)) rotateX(360deg) rotateY(360deg);
            opacity: 0;
          }
        }
      `}</style>
      {petals.map((petal) => {
        return (
          <div
            key={petal.id}
            style={{
              position: "absolute",
              left: petal.left,
              top: 0,
              width: `${petal.size}px`,
              height: `${petal.size * 1.3}px`,
              filter: "drop-shadow(0 3px 5px rgba(50, 15, 20, 0.28))",
              animation: `roseFallKeyframe ${petal.duration}s linear infinite`,
              animationDelay: `${petal.delay}s`,
              // @ts-expect-error custom css variables
              "--sway": `${petal.sway}px`,
              "--rotZ": `${petal.rotZ}deg`,
            }}
          >
            <svg
              viewBox="0 0 24 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                d="M12 2 C18 4, 23 11, 21 20 C19 28, 14 31, 10 30 C5 29, 2 24, 2 17 C2 9, 7 3, 12 2 Z"
                fill={petal.color}
                opacity="0.95"
              />
              <path
                d="M11 6 C13 13, 12 21, 10 26"
                stroke="rgba(255, 255, 255, 0.35)"
                strokeWidth="0.85"
                strokeLinecap="round"
              />
              <path
                d="M8 12 C10 16, 12 20, 11 24"
                stroke="rgba(0, 0, 0, 0.15)"
                strokeWidth="0.6"
                strokeLinecap="round"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

// Invisible Background Music with Smooth Auto-Play & Graceful Mobile Autoplay Handling
const BackgroundMusic = ({ playTrigger }: { playTrigger: boolean }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.55;

    let hasStarted = false;

    const playAudio = () => {
      if (hasStarted || !audio) return;
      audio.play().then(() => {
        hasStarted = true;
        removeListeners();
      }).catch(() => {
        // Autoplay policy prevented playback; will retry on first user interaction
      });
    };

    const handleInteraction = () => {
      playAudio();
    };

    const removeListeners = () => {
      window.removeEventListener("pointerdown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };

    // Attempt playback immediately when image triggers or mounts
    if (playTrigger) {
      playAudio();
    }

    // Comprehensive gesture listeners to gracefully unlock audio on mobile browsers
    window.addEventListener("pointerdown", handleInteraction, { passive: true });
    window.addEventListener("touchstart", handleInteraction, { passive: true });
    window.addEventListener("scroll", handleInteraction, { passive: true });
    window.addEventListener("click", handleInteraction, { passive: true });
    window.addEventListener("keydown", handleInteraction, { passive: true });

    return () => {
      removeListeners();
      if (audio) {
        audio.pause();
      }
    };
  }, [playTrigger]);

  return <audio ref={audioRef} src="/assets/music/audio-01.mp3" loop preload="auto" />;
};

export default function Home() {
  const [coupleLoaded, setCoupleLoaded] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  // Scroll-driven opacity fade: smooth transition from 100% to 0% on scroll down (and vice-versa on scroll up)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.35, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -35]);

  useEffect(() => {
    // Check if couple image is already cached
    const img = new Image();
    img.src = "/assets/images/couple.webp";
    if (img.complete) {
      setCoupleLoaded(true);
    }
  }, []);

  return (
    <main className="relative w-full bg-[#F2E2CB] text-dark-brown selection:bg-antique-gold/20 selection:text-deep-burgundy">
      <BackgroundMusic playTrigger={coupleLoaded} />
      <div className="w-full bg-[#F2E2CB] flex flex-col items-center">
        
        {/* SECTION 1: Couple inside the Royal Room with Falling Petals & Bidirectional Scroll Opacity Fade */}
        <section 
          ref={heroRef}
          className="w-full min-h-[100dvh] flex flex-col items-center justify-center p-0 sm:p-4 relative select-none"
        >
          <motion.div 
            style={{
              opacity: heroOpacity,
              scale: heroScale,
              y: heroY,
              aspectRatio: "2/3",
              width: "min(100vw, calc(96dvh * 2 / 3))",
              height: "auto",
              maxHeight: "96dvh",
              maxWidth: "100%",
              margin: "0 auto",
            }}
            className="relative overflow-hidden flex items-center justify-center select-none"
          >
            {/* 1. Background Palace Room Frame Image */}
            <motion.img
              initial={{ opacity: 0, scale: 1.03 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              src="/assets/images/couple-border.webp"
              alt="Royal Arch Room"
              className="w-full h-full object-contain pointer-events-none select-none block"
            />

            {/* 2. Couple Portrait: Enlarged to command the upper arch between lanterns */}
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false }}
              transition={{ 
                duration: 1.4, 
                delay: 0.25, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              style={{
                position: "absolute",
                top: "10%",
                left: "10%",
                right: "10%",
                height: "53%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 15,
                pointerEvents: "none",
              }}
            >
              {/* Soft ambient warm romantic glow */}
              <div 
                className="absolute inset-0 rounded-full bg-[#EAD5BA]/60 filter blur-2xl scale-110 pointer-events-none" 
                aria-hidden="true" 
              />
              <img
                src="/assets/images/couple.webp"
                alt="Kerfegar & Zenobia"
                onLoad={() => setCoupleLoaded(true)}
                className="w-full h-full object-contain filter drop-shadow(0 8px 24px rgba(44,30,24,0.14))"
                style={{
                  WebkitMaskImage: "linear-gradient(to bottom, black 72%, rgba(0,0,0,0.85) 86%, transparent 100%)",
                  maskImage: "linear-gradient(to bottom, black 72%, rgba(0,0,0,0.85) 86%, transparent 100%)",
                }}
              />
            </motion.div>

            {/* 3. Authentic Wedding Rose Rain Effect floating across the room */}
            <RosePetalRain />

            {/* 4. Ceremony Title & Calligraphy Couple Names: Shifted down to utilize lower space */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ 
                duration: 1.1, 
                delay: 0.45, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              style={{
                position: "absolute",
                top: "65.5%",
                bottom: "7%",
                left: "5%",
                right: "5%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                zIndex: 35,
                pointerEvents: "none",
              }}
            >
              {/* High Contrast, Beautifully Letter-Spaced Ceremony Lead */}
              <div className="flex items-center justify-center gap-2 mb-1.5 sm:mb-2">
                <span className="w-6 sm:w-10 h-[1px] bg-[#D4A04A]/80 hidden xs:inline-block" />
                <p className="font-inter text-[10px] xs:text-[11.5px] sm:text-xs md:text-sm tracking-[0.26em] xs:tracking-[0.3em] uppercase text-[#76252F] font-bold drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                  The Wedding Ceremony of
                </p>
                <span className="w-6 sm:w-10 h-[1px] bg-[#D4A04A]/80 hidden xs:inline-block" />
              </div>

              {/* Grand Calligraphy Couple Names with Crisp Legibility & Majestic Scale */}
              <h1 className="font-script text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#2C1E18] tracking-wide leading-tight filter drop-shadow-[0_2px_4px_rgba(44,30,24,0.12)]">
                Kerfegar &amp; Zenobia
              </h1>

              {/* Delicate Gold Accent Emblem */}
              <div className="flex items-center justify-center gap-2 mt-1 sm:mt-2 opacity-85">
                <span className="w-10 sm:w-14 h-[1px] bg-[#D4A04A]" />
                <span className="w-1.5 h-1.5 rotate-45 bg-[#D4A04A]" />
                <span className="w-10 sm:w-14 h-[1px] bg-[#D4A04A]" />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* SECTION 2: When & Where Section */}
        <section className="w-full min-h-[100dvh] flex flex-col items-center justify-center p-0 sm:p-4 relative select-none">
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 35 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            style={{
              aspectRatio: "2/3",
              width: "min(100vw, calc(96dvh * 2 / 3))",
              height: "auto",
              maxHeight: "96dvh",
              maxWidth: "100%",
              margin: "0 auto",
            }}
            className="relative overflow-hidden flex items-center justify-center select-none"
          >
            {/* Background Frame Image */}
            <motion.img
              initial={{ opacity: 0, scale: 1.04 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              src="/assets/images/when-where.webp"
              alt="When & Where Illustration"
              className="w-full h-full object-contain pointer-events-none select-none block"
            />

            {/* Content Container (Shifted down safely below the garland/shrine) */}
            <div 
              style={{
                position: "absolute",
                top: "61.5%",
                bottom: "9%",
                left: "10%",
                right: "10%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                zIndex: 20,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "linear" }}
                className="flex flex-col items-center justify-center w-full"
              >
                {/* Heading: When & Where in Script Font (Shifted down 1.5px) */}
                <h2 
                  style={{ transform: "translateY(1.5px)" }}
                  className="font-script text-3xl sm:text-4xl md:text-5xl text-[#2C1E18] tracking-wide leading-none mb-1"
                >
                  When &amp; Where
                </h2>

                {/* Subtitle in Inter: Enlarged, High-Contrast Burgundy for Crisp Visibility */}
                <p className="font-inter text-[10px] xs:text-[11px] sm:text-xs tracking-[0.24em] uppercase text-[#76252F] font-bold mb-2.5 sm:mb-3 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
                  CEREMONY &amp; CELEBRATION
                </p>

                {/* Schedule Details as Requested */}
                <div className="space-y-1 sm:space-y-1.5 mb-3 sm:mb-4 text-center">
                  {/* Join us at 6:30 PM (Shifted up 1px) */}
                  <p 
                    style={{ transform: "translateY(-1px)" }}
                    className="font-script text-xl sm:text-2xl text-[#76252F] font-medium leading-tight"
                  >
                    Join us at 6:30 PM
                  </p>
                  <p className="font-inter text-[11px] sm:text-xs text-[#2C1E18]/90 font-medium leading-snug">
                    Drinks at Dabmeher
                  </p>
                  <p className="font-inter text-[11px] sm:text-xs text-[#2C1E18]/90 font-medium leading-snug">
                    Dinner at Dum Pukht Restaurant
                  </p>
                </div>

                {/* Simple Location Text Button */}
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
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    boxShadow: "0 3px 10px rgba(118, 37, 47, 0.35)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5E1219")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#76252F")}
                >
                  LOCATION
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </section>

      </div>
    </main>
  );
}
