import { motion } from "framer-motion";
import { Music2, Pause, Play, Upload, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import cover from "@/assets/memory2.jpg";

/*
 * Custom audio player.
 * - Drop your own MP3 into /public/audio/birthday-song.mp3 to set it as the default track,
 *   OR upload one in the UI (stored locally via an object URL for the session).
 */
const DEFAULT_SRC = "/audio/birthday-song.mp3";

function fmt(t: number) {
  if (!Number.isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const [src, setSrc] = useState<string>(DEFAULT_SRC);
  const [hasTrack, setHasTrack] = useState(false);
  const [title, setTitle] = useState("Our Song");
  const [artist, setArtist] = useState("for you, always");
  const [art, setArt] = useState<string>(cover);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setCur(a.currentTime);
    const onMeta = () => {
      setDur(a.duration);
      setHasTrack(true);
    };
    const onEnd = () => setPlaying(false);
    const onErr = () => {
      setHasTrack(false);
      setPlaying(false);
    };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    a.addEventListener("error", onErr);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
      a.removeEventListener("error", onErr);
    };
  }, [src]);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a || !hasTrack) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      try {
        await a.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setSrc(url);
    setHasTrack(true);
    setTitle(f.name.replace(/\.[^/.]+$/, ""));
    setCur(0);
    setPlaying(false);
    const a = audioRef.current;
    if (a) {
      a.load();
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const seek = (clientX: number) => {
    const a = audioRef.current;
    const bar = barRef.current;
    if (!a || !bar || !dur) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    a.currentTime = ratio * dur;
    setCur(a.currentTime);
  };

  const toggleMute = () => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !a.muted;
    setMuted(a.muted);
  };

  const pct = dur ? (cur / dur) * 100 : 0;

  return (
    <div className="relative flex w-[min(92vw,440px)] flex-col items-center">
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Vinyl + cover */}
      <div className="relative mb-[-46px] h-56 w-56 sm:h-64 sm:w-64">
        <div
          className={`vinyl vinyl-spin absolute inset-0 rounded-full ${playing ? "" : "paused"}`}
        >
          <div className="absolute inset-[42%] overflow-hidden rounded-full ring-2 ring-[#cda35f]/40">
            <img src={art} alt="" className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="absolute right-2 top-3 h-7 w-7 rounded-full bg-[#fffaf0] shadow-md" />
      </div>

      {/* Card */}
      <motion.div
        className="paper-card grain relative w-full overflow-hidden rounded-2xl px-6 pb-6 pt-14"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative z-10 text-center">
          <input
            data-testid="audio-title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="font-display w-full bg-transparent text-center text-2xl font-semibold text-[#5d4742] outline-none"
            aria-label="Song title"
          />
          <input
            data-testid="audio-artist-input"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="mt-1 w-full bg-transparent text-center text-sm tracking-wide text-[#a85e66] outline-none"
            aria-label="Artist name"
          />
        </div>

        {/* Progress */}
        <div className="relative z-10 mt-5">
          <div
            ref={barRef}
            data-testid="audio-progress-bar"
            onClick={(e) => seek(e.clientX)}
            className="group h-2 w-full cursor-pointer rounded-full bg-[#e8dac1]"
            role="slider"
            aria-label="Seek"
            aria-valuenow={Math.round(pct)}
            tabIndex={0}
          >
            <div className="range-fill relative h-full rounded-full" style={{ width: `${pct}%` }}>
              <span className="absolute right-[-6px] top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-[#a85e66] shadow ring-2 ring-[#fffaf0]" />
            </div>
          </div>
          <div className="mt-1.5 flex justify-between text-[11px] font-medium text-[#8c766d]">
            <span data-testid="audio-current-time">{fmt(cur)}</span>
            <span data-testid="audio-duration">{fmt(dur)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="relative z-10 mt-5 flex items-center justify-center gap-5">
          <button
            type="button"
            data-testid="audio-mute-toggle"
            onClick={toggleMute}
            className="grid h-11 w-11 place-items-center rounded-full bg-[#f2e8d6] text-[#a85e66] shadow-sm transition hover:scale-105 hover:bg-[#ecdfc9]"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>

          <button
            type="button"
            data-testid="audio-play-toggle"
            onClick={toggle}
            disabled={!hasTrack}
            className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-[#c4828a] to-[#a85e66] text-white shadow-[0_14px_30px_-12px_rgba(168,94,102,0.8)] transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <Pause className="h-7 w-7 fill-white" />
            ) : (
              <Play className="ml-1 h-7 w-7 fill-white" />
            )}
          </button>

          <label
            data-testid="audio-upload-label"
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-[#f2e8d6] text-[#a85e66] shadow-sm transition hover:scale-105 hover:bg-[#ecdfc9]"
            aria-label="Upload your song"
            title="Upload your song"
          >
            <Upload className="h-5 w-5" />
            <input
              data-testid="audio-upload-input"
              type="file"
              accept="audio/mpeg,audio/mp3,audio/*"
              className="hidden"
              onChange={onUpload}
            />
          </label>
        </div>

        {!hasTrack && (
          <div className="relative z-10 mt-4 flex items-center justify-center gap-2 text-center text-xs text-[#8c766d]">
            <Music2 className="h-3.5 w-3.5" />
            <span>Upload your favourite song to play it here</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
