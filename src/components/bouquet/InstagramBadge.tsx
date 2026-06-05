import { Instagram } from "lucide-react";

export function InstagramBadge() {
  return (
    <div className="pointer-events-none absolute right-4 top-24 z-40 flex flex-col items-end gap-2 sm:right-8 sm:top-28">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-tr from-[oklch(0.55_0.22_30)] via-[oklch(0.65_0.25_350)] to-[oklch(0.55_0.22_300)] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)]">
        <Instagram className="h-7 w-7 text-white" strokeWidth={2.2} />
      </div>
      <div className="overflow-hidden">
        <div
          className="font-display whitespace-nowrap text-2xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] sm:text-3xl"
          style={{ textShadow: "0 1px 0 rgba(0,0,0,0.25)" }}
        >
          @FLOWERISBLOOMINGG
        </div>
        <div className="text-right text-xs text-white/85 drop-shadow sm:text-sm">
          Now playing • a song just for you
        </div>
      </div>
    </div>
  );
}