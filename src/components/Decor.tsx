import { useEffect, useMemo, useState } from "react";

type Hue = "rose" | "peach" | "cream" | "sage" | "blush";

const PALETTES: Record<Hue, [string, string, string, string]> = {
  rose: ["#ecc3c8", "#d896a0", "#c4828a", "#a85e66"],
  blush: ["#f8e2dd", "#f0d0c9", "#e6b7b6", "#cf9499"],
  peach: ["#f7dcc2", "#eebf9d", "#e2a87e", "#cf8f63"],
  cream: ["#fbf2e0", "#f1e2c7", "#e6d2ac", "#d6bb8e"],
  sage: ["#c6d0b6", "#a9ba94", "#90a277", "#74895c"],
};

/* A soft top-view bloom built from layered petals */
export function Bloom({ hue = "rose", className = "" }: { hue?: Hue; className?: string }) {
  const c = PALETTES[hue];
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse
          key={`o${i}`}
          cx="50"
          cy="25"
          rx="10.5"
          ry="20"
          fill={c[1]}
          transform={`rotate(${i * 45} 50 50)`}
        />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <ellipse
          key={`i${i}`}
          cx="50"
          cy="33"
          rx="7.5"
          ry="14"
          fill={c[2]}
          transform={`rotate(${i * 60 + 30} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="10.5" fill={c[3]} />
      <circle cx="50" cy="50" r="5.5" fill={c[0]} />
    </svg>
  );
}

/* A leafy stem sprig */
export function Sprig({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 70 140"
      className={className}
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M35 138 C35 96 33 60 35 6" stroke="#7c8f6b" strokeWidth="2.4" fill="none" />
      {[20, 45, 70, 95].map((y, i) => (
        <g key={y}>
          <path
            d={`M35 ${y} C ${52} ${y - 12}, ${58} ${y - 4}, ${50} ${y + 8} C ${44} ${y + 14}, ${38} ${y + 8}, 35 ${y}`}
            fill={i % 2 ? "#90a277" : "#a9ba94"}
          />
          <path
            d={`M35 ${y + 12} C ${18} ${y}, ${12} ${y + 8}, ${20} ${y + 20} C ${26} ${y + 26}, ${32} ${y + 20}, 35 ${y + 12}`}
            fill={i % 2 ? "#a9ba94" : "#90a277"}
          />
        </g>
      ))}
    </svg>
  );
}

/* Decorative cluster anchored to a corner */
export function CornerFlowers({ position = "tl" }: { position?: "tl" | "tr" | "bl" | "br" }) {
  const base =
    "pointer-events-none absolute z-[2] h-40 w-40 sm:h-56 sm:w-56 opacity-95 select-none";
  const map: Record<string, string> = {
    tl: "left-[-26px] top-[-26px]",
    tr: "right-[-26px] top-[-26px] -scale-x-100",
    bl: "left-[-26px] bottom-[-26px] -scale-y-100",
    br: "right-[-26px] bottom-[-26px] -scale-x-100 -scale-y-100",
  };
  return (
    <div className={`${base} ${map[position]}`} aria-hidden="true">
      <Sprig className="absolute left-6 top-2 h-32 w-16 origin-top animate-sway sm:h-44 sm:w-20" />
      <Sprig
        flip
        className="absolute left-16 top-6 h-28 w-14 origin-top animate-sway sm:h-40 sm:w-16"
      />
      <Bloom hue="rose" className="absolute left-1 top-1 h-16 w-16 animate-float-slow sm:h-24 sm:w-24" />
      <Bloom
        hue="peach"
        className="absolute left-14 top-12 h-12 w-12 animate-float sm:h-16 sm:w-16"
      />
      <Bloom
        hue="blush"
        className="absolute left-3 top-16 h-10 w-10 animate-float-slow sm:h-14 sm:w-14"
      />
    </div>
  );
}

/* Ambient falling petals (CSS-driven for 60fps, client-only to avoid SSR mismatch) */
export function Petals({ count = 14 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const colors = ["#f0d0c9", "#e6b7b6", "#ecbf9d", "#d896a0", "#c6d0b6"];
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 9 + Math.random() * 12,
        delay: Math.random() * 12,
        dur: 11 + Math.random() * 10,
        drift: `${(Math.random() * 120 - 60).toFixed(0)}px`,
        color: colors[i % colors.length],
        rotate: Math.random() * 60 - 30,
      })),
    [count],
  );

  if (!mounted) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            // @ts-expect-error custom property
            "--drift": p.drift,
            transform: `rotate(${p.rotate}deg)`,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
}

/* Celebration confetti + floating blooms */
export function Confetti({ count = 90 }: { count?: number }) {
  const colors = ["#c4828a", "#a85e66", "#ecbf9d", "#9cae8b", "#f0d6cf", "#cda35f"];
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        w: 6 + Math.random() * 8,
        h: 9 + Math.random() * 12,
        delay: Math.random() * 3.5,
        dur: 4.5 + Math.random() * 4,
        drift: `${(Math.random() * 200 - 100).toFixed(0)}px`,
        color: colors[i % colors.length],
        round: Math.random() > 0.6,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: p.w,
            height: p.round ? p.w : p.h,
            background: p.color,
            borderRadius: p.round ? "999px" : "2px",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            // @ts-expect-error custom property
            "--drift": p.drift,
          }}
        />
      ))}
    </div>
  );
}
