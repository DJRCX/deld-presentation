"use client";

import { motion } from "framer-motion";
import { useDecoderStore } from "@/store/useDecoderStore";

export default function TruthTableSlide() {
  const { inputs, toggleInput } = useDecoderStore();

  const getOutput = (index: number) => {
    if (!inputs.en) return 0;
    const val = (inputs.a ? 2 : 0) + (inputs.b ? 1 : 0);
    return val === index ? 1 : 0;
  };

  const rows = [
    { en: 0, a: 'X', b: 'X', y0: 0, y1: 0, y2: 0, y3: 0, expr: '0' },
    { en: 1, a: 0, b: 0, y0: 1, y1: 0, y2: 0, y3: 0, expr: "EN · A' · B'" },
    { en: 1, a: 0, b: 1, y0: 0, y1: 1, y2: 0, y3: 0, expr: "EN · A' · B" },
    { en: 1, a: 1, b: 0, y0: 0, y1: 0, y2: 1, y3: 0, expr: "EN · A · B'" },
    { en: 1, a: 1, b: 1, y0: 0, y1: 0, y2: 0, y3: 1, expr: "EN · A · B" },
  ];

  // Active row logic
  const getActiveRowIndex = () => {
    if (!inputs.en) return 0;
    return 1 + (inputs.a ? 2 : 0) + (inputs.b ? 1 : 0);
  };
  const activeRow = getActiveRowIndex();

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-12 items-center bg-[#f4f4f0] text-[#111111] overflow-hidden p-4">
      
      {/* Left: Truth Table */}
      <div className="flex-2 w-full max-w-3xl border-4 border-[#111] bg-[#111] text-[#f4f4f0] shadow-[16px_16px_0px_#ff2a2a] p-4 md:p-8">
        <h3 className="font-mono text-2xl mb-8 border-b-2 border-[#333] pb-4 flex justify-between">
          <span>// TRUTH.TABLE</span>
          <span className="text-[#ffd700]">DEC_2:4</span>
        </h3>
        
        <table className="w-full text-center font-mono text-lg md:text-2xl border-collapse">
          <thead>
            <tr className="text-[#888] border-b-4 border-[#333]">
              <th className="py-4">EN</th>
              <th>A</th>
              <th>B</th>
              <th className="border-l-4 border-[#333] pl-2">Y₀</th>
              <th>Y₁</th>
              <th>Y₂</th>
              <th>Y₃</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr 
                key={i} 
                className={`transition-colors duration-200 border-b border-[#222] ${
                  activeRow === i ? "bg-[#ff2a2a] text-white font-black" : "opacity-70"
                }`}
              >
                <td className="py-3">{r.en}</td>
                <td>{r.a}</td>
                <td>{r.b}</td>
                <td className="border-l-4 border-[#333] pl-2">{r.y0}</td>
                <td>{r.y1}</td>
                <td>{r.y2}</td>
                <td>{r.y3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Right: Interactive Controls & Expression */}
      <div className="flex-1 w-full flex flex-col gap-8 justify-center">
        <h2 className="text-4xl md:text-6xl font-black uppercase leading-none tracking-tighter">
          Master <br/> The Switch.
        </h2>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => toggleInput('en')}
              className={`w-24 h-12 border-4 border-[#111] relative transition-colors ${
                inputs.en ? 'bg-[#ff2a2a]' : 'bg-[#111]'
              }`}
            >
              <div className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white transition-all ${
                inputs.en ? 'left-[calc(100%-2.5rem)]' : 'left-1'
              }`} />
            </button>
            <span className="font-black text-3xl font-mono">ENABLE</span>
          </div>

          <div className={`flex flex-col gap-6 transition-opacity ${!inputs.en ? 'opacity-30 pointer-events-none' : ''}`}>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => toggleInput('a')}
                className={`w-24 h-12 border-4 border-[#111] relative transition-colors ${
                  inputs.a ? 'bg-[#ffd700]' : 'bg-[#111]'
                }`}
              >
                <div className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white transition-all ${
                  inputs.a ? 'left-[calc(100%-2.5rem)]' : 'left-1'
                }`} />
              </button>
              <span className="font-black text-3xl font-mono">INPUT A</span>
            </div>
            
            <div className="flex items-center gap-6">
              <button 
                onClick={() => toggleInput('b')}
                className={`w-24 h-12 border-4 border-[#111] relative transition-colors ${
                  inputs.b ? 'bg-[#ffd700]' : 'bg-[#111]'
                }`}
              >
                <div className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white transition-all ${
                  inputs.b ? 'left-[calc(100%-2.5rem)]' : 'left-1'
                }`} />
              </button>
              <span className="font-black text-3xl font-mono">INPUT B</span>
            </div>
          </div>
        </div>

        {/* Dynamic Expression */}
        <div className="mt-8 p-6 border-l-8 border-[#111] bg-white">
          <p className="text-sm font-bold text-[#888] mb-2 uppercase">Active Expression</p>
          <div className="font-mono text-4xl font-black tracking-tight text-[#ff2a2a]">
            {activeRow === 0 ? "OUTPUT = 0" : `Y${activeRow - 1} = ${rows[activeRow].expr}`}
          </div>
        </div>

      </div>
    </div>
  );
}
