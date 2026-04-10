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
          className="neo-swiss-panel group hover:border-[#ff2a2a] transition-colors flex flex-col bg-white"
        >
          <div className="text-4xl font-black mb-4 uppercase group-hover:text-[#ff2a2a] transition-colors p-4 pb-0">
            // Memory Selection
          </div>
          <div className="px-4 mb-4">
            <div className="inline-flex items-center gap-2 bg-[#111] text-[#ffd700] px-3 py-1 font-mono text-sm font-black">
              ADDRESS_BUS: [ {memActive === 2 ? "1 0" : memActive === 1 ? "0 1" : "0 0"} ]
            </div>
          </div>
          <p
            className="font-bold text-lg mb-8 flex-1 cursor-pointer px-4"
            onClick={() => setMemActive((m) => (m + 1) % 3)}
          >
            Implement <span className="text-[#ff2a2a]">Address Decoding</span> to select the active RAM bank. Only the addressed chip drives the data bus. 
            <br/><span className="text-sm underline decoration-2 decoration-[#ff2a2a] opacity-70">
              Click CPU to cycle memory.
            </span>
          </p>
          <div className="h-48 border-t-4 border-[#111] bg-[#f4f4f0] p-4 relative overflow-hidden flex items-center justify-center">
            {/* CPU Bus Background Line */}
            <div className="absolute left-[88px] top-[40px] bottom-[40px] w-1.5 bg-[#111]" />

            {/* Tap Wires to RAM */}
            {[0, 1, 2].map((idx) => (
              <div
                key={idx}
                className={`absolute left-[88px] right-[4.5rem] h-1.5 transition-all duration-300 ${memActive === idx ? "bg-[#ff2a2a] z-10 shadow-[0_0_10px_rgba(255,42,42,0.5)]" : "bg-white border-y border-[#ddd]"}`}
                style={{ top: `${40 + idx * 56}px` }}
              />
            ))}

            {/* CPU Visual */}
            <div
              onClick={() => setMemActive((m) => (m + 1) % 3)}
              className="w-16 h-28 bg-[#111] absolute left-6 flex flex-col items-center justify-center text-white font-mono font-bold z-20 shadow-[4px_4px_0_#ff2a2a] cursor-pointer hover:scale-105 transition-transform active:scale-95"
            >
              <span className="text-xs opacity-50 mb-2">SYSTEM</span>
              CPU
            </div>

            {/* RAM Modules */}
            {[0, 1, 2].map((idx) => (
              <div
                key={idx}
                className={`w-14 h-12 border-2 absolute right-6 flex items-center justify-center text-[10px] font-black transition-all duration-300 z-20 ${
                  memActive === idx 
                    ? "bg-[#111] border-[#111] text-[#fff] shadow-[8px_8px_0px_#ff2a2a] -translate-x-1 -translate-y-1" 
                    : "bg-white border-[#111] text-[#111]"
                }`}
                style={{ top: `${idx === 0 ? 10 : idx === 1 ? 66 : 122}px` }}
              >
                RAM{idx}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Instruction Decoding */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="neo-swiss-panel group hover:bg-[#111] hover:text-white transition-colors flex flex-col"
        >
          <div className="text-4xl font-black mb-4 uppercase group-hover:text-[#ffd700] transition-colors p-4 pb-0">
            // Instruction <br/>Decoding
          </div>
          <p
            className="font-bold text-lg mb-8 flex-1 cursor-pointer px-4"
            onClick={() => setOpIndex((i) => (i + 1) % 4)}
          >
            Translate <span className="text-[#ff2a2a] group-hover:text-[#ffd700]">binary opcodes</span> into distinct control signals to trigger hardware operations.
            <br/><span className="text-sm underline decoration-2 decoration-[#ff2a2a] group-hover:decoration-[#ffd700] opacity-70">
              Click opcode to cycle signals.
            </span>
          </p>
          <div className="h-48 border-t-4 border-[#111] bg-[#222] p-0 relative overflow-hidden flex items-center justify-center">
            {/* Input Wire */}
            <div className="absolute left-16 right-1/2 h-1 bg-[#333] top-1/2 -translate-y-1/2 z-0" />
            
            {/* Moving Signal Pulse */}
            <motion.div
              key={opIndex}
              initial={{ left: "10%" }}
              animate={{ left: "50%" }}
              className="absolute w-8 h-1 bg-[#ffd700] shadow-[0_0_15px_#ffd700] z-0 top-1/2 -translate-y-1/2"
            />

            {/* Input Opcode Box */}
            <div
              onClick={() => setOpIndex((i) => (i + 1) % 4)}
              className="text-[#111] bg-[#ffd700] font-mono text-xl absolute left-4 cursor-pointer hover:scale-105 active:scale-95 transition-all px-2 py-1 z-20 shadow-[4px_4px_0_white] font-black select-none"
            >
              &gt; {instructions[opIndex].code}
            </div>

            {/* Central Decoder */}
            <div className="w-16 absolute left-1/2 top-4 bottom-4 -translate-x-1/2 bg-[#ff2a2a] flex flex-col items-center justify-center font-black text-white text-[10px] z-10 border-2 border-white shadow-[0_0_20px_rgba(255,42,42,0.5)]">
              <span>DECODE</span>
              <div className="w-4 h-[1px] bg-white/30 my-2" />
              <span>UNIT</span>
            </div>

            {/* Output Wires and Labels */}
            {instructions.map((inst, idx) => (
              <div key={inst.name}>
                <div
                  className={`absolute left-[calc(50%+32px)] right-16 h-1 transition-all duration-300 ${opIndex === idx ? "bg-[#ffd700] z-10 shadow-[0_0_10px_#ffd700]" : "bg-[#333]"}`}
                  style={{ top: `${inst.top}px` }}
                />
                <div
                  className={`absolute right-4 font-mono text-[10px] transition-all duration-300 w-12 text-right ${opIndex === idx ? "text-[#ffd700] font-black scale-110" : "text-[#555]"}`}
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
          className="neo-swiss-panel group hover:border-[#ffd700] transition-colors flex flex-col border-[#111] bg-white"
        >
          <div className="text-4xl font-black mb-4 uppercase transition-colors p-4 pb-0">
            // Cascading <br />/ Scale Up
          </div>
          <p className="font-bold text-lg mb-8 flex-1 px-4">
            Expand logic capacity by <span className="text-[#ff2a2a]">Cascading</span> units. The most significant bit (A₂) operates as a Chip Select.
            <br/><span className="text-sm underline decoration-2 decoration-[#ff2a2a] opacity-70">
              Click ADDR A₂ to toggle banks.
            </span>
          </p>

          <div className="h-56 border-t-4 border-[#111] bg-[#f4f4f0] relative overflow-hidden flex items-center justify-center p-0">
            <svg viewBox="0 0 400 220" className="w-full h-full p-4">
              {/* Input A2 Toggle Area */}
              <g 
                onClick={() => setHighBit(h => h === 0 ? 1 : 0)} 
                className="cursor-pointer select-none"
              >
                <rect x="20" y="70" width="50" height="80" fill="#111" />
                <rect x="25" y={highBit === 0 ? "75" : "115"} width="40" height="30" fill="#ffd700" />
                <text x="45" y="96" textAnchor="middle" fill={highBit === 0 ? "#111" : "white"} className="font-mono text-xl font-black">0</text>
                <text x="45" y="136" textAnchor="middle" fill={highBit === 1 ? "#111" : "white"} className="font-mono text-xl font-black">1</text>
                <text x="45" y="170" textAnchor="middle" fill="#888" className="font-mono text-[8px] font-black">ADDR A₂</text>
              </g>

              {/* Wiring: Bus from A2 */}
              <line x1="70" y1="110" x2="110" y2="110" stroke="#ff2a2a" strokeWidth="3" />
              
              {/* Vertical Bus Segments */}
              <line x1="110" y1="110" x2="110" y2="50" stroke={highBit === 0 ? "#ff2a2a" : "#ddd"} strokeWidth="3" />
              <line x1="110" y1="110" x2="110" y2="170" stroke={highBit === 1 ? "#ff2a2a" : "#ddd"} strokeWidth="3" />
              
              <circle cx="110" cy="110" r="3" fill="#ff2a2a" />
              
              {/* Path to U1 with Inverter */}
              <line x1="110" y1="50" x2="140" y2="50" stroke={highBit === 0 ? "#ff2a2a" : "#ddd"} strokeWidth="3" />
              <g transform="translate(140, 50)">
                <circle r={highBit === 0 ? "6" : "4"} fill="white" stroke={highBit === 0 ? "#ff2a2a" : "#ddd"} strokeWidth="2" />
                <text x="0" y="-12" textAnchor="middle" className="text-[8px] font-black fill-[#ff2a2a] group-hover:opacity-100 transition-opacity opacity-0 italic">NOT</text>
              </g>
              <line x1="146" y1="50" x2="180" y2="50" stroke={highBit === 0 ? "#ff2a2a" : "#ddd"} strokeWidth="3" />

              {/* Path to U2 (Direct) */}
              <line x1="110" y1="170" x2="180" y2="170" stroke={highBit === 1 ? "#ff2a2a" : "#ddd"} strokeWidth="3" />

              {/* Decoder U1 */}
              <g>
                <rect x="180" y="20" width="85" height="60" fill={highBit === 0 ? "#111" : "white"} stroke={highBit === 0 ? "#ff2a2a" : "#ddd"} strokeWidth="2" />
                <text x="222" y="45" textAnchor="middle" fill={highBit === 0 ? "#ffd700" : "#111"} className="font-black text-[10px] tracking-widest uppercase">U1_BANK</text>
                <text x="222" y="65" textAnchor="middle" fill={highBit === 0 ? "white" : "#ddd"} className="font-mono text-[7px] font-black uppercase tracking-tighter">CS_ACTIVE</text>
                
                {/* Active Output Lines U1 */}
                <g stroke={highBit === 0 ? "#ff2a2a" : "#ddd"} strokeWidth="2">
                  {[35, 45, 55, 65].map(y => <line key={y} x1="265" y1={y} x2="285" y2={y} />)}
                </g>
              </g>

              {/* Decoder U2 */}
              <g>
                <rect x="180" y="140" width="85" height="60" fill={highBit === 1 ? "#111" : "white"} stroke={highBit === 1 ? "#ff2a2a" : "#ddd"} strokeWidth="2" />
                <text x="222" y="165" textAnchor="middle" fill={highBit === 1 ? "#ffd700" : "#111"} className="font-black text-[10px] tracking-widest uppercase">U2_BANK</text>
                <text x="222" y="185" textAnchor="middle" fill={highBit === 1 ? "white" : "#ddd"} className="font-mono text-[7px] font-black uppercase tracking-tighter">CS_ACTIVE</text>
                
                {/* Active Output Lines U2 */}
                <g stroke={highBit === 1 ? "#ff2a2a" : "#ddd"} strokeWidth="2">
                  {[155, 165, 175, 185].map(y => <line key={y} x1="265" y1={y} x2="285" y2={y} />)}
                </g>
              </g>
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
