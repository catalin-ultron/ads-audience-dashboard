"use client";

import { useState } from "react";
import { platforms } from "./data/platforms";
import PlatformCard from "./components/PlatformCard";
import AudienceDetail from "./components/AudienceDetail";
import UploadZone from "./components/UploadZone";
import KpiOverview from "./components/KpiOverview";
import { LayoutDashboard, Upload, FileText } from "lucide-react";

type Tab = "overview" | "platform" | "uploads";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [activePlatform, setActivePlatform] = useState<string>("meta");

  const platform = platforms.find((p) => p.id === activePlatform)!;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e2e8f0]">
      {/* Header */}
      <header className="border-b border-[#272736] bg-[#111118]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold text-white">NXT Ads Audience Dashboard</h1>
            <p className="text-xs text-slate-500">Pre-seed B2B SaaS — Founder-led GTM</p>
          </div>
          <div className="flex gap-2">
            {([
              { id: "overview", label: "Overview", icon: LayoutDashboard },
              { id: "platform", label: "Platform Detail", icon: FileText },
              { id: "uploads", label: "Uploads", icon: Upload },
            ] as const).map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition-all ${
                  activeTab === t.id
                    ? "bg-[#1e1e2a] text-white ring-1 ring-[#272736]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <t.icon className="h-3.5 w-3.5" />
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-6">
        {activeTab === "overview" && (
          <div className="flex flex-col gap-6">
            <KpiOverview />

            <div className="rounded-2xl border border-[#272736] bg-[#111118] p-6">
              <h2 className="mb-4 text-sm font-semibold text-white">Platform Selector</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {platforms.map((p) => (
                  <PlatformCard
                    key={p.id}
                    id={p.id}
                    isActive={activePlatform === p.id}
                    onClick={() => {
                      setActivePlatform(p.id);
                      setActiveTab("platform");
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-[#272736] bg-[#111118] p-6">
                <h2 className="mb-4 text-sm font-semibold text-white">Cross-Platform Funnel Summary</h2>
                <div className="flex flex-col gap-4">
                  {platforms.map((p) => (
                    <div key={p.id} className="flex items-center gap-4">
                      <div className="w-28 shrink-0 text-xs font-medium text-slate-300">{p.name.split(" ")[0]}</div>
                      <div className="flex flex-1 gap-1">
                        {p.layers.map((l, i) => (
                          <div
                            key={i}
                            className="flex h-8 items-center justify-center rounded-md text-[10px] font-medium text-white"
                            style={{ backgroundColor: p.color, opacity: 1 - i * 0.3, width: `${[35, 35, 30][i]}%` }}
                            title={`${l.name}: ${l.sizeEstimate}`}
                          >
                            {l.sizeEstimate}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-[#272736] bg-[#111118] p-6">
                <h2 className="mb-4 text-sm font-semibold text-white">Budget Allocation Guide</h2>
                <div className="flex flex-col gap-3">
                  {platforms.map((p) => (
                    <div key={p.id} className="flex items-center justify-between rounded-xl bg-[#1e1e2a] p-3">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: p.color }} />
                        <span className="text-xs font-medium text-white">{p.name.split(" ")[0]}</span>
                      </div>
                      <div className="text-xs text-slate-400">{p.budgetRange}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl bg-[#1e1e2a] p-4">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500">Recommended Starting Split</div>
                  <div className="mt-2 flex gap-2 text-xs text-slate-300">
                    <span className="rounded-lg bg-[#272736] px-3 py-1">LinkedIn: 35%</span>
                    <span className="rounded-lg bg-[#272736] px-3 py-1">Meta: 30%</span>
                    <span className="rounded-lg bg-[#272736] px-3 py-1">X: 20%</span>
                    <span className="rounded-lg bg-[#272736] px-3 py-1">TikTok: 15%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "platform" && (
          <div className="flex flex-col gap-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {platforms.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePlatform(p.id)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium whitespace-nowrap transition-all ${
                    activePlatform === p.id
                      ? "text-white ring-1"
                      : "border border-[#272736] text-slate-400 hover:border-[#3e3e52] hover:text-white"
                  }`}
                  style={activePlatform === p.id ? { backgroundColor: p.color + "20" } : {}}
                >
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
                  {p.name}
                </button>
              ))}
            </div>
            <AudienceDetail platform={platform} />
          </div>
        )}

        {activeTab === "uploads" && (
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-[#272736] bg-[#111118] p-6">
              <h2 className="mb-4 text-sm font-semibold text-white">ABM & Audience Uploads</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <UploadZone label="LinkedIn — Company List CSV (ABM)" />
                <UploadZone label="LinkedIn — Contact List CSV (Matched Audience)" />
                <UploadZone label="Meta — Custom Audience Email List" />
                <UploadZone label="X — Tailored Audience Email/Handle List" />
                <UploadZone label="TikTok — Customer File Email List" />
                <UploadZone label="Global — Competitor Employee List (Exclusion)" />
              </div>
            </div>

            <div className="rounded-2xl border border-[#272736] bg-[#111118] p-6">
              <h2 className="mb-4 text-sm font-semibold text-white">Upload Checklist</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  "CRM export: all existing customers (exclusion)",
                  "CRM export: all active leads in sequence (exclusion)",
                  "CRM export: highest-quality leads (seed for lookalike / retargeting)",
                  "ABM target list: dream 100–500 companies (LinkedIn Company List)",
                  "ABM contact list: known emails at target accounts (all platforms)",
                  "Competitor list: domains + known employee emails (exclusion)",
                  "Opt-out / unsubscribe list (exclusion)",
                ].map((item, i) => (
                  <label key={i} className="flex items-center gap-3 rounded-xl bg-[#1e1e2a] px-4 py-3 cursor-pointer hover:bg-[#272736]">
                    <input type="checkbox" className="h-4 w-4 rounded border-[#272736] bg-[#111118] text-[#6366f1] accent-[#6366f1]" />
                    <span className="text-xs text-slate-300">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
