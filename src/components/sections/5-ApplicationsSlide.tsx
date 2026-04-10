"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ApplicationsSlide() {
  // States for interactivity
  const [memActive, setMemActive] = useState(1);
  const [opIndex, setOpIndex] = useState(2);
  const [highBit, setHighBit] = useState(0);

  const instructions = [
    { code: "0 0", name: "HALT", top: 24 },
    { code: "0 1", name: "ADD", top: 72 },
    { code: "1 0", name: "LOAD", top: 120 },
    { code: "1 1", name: "STORE", top: 168 },
  ];

  return (
    <div className="w-full h-full flex flex-col pt-10 bg-[#f4f4f0] text-[#111111]">
      <div className="mb-12 border-b-8 border-[#111] pb-6 flex justify-between items-end">
        <div>
          <div className="neo-swiss-badge !relative inline-block mb-4">
            REAL-WORLD
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            Where it <span className="text-[#ff2a2a]">lives.</span>
          </h2>
        </div>
        <p className="text-xl font-bold max-w-sm text-right leading-tight hidden md:block">
          From K-Maps to microchips — decoders turn binary into action.
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 pb-24">
        {/* Memory Selection */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="neo-swiss-panel group hover:bg-[#ffd700] transition-colors flex flex-col"
        >
          <div className="text-4xl font-black mb-4 uppercase group-hover:text-[#ff2a2a] transition-colors">
            // Memory Selection
          </div>
          <p
            className="font-bold text-lg mb-8 flex-1 cursor-pointer"
            onClick={() => setMemActive((m) => (m + 1) % 3)}
          >
            Implement <span className="text-[#ff2a2a]">Address Decoding</span> to select the active RAM bank. Only the addressed chip drives the data bus. 
            <br/><span className="text-sm underline decoration-2 decoration-[#ff2a2a] opacity-70">
              Click CPU to cycle memory.
            </span>
          </p>
          <div className="h-48 border-4 border-[#111] bg-white p-4 relative overflow-hidden flex items-center justify-center">
            {/* CPU Bus Background Line */}
            <div className="absolute left-[88px] top-[40px] bottom-[40px] w-1.5 bg-[#111] group-hover:bg-[#111]" />

            {/* Tap Wires to RAM */}
            <div
              className={`absolute left-[88px] right-[4.5rem] h-1.5 transition-colors duration-300 ${memActive === 0 ? "bg-[#ff2a2a] z-10" : "bg-[#e0e0e0] group-hover:bg-[#ab9000]"}`}
              style={{ top: "40px" }}
            />
            <div
              className={`absolute left-[88px] right-[4.5rem] h-1.5 transition-colors duration-300 ${memActive === 1 ? "bg-[#ff2a2a] z-10" : "bg-[#e0e0e0] group-hover:bg-[#ab9000]"}`}
              style={{ top: "96px" }}
            />
            <div
              className={`absolute left-[88px] right-[4.5rem] h-1.5 transition-colors duration-300 ${memActive === 2 ? "bg-[#ff2a2a] z-10" : "bg-[#e0e0e0] group-hover:bg-[#ab9000]"}`}
              style={{ top: "152px" }}
            />

            {/* Visual */}
            <div
              onClick={() => setMemActive((m) => (m + 1) % 3)}
              className="w-16 h-30 bg-[#111] absolute left-6 flex items-center justify-center text-white font-mono font-bold z-20 shadow-[4px_4px_0_#ff2a2a] cursor-pointer hover:scale-105 transition-transform active:scale-95"
              title="Click to cycle active RAM"
            >
              CPU
            </div>

            <div
              className={`w-12 h-13 border-2 absolute right-6 top-2 flex items-center justify-center text-xs font-bold transition-all duration-300 z-20 ${memActive === 0 ? "bg-[#111] border-[#111] text-[#fff] shadow-[0_0_15px_#ff2a2a]" : "bg-white border-[#111] text-[#111]"}`}
            >
              RAM0
            </div>
            <div
              className={`w-12 h-13 border-2 absolute right-6 top-[64px] flex items-center justify-center text-xs font-bold transition-all duration-300 z-20 ${memActive === 1 ? "bg-[#111] border-[#111] text-[#fff] shadow-[0_0_15px_#ff2a2a]" : "bg-[#f8f8f8] border-[#111] text-[#777]"}`}
            >
              RAM1
            </div>
            <div
              className={`w-12 h-13 border-2 absolute right-6 bottom-2 flex items-center justify-center text-xs font-bold transition-all duration-300 z-20 ${memActive === 2 ? "bg-[#111] border-[#111] text-[#fff] shadow-[0_0_15px_#ff2a2a]" : "bg-[#f4f4f0] border-[#111] text-[#555]"}`}
            >
              RAM2
            </div>
          </div>
        </motion.div>

        {/* Instruction Decoding */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="neo-swiss-panel group hover:bg-[#ff2a2a] hover:text-white hover:border-[#111] transition-colors flex flex-col"
        >
          <div className="text-4xl font-black mb-4 uppercase group-hover:text-[#ffd700] transition-colors">
            // Instruction Decoding
          </div>
          <p
            className="font-bold text-lg mb-8 flex-1 group-hover:text-white cursor-pointer"
            onClick={() => setOpIndex((i) => (i + 1) % 4)}
          >
            Translate <span className="text-[#ffd700]">binary opcodes</span> into distinct control signals to trigger distinct hardware operations.
            <br/><span className="text-sm underline decoration-2 decoration-[#ffd700] opacity-70">
              Click opcode to cycle signals.
            </span>
          </p>
          <div className="h-48 border-4 border-[#111] bg-[#111] p-0 relative overflow-hidden flex items-center justify-center">
            {/* Input Wire */}
            <div
              className={`absolute left-16 right-1/2 h-1 transition-colors duration-300 top-1/2 -translate-y-1/2 z-0 ${opIndex !== null ? "bg-white shadow-[0_0_10px_white]" : "bg-[#555]"}`}
            />

            {/* Input Opcode Box */}
            <div
              onClick={() => setOpIndex((i) => (i + 1) % 4)}
              className="text-[#111] bg-[#ffd700] hover:bg-white font-mono text-xl absolute left-4 cursor-pointer hover:scale-105 active:scale-95 transition-all px-2 py-1 z-20 rounded-sm shadow-md font-bold select-none"
              title="Click to cycle opcode"
            >
              &gt; {instructions[opIndex].code}
            </div>

            {/* Central Decoder */}
            <div className="w-16 absolute left-1/2 top-4 bottom-4 -translate-x-1/2 bg-[#ff2a2a] flex items-center justify-center font-bold text-white text-xs z-10 border-2 border-white shadow-[0_0_15px_rgba(255,42,42,0.4)]">
              DEC
            </div>

            {/* Output Wires and Labels */}
            {instructions.map((inst, idx) => (
              <div key={inst.name}>
                <div
                  className={`absolute left-[calc(50%+32px)] right-16 h-1 transition-all duration-300 ${opIndex === idx ? "bg-white z-10 shadow-[0_0_8px_white]" : "bg-[#333]"}`}
                  style={{ top: `${inst.top}px` }}
                />
                <div
                  className={`absolute right-4 font-mono text-sm transition-all duration-300 w-12 text-right ${opIndex === idx ? "text-[#ffd700] font-black scale-110 drop-shadow-[0_0_4px_rgba(255,215,0,0.8)]" : "text-[#666]"}`}
                  style={{ top: `${inst.top - 10}px` }}
                >
                  {inst.name}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cascading */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="neo-swiss-panel group hover:bg-[#111] hover:text-[#f4f4f0] transition-colors flex flex-col border-[#111]"
        >
          <div className="text-4xl font-black mb-4 uppercase group-hover:text-[#ffd700] transition-colors">
            // Cascading <br />/ Scale Up
          </div>
          <p className="font-bold text-lg mb-8 flex-1">
            Expand logic capacity by <span className="text-[#ff2a2a]">Cascading</span> units. The most significant bit (A₂) operates as a Chip Select.
            <br/><span className="text-sm underline decoration-2 decoration-[#ff2a2a] opacity-70">
              Click ADDR A₂ to toggle banks.
            </span>
          </p>

          <div className="h-56 border-4 border-[#111] bg-white relative overflow-hidden flex items-center justify-center p-0">
            <svg viewBox="0 0 400 220" className="w-full h-full p-4">
              {/* Input A2 Toggle Area */}
              <g 
                onClick={() => setHighBit(h => h === 0 ? 1 : 0)} 
                className="cursor-pointer select-none"
              >
                <rect x="20" y="70" width="50" height="80" fill="white" stroke="#111" strokeWidth="3" />
                <rect x="25" y={highBit === 0 ? "75" : "115"} width="40" height="30" fill="#ff2a2a" />
                <text x="45" y="96" textAnchor="middle" fill={highBit === 0 ? "white" : "#111"} className="font-mono text-xl font-black">0</text>
                <text x="45" y="136" textAnchor="middle" fill={highBit === 1 ? "white" : "#111"} className="font-mono text-xl font-black">1</text>
                <text x="45" y="170" textAnchor="middle" fill="#111" className="font-mono text-[10px] font-black group-hover:fill-white transition-colors">ADDR A₂</text>
              </g>

              {/* Wiring: Bus from A2 */}
              <line x1="70" y1="110" x2="110" y2="110" stroke={highBit !== null ? "#ff2a2a" : "#111"} strokeWidth="4" />
              <line x1="110" y1="50" x2="110" y2="170" stroke="#111" strokeWidth="4" />
              
              {/* Active Signal Taps */}
              <circle cx="110" cy="110" r="4" fill="#ff2a2a" />
              
              {/* Top Decoder Path */}
              <line x1="110" y1="50" x2="180" y2="50" stroke={highBit === 0 ? "#ff2a2a" : "#111"} strokeWidth="4" />
              <circle cx="110" cy="50" r="4" fill={highBit === 0 ? "#ff2a2a" : "#111"} />

              {/* Bottom Decoder Path */}
              <line x1="110" y1="170" x2="180" y2="170" stroke={highBit === 1 ? "#ff2a2a" : "#111"} strokeWidth="4" />
              <circle cx="110" cy="170" r="4" fill={highBit === 1 ? "#ff2a2a" : "#111"} />

              {/* Decoder U1 */}
              <g>
                <rect x="180" y="20" width="80" height="60" fill={highBit === 0 ? "#111" : "white"} stroke={highBit === 0 ? "#ff2a2a" : "#111"} strokeWidth="4" className="transition-all duration-300" />
                <text x="220" y="45" textAnchor="middle" fill={highBit === 0 ? "white" : "#111"} className="font-black text-xs italic">DEC U1</text>
                <text x="220" y="65" textAnchor="middle" fill={highBit === 0 ? "#ff2a2a" : "#888"} className="font-mono text-[8px] font-black">ENABLE</text>
                <g stroke={highBit === 0 ? "#ff2a2a" : "#111"} strokeWidth="3">
                  <line x1="260" y1="35" x2="290" y2="35" />
                  <line x1="260" y1="45" x2="290" y2="45" />
                  <line x1="260" y1="55" x2="290" y2="55" />
                  <line x1="260" y1="65" x2="290" y2="65" />
                </g>
              </g>

              {/* Decoder U2 */}
              <g>
                <rect x="180" y="140" width="80" height="60" fill={highBit === 1 ? "#111" : "white"} stroke={highBit === 1 ? "#ff2a2a" : "#111"} strokeWidth="4" className="transition-all duration-300" />
                <text x="220" y="165" textAnchor="middle" fill={highBit === 1 ? "white" : "#111"} className="font-black text-xs italic">DEC U2</text>
                <text x="220" y="185" textAnchor="middle" fill={highBit === 1 ? "#ff2a2a" : "#888"} className="font-mono text-[8px] font-black">ENABLE</text>
                <g stroke={highBit === 1 ? "#ff2a2a" : "#111"} strokeWidth="3">
                  <line x1="260" y1="155" x2="290" y2="155" />
                  <line x1="260" y1="165" x2="290" y2="165" />
                  <line x1="260" y1="175" x2="290" y2="175" />
                  <line x1="260" y1="185" x2="290" y2="185" />
                </g>
              </g>
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
