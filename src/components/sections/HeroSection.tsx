import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { profileData } from "@/data/portfolioData";

export function HeroSection() {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = profileData.tagline; // This is the typing effect text from portfolioData
  const indexRef = useRef(0);

  // Character-by-character typing animation - adds the typing effect seen in the hero
  useEffect(() => {
    if (indexRef.current < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, indexRef.current + 1));
        indexRef.current += 1;
      }, 50); // 50ms per character = typing speed
      return () => clearTimeout(timeout);
    }
  }, [displayedText, fullText]);

  // Cursor blink animation - the vertical line that appears to blink after the typed text
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530); // Blinking every 530ms
    return () => clearInterval(interval);
  }, []);

  // Smooth scroll helper - used by CTA buttons to animate scroll to sections
  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="section-container text-center select-none">
        {/* Main animation container - controls overall entrance animation (fade + slide from bottom) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Pre-title text - fades in with delay for staggered effect */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-sm uppercase tracking-widest text-primary/70"
          >
            SYSTEMS ENGINEERING DOSSIER
          </motion.p>

          {/* Main hero title - stencil-style with technical font */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display text-6xl font-bold uppercase tracking-widest sm:text-7xl md:text-8xl lg:text-9xl text-foreground"
            style={{ letterSpacing: "0.15em", textShadow: "2px 2px 0px rgba(0,0,0,0.3)" }}
          >
            {profileData.name.split(" ")[0]}
          </motion.h1>

          {/* Profile title and role from portfolioData - displays after title animation */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-mono text-lg text-foreground/80 sm:text-xl tracking-wide"
          >
            {profileData.title}
          </motion.p>

          {/* Typing effect container - shows character-by-character animation with blinking cursor */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="h-8"
          >
            <p className="font-mono text-base text-foreground/70 sm:text-lg">
              {displayedText}
              {/* Animated cursor - the white vertical line that blinks */}
              <span
                className={`ml-1 inline-block w-1 h-6 bg-primary align-middle ${
                  showCursor ? "opacity-100" : "opacity-0"
                }`}
              />
            </p>
          </motion.div>

          {/* CTA Button container - Technical switch-style buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row"
          >
            <button
              onClick={() => scrollToSection("#projects")}
              className="px-8 py-3 font-mono font-bold text-sm uppercase tracking-wider bg-primary text-primary-foreground border-2 border-primary relative hover:bg-primary/90 transition-all"
              style={{
                clipPath: "polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)"
              }}
            >
              REVIEW PROJECTS
            </button>
            <button
              onClick={() => scrollToSection("#contact")}
              className="px-8 py-3 font-mono font-bold text-sm uppercase tracking-wider bg-transparent text-foreground border-2 border-foreground/60 relative hover:border-primary hover:text-primary transition-all"
              style={{
                clipPath: "polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)"
              }}
            >
              ESTABLISH CONTACT
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator - animated chevron at bottom that guides users to scroll down */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => scrollToSection("#about")}
          className="flex flex-col items-center gap-2 text-foreground/50 transition-colors hover:text-primary font-mono text-xs"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="uppercase tracking-widest">Scroll</span>
          {/* Bouncing animation - up 8px, back to 0 */}
          <span className="text-lg">↓</span>
        </motion.button>
      </motion.div>
    </section>
  );
}

export default HeroSection;
