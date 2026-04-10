"use client";

import { motion } from "framer-motion";

const MEMBERS = [
  "Sayma Ferdousi Fariha",
  "Nosrat Tisha",
  "Meherin Talukdar",
  "Mahtabul Al Nahian",
  "Golam Morshed Eashan"
];

export default function TitleSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center bg-[#f4f4f0] text-[#111111]">
      <div className="flex-1 flex flex-col justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-balance mb-12"
        >
          K-Map <span className="text-[#ff2a2a]">Simplification</span> <br />
          of a 2-to-4 Decoder <br />
          with <span className="underline decoration-8 decoration-[#ffd700]">Enable</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl font-bold border-l-8 border-[#111] pl-6 max-w-4xl leading-tight"
        >
          A comprehensive exploration of digital logic design: from Truth Tables and K-Map reduction to gate-level physical logic implementation.
        </motion.p>
      </div>

      {/* Group Members Section */}
      <div className="mt-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 py-12 border-t-8 border-[#111]">
        {MEMBERS.map((member, idx) => (
          <motion.div
            key={member}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + idx * 0.1 }}
            className="flex flex-col group transition-all"
          >
            <span className="font-mono text-[10px] text-[#ff2a2a] font-black uppercase mb-2 group-hover:scale-110 origin-left transition-transform">
              ID.0{idx + 1}
            </span>
            <span className="font-black text-base md:text-lg uppercase tracking-tight leading-none">
              {member}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
