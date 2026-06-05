import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Cake, ChevronLeft, Flower2, Heart, Instagram, Mail, Music, Play } from "lucide-react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import bouquet from "@/assets/bouquet.jpg";
import memory1 from "@/assets/memory1.jpg";
import memory2 from "@/assets/memory2.jpg";
import memory3 from "@/assets/memory3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday" },
      { name: "description", content: "Send this instead of a normal birthday message." },
      { property: "og:title", content: "Happy Birthday" },
      { property: "og:description", content: "An interactive birthday card." },
    ],
  }),
  component: Index,
});

type Stage =
  | "sealed"
  | "intro"
  | "menu"
  | "message"
  | "flower"
  | "cake"
  | "scrapbook"
  | "music"
  | "final";

const easeOut = [0.22, 1, 0.36, 1] as const;
function Index() {
  const [stage, setStage] = useState<Stage>("sealed");

  useEffect(() => {
    const timers: Partial<Record<Stage, number>> = {
      intro: 2500,
      scrapbook: 3600,
      music: 4200,
    };
    const delay = timers[stage];
    if (!delay) return;

    const t = window.setTimeout(() => {
      if (stage === "intro") setStage("menu");
      if (stage === "scrapbook") setStage("music");
      if (stage === "music") setStage("final");
    }, delay);
    return () => window.clearTimeout(t);
  }, [stage]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#f8f3e7] text-[#fbf3e6]">
      <AnimatePresence mode="wait">
        {stage === "sealed" && <SealedScene key="sealed" onOpen={() => setStage("intro")} />}
        {stage === "intro" && <IntroScene key="intro" />}
        {stage === "menu" && (
          <MenuScene
            key="menu"
            onMessage={() => setStage("message")}
            onFlower={() => setStage("flower")}
            onCake={() => setStage("cake")}
          />
        )}
        {stage === "message" && <MessageScene key="message" onBack={() => setStage("menu")} />}
        {stage === "flower" && <FlowerScene key="flower" onBack={() => setStage("menu")} />}
        {stage === "cake" && <CakeScene key="cake" onBack={() => setStage("menu")} />}
        {stage === "scrapbook" && <ScrapbookScene key="scrapbook" />}
        {stage === "music" && <MusicScene key="music" />}
        {stage === "final" && <FinalScene key="final" onReplay={() => setStage("sealed")} />}
      </AnimatePresence>

      {(stage === "message" || stage === "flower" || stage === "cake") && (
        <button
          type="button"
          onClick={() => setStage("scrapbook")}
          className="absolute bottom-5 right-5 z-40 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur transition hover:bg-white/25"
        >
          Continue
        </button>
      )}
    </main>
  );
}

function Shell({
  children,
  className = "",
  withDecor = true,
}: {
  children: ReactNode;
  className?: string;
  withDecor?: boolean;
}) {
  return (
    <motion.section
      className={`relative min-h-screen w-full overflow-hidden ${className}`}
      initial={false}
      exit={{ opacity: 0, transition: { duration: 0.35 } }}
    >
      {withDecor && (
        <>
          <LineFlowers side="left" />
          <LineFlowers side="right" />
          <InstagramMark compact />
        </>
      )}
      {children}
    </motion.section>
  );
}

