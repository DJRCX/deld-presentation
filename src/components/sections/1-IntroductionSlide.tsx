"use client";

import { motion } from "framer-motion";

export default function IntroductionSlide() {
  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-8 items-center bg-[#f4f4f0] text-[#111111]">
      {/* Left typographic content */}
      <div className="flex-1 max-w-2xl flex flex-col justify-center h-full pt-10">
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-black leading-[0.85] tracking-[tightest] uppercase mb-8"
        >
          Select. <br/>
          <span className="text-[#ff2a2a]">Decode.</span> <br/>
          Enable.
        </motion.h2>

        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="border-l-8 border-[#ff2a2a] pl-6 py-2 mb-8"
        >
          <p className="text-2xl font-bold max-w-lg leading-tight">
            How does your computer pick which memory chip to use? A small circuit called a <span className="underline decoration-4">decoder</span>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-mono text-lg bg-[#111] text-[#f4f4f0] p-6 border-l-4 border-[#ffd700]"
        >
          <h3 className="text-[#ffd700] mb-2 uppercase tracking-widest font-bold">// The Architecture</h3>
          <ul className="list-disc list-inside space-y-2 opacity-90">
            <li><strong>Two inputs:</strong> A & B (The Address)</li>
            <li><strong>One Enable pin:</strong> Master on/off switch</li>
            <li><strong>Four outputs:</strong> Y₀, Y₁, Y₂, Y₃</li>
          </ul>
        </motion.div>
      </div>

      {/* Right Visualization */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex-1 h-full w-full flex items-center justify-center p-4 relative min-h-[400px]"
      >
        {/* Block Diagram Abstract Art */}
        <div className="w-full max-w-md aspect-square bg-[#111] neo-swiss-panel-dark relative border-[12px] border-[#111]">
          {/* Inner Chip Core */}
          <div className="absolute inset-8 border-4 border-[#333] flex items-center justify-center bg-[#1a1a1a]">
            <span className="font-black text-4xl text-[#ff2a2a] tracking-widest rotate-90 md:rotate-0">DEC 2:4</span>
          </div>
          
          {/* Input Pins (Left) */}
          <div className="absolute -left-12 top-1/3 w-8 h-4 bg-[#ffd700] flex items-center pr-10 hover:w-12 transition-all cursor-crosshair">
            <span className="absolute -left-6 font-mono text-black font-bold">A</span>
          </div>
          <div className="absolute -left-12 top-2/3 w-8 h-4 bg-[#ffd700] flex items-center pr-10 hover:w-12 transition-all cursor-crosshair">
            <span className="absolute -left-6 font-mono text-black font-bold">B</span>
          </div>
          <div className="absolute left-1/2 -bottom-12 w-4 h-8 bg-[#ff2a2a] flex justify-center pt-10 hover:h-12 transition-all cursor-crosshair">
            <span className="absolute -bottom-8 font-mono text-black font-bold">EN</span>
          </div>

          {/* Output Pins (Right) */}
          {[0,1,2,3].map((i) => (
             <div key={i} className={`absolute -right-12 w-8 h-4 bg-[#111] flex items-center pl-10`} style={{ top: `${20 + i*20}%`}}>
                <span className="absolute -right-8 font-mono font-bold text-[#111]">Y{i}</span>
             </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
