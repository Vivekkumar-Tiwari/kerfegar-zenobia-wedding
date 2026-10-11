"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 1. High-Contrast, Visually Engaging Real-Time Countdown (Using Script Heading & Script Red Labels)
const WeddingCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const calculateTime = () => {
      // Target Wedding Date: October 19, 2026, 6:30 PM EDT (UTC-4)
      const target = new Date("2026-10-19T18:30:00-04:00").getTime();
      const now = Date.now();
      const diff = Math.max(0, target - now);
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };

    const interval = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    const timer = setTimeout(() => {
      setTimeLeft(calculateTime());
    }, 0);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="w-full py-12 sm:py-16 px-4 flex flex-col items-center justify-center text-center bg-[#F2E2CB] select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-xl w-full mx-auto"
      >
        {/* Title: Stylish Script Font */}
        <h2 className="font-script text-3xl sm:text-4xl md:text-5xl text-[#2C1E18] mb-4 sm:mb-6 leading-tight">
          Counting The Days
        </h2>

        {/* 4 Stats Columns */}
        <div className="grid grid-cols-4 gap-2 sm:gap-6 max-w-lg mx-auto">
          {/* Days */}
          <div className="flex flex-col items-center">
            <span className="font-inter text-4xl sm:text-6xl md:text-7xl font-bold text-[#2C1E18] tracking-tight leading-none">
              {timeLeft ? timeLeft.days : "—"}
            </span>
            <span className="font-script text-base sm:text-xl text-[#76252F] mt-1 font-medium leading-none">
              Days
            </span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <span className="font-inter text-4xl sm:text-6xl md:text-7xl font-bold text-[#2C1E18] tracking-tight leading-none">
              {timeLeft ? String(timeLeft.hours).padStart(2, "0") : "—"}
            </span>
            <span className="font-script text-base sm:text-xl text-[#76252F] mt-1 font-medium leading-none">
              Hours
            </span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <span className="font-inter text-4xl sm:text-6xl md:text-7xl font-bold text-[#2C1E18] tracking-tight leading-none">
              {timeLeft ? String(timeLeft.minutes).padStart(2, "0") : "—"}
            </span>
            <span className="font-script text-base sm:text-xl text-[#76252F] mt-1 font-medium leading-none">
              Minutes
            </span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <span className="font-inter text-4xl sm:text-6xl md:text-7xl font-bold text-[#2C1E18] tracking-tight leading-none">
              {timeLeft ? String(timeLeft.seconds).padStart(2, "0") : "—"}
            </span>
            <span className="font-script text-base sm:text-xl text-[#76252F] mt-1 font-medium leading-none">
              Seconds
            </span>
          </div>
        </div>

        {/* Elegant Gold Dividing Line */}
        <div className="w-full max-w-md h-[1.5px] bg-[#D4A04A]/70 mx-auto mt-6 sm:mt-8"></div>
      </motion.div>
    </section>
  );
};

