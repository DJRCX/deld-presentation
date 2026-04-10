"use client";

import { useDecoderStore } from "@/store/useDecoderStore";
import { motion } from "framer-motion";

export default function GateSlide() {
  const { inputs, toggleInput } = useDecoderStore();

  const notA = !inputs.a;
  const notB = !inputs.b;

  // Following Figure 3: Active High Enable, Active High Outputs (AND gates)
  const y0 = inputs.en && notA && notB;
  const y1 = inputs.en && notA && inputs.b;
  const y2 = inputs.en && inputs.a && notB;
  const y3 = inputs.en && inputs.a && inputs.b;

  const S = "#ff2a2a"; // active wire color
  const D = "#111111"; // inactive wire color
  const w = (sig: boolean) => (sig ? S : D);

  // Layout Dimensions
  const A_Y = 60;
  const B_Y = 140;
  const E_Y = 560;

  // Gate Array Y centers
  const y0_C = 220;
  const y1_C = 310;
  const y2_C = 400;
  const y3_C = 490;

  // X Coordinates for routing
  const X_START = 60;
  const BUS_A = 120;
  const BUS_B = 180;
  const NOT_X = 240;
  const NOT_OUT = 296; // 240 + 40 (triangle width) + 16 (bubble dia)
  const BUS_ABAR = 350;
  const BUS_BBAR = 410;
  const BUS_E = 470;
  const AND_X = 560;

  // New Helper: Signal Particle
  function FlowParticle({ d, active, delay = 0, r = 4 }: { d: string; active: boolean; delay?: number; r?: number }) {
    if (!active || !inputs.en) return null;
    return (
      <motion.circle
        r={r}
        fill="#ff2a2a"
        initial={{ offsetDistance: "0%", opacity: 0 }}
        animate={{ 
          offsetDistance: "100%",
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          delay: delay,
          opacity: {
            times: [0, 0.1, 0.9, 1], // Appear after delay, stay visible, fade at end
            duration: 3,
            repeat: Infinity,
            delay: delay
          }
        }}
        style={{ offsetPath: `path('${d}')` }}
      />
    );
  }

  // Mini Components for clean schematic rendering
  function NotGate({ x, y, active }: { x: number; y: number; active: boolean }) {
    return (
      <g>
        <polygon
          points={`${x},${y - 20} ${x + 40},${y} ${x},${y + 20}`}
          fill="#f4f4f0"
          stroke={w(!active)}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <circle cx={x + 48} cy={y} r="8" fill="#f4f4f0" stroke={w(!active)} strokeWidth="4" />
      </g>
    );
  }

  function AndGate({ x, cy, active, label }: { x: number; cy: number; active: boolean; label: string }) {
    return (
      <g>
        <path
          d={`M ${x} ${cy - 30} L ${x + 20} ${cy - 30} A 30 30 0 0 1 ${x + 20} ${cy + 30} L ${x} ${cy + 30} Z`}
          fill="#f4f4f0"
          stroke={w(active)}
          strokeWidth="4"
        />
        <text
          x={x + 13}
          y={cy + 8}
          fill={w(active)}
          className="font-mono text-2xl font-black"
        >
          {label}
        </text>
      </g>
    );
  }

  const gatesAndRouting = [
    {
      id: 1, cy: y0_C, out: y0, label: "Y₀", eq: "E · A' · B'",
      inputs: [
        { busX: BUS_ABAR, y: y0_C - 20, val: notA, path: `M ${BUS_ABAR} ${A_Y} L ${BUS_ABAR} ${y0_C - 20} L ${AND_X} ${y0_C - 20}` },
        { busX: BUS_BBAR, y: y0_C, val: notB, path: `M ${BUS_BBAR} ${B_Y} L ${BUS_BBAR} ${y0_C} L ${AND_X} ${y0_C}` },
        { busX: BUS_E, y: y0_C + 20, val: inputs.en, path: `M ${BUS_E} ${E_Y} L ${BUS_E} ${y0_C + 20} L ${AND_X} ${y0_C + 20}` }
      ]
    },
    {
      id: 2, cy: y1_C, out: y1, label: "Y₁", eq: "E · A' · B",
      inputs: [
        { busX: BUS_ABAR, y: y1_C - 20, val: notA, path: `M ${BUS_ABAR} ${A_Y} L ${BUS_ABAR} ${y1_C - 20} L ${AND_X} ${y1_C - 20}` },
        { busX: BUS_B, y: y1_C, val: inputs.b, path: `M ${BUS_B} ${B_Y} L ${BUS_B} ${y1_C} L ${AND_X} ${y1_C}` },
        { busX: BUS_E, y: y1_C + 20, val: inputs.en, path: `M ${BUS_E} ${E_Y} L ${BUS_E} ${y1_C + 20} L ${AND_X} ${y1_C + 20}` }
      ]
    },
    {
      id: 3, cy: y2_C, out: y2, label: "Y₂", eq: "E · A · B'",
      inputs: [
        { busX: BUS_A, y: y2_C - 20, val: inputs.a, path: `M ${BUS_A} ${A_Y} L ${BUS_A} ${y2_C - 20} L ${AND_X} ${y2_C - 20}` },
        { busX: BUS_BBAR, y: y2_C, val: notB, path: `M ${BUS_BBAR} ${B_Y} L ${BUS_BBAR} ${y2_C} L ${AND_X} ${y2_C}` },
        { busX: BUS_E, y: y2_C + 20, val: inputs.en, path: `M ${BUS_E} ${E_Y} L ${BUS_E} ${y2_C + 20} L ${AND_X} ${y2_C + 20}` }
      ]
    },
    {
      id: 4, cy: y3_C, out: y3, label: "Y₃", eq: "E · A · B",
      inputs: [
        { busX: BUS_A, y: y3_C - 20, val: inputs.a, path: `M ${BUS_A} ${A_Y} L ${BUS_A} ${y3_C - 20} L ${AND_X} ${y3_C - 20}` },
        { busX: BUS_B, y: y3_C, val: inputs.b, path: `M ${BUS_B} ${B_Y} L ${BUS_B} ${y3_C} L ${AND_X} ${y3_C}` },
        { busX: BUS_E, y: y3_C + 20, val: inputs.en, path: `M ${BUS_E} ${E_Y} L ${BUS_E} ${y3_C + 20} L ${AND_X} ${y3_C + 20}` }
      ]
    }
  ];

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-6 items-center bg-[#f4f4f0] text-[#111]">
      {/* LEFT: SVG Schematic */}
      <div className="flex-[2] w-full h-[85%] neo-swiss-panel shadow-[12px_12px_0px_#111] flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 px-4 py-2 border-b-4 border-l-4 border-[#111] font-black uppercase text-sm tracking-widest">
          Schematic.
        </div>

        <svg viewBox="0 0 840 600" className="w-full h-full max-h-[500px]">
          
          {/* ----- HORIZONTAL MAIN INJECTIONS & BUS DROPS ----- */}
          
          {/* Signal A */}
          <text x="20" y={A_Y + 12} fill={w(!inputs.a)} className="font-mono text-4xl font-black">A</text>
          <line x1={X_START} y1={A_Y} x2={NOT_X} y2={A_Y} stroke={w(!inputs.a)} strokeWidth="4" />
          <circle cx={BUS_A} cy={A_Y} r="6" fill={w(inputs.a)} />
          <line x1={BUS_A} y1={A_Y} x2={BUS_A} y2={y3_C - 20} stroke={w(inputs.a)} strokeWidth="4" />
          
          {/* Flow Particles for A paths */}
          <FlowParticle d={`M ${X_START} ${A_Y} L ${BUS_A} ${A_Y}`} active={inputs.a} />
          <FlowParticle d={`M ${X_START} ${A_Y} L ${NOT_X} ${A_Y}`} active={!inputs.a} />
          
          {/* NOT A & A-bar */}
          <NotGate x={NOT_X} y={A_Y} active={inputs.a} />
          <text x={NOT_OUT + 10} y={A_Y - 15} fill={w(notA)} className="font-mono text-4xl font-black">A&#772;</text>
          <line x1={NOT_OUT} y1={A_Y} x2={BUS_ABAR} y2={A_Y} stroke={w(notA)} strokeWidth="4" />
          <circle cx={BUS_ABAR} cy={A_Y} r="6" fill={w(notA)} />
          <line x1={BUS_ABAR} y1={A_Y} x2={BUS_ABAR} y2={y1_C - 20} stroke={w(notA)} strokeWidth="4" />
          
          <FlowParticle d={`M ${NOT_OUT} ${A_Y} L ${BUS_ABAR} ${A_Y}`} active={notA} />

          {/* Signal B */}
          <text x="20" y={B_Y + 12} fill={w(!inputs.b)} className="font-mono text-4xl font-black">B</text>
          <line x1={X_START} y1={B_Y} x2={NOT_X} y2={B_Y} stroke={w(!inputs.b)} strokeWidth="4" />
          <circle cx={BUS_B} cy={B_Y} r="6" fill={w(inputs.b)} />
          <line x1={BUS_B} y1={B_Y} x2={BUS_B} y2={y3_C} stroke={w(inputs.b)} strokeWidth="4" />

          {/* Flow Particles for B paths */}
          <FlowParticle d={`M ${X_START} ${B_Y} L ${BUS_B} ${B_Y}`} active={inputs.b} />
          <FlowParticle d={`M ${X_START} ${B_Y} L ${NOT_X} ${B_Y}`} active={!inputs.b} />

          {/* NOT B & B-bar */}
          <NotGate x={NOT_X} y={B_Y} active={inputs.b} />
          <text x={NOT_OUT + 10} y={B_Y - 15} fill={w(notB)} className="font-mono text-4xl font-black">B&#772;</text>
          <line x1={NOT_OUT} y1={B_Y} x2={BUS_BBAR} y2={B_Y} stroke={w(notB)} strokeWidth="4" />
          <circle cx={BUS_BBAR} cy={B_Y} r="6" fill={w(notB)} />
          <line x1={BUS_BBAR} y1={B_Y} x2={BUS_BBAR} y2={y2_C} stroke={w(notB)} strokeWidth="4" />
          
          <FlowParticle d={`M ${NOT_OUT} ${B_Y} L ${BUS_BBAR} ${B_Y}`} active={notB} />

          {/* Signal E */}
          <text x="20" y={E_Y + 12} fill={w(inputs.en)} className="font-mono text-4xl font-black">E</text>
          <line x1={X_START} y1={E_Y} x2={BUS_E} y2={E_Y} stroke={w(inputs.en)} strokeWidth="4" />
          <circle cx={BUS_E} cy={E_Y} r="6" fill={w(inputs.en)} />
          <line x1={BUS_E} y1={E_Y} x2={BUS_E} y2={y0_C + 20} stroke={w(inputs.en)} strokeWidth="4" />
          
          <FlowParticle d={`M ${X_START} ${E_Y} L ${BUS_E} ${E_Y}`} active={inputs.en} />

          {/* ----- GATES AND CROSS-CONNECTIONS ----- */}
          {gatesAndRouting.map((g) => (
            <g key={g.id}>
              {/* Inputs from Bus to Gate */}
              {g.inputs.map((inp, idx) => (
                <g key={idx}>
                  <circle cx={inp.busX} cy={inp.y} r="6" fill={w(inp.val)} />
                  <line x1={inp.busX} y1={inp.y} x2={AND_X} y2={inp.y} stroke={w(inp.val)} strokeWidth="4" />
                  <FlowParticle d={inp.path} active={inp.val} delay={idx * 0.5} />
                </g>
              ))}
              
              {/* AND Gate */}
              <AndGate x={AND_X} cy={g.cy} active={g.out} label={g.id.toString()} />
              
              {/* Output Wire & Label */}
              <line x1={AND_X + 50} y1={g.cy} x2={740} y2={g.cy} stroke={w(g.out)} strokeWidth="6" />
              <text x="755" y={g.cy + 12} fill={w(g.out)} className="font-mono text-4xl font-black">{g.label}</text>
              <FlowParticle d={`M ${AND_X + 50} ${g.cy} L 740 ${g.cy}`} active={g.out} delay={1.5} r={8} />
            </g>
          ))}
        </svg>
      </div>

      {/* RIGHT: Controls */}
      <div className="flex-1 w-full max-w-xs flex flex-col justify-center gap-6">
        <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none">
          The <br /> <span className="text-[#ff2a2a]">Hardware</span> <br /> Layer.
        </h2>

        <p className="text-sm font-bold border-l-4 border-[#111] pl-3 leading-snug">
          Four 3-input AND gates. Two NOT gates. Standard Active-High logic decoding.
        </p>

        {/* Input States Display */}
        <div className="font-mono text-sm bg-[#111] text-[#f4f4f0] p-4 space-y-1">
          <div className="text-[#ffd700] uppercase tracking-widest mb-2 flex justify-between">
            <span>// Current State</span>
            <span className="text-[10px] bg-[#333] px-2 py-0.5 text-white/50">{inputs.en ? "LIVE" : "OFF"}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4 text-center border-b border-[#333] pb-4">
            <div>A=<span style={{ color: inputs.a ? S : "#888" }}>{inputs.a ? "1" : "0"}</span></div>
            <div>B=<span style={{ color: inputs.b ? S : "#888" }}>{inputs.b ? "1" : "0"}</span></div>
            <div>E=<span style={{ color: inputs.en ? S : "#888" }}>{inputs.en ? "1" : "0"}</span></div>
          </div>
          
          <div className="space-y-2">
            <div className="text-[10px] text-white/30 uppercase font-black mb-1">Logic Equations</div>
            {gatesAndRouting.map(g => (
              <div key={g.id} className={`flex justify-between items-center transition-colors px-2 py-1 ${g.out ? 'bg-[#ff2a2a]/20 border-l-2 border-[#ff2a2a]' : 'opacity-40'}`}>
                <span className="text-xs uppercase font-bold">{g.label} = {g.eq}</span>
                <span className="font-black">{g.out ? "1" : "0"}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => toggleInput("en")}
            className={`neo-swiss-button text-lg py-3 ${inputs.en ? "bg-[#ff2a2a] text-white border-4 border-[#ff2a2a]" : "bg-[#fff] border-4 border-[#111] !text-[#111]"}`}
          >
            {inputs.en ? "ENABLED (E=1)" : "ENABLE (E=0)"}
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => toggleInput("a")}
              className={`neo-swiss-button py-3 text-base ${inputs.a ? "bg-[#ffd700] text-[#111] border-4 border-[#ffd700]" : "bg-[#fff] border-4 border-[#111] !text-[#111]"}`}
            >
              A = {inputs.a ? "1" : "0"}
            </button>
            <button
              onClick={() => toggleInput("b")}
              className={`neo-swiss-button py-3 text-base ${inputs.b ? "bg-[#ffd700] text-[#111] border-4 border-[#ffd700]" : "bg-[#fff] border-4 border-[#111] !text-[#111]"}`}
            >
              B = {inputs.b ? "1" : "0"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
