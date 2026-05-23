"use client";

import { DollarSign, Users, Target, TrendingUp } from "lucide-react";

const overview = [
  { label: "Total Est. Cold Reach", value: "580K–2.2M", icon: Users, color: "#6366f1" },
  { label: "Blended CPL Range", value: "$25–120", icon: DollarSign, color: "#22d3ee" },
  { label: "Primary ICP", value: "Founder-led B2B SaaS", icon: Target, color: "#f472b6" },
  { label: "Recommended Monthly Budget", value: "$6.5K–28K", icon: TrendingUp, color: "#34d399" },
];

export default function KpiOverview() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {overview.map((item, i) => (
        <div key={i} className="rounded-2xl border border-[#272736] bg-[#111118] p-5">
          <div className="mb-3 flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ backgroundColor: item.color + "20" }}
            >
              <item.icon className="h-4 w-4" style={{ color: item.color }} />
            </div>
            <span className="text-xs text-slate-500">{item.label}</span>
          </div>
          <div className="text-2xl font-bold text-white">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