function SealedScene({ onOpen }: { onOpen: () => void }) {
  return (
    <Shell className="grid place-items-center bg-[#fffaf0] text-[#3b1b1f]" withDecor={false}>
      <div className="absolute inset-x-0 top-0 h-4 bg-[#a50928]" />
      <LineFlowers side="left" cream />
      <LineFlowers side="right" cream />
      <motion.button
        type="button"
        onClick={onOpen}
        className="group relative grid w-full place-items-center px-6 pt-8"
        initial={{ y: 16, scale: 0.98 }}
        animate={{ y: [6, -5, 6], scale: [1, 1.015, 1] }}
        transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Open birthday message"
      >
        <motion.h1
          className="font-script mb-8 text-center text-4xl text-[#7c202a] sm:text-5xl"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Happy Birthday!
        </motion.h1>
        <div className="birthday-envelope">
          <div className="birthday-envelope-flap" />
          <div className="birthday-envelope-seal">H</div>
        </div>
        <div className="mt-5 text-center text-xs font-semibold text-[#7d3136]">
          Click this to open!
        </div>
      </motion.button>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-[#7d3136]/70">
        Send this instead of a normal birthday message
      </div>
    </Shell>
  );
}

function IntroScene() {
  return (
    <Shell className="grid place-items-center bg-[#2b1017]" withDecor={false}>
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${memory3})` }}
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.72 }}
        transition={{ duration: 1.8, ease: easeOut }}
      />
      <div className="absolute inset-0 bg-[#bd2741]/60 mix-blend-multiply" />
      <motion.div
        className="relative px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 1.1, ease: easeOut }}
      >
        <div className="font-script text-5xl text-white drop-shadow-lg sm:text-7xl">
          Happy Birthday {`{Name}`}!
        </div>
        <div className="mx-auto mt-8 h-px w-48 bg-white/45" />
      </motion.div>
      <InstagramMark />
    </Shell>
  );
}

function MenuScene({
  onMessage,
  onFlower,
  onCake,
}: {
  onMessage: () => void;
  onFlower: () => void;
  onCake: () => void;
}) {
  return (
    <RedScene>
      <motion.h2
        className="font-script text-center text-5xl text-[#fee9e6] sm:text-6xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeOut }}
      >
        These are for you
      </motion.h2>
      <div className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-8 px-8 sm:grid-cols-3">
        <GiftButton icon={<Mail />} label="Message" delay={0.1} onClick={onMessage} />
        <GiftButton icon={<Flower2 />} label="Flower" delay={0.22} onClick={onFlower} featured />
        <GiftButton icon={<Cake />} label="Cake" delay={0.34} onClick={onCake} />
      </div>
    </RedScene>
  );
}

function GiftButton({
  icon,
  label,
  delay,
  onClick,
  featured,
}: {
  icon: React.ReactNode;
  label: string;
  delay: number;
  onClick: () => void;
  featured?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="group grid place-items-center gap-4 text-[#fee9e6]"
      initial={{ opacity: 0, y: 38, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -8, scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      transition={{ delay, duration: 0.65, ease: easeOut }}
    >
      <div className={featured ? "flower-parcel" : "gift-icon"}>
        <div className="grid h-full w-full place-items-center">{icon}</div>
      </div>
      <span className="text-sm font-semibold">{label}</span>
    </motion.button>
  );
}

function MessageScene({ onBack }: { onBack: () => void }) {
  return (
    <RedScene alignTop>
      <BackButton onBack={onBack} />
      <motion.div
        className="relative mt-16 w-[min(86vw,470px)] rounded-sm bg-[#f8f0df] px-8 py-10 text-center text-[#702133] shadow-[0_28px_80px_rgba(0,0,0,0.28)]"
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.75, ease: easeOut }}
      >
        <Heart className="absolute -right-8 top-3 h-8 w-8 text-[#f2c6cf]" />
        <div className="font-script text-3xl">To you,</div>
        <p className="mt-5 text-sm leading-7">
          Happy birthday! I hope today feels soft, warm, and full of tiny surprises. May the year
          ahead bring more laughter, brave steps, peaceful days, and people who make you feel deeply
          loved.
        </p>
        <div className="font-script mt-6 text-2xl">With love</div>
      </motion.div>
    </RedScene>
  );
}

function FlowerScene({ onBack }: { onBack: () => void }) {
  const notes = [
    ["left", "I know these flowers are not real."],
    ["right", "But the wish is."],
    ["left", "May you keep blooming in every season."],
    ["right", "And may happiness find you gently."],
  ] as const;

  return (
    <RedScene>
      <BackButton onBack={onBack} />
      <div className="relative grid w-full max-w-5xl place-items-center px-6">
        <motion.img
          src={bouquet}
          alt="Birthday bouquet"
          className="h-64 w-64 rounded-full object-cover shadow-[0_30px_90px_rgba(0,0,0,0.32)] ring-8 ring-white/12 sm:h-80 sm:w-80"
          initial={{ scale: 0.3, opacity: 0, rotate: -16 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.9, ease: easeOut }}
        />
        {notes.map(([side, text], index) => (
          <motion.div
            key={text}
            className={`chat-bubble ${side === "left" ? "chat-left" : "chat-right"}`}
            initial={{ opacity: 0, y: 18, scale: 0.86 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.35 + index * 0.25, duration: 0.45, ease: easeOut }}
          >
            {text}
          </motion.div>
        ))}
        <motion.div
          className="font-script mt-8 text-center text-3xl text-[#fee9e6]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          Cyberflower
        </motion.div>
      </div>
    </RedScene>
  );
}

function CakeScene({ onBack }: { onBack: () => void }) {
  return (
    <RedScene>
      <BackButton onBack={onBack} />
      <motion.div
        className="grid place-items-center text-center"
        initial={{ opacity: 0, y: 42 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easeOut }}
      >
        <div className="cake-stack">
          <div />
          <div />
          <div />
        </div>
        <div className="font-script mt-10 text-5xl text-[#fee9e6]">Make a wish</div>
        <p className="mt-4 max-w-sm text-sm leading-6 text-white/78">
          Here is a tiny digital cake for the biggest wish in your heart.
        </p>
      </motion.div>
    </RedScene>
  );
}

function ScrapbookScene() {
  return (
    <RedScene>
      <motion.div
        className="relative h-[430px] w-[min(92vw,760px)]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: easeOut }}
      >
        <div className="absolute left-6 top-12 h-44 w-64 rounded-sm bg-[#ffe5e8] shadow-xl sm:left-16">
          <div className="absolute -top-4 left-8 h-8 w-32 bg-white/60" />
        </div>
        <Polaroid src={memory1} className="left-4 top-36 rotate-[-8deg] sm:left-0" />
        <Polaroid src={memory2} className="left-[35%] top-8 rotate-[5deg]" />
        <Polaroid src={memory3} className="right-2 top-32 rotate-[8deg] sm:right-8" />
        <div className="absolute bottom-14 left-[25%] h-20 w-20 rounded-full border-[14px] border-black bg-[#cf1231] shadow-lg">
          <div className="absolute inset-5 rounded-full bg-black" />
        </div>
        <div className="absolute right-0 top-0 grid gap-2">
          {[memory1, memory2, memory3].map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              className="h-20 w-16 rounded-sm object-cover ring-2 ring-white"
            />
          ))}
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center text-xs tracking-[0.35em] text-white/80">
          x x x x x x x
        </div>
      </motion.div>
      <InstagramMark compact />
    </RedScene>
  );
}

function MusicScene() {
  return (
    <RedScene>
      <motion.div
        className="font-script absolute top-16 text-center text-4xl text-[#fee9e6] sm:text-5xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easeOut }}
      >
        This song reminds me of you
      </motion.div>
      <motion.div
        className="relative mt-16 flex h-80 w-[min(90vw,720px)] items-center justify-center"
        initial={{ opacity: 0, y: 42 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeOut }}
      >
        <div className="absolute left-0 h-64 w-64 rounded-full bg-black shadow-2xl">
          <div className="absolute inset-16 rounded-full bg-[#d20b31]" />
          <div className="absolute inset-[118px] rounded-full bg-black" />
        </div>
        <div className="relative z-10 grid w-[min(78vw,360px)] place-items-center rounded-md bg-[#f7f2e8] p-4 shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
          <img src={memory1} alt="Song memory" className="h-44 w-full rounded-sm object-cover" />
          <div className="mt-3 flex w-full items-center justify-between text-[#7d2132]">
            <div>
              <div className="text-sm font-bold">Still With You</div>
              <div className="text-xs opacity-70">birthday mix</div>
            </div>
            <button className="grid h-10 w-10 place-items-center rounded-full bg-[#9f0825] text-white">
              <Play className="h-4 w-4 fill-white" />
            </button>
          </div>
        </div>
        <Music className="absolute bottom-8 right-12 h-8 w-8 text-white/85" />
        <Music className="absolute bottom-20 right-4 h-5 w-5 text-white/70" />
      </motion.div>
      <InstagramMark compact />
    </RedScene>
  );
}

function FinalScene({ onReplay }: { onReplay: () => void }) {
  return (
    <Shell className="grid place-items-center bg-[#10070b]" withDecor={false}>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-35"
        style={{ backgroundImage: `url(${memory3})` }}
      />
      <motion.button
        type="button"
        onClick={onReplay}
        className="relative grid place-items-center gap-4 text-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: easeOut }}
      >
        <div className="grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-tr from-[#f6a21a] via-[#e50072] to-[#6d43ff] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <Instagram className="h-11 w-11" />
        </div>
        <div className="text-sm font-extrabold tracking-wide">@CRAFTLYMADE</div>
      </motion.button>
    </Shell>
  );
}

function RedScene({ children, alignTop = false }: { children: ReactNode; alignTop?: boolean }) {
  return (
    <Shell
      className={`grid place-items-center bg-[radial-gradient(circle_at_50%_20%,#bd1736_0%,#990821_46%,#7c061a_100%)] px-4 ${
        alignTop ? "content-start py-20" : ""
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-3 bg-[#5a0311]/35" />
      <div className="absolute inset-x-0 bottom-0 h-3 bg-[#5a0311]/35" />
      {children}
    </Shell>
  );
}

function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      type="button"
      onClick={onBack}
      className="absolute left-5 top-5 z-40 grid h-10 w-10 place-items-center rounded-full bg-white/12 text-white shadow-lg backdrop-blur transition hover:bg-white/20"
      aria-label="Back to gifts"
    >
      <ChevronLeft className="h-5 w-5" />
    </button>
  );
}

function Polaroid({ src, className }: { src: string; className: string }) {
  return (
    <motion.div
      className={`absolute bg-[#fff8ec] p-2 pb-8 shadow-[0_16px_38px_rgba(0,0,0,0.3)] ${className}`}
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: easeOut }}
    >
      <img src={src} alt="" className="h-32 w-32 object-cover sm:h-40 sm:w-40" />
    </motion.div>
  );
}

function LineFlowers({ side, cream = false }: { side: "left" | "right"; cream?: boolean }) {
  return (
    <div
      className={`pointer-events-none absolute bottom-9 z-10 h-24 w-28 opacity-80 ${
        side === "left" ? "left-6" : "right-6 scale-x-[-1]"
      } ${cream ? "text-[#c7898b]" : "text-white/55"}`}
    >
      <Flower2 className="absolute bottom-0 left-0 h-12 w-12" strokeWidth={1.1} />
      <Flower2 className="absolute bottom-5 left-10 h-10 w-10" strokeWidth={1.1} />
      <div className="absolute bottom-1 left-8 h-20 w-px -rotate-12 bg-current" />
      <div className="absolute bottom-2 left-16 h-16 w-px rotate-12 bg-current" />
    </div>
  );
}

function InstagramMark({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`pointer-events-none absolute z-30 flex items-center gap-2 text-white ${
        compact ? "bottom-7 left-7" : "bottom-8 left-8"
      }`}
    >
      <Instagram className={compact ? "h-5 w-5" : "h-6 w-6"} />
      <span className="text-[10px] font-extrabold tracking-wide">@CRAFTLYMADE</span>
    </div>
  );
}
