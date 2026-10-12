"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Background Music with Eager Mobile Preloading & Locked Instant Unlock
const BackgroundMusic = ({ playTrigger }: { playTrigger: boolean }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.55;

    // Eagerly pre-buffer audio data immediately on mount
    try {
      audio.load();
    } catch { }

    let isAttempting = false;
    let hasStarted = false;

    const playAudio = () => {
      if (isAttempting || hasStarted || !audio) return;
      isAttempting = true;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            hasStarted = true;
            removeListeners();
          })
          .catch(() => {
            isAttempting = false;
          });
      }
    };

    const removeListeners = () => {
      window.removeEventListener("pointerdown", playAudio);
      window.removeEventListener("touchstart", playAudio);
      window.removeEventListener("click", playAudio);
      window.removeEventListener("keydown", playAudio);
    };

    if (playTrigger) playAudio();

    // Listen only to clean user taps (NO touchmove or scroll to avoid main-thread event flooding)
    window.addEventListener("pointerdown", playAudio, { passive: true });
    window.addEventListener("touchstart", playAudio, { passive: true });
    window.addEventListener("click", playAudio, { passive: true });
    window.addEventListener("keydown", playAudio, { passive: true });

    return () => {
      removeListeners();
      if (audio) audio.pause();
    };
  }, [playTrigger]);

  return (
    <audio
      ref={audioRef}
      src="/assets/music/audio-01.mp3"
      loop
      preload="auto"
      playsInline
    />
  );
};

export default function Home() {
  const [coupleLoaded, setCoupleLoaded] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const heroCardRef = useRef<HTMLDivElement | null>(null);
  const section2Ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = "/assets/images/couple.webp";
    if (img.complete) {
      setCoupleLoaded(true);
    }
  }, []);

  // Hardware-accelerated ScrollTrigger transition:
  // As Section 2 slides up from the bottom over Section 1, Section 1 gradually fades out and scales down smoothly
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (heroCardRef.current && section2Ref.current) {
        gsap.to(heroCardRef.current, {
          opacity: 0,
          scale: 0.88,
          ease: "none",
          scrollTrigger: {
            trigger: section2Ref.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
            fastScrollEnd: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative w-full bg-[#F2E2CB] text-[#3A2312] selection:bg-[#B38838]/20">
      <BackgroundMusic playTrigger={coupleLoaded} />

      {/* SECTION 1: Fixed at the top. It NEVER moves upward! It stays in place and vanishes (opacity 1 -> 0) as user scrolls */}
      <section
        ref={heroRef}
        className="fixed top-0 left-0 w-full h-[100dvh] flex flex-col items-center justify-center p-0 sm:p-4 select-none z-10 overflow-hidden pointer-events-none"
      >
        <div
          ref={heroCardRef}
          style={{
            aspectRatio: "2/3",
            width: "min(100vw, calc(96dvh * 2 / 3))",
            height: "auto",
            maxHeight: "96dvh",
            maxWidth: "100%",
            margin: "0 auto",
          }}
          className="relative overflow-hidden flex items-center justify-center select-none will-change-transform pointer-events-auto"
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
            transition={{ duration: 1.0, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
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
        </div>
      </section>

      {/* SCROLL SPACER & SECTION 2: Section 2 starts at 100dvh and slides up over the fixed Section 1 */}
      <div className="relative w-full z-20 pt-[100dvh] pointer-events-none">
        <section
          ref={section2Ref}
          className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center px-6 xs:px-8 py-16 sm:py-24 select-text bg-[#F2E2CB] selection:bg-[#B38838]/25 selection:text-[#3A2312] pointer-events-auto"
        >
          <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center text-center select-text">

            {/* 1. Introductory Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[17px] xs:text-[18.5px] sm:text-[20px] md:text-[22px] text-[#3A2312] font-normal leading-[1.6] tracking-[0.01em] mb-6 sm:mb-8"
            >
              We would love for you to join us<br />
              on our most auspicious day<br />
              as we celebrate the marriage of:
            </motion.p>

            {/* 2. Couple Block: Flowing calligraphy script & refined italic parentage matching stationery */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center my-2 sm:my-3 select-text"
            >
              <h2 className="font-script text-[62px] xs:text-[74px] sm:text-[88px] md:text-[100px] text-[#3A2312] font-normal tracking-wide leading-[1.1] py-1 select-text">
                Zenobia
              </h2>
              <p className="font-serif italic font-bold text-[16.5px] xs:text-[18px] sm:text-[19.5px] md:text-[21px] text-[#2C1E18] tracking-wide mt-1 select-text">
                (daughter of Rashmi &amp; Yazdi Wadia)
              </p>

              <span className="font-script text-[36px] xs:text-[42px] sm:text-[48px] text-[#B38838] leading-none my-3 sm:my-4 select-text">
                &amp;
              </span>

              <h2 className="font-script text-[62px] xs:text-[74px] sm:text-[88px] md:text-[100px] text-[#3A2312] font-normal tracking-wide leading-[1.1] py-1 select-text">
                Kerfegar
              </h2>
              <p className="font-serif italic font-bold text-[16.5px] xs:text-[18px] sm:text-[19.5px] md:text-[21px] text-[#2C1E18] tracking-wide mt-1 select-text">
                (son of Ruzeen &amp; Kersi Daruwala)
              </p>
            </motion.div>

            {/* 3. Blessings Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[17px] xs:text-[18.5px] sm:text-[20px] md:text-[22px] text-[#3A2312] font-normal leading-[1.6] tracking-[0.01em] mt-7 sm:mt-10 mb-5 sm:mb-7"
            >
              We warmly welcome your blessings<br />
              and your company.
            </motion.p>

            {/* 4. Closing Toast */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[17px] xs:text-[18.5px] sm:text-[20px] md:text-[22px] text-[#3A2312] font-normal tracking-[0.01em]"
            >
              Let&apos;s raise a glass to life and love together!
            </motion.p>
          </div>
        </section>
      </div>
    </main>
  );
}
