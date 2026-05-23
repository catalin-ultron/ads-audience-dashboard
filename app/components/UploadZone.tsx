"use client";

import { UploadCloud, FileSpreadsheet } from "lucide-react";
import { useState } from "react";

export default function UploadZone({ label, accepted = ".csv" }: { label: string; accepted?: string }) {
  const [files, setFiles] = useState<string[]>([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).map((f) => f.name);
    setFiles((prev) => [...prev, ...dropped]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files).map((f) => f.name);
    setFiles((prev) => [...prev, ...selected]);
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#272736] bg-[#111118] p-8 text-center transition-colors hover:border-[#3e3e52]"
      >
        <UploadCloud className="h-8 w-8 text-slate-500" />
        <div>
          <div className="text-sm font-medium text-slate-300">{label}</div>
          <div className="text-xs text-slate-500">Drag & drop or click to upload</div>
        </div>
        <label className="cursor-pointer rounded-lg bg-[#1e1e2a] px-4 py-2 text-xs font-medium text-white hover:bg-[#272736]">
          Select File
          <input type="file" accept={accepted} className="hidden" onChange={handleChange} />
        </label>
      </div>
      {files.length > 0 && (
        <div className="flex flex-col gap-2">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg bg-[#1e1e2a] px-3 py-2">
              <FileSpreadsheet className="h-4 w-4 text-emerald-400" />
              <span className="text-xs text-slate-300">{f}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
