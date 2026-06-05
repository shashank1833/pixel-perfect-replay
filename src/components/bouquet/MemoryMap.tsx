import { Minus, Plus } from "lucide-react";

export function MemoryMap() {
  return (
    <div className="w-[320px] max-w-[88vw] rounded-2xl bg-[oklch(0.96_0.02_90)]/85 p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] ring-1 ring-black/5 backdrop-blur">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] font-semibold tracking-[0.18em] text-[oklch(0.35_0.06_140)]">
            MEMORY MAP
          </div>
          <div className="font-display text-2xl font-extrabold text-[oklch(0.22_0.04_30)]">
            Memory map
          </div>
        </div>
        <div className="flex gap-2">
          <button className="grid h-8 w-8 place-items-center rounded-full bg-[oklch(0.45_0.13_150)] text-white shadow">
            <Minus className="h-4 w-4" />
          </button>
          <button className="grid h-8 w-8 place-items-center rounded-full bg-[oklch(0.45_0.13_150)] text-white shadow">
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="relative mt-3 h-[180px] overflow-hidden rounded-xl bg-[oklch(0.32_0.03_140)] text-[10px] text-white/80">
        <svg
          className="absolute inset-0 h-full w-full opacity-50"
          viewBox="0 0 200 120"
          preserveAspectRatio="none"
        >
          <path d="M0 70 Q60 50 110 80 T200 60" stroke="#fff" strokeWidth="0.5" fill="none" />
          <path d="M10 10 L80 40 L140 30 L200 70" stroke="#fff" strokeWidth="0.4" fill="none" />
          <path d="M0 100 L60 90 L130 110 L200 95" stroke="#fff" strokeWidth="0.4" fill="none" />
          <path d="M50 0 L70 60 L40 120" stroke="#fff" strokeWidth="0.3" fill="none" />
          <path d="M150 0 L130 50 L170 120" stroke="#fff" strokeWidth="0.3" fill="none" />
        </svg>
        <span className="absolute left-3 top-3">Phúc Yên</span>
        <span className="absolute right-3 top-2">Nenh Ward</span>
        <span className="absolute right-3 top-9">Que Vo Ward</span>
        <span className="absolute left-4 bottom-8">Ha Noi</span>
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2">Mỹ Hào</span>
        <div className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-md bg-white/90 ring-2 ring-white shadow">
          <div className="h-6 w-6 rounded-sm bg-gradient-to-br from-rose-400 to-amber-300" />
        </div>
      </div>
    </div>
  );
}