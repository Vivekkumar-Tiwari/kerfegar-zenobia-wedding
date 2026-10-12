"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Falling Rose Petals Rain (leave-1.webp & leave-2.webp)
const petalList = [
  { id: 1, img: "/assets/images/leave-1.webp", left: "6%", size: 42, dur: "6s", delay: "-1s", sway: "25px", rot: "200deg" },
  { id: 2, img: "/assets/images/leave-2.webp", left: "18%", size: 48, dur: "7s", delay: "-4s", sway: "-30px", rot: "-240deg" },
  { id: 3, img: "/assets/images/leave-1.webp", left: "30%", size: 40, dur: "6.5s", delay: "-2.5s", sway: "22px", rot: "180deg" },
  { id: 4, img: "/assets/images/leave-2.webp", left: "42%", size: 50, dur: "7.2s", delay: "-5s", sway: "-26px", rot: "-220deg" },
  { id: 5, img: "/assets/images/leave-1.webp", left: "54%", size: 44, dur: "6.2s", delay: "-1.8s", sway: "28px", rot: "250deg" },
  { id: 6, img: "/assets/images/leave-2.webp", left: "66%", size: 48, dur: "6.8s", delay: "-3.5s", sway: "-28px", rot: "-210deg" },
  { id: 7, img: "/assets/images/leave-1.webp", left: "78%", size: 42, dur: "6.4s", delay: "-0.5s", sway: "24px", rot: "190deg" },
  { id: 8, img: "/assets/images/leave-2.webp", left: "88%", size: 46, dur: "7.4s", delay: "-4.2s", sway: "-24px", rot: "-230deg" },
  { id: 9, img: "/assets/images/leave-1.webp", left: "12%", size: 40, dur: "6.6s", delay: "-5.2s", sway: "26px", rot: "220deg" },
  { id: 10, img: "/assets/images/leave-2.webp", left: "36%", size: 46, dur: "6.9s", delay: "-2.2s", sway: "-22px", rot: "-190deg" },
  { id: 11, img: "/assets/images/leave-1.webp", left: "60%", size: 44, dur: "6.3s", delay: "-3.8s", sway: "30px", rot: "240deg" },
  { id: 12, img: "/assets/images/leave-2.webp", left: "82%", size: 48, dur: "7.1s", delay: "-1.2s", sway: "-25px", rot: "-200deg" },
];

