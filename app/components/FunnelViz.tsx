"use client";

import { AudienceLayer } from "../data/platforms";

export default function FunnelViz({ layers, color }: { layers: AudienceLayer[]; color: string }) {
  return (
    <div className="flex flex-col gap-3">
      {layers.map((layer, idx) => {
        const widths = ["100%", "72%", "48%"];
        return (
          <div key={idx} className="flex items-center gap-4">
            <div className="w-24 shrink-0 text-right">
              <div className="text-[10px] uppercase tracking-wider text-slate-500">{layer.name.split(" / ")[0]}</div>
              <div className="text-xs text-slate-400">{layer.sizeEstimate}</div>
            </div>
            <div className="flex-1">
              <div
                className="rounded-xl px-4 py-3 text-sm font-medium text-white transition-all hover:opacity-90"
                style={{ width: widths[idx], backgroundColor: color, opacity: 1 - idx * 0.25 }}
              >
                <div className="flex items-center justify-between">
                  <span>{layer.goal}</span>
                  <span className="text-xs opacity-80">{layer.name.split(" / ")[1]}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
