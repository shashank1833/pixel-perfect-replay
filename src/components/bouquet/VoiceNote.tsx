import { Play } from "lucide-react";

export function VoiceNote() {
  return (
    <div className="flex w-[420px] max-w-[92vw] items-center gap-4 rounded-full bg-white/85 px-3 py-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] ring-1 ring-black/5 backdrop-blur">
      <button className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[oklch(0.32_0.08_150)] text-white shadow">
        <Play className="h-5 w-5 fill-white" />
      </button>
      <div className="min-w-0 flex-1">
        <div className="font-display text-lg font-bold leading-tight text-[oklch(0.22_0.04_30)]">
          Voice note
        </div>
        <div className="font-hand text-base leading-none text-[oklch(0.45_0.03_30)]">
          tap to listen
        </div>
      </div>
      <div className="flex h-8 items-center gap-[3px]">
        {Array.from({ length: 22 }).map((_, i) => (
          <span
            key={i}
            className="block w-[3px] origin-center rounded-full bg-[oklch(0.32_0.08_150)]"
            style={{
              height: `${30 + Math.sin(i * 0.9) * 18 + (i % 3) * 6}%`,
              animation: `voice-bar 1.${i % 9}s ease-in-out ${i * 0.07}s infinite`,
            }}
          />
        ))}
      </div>
      <div className="shrink-0 pr-3 font-mono text-xs text-[oklch(0.35_0.03_30)]">0:08</div>
    </div>
  );
}