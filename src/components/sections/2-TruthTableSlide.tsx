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

      {/* Right: Interactive Controls & Theory */}
      <div className="flex-1 w-full flex flex-col gap-6 justify-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-black uppercase leading-none tracking-tighter mb-4">
            The Logic <br/> Blueprint.
          </h2>
          <p className="font-bold text-sm leading-tight text-[#555] max-w-sm border-l-4 border-[#ff2a2a] pl-4">
            "To build a decoder, we start with a truth table — a complete list of what the circuit should do for every input combination."
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => toggleInput('en')}
              className={`w-20 h-10 border-4 border-[#111] relative transition-colors ${
                inputs.en ? 'bg-[#ff2a2a]' : 'bg-[#111]'
              }`}
            >
              <div className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white transition-all ${
                inputs.en ? 'left-[calc(100%-2rem)]' : 'left-1'
              }`} />
            </button>
            <span className="font-black text-xl font-mono">ENABLE</span>
          </div>

          <div className={`flex flex-col gap-4 transition-opacity ${!inputs.en ? 'opacity-30 pointer-events-none' : ''}`}>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => toggleInput('a')}
                className={`w-20 h-10 border-4 border-[#111] relative transition-colors ${
                  inputs.a ? 'bg-[#ffd700]' : 'bg-[#111]'
                }`}
              >
                <div className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white transition-all ${
                  inputs.a ? 'left-[calc(100%-2rem)]' : 'left-1'
                }`} />
              </button>
              <span className="font-black text-xl font-mono text-[#555]">INPUT A</span>
            </div>
            
            <div className="flex items-center gap-6">
              <button 
                onClick={() => toggleInput('b')}
                className={`w-20 h-10 border-4 border-[#111] relative transition-colors ${
                  inputs.b ? 'bg-[#ffd700]' : 'bg-[#111]'
                }`}
              >
                <div className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white transition-all ${
                  inputs.b ? 'left-[calc(100%-2rem)]' : 'left-1'
                }`} />
              </button>
              <span className="font-black text-xl font-mono text-[#555]">INPUT B</span>
            </div>
          </div>
        </div>

        {/* Boolean Equations Grid */}
        <div className="mt-4">
          <p className="text-[10px] font-black text-[#888] mb-3 uppercase tracking-widest">// BOOLEAN.EQUATIONS (MINTERMS)</p>
          <div className="grid grid-cols-2 gap-3">
            {rows.slice(1).map((r, i) => (
              <div 
                key={i} 
                className={`p-3 border-2 transition-all duration-300 ${
                  activeRow === i + 1 
                    ? "bg-[#ff2a2a] border-[#ff2a2a] text-white shadow-[4px_4px_0px_#111]" 
                    : "bg-white border-[#111] text-[#111] opacity-60"
                }`}
              >
                <p className="text-[9px] font-bold uppercase mb-1">Output Y{i}</p>
                <p className="font-mono font-black text-sm md:text-base whitespace-nowrap">
                  {`Y${i} = ${r.expr}`}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Minterm Definition */}
        <div className="p-4 border-l-8 border-[#ffd700] bg-[#111] text-[#f4f4f0]">
          <p className="text-xs font-bold leading-tight uppercase tracking-tight">
            When EN is 0, the decoder is OFF. When EN is 1, exactly one output is HIGH for each input combination — each representing a <span className="text-[#ffd700]">Unique Minterm</span>.
          </p>
        </div>

      </div>
    </div>
  );
}
