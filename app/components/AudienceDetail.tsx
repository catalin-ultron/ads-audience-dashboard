"use client";

import { PlatformData } from "../data/platforms";
import { Target, Users, Ban, BarChart3, Info, Copy } from "lucide-react";

function Section({ title, icon: Icon, children, color }: { title: string; icon: React.ComponentType<{className?: string; style?: React.CSSProperties}>; children: React.ReactNode; color?: string }) {
  return (
    <div className="rounded-2xl border border-[#272736] bg-[#111118] p-5">
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-4 w-4" style={{ color: color || "#94a3b8" }} />
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function AudienceDetail({ platform }: { platform: PlatformData }) {
  return (
    <div className="flex flex-col gap-5">
      {/* Funnel Overview */}
      <Section title="Funnel Layers" icon={BarChart3} color={platform.color}>
        <div className="flex flex-col gap-4">
          {platform.layers.map((layer, i) => (
            <div key={i} className="rounded-xl bg-[#1e1e2a] p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold text-white"
                    style={{ backgroundColor: platform.color, opacity: 1 - i * 0.25 }}
                  >
                    L{i + 1}
                  </div>
                  <span className="text-sm font-semibold text-white">{layer.name}</span>
                </div>
                <span className="text-xs text-slate-400">{layer.sizeEstimate}</span>
              </div>
              <div className="mb-2 text-xs text-slate-400">Goal: <span className="text-slate-300">{layer.goal}</span></div>

              {layer.demographics && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {layer.demographics.age && (
                    <span className="rounded-full bg-[#272736] px-2 py-0.5 text-[10px] text-slate-300">Age: {layer.demographics.age}</span>
                  )}
                  {layer.demographics.geo && (
                    <span className="rounded-full bg-[#272736] px-2 py-0.5 text-[10px] text-slate-300">Geo: {layer.demographics.geo}</span>
                  )}
                  {layer.demographics.language && (
                    <span className="rounded-full bg-[#272736] px-2 py-0.5 text-[10px] text-slate-300">Lang: {layer.demographics.language}</span>
                  )}
                </div>
              )}

              <div className="mb-2 text-[10px] uppercase tracking-wider text-slate-500">Match Criteria</div>
              <ul className="mb-3 space-y-1.5">
                {layer.matchCriteria.map((c, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs text-slate-300">
                    <Target className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>

              <div className="mb-2 text-[10px] uppercase tracking-wider text-slate-500">Exclusions</div>
              <ul className="mb-3 space-y-1">
                {layer.exclusions.map((e, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs text-slate-400">
                    <Ban className="mt-0.5 h-3 w-3 shrink-0 text-red-400" />
                    <span>{e}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 rounded-lg bg-[#111118] px-3 py-2">
                <Copy className="h-3 w-3 text-slate-500" />
                <span className="text-[11px] font-mono text-slate-400">{layer.savedNamePattern}</span>
              </div>

              {layer.notes && (
                <div className="mt-3 flex items-start gap-2 rounded-lg bg-[#111118] px-3 py-2">
                  <Info className="mt-0.5 h-3 w-3 text-amber-400 shrink-0" />
                  <span className="text-[11px] text-slate-400">{layer.notes}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Global Exclusions */}
      <Section title="Global Exclusions (All Layers)" icon={Ban} color="#ef4444">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {platform.globalExclusions.map((e, i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg bg-[#1e1e2a] px-3 py-2 text-xs text-slate-300">
              <Ban className="h-3 w-3 shrink-0 text-red-400" />
              {e}
            </div>
          ))}
        </div>
      </Section>

      {/* ABM Upload Spec */}
      {platform.abmSpec && (
        <Section title="ABM Upload Specification" icon={Users} color={platform.color}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-[#1e1e2a] p-4">
              <div className="mb-1 text-[10px] uppercase tracking-wider text-slate-500">Upload Type</div>
              <div className="text-sm font-medium text-white">{platform.abmSpec.uploadType}</div>
            </div>
            <div className="rounded-xl bg-[#1e1e2a] p-4">
              <div className="mb-1 text-[10px] uppercase tracking-wider text-slate-500">Minimum Size</div>
              <div className="text-sm font-medium text-white">{platform.abmSpec.minSize}</div>
            </div>
            <div className="rounded-xl bg-[#1e1e2a] p-4">
              <div className="mb-1 text-[10px] uppercase tracking-wider text-slate-500">File Format</div>
              <div className="text-sm font-medium text-white">{platform.abmSpec.fileFormat}</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-2 text-[10px] uppercase tracking-wider text-slate-500">Required Columns</div>
            <div className="flex flex-wrap gap-2">
              {platform.abmSpec.columns.map((col, i) => (
                <span key={i} className="rounded-full bg-[#272736] px-3 py-1 text-xs font-mono text-slate-300">{col}</span>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* KPI Targets */}
      <Section title="KPI Targets" icon={BarChart3} color="#22d3ee">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {platform.kpiTargets.map((kpi, i) => (
            <div key={i} className="rounded-xl bg-[#1e1e2a] p-4 text-center">
              <div className="mb-1 text-[10px] uppercase tracking-wider text-slate-500">{kpi.metric}</div>
              <div className="text-lg font-bold text-white">{kpi.target}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
