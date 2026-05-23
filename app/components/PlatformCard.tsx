"use client";

import { platforms } from "../data/platforms";

export default function PlatformCard({ id, isActive, onClick }: { id: string; isActive: boolean; onClick: () => void }) {
  const p = platforms.find((x) => x.id === id)!;
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-start gap-3 rounded-2xl border p-5 text-left transition-all duration-200 w-full ${
        isActive ? "border-opacity-100 ring-1" : "border-[#272736] hover:border-[#3e3e52]"
      }`}
      style={{
        borderColor: isActive ? p.color : undefined,
      }}
    >
      <div className="flex items-center gap-3 w-full">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl text-white font-bold text-sm"
          style={{ backgroundColor: p.color }}
        >
          {p.icon.slice(0, 2)}
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-white">{p.name}</div>
          <div className="text-xs text-slate-400">{p.budgetRange}</div>
        </div>
        <div
          className={`h-3 w-3 rounded-full ${isActive ? "opacity-100" : "opacity-20"}`}
          style={{ backgroundColor: p.color }}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 w-full">
        <div className="rounded-lg bg-[#1e1e2a] p-2">
          <div className="text-[10px] uppercase tracking-wider text-slate-500">CPL Bench</div>
          <div className="text-sm font-semibold text-white">{p.cplBenchmark}</div>
        </div>
        <div className="rounded-lg bg-[#1e1e2a] p-2">
          <div className="text-[10px] uppercase tracking-wider text-slate-500">Est. Reach</div>
          <div className="text-sm font-semibold text-white">{p.layers[0].sizeEstimate}</div>
        </div>
      </div>
    </button>
  );
}
