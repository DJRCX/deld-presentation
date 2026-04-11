"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

const SEQUENCE = [
  { en: 0, a: 0, b: 0, label: "SYSTEM IDLE" },
  { en: 1, a: 0, b: 0, label: "ADDRESS 00 -> Y₀" },
  { en: 1, a: 0, b: 1, label: "ADDRESS 01 -> Y₁" },
  { en: 1, a: 1, b: 0, label: "ADDRESS 10 -> Y₂" },
  { en: 1, a: 1, b: 1, label: "ADDRESS 11 -> Y₃" },
];

export default function IntroductionSlide() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % SEQUENCE.length);
    }, 1800);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const current = SEQUENCE[step];
  const isActive = (idx: number) => {
    if (!current.en) return false;
    const val = (current.a ? 2 : 0) + (current.b ? 1 : 0);
    return val === idx;
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-8 items-center bg-[#f4f4f0] text-[#111111] overflow-hidden">
      {/* Left typographic content */}
      <div className="flex-1 max-w-2xl flex flex-col justify-center h-full pt-10">
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-6xl md:text-8xl font-black leading-[0.85] tracking-[tightest] uppercase mb-8"
        >
          Select. <br/>
          <span className="text-[#ff2a2a]">Decode.</span> <br/>
          Enable.
        </motion.h2>

        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="border-l-8 border-[#ff2a2a] pl-6 py-2 mb-8"
        >
          <p className="text-2xl font-bold max-w-lg leading-tight">
            How does your computer pick which memory chip to use? A small circuit called a <span className="underline decoration-4">decoder</span>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-lg bg-[#111] text-[#f4f4f0] p-6 border-l-4 border-[#ffd700] relative"
        >
          <div className="absolute top-4 right-4 text-[10px] font-black text-[#ff2a2a] animate-pulse uppercase">
            {isPlaying ? "• AUTO_CYCLING" : "// STATIC_VIEW"}
          </div>
          <h3 className="text-[#ffd700] mb-4 uppercase tracking-widest font-bold">// THE ARCHITECTURE</h3>
          <ul className="list-inside space-y-3 opacity-90">
            <li className="flex items-center gap-3">
              <div className={`w-3 h-3 border-2 ${current.a || current.b ? 'bg-[#ff2a2a] border-[#ff2a2a]' : 'border-white'} transition-colors`} />
              <span><strong>Inputs A & B:</strong> The Address Line</span>
            </li>
            <li className="flex items-center gap-3">
              <div className={`w-3 h-3 border-2 ${current.en ? 'bg-[#ff2a2a] border-[#ff2a2a]' : 'border-white'} transition-colors`} />
              <span><strong>Enable Pin:</strong> Master On/Off switch</span>
            </li>
            <li className="flex items-center gap-3">
              <div className={`w-3 h-3 border-2 ${current.en ? 'bg-[#ffd700] border-[#ffd700]' : 'border-white'} transition-colors`} />
              <span><strong>Four Outputs:</strong> Y₀ to Y₃ (Selected Lines)</span>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Right Visualization */}
      <div className="flex-1 w-full flex flex-col items-center justify-center gap-12 group">
        
        {/* Decoder Block Diagram */}
        <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
          
          {/* Main Box */}
          <div className={`w-full h-full bg-[#111] transition-all duration-500 relative border-[12px] border-[#111] flex items-center justify-center ${
            current.en ? 'shadow-[20px_20px_0px_rgba(255,42,42,0.2)]' : 'opacity-80'
          }`}>
            <div className={`absolute inset-6 border-4 border-[#333] flex items-center justify-center bg-[#1a1a1a] transition-colors ${
              current.en ? 'border-[#ff2a2a]/40 bg-[#1a1a1a]' : ''
            }`}>
              <div className="text-center">
                <span className="block font-black text-5xl text-[#ff2a2a] tracking-widest mb-2">DEC 2:4</span>
                <span className="block font-mono text-[10px] text-white/40 tracking-[0.4em] uppercase">{current.label}</span>
              </div>
            </div>
            
            {/* Input Pins (Left) - Uses RED for active address */}
            <div className={`absolute -left-12 top-[30%] w-12 h-5 border-4 border-[#111] flex items-center transition-all duration-300 ${
              current.a ? 'bg-[#ff2a2a]' : 'bg-[#333]'
            }`}>
              <span className={`absolute -left-10 font-bold font-mono transition-colors ${current.a ? 'text-[#ff2a2a] scale-125' : 'text-black/40'}`}>A</span>
            </div>
            <div className={`absolute -left-12 top-[70%] w-12 h-5 border-4 border-[#111] flex items-center transition-all duration-300 ${
              current.b ? 'bg-[#ff2a2a]' : 'bg-[#333]'
            }`}>
              <span className={`absolute -left-10 font-bold font-mono transition-colors ${current.b ? 'text-[#ff2a2a] scale-125' : 'text-black/40'}`}>B</span>
            </div>

            {/* Enable Pin (Bottom) - Uses RED for master switch */}
            <div className={`absolute left-1/2 -bottom-12 w-6 h-12 border-4 border-[#111] transition-all duration-300 -translate-x-1/2 ${
              current.en ? 'bg-[#ff2a2a] h-16' : 'bg-[#333]'
            }`}>
              <span className={`absolute -bottom-10 left-1/2 -translate-x-1/2 font-bold font-mono transition-colors ${current.en ? 'text-[#ff2a2a] scale-125' : 'text-black/40'}`}>EN</span>
            </div>

            {/* Output Pins (Right) - Uses YELLOW for output per preference */}
            {[0,1,2,3].map((i) => {
              const active = isActive(i);
              return (
                <div 
                  key={i} 
                  className={`absolute -right-12 w-12 h-5 border-4 border-[#111] flex items-center transition-all duration-300 ${
                    active ? 'bg-[#ffd700]' : 'bg-[#333]'
                  }`} 
                  style={{ top: `${15 + i*23}%`}}
                >
                  <span className={`absolute -right-10 font-bold font-mono transition-colors ${active ? 'text-[#ffd700] scale-125' : 'text-black/40'}`}>Y{i}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Manual Logic Controller */}
        <div className="flex flex-col gap-4 z-10 w-full max-w-sm">
          <div className="flex items-center justify-between bg-white border-4 border-[#111] p-2 shadow-[8px_8px_0px_#111]">
            <div className="flex gap-2">
              <button
                onClick={() => { setStep(step === 0 ? 1 : 0); setIsPlaying(false); }}
                className={`px-4 h-12 flex items-center justify-center font-black transition-all border-2 ${
                  step > 0 
                    ? "bg-[#ff2a2a] text-white border-[#111] shadow-[2px_2px_0px_#111] -translate-x-1 -translate-y-1" 
                    : "bg-white text-gray-300 border-gray-100 hover:border-[#ff2a2a] hover:text-[#ff2a2a]"
                }`}
                title={step > 0 ? "Disable Decoder" : "Enable Decoder"}
              >
                EN
              </button>

              <div className="w-[2px] bg-gray-100 mx-1" />

              {[0, 1, 2, 3].map((num) => (
                <button
                  key={num}
                  onClick={() => { setStep(num + 1); setIsPlaying(false); }}
                  className={`w-12 h-12 flex items-center justify-center font-black transition-all border-2 ${
                    step === num + 1 
                      ? "bg-[#ffd700] text-black border-[#111] shadow-[2px_2px_0px_#111] -translate-x-1 -translate-y-1" 
                      : "bg-[#f4f4f0] text-[#111] border-[#eee] hover:border-[#111]"
                  }`}
                >
                  Y{num}
                </button>
              ))}
            </div>
            
            <div className="h-10 w-[2px] bg-gray-200 mx-1" />
            
            <button 
              onClick={() => { setStep(0); setIsPlaying(false); }}
              className={`p-3 transition-colors ${step === 0 ? "text-[#ff2a2a]" : "text-gray-400 hover:text-[#111]"}`}
              title="Reset to Idle"
            >
              <RotateCcw size={20} />
            </button>
          </div>

          {/* Secondary Auto-Play toggle */}
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center justify-center gap-3 px-6 py-2 font-black uppercase text-sm border-2 border-[#111] transition-all shadow-[4px_4px_0px_#111] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 ${
              isPlaying ? 'bg-[#111] text-[#ffd700]' : 'bg-white text-[#111] hover:bg-gray-50'
            }`}
          >
            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
            {isPlaying ? "Pause Cycle" : "Automate Sequence"}
          </button>
        </div>
      </div>
    </div>
  );
}
