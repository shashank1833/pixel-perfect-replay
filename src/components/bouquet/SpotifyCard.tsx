import { Play, Plus, MoreHorizontal } from "lucide-react";

export function SpotifyCard() {
  return (
    <div className="w-[340px] max-w-[88vw] rounded-2xl bg-[#121212] p-3 text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
      <div className="flex items-center gap-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-gradient-to-br from-rose-900 via-rose-700 to-amber-500">
          <div className="absolute inset-0 grid place-items-center font-display text-[10px] font-extrabold tracking-widest text-amber-200">
            BLOOM
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-base font-semibold leading-tight">Forever Yours</div>
          <div className="truncate text-sm text-white/60">The Bloom</div>
          <button className="mt-1 rounded-full bg-white px-3 py-0.5 text-[11px] font-semibold text-black">
            Preview
          </button>
        </div>
        <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-[#1DB954]" fill="currentColor">
          <circle cx="12" cy="12" r="12" />
          <path
            d="M17.4 16.3c-.2.3-.6.4-.9.2-2.5-1.5-5.7-1.9-9.4-1-.4.1-.7-.1-.8-.5-.1-.4.1-.7.5-.8 4.1-.9 7.6-.5 10.4 1.2.3.2.4.6.2.9zm1.4-2.9c-.3.4-.7.5-1.1.3-2.9-1.8-7.3-2.3-10.7-1.3-.4.1-.9-.1-1-.5-.1-.4.1-.9.5-1 3.9-1.2 8.7-.6 12 1.4.4.2.5.7.3 1.1zm.1-3c-3.4-2-9.1-2.2-12.4-1.2-.5.2-1.1-.1-1.3-.7-.2-.5.1-1.1.7-1.3 3.8-1.1 10.1-.9 14 1.4.5.3.7 1 .4 1.5-.3.5-1 .7-1.4.3z"
            fill="#000"
          />
        </svg>
      </div>
      <div className="mt-3 flex items-center justify-end gap-3 text-white/75">
        <Plus className="h-5 w-5" />
        <MoreHorizontal className="h-5 w-5" />
        <button className="grid h-9 w-9 place-items-center rounded-full bg-white text-black">
          <Play className="h-4 w-4 fill-black" />
        </button>
      </div>
    </div>
  );
}