// 3D Red Gift Ribbon with Perfectly Centered Knot and Button (Both Horizontally and Vertically)
const RedGiftRibbon = ({ 
  isCut, 
  onCut 
}: { 
  isCut: boolean; 
  onCut: () => void; 
}) => {
  return (
    <div 
      onClick={onCut}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        width: "100%",
        top: "47.5%",
        transform: "translateY(-50%)",
        zIndex: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
        cursor: "pointer",
        height: "44px",
      }}
      role="button"
      aria-label="Click ribbon to open invitation"
    >
      {/* LEFT HALF: Horizontal Band + Left Loop + Left Tail */}
      <motion.div
        style={{
          width: "50%",
          height: "100%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          pointerEvents: "none",
        }}
        initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
        animate={isCut ? { x: -140, y: 220, rotate: -25, opacity: 0 } : { x: 0, y: 0, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: "linear" }}
      >
        {/* Horizontal Red Satin Band (Left) */}
        <div
          style={{
            position: "absolute",
            left: "-4px",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            height: "38px",
            background: "linear-gradient(90deg, #5E1219 0%, #851C26 50%, #A82834 100%)",
            borderTop: "2px solid #D4A04A",
            borderBottom: "2px solid #D4A04A",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", left: 0, right: 0, top: "50%", transform: "translateY(-50%)", height: "2.5px", background: "rgba(255,255,255,0.25)" }}></div>
          <div style={{ position: "absolute", left: 0, right: 0, top: "2px", borderTop: "1px dashed rgba(212,160,74,0.7)" }}></div>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: "2px", borderBottom: "1px dashed rgba(212,160,74,0.7)" }}></div>
        </div>

        {/* Left Folded Loop */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: "80px",
            height: "50px",
            zIndex: 10,
          }}
        >
          <svg viewBox="0 0 85 55" fill="none" style={{ width: "100%", height: "100%", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.35))" }}>
            <path
              d="M80 27 C50 3 15 8 5 22 C-5 36 25 50 80 27 Z"
              fill="url(#leftRedLoopGrad)"
              stroke="#D4A04A"
              strokeWidth="1.2"
            />
            <path d="M75 27 C45 14 25 18 15 26" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round" />
            <defs>
              <linearGradient id="leftRedLoopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C4303E" />
                <stop offset="45%" stopColor="#941E28" />
                <stop offset="100%" stopColor="#5E1219" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Left Cascading Ribbon Tail */}
        <div
          style={{
            position: "absolute",
            right: "8px",
            top: "calc(50% + 2px)",
            width: "50px",
            height: "105px",
            zIndex: 5,
          }}
        >
          <svg viewBox="0 0 60 120" fill="none" style={{ width: "100%", height: "100%", filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.3))" }}>
            <path
              d="M55 0 C45 35 25 70 10 115 L25 106 L38 116 C46 80 55 40 55 0 Z"
              fill="url(#leftRedTailGrad)"
              stroke="#D4A04A"
              strokeWidth="1"
            />
            <path d="M50 6 C40 40 25 75 18 106" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
            <defs>
              <linearGradient id="leftRedTailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#B52B38" />
                <stop offset="50%" stopColor="#8A1C26" />
                <stop offset="100%" stopColor="#4A0E14" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>

      {/* RIGHT HALF: Horizontal Band + Right Loop + Right Tail */}
      <motion.div
        style={{
          width: "50%",
          height: "100%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          pointerEvents: "none",
        }}
        initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
        animate={isCut ? { x: 140, y: 220, rotate: 25, opacity: 0 } : { x: 0, y: 0, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: "linear" }}
      >
        {/* Horizontal Red Satin Band (Right) */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: "-4px",
            top: "50%",
            transform: "translateY(-50%)",
            height: "38px",
            background: "linear-gradient(90deg, #A82834 0%, #851C26 50%, #5E1219 100%)",
            borderTop: "2px solid #D4A04A",
            borderBottom: "2px solid #D4A04A",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", left: 0, right: 0, top: "50%", transform: "translateY(-50%)", height: "2.5px", background: "rgba(255,255,255,0.25)" }}></div>
          <div style={{ position: "absolute", left: 0, right: 0, top: "2px", borderTop: "1px dashed rgba(212,160,74,0.7)" }}></div>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: "2px", borderBottom: "1px dashed rgba(212,160,74,0.7)" }}></div>
        </div>

        {/* Right Folded Loop */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: "80px",
            height: "50px",
            zIndex: 10,
          }}
        >
          <svg viewBox="0 0 85 55" fill="none" style={{ width: "100%", height: "100%", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.35))" }}>
            <path
              d="M5 27 C35 3 70 8 80 22 C90 36 60 50 5 27 Z"
              fill="url(#rightRedLoopGrad)"
              stroke="#D4A04A"
              strokeWidth="1.2"
            />
            <path d="M10 27 C40 14 60 18 70 26" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round" />
            <defs>
              <linearGradient id="rightRedLoopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5E1219" />
                <stop offset="55%" stopColor="#941E28" />
                <stop offset="100%" stopColor="#C4303E" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Right Cascading Ribbon Tail */}
        <div
          style={{
            position: "absolute",
            left: "8px",
            top: "calc(50% + 2px)",
            width: "50px",
            height: "105px",
            zIndex: 5,
          }}
        >
          <svg viewBox="0 0 60 120" fill="none" style={{ width: "100%", height: "100%", filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.3))" }}>
            <path
              d="M5 0 C15 35 35 70 50 115 L35 106 L22 116 C14 80 5 40 5 0 Z"
              fill="url(#rightRedTailGrad)"
              stroke="#D4A04A"
              strokeWidth="1"
            />
            <path d="M10 6 C20 40 35 75 42 106" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
            <defs>
              <linearGradient id="rightRedTailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#B52B38" />
                <stop offset="50%" stopColor="#8A1C26" />
                <stop offset="100%" stopColor="#4A0E14" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

