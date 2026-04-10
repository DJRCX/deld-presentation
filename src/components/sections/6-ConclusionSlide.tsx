"use client";

import { motion } from "framer-motion";

export default function ConclusionSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-[#111111] text-[#f4f4f0] text-center p-8">
      <motion.h2 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-8"
      >
        Thank <br/> <span className="text-[#ffd700]">You.</span>
      </motion.h2>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-2xl border-t-8 border-[#ff2a2a] pt-8"
      >
        <p className="text-2xl font-bold font-mono text-gray-400 mb-4">
          // REMARKS
        </p>
        <p className="text-xl">
          The 2-to-4 decoder is the fundamental bridge between binary data and physical memory selection. 
          Without it, computing at scale would be impossible.
        </p>
      </motion.div>
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-10" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </div>
  );
}
