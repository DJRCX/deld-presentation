"use client";

import { useEffect, useState } from "react";
import { useDecoderStore } from "@/store/useDecoderStore";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Slide components
import TitleSlide from "@/components/sections/0-TitleSlide";
import IntroSlide from "@/components/sections/1-IntroductionSlide";
import TruthTableSlide from "@/components/sections/2-TruthTableSlide";
import KMapSlide from "@/components/sections/3-KMapSlide";
import GateSlide from "@/components/sections/4-GateSlide";
import ApplicationsSlide from "@/components/sections/5-ApplicationsSlide";
import ConclusionSlide from "@/components/sections/6-ConclusionSlide";

const SLIDES = [
  TitleSlide,
  IntroSlide,
  TruthTableSlide,
  KMapSlide,
  GateSlide,
  ApplicationsSlide,
  ConclusionSlide,
];

const SLIDE_NAMES = [
  "Project Overview & Members",
  "Introduction & Fundamentals",
  "Truth Table & Boolean",
  "K-Map Simplification",
  "Gate-Level Implementation",
  "Real-World Applications",
  "Conclusion & Remarks",
];

export default function PresentationController() {
  const { currentSlide, nextSlide, prevSlide, totalSlides } = useDecoderStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  if (!mounted) return null; // Avoid hydration mismatch

  const CurrentSlideComponent = SLIDES[currentSlide];

  return (
    <div className="relative w-screen h-screen overflow-hidden flex bg-[#f4f4f0]">
      {/* Top Progress / Header Bar */}
      <div className="absolute top-0 left-0 w-full p-4 md:p-8 flex justify-between items-center z-50">
        <h1 className="font-black text-2xl tracking-tighter uppercase border-l-4 border-[#ff2a2a] pl-4">
          2-To-4 Decoder
        </h1>
        <div className="flex gap-2">
          {SLIDES.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 transition-all duration-300 ${idx === currentSlide ? "w-12 bg-[#ff2a2a]" : "w-4 bg-gray-300"}`}
            />
          ))}
        </div>
        <div className="font-mono text-sm font-bold uppercase hidden md:block">
          SYS.0{currentSlide + 1} // {SLIDE_NAMES[currentSlide]}
        </div>
      </div>

      {/* Main Slide Content area with Framer Motion AnimatePresence */}
      <div className="w-full h-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full pt-20 pb-20 px-4 md:px-16"
          >
            <CurrentSlideComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Navigation Controls */}
      <div className="absolute bottom-8 right-8 flex gap-4 z-50">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="w-16 h-16 flex items-center justify-center bg-[#111] text-[#f4f4f0] border-2 border-transparent disabled:opacity-30 hover:border-[#ff2a2a] transition-colors"
        >
          <ChevronLeft size={32} strokeWidth={3} />
        </button>
        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className="w-16 h-16 flex items-center justify-center bg-[#ff2a2a] text-white hover:bg-[#111] transition-colors"
        >
          <ChevronRight size={32} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
