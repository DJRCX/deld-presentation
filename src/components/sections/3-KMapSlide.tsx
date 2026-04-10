"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function KMapSlide() {
  const [activeOutput, setActiveOutput] = useState<number>(0);

  const kmapData = [
    // Output Y0
    [[0, 0, 0, 0], [1, 0, 0, 0]],
    // Output Y1
    [[0, 0, 0, 0], [0, 1, 0, 0]],
    // Output Y2
    [[0, 0, 0, 0], [0, 0, 0, 1]],
    // Output Y3
    [[0, 0, 0, 0], [0, 0, 1, 0]],
  ];

  const formulas = [
    "EN · A' · B'",
    "EN · A' · B",
    "EN · A · B'",
    "EN · A · B",
  ];

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-12 items-center bg-[#f4f4f0] text-[#111111] overflow-hidden">
      {/* Left: Interactive Selection */}
      <div className="flex-1 max-w-lg">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8">
          The <br/> Proof of <br/> <span className="text-[#ff2a2a]">Minimal.</span>
        </h2>
        
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="border-l-8 border-[#111] pl-6 mb-8"
        >
          <p className="text-xl font-bold leading-tight">
            Are these expressions the simplest possible? Karnaugh Maps help us check visually. 
            Select an output below to see its 3-variable map.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {[0, 1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => setActiveOutput(num)}
              className={`py-4 px-6 text-2xl font-black border-4 border-[#111] transition-all uppercase ${
                activeOutput === num 
                  ? "bg-[#111] text-[#ffd700] shadow-[8px_8px_0px_#ff2a2a] translate-x-1 translate-y-1" 
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              Output Y{num}
            </button>
          ))}
        </div>

        {/* Technical Insight Box */}
        <div className="bg-[#111] text-white p-6 border-l-8 border-[#ffd700] font-mono text-sm leading-relaxed">
          <h3 className="text-[#ffd700] font-black mb-3 tracking-widest uppercase">// KEY INSIGHT</h3>
          <p className="opacity-80">
            Decoders are <span className="text-[#ff2a2a] font-black">inherently minimal</span>. 
            Since each output represents exactly one unique minterm, there are no adjacent 1s in the K-Map. 
            Grouping is impossible, confirming our equations are already in their simplest form.
          </p>
        </div>
      </div>

      {/* Right: K-Map Grid */}
      <div className="flex-1 w-full flex flex-col items-center justify-center p-4">
        <div className="neo-swiss-panel-dark w-full max-w-2xl bg-[#111] text-white overflow-visible">
          
          <div className="text-[#888] font-mono text-[10px] mb-6 flex justify-between uppercase tracking-widest">
            <span>// ARCHITECTURE: 2-ROW x 4-COLUMN</span>
            <span>Current: Y{activeOutput} MAP</span>
          </div>

          <div className="relative pt-8 pl-8">
            {/* Variable Labels */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 font-mono text-xs font-black text-[#ff2a2a] tracking-[0.5em] uppercase">
              Inputs: AB
            </div>
            <div className="absolute top-1/2 -left-8 -translate-y-1/2 -rotate-90 font-mono text-xs font-black text-[#ff2a2a] tracking-[0.5em] uppercase">
              Master: E
            </div>

            {/* Top Labels (AB) with Boolean Notation */}
            <div className="flex ml-20 mb-4 font-mono text-xl font-bold text-[#ffd700] relative">
              {[
                { bits: '00', logic: "A'B'" },
                { bits: '01', logic: "A'B" },
                { bits: '11', logic: "AB" },
                { bits: '10', logic: "AB'" }
              ].map((item) => (
                <div key={item.bits} className="flex-1 text-center group">
                  <div className="text-[10px] text-white/30 mb-1">{item.bits}</div>
                  <div className="text-sm sm:text-lg">{item.logic}</div>
                </div>
              ))}
            </div>

            <div className="flex">
              {/* Side Labels (EN) with Boolean Notation */}
              <div className="w-20 flex flex-col justify-around font-mono text-sm font-bold text-[#ffd700]">
                <div className="h-24 flex flex-col items-center justify-center border-b border-[#222]">
                  <span className="text-[10px] text-white/30">0</span>
                  <span className="text-lg">E'</span>
                </div>
                <div className="h-24 flex flex-col items-center justify-center">
                  <span className="text-[10px] text-white/30">1</span>
                  <span className="text-lg">E</span>
                </div>
              </div>

              {/* Grid */}
              <div className="flex-1 grid grid-cols-4 grid-rows-2 gap-2">
                {kmapData[activeOutput].map((row, rIdx) => 
                  row.map((cell, cIdx) => (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      className={`h-24 flex items-center justify-center text-4xl font-mono transition-all duration-300 border-2 ${
                        cell === 1 
                          ? "bg-[#ff2a2a] border-[#ff2a2a] text-white z-10 scale-105 shadow-[0_0_20px_rgba(255,42,42,0.4)]" 
                          : "bg-[#1a1a1a] border-[#333] text-[#444]"
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={`${activeOutput}-${cell}`}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className="font-black"
                        >
                          {cell}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Dynamic Result Panel */}
          <div className="mt-12 group">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[2px] flex-1 bg-[#333]" />
              <div className="font-mono text-[10px] text-[#888] tracking-widest uppercase">Simplification Result</div>
              <div className="h-[2px] flex-1 bg-[#333]" />
            </div>
            
            <div className="bg-white text-[#111] p-6 relative shadow-[10px_10px_0px_#ff2a2a]">
              <div className="absolute -top-3 -left-3 bg-[#ff2a2a] text-white text-[10px] px-2 py-1 font-black">
                MINIMAL_EQUATION
              </div>
              <div className="flex justify-between items-center">
                <div className="text-3xl font-black font-mono">
                  Y{activeOutput} = <span className="text-[#ff2a2a]">{formulas[activeOutput]}</span>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] uppercase font-black opacity-50 mb-1">Status</p>
                  <p className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 border border-green-200 uppercase">✓ Already Minimal</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