const RosePetalRain = () => {
  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden" 
      style={{ zIndex: 40 }}
      aria-hidden="true"
    >
      {petalList.map((petal) => (
        <div
          key={petal.id}
          className="rose-petal-fall"
          style={{
            left: petal.left,
            width: petal.size,
            ["--petal-dur" as string]: petal.dur,
            ["--petal-delay" as string]: petal.delay,
          }}
        >
          <div
            className="rose-petal-inner"
            style={{
              ["--petal-sway" as string]: petal.sway,
              ["--petal-rot" as string]: petal.rot,
              ["--petal-dur" as string]: petal.dur,
              ["--petal-delay" as string]: petal.delay,
            }}
          >
            <img
              src={petal.img}
              alt=""
              className="w-full h-auto object-contain block select-none pointer-events-none drop-shadow-[0_4px_8px_rgba(50,15,20,0.35)]"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// Background Music with Eager Mobile Preloading & Instant Unlock
const BackgroundMusic = ({ playTrigger }: { playTrigger: boolean }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.55;

    // Eagerly pre-buffer audio data immediately on mount
    try {
      audio.load();
    } catch {}

    let hasStarted = false;
    const playAudio = () => {
      if (hasStarted || !audio) return;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            hasStarted = true;
            removeListeners();
          })
          .catch(() => {});
      }
    };

    const removeListeners = () => {
      window.removeEventListener("pointerdown", playAudio);
      window.removeEventListener("touchstart", playAudio);
      window.removeEventListener("touchmove", playAudio);
      window.removeEventListener("scroll", playAudio);
      window.removeEventListener("click", playAudio);
      window.removeEventListener("wheel", playAudio);
      window.removeEventListener("keydown", playAudio);
    };

    if (playTrigger) playAudio();

    window.addEventListener("pointerdown", playAudio, { passive: true });
    window.addEventListener("touchstart", playAudio, { passive: true });
    window.addEventListener("touchmove", playAudio, { passive: true });
    window.addEventListener("scroll", playAudio, { passive: true });
    window.addEventListener("click", playAudio, { passive: true });
    window.addEventListener("wheel", playAudio, { passive: true });
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
  const section2ContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = "/assets/images/couple.webp";
    if (img.complete) {
      setCoupleLoaded(true);
    }
  }, []);

  // Buttery-smooth hardware-accelerated ScrollTrigger transition between Section 1 and Section 2
  // Uses native sticky stacking for Section 1 so mobile touch momentum scrolling never gets stuck or janky
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Fade out and scale down Section 1 as Section 2 slides over it
      if (heroRef.current && heroCardRef.current) {
        gsap.to(heroCardRef.current, {
          opacity: 0,
          scale: 0.88,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.3,
          },
        });
      }

      // 2. Section 2 content smoothly slides up and fades in over Section 1
      if (section2Ref.current && section2ContentRef.current) {
        gsap.fromTo(
          section2ContentRef.current,
          {
            opacity: 0.35,
            y: 60,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section2Ref.current,
              start: "top 90%",
              end: "top 25%",
              scrub: 0.3,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative w-full bg-[#F2E2CB] text-[#2C1E18] selection:bg-[#D4A04A]/20">
      <BackgroundMusic playTrigger={coupleLoaded} />

      <div className="w-full bg-[#F2E2CB] flex flex-col items-center">
        
        {/* SECTION 1: Couple Portrait Frame (Sticky top-0 for 120fps native GPU scrolling on mobile) */}
        <section 
          ref={heroRef}
          className="sticky top-0 w-full h-[100dvh] flex flex-col items-center justify-center p-0 sm:p-4 relative select-none z-10"
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
            className="relative overflow-hidden flex items-center justify-center select-none will-change-transform"
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

            {/* Falling Rose Leaves */}
            <RosePetalRain />
          </div>
        </section>

        {/* SECTION 2: Clean Luxury Wedding Invitation (Matching Reference Image on #F2E2CB, slides up over Section 1) */}
        <section 
          ref={section2Ref}
          className="w-full min-h-[100dvh] flex flex-col items-center justify-center px-5 xs:px-6 py-12 sm:py-20 relative select-none z-20 bg-[#F2E2CB]"
        >
          <div 
            ref={section2ContentRef}
            className="w-full max-w-xl mx-auto flex flex-col items-center justify-center text-center"
          >
            
            {/* 1. Introductory Paragraph (Framer Motion entrance) */}
            <motion.p 
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[17px] xs:text-[18.5px] sm:text-[21px] md:text-[23px] text-[#1A0F0A] font-semibold leading-[1.5] tracking-wide mb-5 sm:mb-8"
            >
              We would love for you to join us<br />
              on our most auspicious day<br />
              as we celebrate the marriage of:
            </motion.p>

            {/* 2. Couple Block: Prominent script typography with smooth Framer Motion reveal */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 22 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center my-2 sm:my-4 gap-1.5 sm:gap-2.5"
            >
              <h2 className="font-script text-[58px] xs:text-[70px] sm:text-[84px] md:text-[96px] text-[#1A0F0A] font-normal tracking-wide leading-none drop-shadow-[0_1px_1px_rgba(26,15,10,0.14)]">
                Zenobia
              </h2>
              <p className="font-serif italic text-[15.5px] xs:text-[17px] sm:text-[18.5px] md:text-[20px] text-[#2E1B10] font-semibold tracking-wide">
                (daughter of Rashmi &amp; Yazdi Wadia)
              </p>

              <span className="font-script text-[30px] xs:text-[36px] sm:text-[42px] text-[#A67C38] leading-none my-1 select-none">
                &amp;
              </span>

              <h2 className="font-script text-[58px] xs:text-[70px] sm:text-[84px] md:text-[96px] text-[#1A0F0A] font-normal tracking-wide leading-none drop-shadow-[0_1px_1px_rgba(26,15,10,0.14)]">
                Kerfegar
              </h2>
              <p className="font-serif italic text-[15.5px] xs:text-[17px] sm:text-[18.5px] md:text-[20px] text-[#2E1B10] font-semibold tracking-wide">
                (son of Ruzeen &amp; Kersi Daruwala)
              </p>
            </motion.div>

            {/* 3. Blessings Paragraph (Framer Motion entrance) */}
            <motion.p 
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[17px] xs:text-[18.5px] sm:text-[21px] md:text-[23px] text-[#1A0F0A] font-semibold leading-[1.5] tracking-wide mt-5 sm:mt-8 mb-4 sm:mb-6"
            >
              We warmly welcome your blessings<br />
              and your company.
            </motion.p>

            {/* 4. Closing Toast (Framer Motion entrance) */}
            <motion.p 
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif italic text-[15.5px] xs:text-[17px] sm:text-[18.5px] md:text-[20px] text-[#1A0F0A] font-semibold tracking-wide"
            >
              Let&apos;s raise a glass to life and love together!
            </motion.p>
          </div>
        </section>

      </div>
    </main>
  );
}
