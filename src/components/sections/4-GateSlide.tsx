"use client";

import { useDecoderStore } from "@/store/useDecoderStore";

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
      id: 1, cy: y0_C, out: y0, label: "Y₀",
      inputs: [
        { busX: BUS_ABAR, y: y0_C - 20, val: notA },
        { busX: BUS_BBAR, y: y0_C, val: notB },
        { busX: BUS_E, y: y0_C + 20, val: inputs.en }
      ]
    },
    {
      id: 2, cy: y1_C, out: y1, label: "Y₁",
      inputs: [
        { busX: BUS_ABAR, y: y1_C - 20, val: notA },
        { busX: BUS_B, y: y1_C, val: inputs.b },
        { busX: BUS_E, y: y1_C + 20, val: inputs.en }
      ]
    },
    {
      id: 3, cy: y2_C, out: y2, label: "Y₂",
      inputs: [
        { busX: BUS_A, y: y2_C - 20, val: inputs.a },
        { busX: BUS_BBAR, y: y2_C, val: notB },
        { busX: BUS_E, y: y2_C + 20, val: inputs.en }
      ]
    },
    {
      id: 4, cy: y3_C, out: y3, label: "Y₃",
      inputs: [
        { busX: BUS_A, y: y3_C - 20, val: inputs.a },
        { busX: BUS_B, y: y3_C, val: inputs.b },
        { busX: BUS_E, y: y3_C + 20, val: inputs.en }
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
          
          {/* NOT A & A-bar */}
          <NotGate x={NOT_X} y={A_Y} active={inputs.a} />
          <text x={NOT_OUT + 10} y={A_Y - 15} fill={w(notA)} className="font-mono text-4xl font-black">A&#772;</text>
          <line x1={NOT_OUT} y1={A_Y} x2={BUS_ABAR} y2={A_Y} stroke={w(notA)} strokeWidth="4" />
          <circle cx={BUS_ABAR} cy={A_Y} r="6" fill={w(notA)} />
          <line x1={BUS_ABAR} y1={A_Y} x2={BUS_ABAR} y2={y1_C - 20} stroke={w(notA)} strokeWidth="4" />

          {/* Signal B */}
          <text x="20" y={B_Y + 12} fill={w(!inputs.b)} className="font-mono text-4xl font-black">B</text>
          <line x1={X_START} y1={B_Y} x2={NOT_X} y2={B_Y} stroke={w(!inputs.b)} strokeWidth="4" />
          <circle cx={BUS_B} cy={B_Y} r="6" fill={w(inputs.b)} />
          <line x1={BUS_B} y1={B_Y} x2={BUS_B} y2={y3_C} stroke={w(inputs.b)} strokeWidth="4" />

          {/* NOT B & B-bar */}
          <NotGate x={NOT_X} y={B_Y} active={inputs.b} />
          <text x={NOT_OUT + 10} y={B_Y - 15} fill={w(notB)} className="font-mono text-4xl font-black">B&#772;</text>
          <line x1={NOT_OUT} y1={B_Y} x2={BUS_BBAR} y2={B_Y} stroke={w(notB)} strokeWidth="4" />
          <circle cx={BUS_BBAR} cy={B_Y} r="6" fill={w(notB)} />
          <line x1={BUS_BBAR} y1={B_Y} x2={BUS_BBAR} y2={y2_C} stroke={w(notB)} strokeWidth="4" />

          {/* Signal E */}
          <text x="20" y={E_Y + 12} fill={w(inputs.en)} className="font-mono text-4xl font-black">E</text>
          <line x1={X_START} y1={E_Y} x2={BUS_E} y2={E_Y} stroke={w(inputs.en)} strokeWidth="4" />
          <circle cx={BUS_E} cy={E_Y} r="6" fill={w(inputs.en)} />
          <line x1={BUS_E} y1={E_Y} x2={BUS_E} y2={y0_C + 20} stroke={w(inputs.en)} strokeWidth="4" />

          {/* ----- GATES AND CROSS-CONNECTIONS ----- */}
          {gatesAndRouting.map((g) => (
            <g key={g.id}>
              {/* Inputs from Bus to Gate */}
              {g.inputs.map((inp, idx) => (
                <g key={idx}>
                  <circle cx={inp.busX} cy={inp.y} r="6" fill={w(inp.val)} />
                  <line x1={inp.busX} y1={inp.y} x2={AND_X} y2={inp.y} stroke={w(inp.val)} strokeWidth="4" />
                </g>
              ))}
              
              {/* AND Gate */}
              <AndGate x={AND_X} cy={g.cy} active={g.out} label={g.id.toString()} />
              
              {/* Output Wire & Label */}
              <line x1={AND_X + 50} y1={g.cy} x2={740} y2={g.cy} stroke={w(g.out)} strokeWidth="6" />
              <text x="755" y={g.cy + 12} fill={w(g.out)} className="font-mono text-4xl font-black">{g.label}</text>
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
          <div className="text-[#ffd700] uppercase tracking-widest mb-2">// Current State</div>
          <div>A = <span style={{ color: inputs.a ? S : "#888" }}>{inputs.a ? "1" : "0"}</span></div>
          <div>B = <span style={{ color: inputs.b ? S : "#888" }}>{inputs.b ? "1" : "0"}</span></div>
          <div>E = <span style={{ color: inputs.en ? S : "#888" }}>{inputs.en ? "1" : "0"}</span></div>
          <div className="border-t border-[#333] mt-2 pt-2 text-xs xl:text-sm">
            <div>Y₀={y0 ? <span style={{ color: S }}>1</span> : "0"} Y₁={y1 ? <span style={{ color: S }}>1</span> : "0"} Y₂={y2 ? <span style={{ color: S }}>1</span> : "0"} Y₃={y3 ? <span style={{ color: S }}>1</span> : "0"}</div>
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