// RSVP Form Component (Seamless Background Overlay, Script Title, Borderless Button)
const RsvpForm = () => {
  const [fullName, setFullName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no" | null>("yes");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="w-full">
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 text-center rounded-xl"
        >
          <div className="w-9 h-9 rounded-full bg-[#76252F] text-white flex items-center justify-center mx-auto mb-2 text-base">
            ✓
          </div>
          <h4 className="font-script text-2xl sm:text-3xl text-[#2C1E18]">
            Thank You, {fullName}!
          </h4>
          <p className="font-script text-base sm:text-lg text-[#76252F] font-medium mt-1">
            Your RSVP has been joyfully received.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3.5 sm:space-y-4 text-left max-w-[260px] sm:max-w-xs mx-auto">
          {/* Full Name */}
          <div className="pb-1">
            <label className="font-inter text-[10px] sm:text-xs text-[#2C1E18]/85 block mb-1 font-semibold uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Rohinton & Delna Irani"
              className="w-full bg-transparent border-b border-[#2C1E18]/30 focus:border-[#76252F] outline-none py-1.5 text-xs sm:text-sm font-inter text-[#2C1E18] placeholder-[#2C1E18]/35 transition-colors"
            />
          </div>

          {/* Will you attend? */}
          <div className="pt-1.5">
            <span className="font-inter text-[10px] sm:text-xs text-[#2C1E18]/85 block mb-1.5 font-semibold uppercase tracking-wider">
              Will you attend?
            </span>
            <div className="flex items-center space-x-8">
              <label className="flex items-center space-x-2 cursor-pointer font-inter text-xs sm:text-sm text-[#2C1E18]">
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  checked={attending === "yes"}
                  onChange={() => setAttending("yes")}
                  className="accent-[#76252F] cursor-pointer w-4 h-4"
                />
                <span className="font-medium">Yes</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer font-inter text-xs sm:text-sm text-[#2C1E18]">
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  checked={attending === "no"}
                  onChange={() => setAttending("no")}
                  className="accent-[#76252F] cursor-pointer w-4 h-4"
                />
                <span className="font-medium">No</span>
              </label>
            </div>
          </div>

          {/* Send Button - Sleek Luxury Button with Optimized Height */}
          <div style={{ marginTop: "16px", textAlign: "center" }}>
            <button
              type="submit"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "38px",
                padding: "0 34px",
                backgroundColor: "#76252F",
                color: "#FFFFFF",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                boxShadow: "0 4px 12px rgba(118, 37, 47, 0.35)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5E1219")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#76252F")}
            >
              SEND
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default function Home() {
  const [isRibbonCut, setIsRibbonCut] = useState(false);
  const [isGateOpen, setIsGateOpen] = useState(false);

  const handleCutRibbon = () => {
    if (isRibbonCut) return;
    setIsRibbonCut(true);
    // Smooth delay so the ribbon unties and drops before transitioning to Couple Name
    setTimeout(() => {
      setIsGateOpen(true);
    }, 700);
  };

  return (
    <main className="relative w-full bg-[#F2E2CB] text-dark-brown selection:bg-antique-gold/20 selection:text-deep-burgundy">
      
      {/* 1. First Section: Palace Gate with Clickable Red Ribbon (Centered on Ribbon Strip) */}
      <AnimatePresence>
        {!isGateOpen && (
          <motion.div
            className="fixed inset-0 z-50 w-full h-[100dvh] flex items-center justify-center p-0 m-0 bg-[#F2E2CB] overflow-hidden select-none"
            exit={{ opacity: 0, transition: { duration: 0.7, ease: "linear" } }}
          >
            {/* Image Container with Framer Motion reveal */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
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
              {/* Background Frame Image with smooth fade & subtle zoom */}
              { }
              <motion.img
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                src="/assets/images/gate-image.webp"
                alt="Palace Gate"
                className="w-full h-full object-contain pointer-events-none select-none block"
              />

              {/* Clickable Red Gift Ribbon Overlay (Centered on the ribbon strip and knot) */}
              <RedGiftRibbon
                isCut={isRibbonCut}
                onCut={handleCutRibbon}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Scrollable Wedding Experience: Natural browser scrolling without any inner scrollbars */}
      {isGateOpen && (
        <div className="w-full bg-[#F2E2CB] flex flex-col items-center">
          
          {/* SECTION 1: Couple Name Section — Compact, Perfectly Centered within the Oval on Mobile */}
          <section className="w-full min-h-[100dvh] flex flex-col items-center justify-center p-0 sm:p-4 relative select-none">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
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
              {/* Background Frame Image with Framer Motion Animation */}
              { }
              <motion.img
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.3, ease: "easeOut" }}
                src="/assets/images/couple-name.webp"
                alt="Couple Name Frame"
                className="w-full h-full object-contain pointer-events-none select-none block"
              />

              {/* Couple Names & Details inside the Center Oval — Perfectly Centered and Fitted on Mobile */}
              <div 
                style={{
                  position: "absolute",
                  top: "26%",
                  bottom: "30%",
                  left: "16%",
                  right: "16%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  pointerEvents: "none",
                  zIndex: 10,
                }}
              >
                {/* Groom's Name in Stylish Script Font */}
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.25, ease: "linear" }}
                  className="font-script text-3xl sm:text-5xl md:text-6xl text-[#2C1E18] tracking-wide leading-none"
                >
                  Kerfegar
                </motion.h1>

                {/* Elegant Ampersand */}
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.45, ease: "linear" }}
                  className="font-serif italic text-base sm:text-xl text-[#C4933F] leading-none my-0.5 sm:my-1"
                >
                  &amp;
                </motion.span>

                {/* Bride's Name in Stylish Script Font */}
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.7, ease: "linear" }}
                  className="font-script text-3xl sm:text-5xl md:text-6xl text-[#2C1E18] tracking-wide leading-none"
                >
                  Zenobia
                </motion.h1>

                {/* Delicate Gold Accent Line */}
                <div className="w-8 sm:w-10 h-[1px] bg-[#D4A04A] mx-auto my-1.5 opacity-80"></div>

                {/* Date & Ceremony details in clean Inter + Script for red text */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9, ease: "linear" }}
                  className="space-y-0.5 text-center"
                >
                  <p className="font-inter text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#2C1E18] font-bold">
                    October 19, 2026
                  </p>
                  <p className="font-script text-sm sm:text-base text-[#76252F] font-medium leading-none">
                    Ceremony at 6:30 PM
                  </p>
                  <p className="font-inter text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-[#2C1E18]/75 font-medium">
                    Toronto &middot; Canada
                  </p>
                </motion.div>
              </div>

              {/* No yellow arrow */}
            </motion.div>
          </section>

          {/* SECTION 2: Counting The Days (Directly Below Couple Section) */}
          <WeddingCountdown />

          {/* SECTION 3: When & Where Section (Script Heading, Inter Details, No Image Overlap) */}
          <section className="w-full min-h-[100dvh] flex flex-col items-center justify-center p-0 sm:p-4 relative select-none">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
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
              {/* Background Frame Image with Framer Motion Animation */}
              { }
              <motion.img
                initial={{ opacity: 0, scale: 1.04 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                src="/assets/images/when-where.webp"
                alt="When & Where Illustration"
                className="w-full h-full object-contain pointer-events-none select-none block"
              />

              {/* Ceremony Details Content Container (Anchored at top: 60.5% safely below roses, and ending at bottom: 13% above gold crest) */}
              <div 
                style={{
                  position: "absolute",
                  top: "60.5%",
                  bottom: "13%",
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
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: "linear" }}
                  className="flex flex-col items-center justify-center w-full"
                >
                  {/* Heading: When & Where in Script Font */}
                  <h2 className="font-script text-2xl sm:text-3xl text-[#2C1E18] tracking-wide leading-none mb-1">
                    When &amp; Where
                  </h2>

                  {/* Subtitle in Inter */}
                  <p className="font-inter text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-[#64745B] font-semibold mb-1">
                    CEREMONY AND CELEBRATION
                  </p>

                  {/* Venue Name in Inter */}
                  <h3 className="font-inter font-bold text-sm sm:text-base text-[#2C1E18] leading-tight mb-0.5">
                    Grand Hall &amp; Gardens
                  </h3>

                  {/* Date & Location combined into one elegant, compact line */}
                  <p className="font-inter text-[10px] sm:text-xs text-[#2C1E18]/85 font-medium mb-1">
                    October 19, 2026 &middot; Toronto, Canada
                  </p>

                  {/* Time in Red Script Font */}
                  <p className="font-script text-base sm:text-lg text-[#76252F] font-medium leading-none mb-2">
                    Ceremony at 6:30 PM
                  </p>

                  {/* Clickable Rounded Pill "VIEW MAP" Button with Sleek 38px Height */}
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=3590+Bayview+Ave,+North+York,+ON+M2M+3S6"
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
                    VIEW MAP
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* SECTION 4: Our Venue Section (Redesigned with Warm Website Background Overlay & Luxury View Map Button) */}
          <section className="w-full min-h-[100dvh] flex flex-col items-center justify-center p-0 sm:p-4 relative select-none">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
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
              {/* Background Frame Image with Framer Motion Animation */}
              { }
              <motion.img
                initial={{ opacity: 0, scale: 1.04 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                src="/assets/images/venue-section.webp"
                alt="Our Venue Illustration"
                className="w-full h-full object-contain pointer-events-none select-none block"
              />

              {/* 1. Title: Our Venue in Upper Sky above Palace Roof */}
              <div 
                style={{
                  position: "absolute",
                  top: "16%",
                  left: "14%",
                  right: "14%",
                  textAlign: "center",
                  zIndex: 20,
                }}
              >
                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="font-script text-3xl sm:text-4xl md:text-5xl text-[#76252F] leading-none font-medium"
                >
                  Our Venue
                </motion.h2>
              </div>

              {/* 2. Grouped Venue Details in Open Terrace Pool below Palace */}
              <div 
                style={{
                  position: "absolute",
                  top: "60%",
                  bottom: "15%",
                  left: "7%",
                  right: "7%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  zIndex: 20,
                  background: "radial-gradient(ellipse at center, rgba(242, 226, 203, 0.90) 0%, rgba(242, 226, 203, 0.45) 60%, transparent 100%)",
                  padding: "8px 14px",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: "linear" }}
                  className="w-full max-w-[260px] sm:max-w-sm mx-auto flex flex-col items-center justify-center"
                >
                  {/* Venue Name in Inter */}
                  <h3 className="font-inter font-bold text-sm sm:text-base md:text-lg text-[#2C1E18] leading-tight mb-1">
                    Grand Hall &amp; Gardens
                  </h3>

                  {/* Location Line in Inter */}
                  <p className="font-inter text-[9px] sm:text-[10px] tracking-[0.16em] uppercase text-[#C4933F] font-bold mb-1">
                    NORTH YORK &middot; TORONTO &middot; CANADA
                  </p>

                  {/* Description in Inter */}
                  <p className="font-inter text-[10px] sm:text-[11px] text-[#2C1E18]/90 max-w-[250px] sm:max-w-xs mx-auto leading-snug mb-2.5">
                    A historic lakeside estate with terraced gardens, sculpted cypress trees, and timeless architectural elegance.
                  </p>

                  {/* Clickable Rounded Pill "VIEW MAP" Button with Sleek 38px Height */}
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=3590+Bayview+Ave,+North+York,+ON+M2M+3S6"
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
                    VIEW MAP
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* SECTION 5: Dress Code Section (Red Text in Script Font, Clean Open Spaces, No Overlap) */}
          <section className="w-full min-h-[100dvh] flex flex-col items-center justify-center p-0 sm:p-4 relative select-none">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
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
              {/* Background Frame Image with Framer Motion Animation */}
              { }
              <motion.img
                initial={{ opacity: 0, scale: 1.04 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                src="/assets/images/dress code.webp"
                alt="Dress Code Illustration"
                className="w-full h-full object-contain pointer-events-none select-none block"
              />

              {/* 1. UPPER EMPTY SPACE (Between y = 22% and 43%): Title, Red Script Subtitle, Attire — Perfectly in Upper Sky */}
              <div 
                style={{
                  position: "absolute",
                  top: "22%",
                  bottom: "58%",
                  left: "14%",
                  right: "14%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  zIndex: 20,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: "linear" }}
                  className="flex flex-col items-center justify-center w-full"
                >
                  {/* Title in Script Font */}
                  <h2 className="font-script text-3xl sm:text-4xl text-[#2C1E18] leading-none mb-1">
                    Dress Code
                  </h2>

                  {/* Red Text in Medium Script Font */}
                  <p className="font-script text-xl sm:text-2xl text-[#76252F] font-medium leading-none mb-1.5">
                    Formal Evening Attire
                  </p>

                  <div className="space-y-0.5 text-center font-inter text-[10px] sm:text-xs text-[#2C1E18]/85 font-medium uppercase tracking-[0.12em]">
                    <p>Long Gowns &amp; Tuxedos</p>
                    <p>Traditional Parsi Gara &amp; Dagli</p>
                  </div>
                </motion.div>
              </div>

              {/* 2. LOWER EMPTY SPACE (Between y = 73.5% and 78.5%): Above Faravahar Gold Crest */}
              <div 
                style={{
                  position: "absolute",
                  top: "73.5%",
                  left: "14%",
                  right: "14%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  zIndex: 20,
                }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="space-y-0.5 text-center"
                >
                  <p className="font-inter text-[#64745B] font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.2em] leading-none">
                    Soft Garden Tones
                  </p>
                  {/* Red Text in Medium Script Font — Safely above Faravahar */}
                  <p className="font-script text-base sm:text-lg text-[#76252F] font-medium leading-none mt-0.5">
                    Kindly Avoid White
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* SECTION 6: Programme Section (Script Title, Red Script Times, Inter Event Names) */}
          <section className="w-full min-h-[100dvh] flex flex-col items-center justify-center p-0 sm:p-4 relative select-none">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
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
              {/* Background Frame Image with Framer Motion Animation */}
              { }
              <motion.img
                initial={{ opacity: 0, scale: 1.04 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                src="/assets/images/programe.webp"
                alt="Programme Illustration"
                className="w-full h-full object-contain pointer-events-none select-none block"
              />

              {/* Programme Title in Script Font moved higher up for mobile spacing */}
              <div 
                style={{
                  position: "absolute",
                  top: "10%",
                  left: "44%",
                  right: "12%",
                  textAlign: "left",
                  zIndex: 20,
                }}
              >
                <motion.h2
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="font-script text-3xl sm:text-4xl md:text-5xl text-[#2C1E18] tracking-wide"
                >
                  Programme
                </motion.h2>
              </div>

              {/* 5 Events Aligned Exactly to Each Illustrated Icon:
                  Row 1 (Harp): top 29.5%
                  Row 2 (Rings): top 41.5%
                  Row 3 (Cocktail): top 50.0%
                  Row 4 (Plate): top 60.5%
                  Row 5 (Shoes): top 71.5%
              */}
              {/* Event 1 (Harp at 30.5%) */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                  position: "absolute",
                  top: "29.5%",
                  left: "44%",
                  right: "6%",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "10px",
                  zIndex: 20,
                }}
              >
                <span className="font-script text-base sm:text-lg text-[#76252F] font-medium leading-none whitespace-nowrap">
                  5:30 PM
                </span>
                <span className="font-inter text-xs sm:text-sm text-[#2C1E18] font-semibold tracking-wider uppercase leading-none">
                  Welcome
                </span>
              </motion.div>

              {/* Event 2 (Rings at 42.5%) */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  position: "absolute",
                  top: "41.5%",
                  left: "44%",
                  right: "6%",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "10px",
                  zIndex: 20,
                }}
              >
                <span className="font-script text-base sm:text-lg text-[#76252F] font-medium leading-none whitespace-nowrap">
                  6:00 PM
                </span>
                <span className="font-inter text-xs sm:text-sm text-[#2C1E18] font-semibold tracking-wider uppercase leading-none">
                  Ceremony
                </span>
              </motion.div>

              {/* Event 3 (Cocktail at 51.0%) */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{
                  position: "absolute",
                  top: "50.0%",
                  left: "44%",
                  right: "6%",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "10px",
                  zIndex: 20,
                }}
              >
                <span className="font-script text-base sm:text-lg text-[#76252F] font-medium leading-none whitespace-nowrap">
                  7:00 PM
                </span>
                <span className="font-inter text-xs sm:text-sm text-[#2C1E18] font-semibold tracking-wider uppercase leading-none">
                  Cocktail
                </span>
              </motion.div>

              {/* Event 4 (Plate at 61.5%) */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{
                  position: "absolute",
                  top: "60.5%",
                  left: "44%",
                  right: "6%",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "10px",
                  zIndex: 20,
                }}
              >
                <span className="font-script text-base sm:text-lg text-[#76252F] font-medium leading-none whitespace-nowrap">
                  9:00 PM
                </span>
                <span className="font-inter text-xs sm:text-sm text-[#2C1E18] font-semibold tracking-wider uppercase leading-none">
                  Dinner
                </span>
              </motion.div>

              {/* Event 5 (Dancing shoes at 72.5%) */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{
                  position: "absolute",
                  top: "71.5%",
                  left: "44%",
                  right: "6%",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "10px",
                  zIndex: 20,
                }}
              >
                <span className="font-script text-base sm:text-lg text-[#76252F] font-medium leading-none whitespace-nowrap">
                  11:30 PM
                </span>
                <span className="font-inter text-xs sm:text-sm text-[#2C1E18] font-semibold tracking-wider uppercase leading-none">
                  Dance
                </span>
              </motion.div>
            </motion.div>
          </section>

          {/* SECTION 7: RSVP Section (Script Title, Seamless Soft Overlay, Borderless Send Button) */}
          <section className="w-full min-h-[100dvh] flex flex-col items-center justify-center p-0 sm:p-4 relative select-none">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
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
              {/* Background Frame Image with Framer Motion Animation */}
              { }
              <motion.img
                initial={{ opacity: 0, scale: 1.04 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                src="/assets/images/rsvp.webp"
                alt="RSVP Illustration"
                className="w-full h-full object-contain pointer-events-none select-none block"
              />

              {/* RSVP Form Content Container with Seamless Warm Ivory Vignette Overlay (NO harsh square box!) */}
              <div 
                style={{
                  position: "absolute",
                  top: "14%",
                  bottom: "43%",
                  left: "8%",
                  right: "8%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  zIndex: 20,
                  background: "radial-gradient(ellipse at center, rgba(248, 240, 227, 0.88) 0%, rgba(248, 240, 227, 0.5) 60%, rgba(248, 240, 227, 0) 100%)",
                  borderRadius: "999px",
                  padding: "16px 20px",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: "linear" }}
                  className="w-full max-w-xs sm:max-w-sm mx-auto"
                >
                  {/* Title in Script Font */}
                  <h2 className="font-script text-3xl sm:text-4xl md:text-5xl text-[#2C1E18] leading-tight">
                    RSVP
                  </h2>

                  <p className="font-inter text-[10px] sm:text-xs text-[#2C1E18]/80 italic mt-0.5 mb-3.5 sm:mb-4">
                    Kindly reply before the 1st of October, 2026.
                  </p>

                  <RsvpForm />
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* SECTION 8: Final Gratitude Section (Clean Spacing, No Overlap with Garland or Palace, Red Script Title) */}
          <section className="w-full min-h-[100dvh] flex flex-col items-center justify-center p-0 sm:p-4 relative select-none">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
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
              {/* Background Frame Image with Framer Motion Animation */}
              { }
              <motion.img
                initial={{ opacity: 0, scale: 1.04 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                src="/assets/images/graditute.webp"
                alt="Gratitude Illustration"
                className="w-full h-full object-contain pointer-events-none select-none block"
              />

              {/* Short Heartfelt Closing Message in Upper Open Space — Minimized Spacing */}
              <div 
                style={{
                  position: "absolute",
                  top: "23%",
                  bottom: "48%",
                  left: "14%",
                  right: "14%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  zIndex: 20,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.85, ease: "linear" }}
                  className="flex flex-col items-center justify-center w-full space-y-1 sm:space-y-1.5"
                >
                  {/* Heading in Red Script Font */}
                  <h2 className="font-script text-3xl sm:text-4xl md:text-5xl text-[#76252F] leading-tight font-medium">
                    With Love &amp; Gratitude
                  </h2>

                  {/* Shortened Message in Inter */}
                  <p className="font-inter text-xs sm:text-sm text-[#2C1E18]/90 font-medium max-w-[260px] sm:max-w-sm mx-auto leading-snug">
                    With the blessings of Ahura Mazda, thank you for being part of our special day.
                  </p>

                  {/* Delicate Gold Accent Line */}
                  <div className="w-8 sm:w-10 h-[1px] bg-[#D4A04A] mx-auto my-0.5 opacity-80"></div>

                  {/* Couple Names in Script Font */}
                  <p className="font-script text-2xl sm:text-3xl text-[#2C1E18] leading-tight">
                    Kerfegar &amp; Zenobia
                  </p>

                  {/* Date & City in Inter */}
                  <p className="font-inter text-[9px] sm:text-[11px] uppercase tracking-[0.18em] text-[#C4933F] font-bold">
                    October 19, 2026 &middot; Toronto, Canada
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </section>

        </div>
      )}
    </main>
  );
}
