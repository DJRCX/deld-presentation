"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function KMapSlide() {
  const [activeOutput, setActiveOutput] = useState<number>(0);

  const kmapData = [
    // Output Y0
    [
      [0, 0, 0, 0], // EN=0
      [1, 0, 0, 0], // EN=1 (A=0,B=0)
    ],
    // Output Y1
    [
      [0, 0, 0, 0], // EN=0
      [0, 1, 0, 0], // EN=1 (A=0,B=1)
    ],
    // Output Y2
    [
      [0, 0, 0, 0], // EN=0
      [0, 0, 0, 1], // EN=1 (A=1,B=0) Note: gray code 00, 01, 11, 10 
    ],
    // Output Y3
    [
      [0, 0, 0, 0], // EN=0
      [0, 0, 1, 0], // EN=1 (A=1,B=1)
    ]
  ];

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-12 items-center bg-[#f4f4f0] text-[#111111]">
      {/* Left: Interactive Selection */}
      <div className="flex-1 max-w-lg">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8">
          The <br/> Proof of <br/> <span className="text-[#ff2a2a]">Minimal.</span>
        </h2>
        <div className="border-l-8 border-[#111] pl-6 mb-12">
          <p className="text-xl font-bold">
            Are these expressions the simplest possible? Karnaugh Maps help us check visually. 
            Select an output below to see its K-Map.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
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
      </div>

      {/* Right: K-Map Grid */}
      <div className="flex-1 w-full flex flex-col items-center justify-center p-4">
        <div className="neo-swiss-panel-dark w-full max-w-2xl bg-[#111] text-white">
          <div className="text-[#888] font-mono text-sm mb-6 flex justify-between uppercase">
            <span>// K-Map for Y{activeOutput}</span>
            <span>Gray Code: AB</span>
          </div>

          <div className="relative">
            {/* Top Labels (AB) */}
            <div className="flex ml-16 mb-2 font-mono text-xl font-bold text-[#ffd700]">
              <div className="flex-1 text-center">00</div>
              <div className="flex-1 text-center">01</div>
              <div className="flex-1 text-center">11</div>
              <div className="flex-1 text-center">10</div>
            </div>

            <div className="flex">
              {/* Side Labels (EN) */}
              <div className="w-16 flex flex-col justify-around font-mono text-xl font-bold text-[#ffd700]">
                <div className="h-24 flex items-center justify-center">0</div>
                <div className="h-24 flex items-center justify-center">1</div>
              </div>

              {/* Grid */}
              <div className="flex-1 grid grid-cols-4 grid-rows-2 gap-2">
                {kmapData[activeOutput].map((row, rIdx) => 
                  row.map((cell, cIdx) => (
                    <motion.div
                      key={`${rIdx}-${cIdx}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className={`h-24 flex items-center justify-center text-4xl font-mono font-black border-2 ${
                        cell === 1 
                          ? "bg-[#ff2a2a] border-[#ff2a2a] text-white z-10 scale-105 outline outline-4 outline-white outline-offset-[-8px]" 
                          : "bg-[#222] border-[#333] text-[#555]"
                      }`}
                    >
                      {cell}
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-white text-[#111] border-l-8 border-[#ff2a2a]">
            {/* Grouping analysis text */}
            <p className="text-xl font-bold uppercase mb-2">Observation:</p>
            <p className="text-lg">
              Notice that there is only <span className="font-black">ONE</span> cell with a '1'. It has no adjacent '1's horizontally or vertically. <br/>
              <strong>Conclusion:</strong> No grouping is possible. The equation is already in its minimal form!
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
