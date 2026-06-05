import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Cake,
  ChevronLeft,
  Flower2,
  Heart,
  Mail,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

import { AudioPlayer } from "@/components/AudioPlayer";
import { Bloom, Confetti, CornerFlowers, Petals, Sprig } from "@/components/Decor";

import bouquet from "@/assets/bouquet.jpg";
import memory1 from "@/assets/memory1.jpg";
import memory2 from "@/assets/memory2.jpg";
import memory3 from "@/assets/memory3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Birthday, Just For You" },
      {
        name: "description",
        content: "An interactive, handmade birthday card — opened just for you.",
      },
    ],
  }),
  component: Index,
});

/* Personalise here */
const RECIPIENT = "My Love";

const EASE = [0.22, 1, 0.36, 1] as const;

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

/* Delay helper for staggered CSS reveals */
const d = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

function Index() {
  const [stage, setStage] = useState<Stage>("sealed");

  useEffect(() => {
    if (stage !== "intro") return;
    const t = window.setTimeout(() => setStage("menu"), 4600);
    return () => window.clearTimeout(t);
  }, [stage]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#f7f0e2] text-[#5d4742]">
      <AnimatePresence mode="wait">
        {stage === "sealed" && <SealedScene key="sealed" onOpen={() => setStage("intro")} />}
        {stage === "intro" && <IntroScene key="intro" onNext={() => setStage("menu")} />}
        {stage === "menu" && (
          <MenuScene
            key="menu"
            onMessage={() => setStage("message")}
            onFlower={() => setStage("flower")}
            onCake={() => setStage("cake")}
            onNext={() => setStage("scrapbook")}
          />
        )}
        {stage === "message" && (
          <MessageScene
            key="message"
            onBack={() => setStage("menu")}
            onNext={() => setStage("scrapbook")}
          />
        )}
        {stage === "flower" && (
          <FlowerScene
            key="flower"
            onBack={() => setStage("menu")}
            onNext={() => setStage("scrapbook")}
          />
        )}
        {stage === "cake" && (
          <CakeScene
            key="cake"
            onBack={() => setStage("menu")}
            onNext={() => setStage("scrapbook")}
          />
        )}
        {stage === "scrapbook" && (
          <ScrapbookScene key="scrapbook" onNext={() => setStage("music")} />
        )}
        {stage === "music" && <MusicScene key="music" onNext={() => setStage("final")} />}
        {stage === "final" && <FinalScene key="final" onReplay={() => setStage("sealed")} />}
      </AnimatePresence>
    </main>
  );
}

/* ----------------------------- Shared shells ----------------------------- */

function Scene({
  children,
  variant = "cream",
  className = "",
}: {
  children: ReactNode;
  variant?: "cream" | "blush";
  className?: string;
}) {
  return (
    <motion.section
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16, transition: { duration: 0.4, ease: EASE } }}
      className={`grain relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-5 py-20 ${
        variant === "blush" ? "scrap-bg-blush" : "scrap-bg"
      } ${className}`}
    >
      <CornerFlowers position="tl" />
      <CornerFlowers position="br" />
      <Petals />
      <div className="relative z-10 flex w-full flex-col items-center">{children}</div>
    </motion.section>
  );
}

function PrimaryButton({
  children,
  onClick,
  testId,
  delay = 0,
}: {
  children: ReactNode;
  onClick: () => void;
  testId: string;
  delay?: number;
}) {
  return (
    <motion.button
      type="button"
      data-testid={testId}
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      style={d(delay)}
      className="reveal group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#c4828a] to-[#a85e66] px-7 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_16px_34px_-14px_rgba(168,94,102,0.85)]"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </motion.button>
  );
}

function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      type="button"
      data-testid="back-button"
      onClick={onBack}
      className="absolute left-4 top-4 z-30 grid h-11 w-11 place-items-center rounded-full bg-[#fffaf0]/80 text-[#a85e66] shadow-md backdrop-blur transition hover:scale-105"
      aria-label="Go back"
    >
      <ChevronLeft className="h-5 w-5" />
    </button>
  );
}

function ScriptHeading({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <h2 className={`reveal-d font-script text-[#a85e66] ${className}`} style={d(delay)}>
      {children}
    </h2>
  );
}

/* ----------------------------- Scenes ----------------------------- */

function SealedScene({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, 1500);
  };

  return (
    <Scene>
      <p
        className="reveal mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#a85e66]/80"
        style={d(0.1)}
      >
        Something handmade
      </p>
      <ScriptHeading className="mb-10 text-center text-6xl leading-none sm:text-7xl" delay={0.2}>
        Happy Birthday
      </ScriptHeading>

      <div className="env-wrap reveal-pop" style={d(0.35)}>
        <motion.button
          type="button"
          data-testid="open-envelope"
          onClick={handleOpen}
          aria-label="Open the envelope"
          className="env"
          animate={opening ? { y: -8 } : { y: [0, -8, 0] }}
          transition={
            opening
              ? { duration: 0.6, ease: EASE }
              : { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <div className="env-body" />
          <div className="env-pocket" />
          <motion.div
            className="env-letter grid place-items-center"
            initial={false}
            animate={opening ? { y: "-58%", scale: 1.02 } : { y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: opening ? 0.35 : 0 }}
          >
            <div className="px-6 text-center">
              <div className="font-script text-3xl text-[#a85e66]">Hi {RECIPIENT}…</div>
              <div className="mt-1 text-[11px] tracking-wide text-[#8c766d]">a letter for you</div>
            </div>
          </motion.div>
          <motion.div
            className="env-flap"
            initial={false}
            animate={opening ? { rotateX: -170 } : { rotateX: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          />
          <div className="absolute inset-0 z-[5] grid place-items-center">
            <motion.div
              className="wax-seal grid h-16 w-16 place-items-center rounded-full"
              animate={opening ? { scale: 0, opacity: 0, rotate: 40 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <Heart className="h-7 w-7 fill-[#fbeae9] text-[#fbeae9]" />
            </motion.div>
          </div>
        </motion.button>
      </div>

      {!opening && (
        <div
          className="reveal mt-9 flex items-center gap-2 text-sm font-medium text-[#a85e66]"
          style={d(0.7)}
        >
          <Sparkles className="h-4 w-4 animate-twinkle" />
          Tap the seal to open
        </div>
      )}
    </Scene>
  );
}

function IntroScene({ onNext }: { onNext: () => void }) {
  return (
    <Scene variant="blush">
      <div className="reveal-pop relative" style={d(0.1)}>
        <span className="tape left-1/2 top-[-14px] -translate-x-1/2 -rotate-2" />
        <div className="polaroid w-[min(78vw,320px)] -rotate-2">
          <img src={memory3} alt="A favourite memory" className="h-72 w-full object-cover" />
          <div className="font-script mt-2 text-center text-2xl text-[#a85e66]">it's your day</div>
        </div>
      </div>

      <ScriptHeading className="mt-10 text-center text-5xl sm:text-6xl" delay={0.4}>
        Happy Birthday, {RECIPIENT}
      </ScriptHeading>
      <p
        className="reveal mt-4 max-w-md text-center font-serif text-lg italic leading-relaxed text-[#6b524c]"
        style={d(0.6)}
      >
        Another year of you — and I get to be here to celebrate it.
      </p>

      <div className="mt-9">
        <PrimaryButton testId="intro-continue" onClick={onNext} delay={0.9}>
          Open your gifts
        </PrimaryButton>
      </div>
    </Scene>
  );
}

function MenuScene({
  onMessage,
  onFlower,
  onCake,
  onNext,
}: {
  onMessage: () => void;
  onFlower: () => void;
  onCake: () => void;
  onNext: () => void;
}) {
  const gifts = [
    { icon: <Mail />, label: "A letter", hint: "words for you", onClick: onMessage, hue: "blush" },
    {
      icon: <Flower2 />,
      label: "Flowers",
      hint: "a little bouquet",
      onClick: onFlower,
      hue: "rose",
    },
    { icon: <Cake />, label: "A cake", hint: "make a wish", onClick: onCake, hue: "peach" },
  ] as const;

  return (
    <Scene>
      <ScriptHeading className="text-center text-5xl sm:text-6xl">These are for you</ScriptHeading>
      <p className="reveal mt-3 text-sm tracking-wide text-[#8c766d]" style={d(0.25)}>
        Pick something to unwrap
      </p>

      <div className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
        {gifts.map((g, i) => (
          <motion.button
            key={g.label}
            type="button"
            data-testid={`gift-${g.label.split(" ")[1] ?? g.label}`}
            onClick={g.onClick}
            whileHover={{ y: -10 }}
            whileTap={{ scale: 0.97 }}
            style={d(0.3 + i * 0.12)}
            className="reveal-pop paper-card grain group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl px-6 py-8"
          >
            <Bloom
              hue={g.hue}
              className="pointer-events-none absolute -right-5 -top-5 h-20 w-20 opacity-70"
            />
            <div className="relative z-10 grid h-16 w-16 place-items-center rounded-full bg-[#f2e8d6] text-[#a85e66] shadow-inner transition group-hover:scale-110">
              {g.icon}
            </div>
            <div className="relative z-10 font-display text-xl font-semibold text-[#5d4742]">
              {g.label}
            </div>
            <div className="relative z-10 text-xs tracking-wide text-[#8c766d]">{g.hint}</div>
          </motion.button>
        ))}
      </div>

      <button
        type="button"
        data-testid="menu-skip"
        onClick={onNext}
        className="reveal mt-10 text-sm font-medium text-[#a85e66] underline-offset-4 hover:underline"
        style={d(0.9)}
      >
        Skip to our memories →
      </button>
    </Scene>
  );
}

function MessageScene({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const lines = [
    "To the one who feels like home —",
    "Happy birthday. I hope this year is gentle with you, and generous too. May it bring slow mornings, brave little adventures, and a hundred small reasons to smile.",
    "Thank you for being exactly, wonderfully you. I'm so grateful I get to love you.",
  ];
  return (
    <Scene variant="blush">
      <BackButton onBack={onBack} />
      <div className="reveal-pop paper-card grain relative w-[min(90vw,520px)] overflow-hidden rounded-md px-9 py-12">
        <span className="tape left-8 top-[-12px] -rotate-6" />
        <span className="tape right-8 top-[-12px] rotate-6" />
        <Bloom hue="rose" className="pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 opacity-70" />

        <div className="relative z-10">
          <div className="reveal-d font-script text-3xl text-[#a85e66]">A little letter</div>
          {lines.map((l, i) => (
            <p
              key={i}
              className={`reveal mt-4 font-serif leading-relaxed text-[#5d4742] ${
                i === 0 ? "text-lg italic" : "text-base"
              }`}
              style={d(0.3 + i * 0.3)}
            >
              {l}
            </p>
          ))}
          <div
            className="reveal font-script mt-7 text-right text-2xl text-[#a85e66]"
            style={d(1.3)}
          >
            Always yours
          </div>
        </div>
      </div>

      <div className="mt-9">
        <PrimaryButton testId="message-continue" onClick={onNext} delay={1.5}>
          Continue
        </PrimaryButton>
      </div>
    </Scene>
  );
}

function FlowerScene({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const notes = [
    { side: "left", top: "8%", text: "You make ordinary days feel worth keeping." },
    { side: "right", top: "24%", text: "Your kindness quietly changes everything." },
    { side: "left", top: "58%", text: "I love how you chase the things you dream about." },
    { side: "right", top: "70%", text: "Being loved by you is my favourite kind of lucky." },
  ] as const;

  return (
    <Scene>
      <BackButton onBack={onBack} />
      <ScriptHeading className="text-center text-5xl sm:text-6xl">Just for you</ScriptHeading>

      <div className="relative mt-6 flex w-full max-w-4xl items-center justify-center">
        <div className="reveal-pop relative" style={d(0.2)}>
          <Sprig className="absolute -left-10 bottom-0 h-40 w-16 animate-sway" />
          <Sprig flip className="absolute -right-10 bottom-0 h-40 w-16 animate-sway" />
          <img
            src={bouquet}
            alt="A bouquet for you"
            className="h-60 w-60 rounded-full object-cover shadow-[0_30px_70px_-26px_rgba(93,71,66,0.6)] ring-8 ring-[#fffaf0]/70 sm:h-72 sm:w-72"
          />
        </div>

        {notes.map((n, i) => (
          <div
            key={n.text}
            className={`reveal chip absolute hidden max-w-[220px] rounded-2xl px-4 py-3 text-sm font-medium text-[#6b524c] sm:block ${
              n.side === "left" ? "left-0 text-left" : "right-0 text-right"
            }`}
            style={{ top: n.top, ...d(0.5 + i * 0.25) }}
          >
            {n.text}
          </div>
        ))}
      </div>

      {/* Mobile stacked notes */}
      <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:hidden">
        {notes.map((n, i) => (
          <div
            key={n.text}
            className="reveal chip rounded-2xl px-4 py-3 text-center text-sm font-medium text-[#6b524c]"
            style={d(0.4 + i * 0.2)}
          >
            {n.text}
          </div>
        ))}
      </div>

      <div className="mt-9">
        <PrimaryButton testId="flower-continue" onClick={onNext} delay={1.4}>
          Continue
        </PrimaryButton>
      </div>
    </Scene>
  );
}

function CakeScene({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [wished, setWished] = useState(false);
  return (
    <Scene variant="blush">
      <BackButton onBack={onBack} />
      <ScriptHeading className="text-center text-5xl sm:text-6xl">Make a wish</ScriptHeading>

      <button
        type="button"
        data-testid="cake-wish"
        onClick={() => setWished(true)}
        className="reveal-pop relative mt-12 grid place-items-center"
        style={d(0.2)}
        aria-label="Blow out the candle"
      >
        <div className="relative h-44 w-56">
          <div className="absolute bottom-0 left-1/2 h-12 w-56 -translate-x-1/2 rounded-[14px_14px_6px_6px] bg-[repeating-linear-gradient(90deg,#f6ecd8_0_22px,#f0cdb0_22px_40px)] shadow-[0_16px_30px_-16px_rgba(93,71,66,0.5)]" />
          <div className="absolute bottom-[44px] left-1/2 h-11 w-44 -translate-x-1/2 rounded-[12px] bg-[repeating-linear-gradient(90deg,#fbf2e2_0_20px,#f3d6c0_20px_36px)] shadow-md" />
          <div className="absolute bottom-[84px] left-1/2 h-10 w-32 -translate-x-1/2 rounded-[10px] bg-[repeating-linear-gradient(90deg,#fff7ea_0_18px,#f6ddca_18px_32px)] shadow-md" />
          <div className="absolute bottom-[120px] left-1/2 h-9 w-2.5 -translate-x-1/2 rounded bg-[#c4828a]" />
          <AnimatePresence>
            {!wished && (
              <motion.div
                className="absolute bottom-[150px] left-1/2 h-5 w-3 -translate-x-1/2 rounded-full bg-gradient-to-t from-[#f0a04b] to-[#ffd98a]"
                style={{ filter: "drop-shadow(0 0 10px rgba(255,201,120,0.9))" }}
                animate={{ scaleY: [1, 1.2, 1], scaleX: [1, 0.9, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                exit={{ opacity: 0, scale: 0 }}
              />
            )}
          </AnimatePresence>
        </div>
      </button>

      <p
        key={wished ? "done" : "ask"}
        className="reveal mt-8 max-w-sm text-center font-serif text-lg italic text-[#6b524c]"
      >
        {wished
          ? "Wish made. I hope it's everything you wanted — and then a little more."
          : "Tap the cake to blow out your candle."}
      </p>

      <div className="mt-9">
        <PrimaryButton testId="cake-continue" onClick={onNext} delay={0.5}>
          Continue
        </PrimaryButton>
      </div>
    </Scene>
  );
}

function ScrapbookScene({ onNext }: { onNext: () => void }) {
  const photos = [
    { src: memory1, rot: -7, cap: "that afternoon", top: "6%", left: "4%" },
    { src: memory2, rot: 5, cap: "us, laughing", top: "2%", left: "38%" },
    { src: memory3, rot: 8, cap: "golden hour", top: "10%", left: "70%" },
    { src: memory2, rot: -5, cap: "little things", top: "48%", left: "16%" },
    { src: memory1, rot: 6, cap: "always you", top: "44%", left: "56%" },
  ];

  return (
    <Scene>
      <ScriptHeading className="text-center text-5xl sm:text-6xl">Us, in little moments</ScriptHeading>
      <p className="reveal mt-3 text-sm tracking-wide text-[#8c766d]" style={d(0.25)}>
        a few of my favourites
      </p>

      {/* Desktop scattered board */}
      <div className="relative mt-10 hidden h-[460px] w-[min(94vw,820px)] sm:block">
        {photos.map((p, i) => (
          <div
            key={i}
            className="reveal-pop polaroid absolute w-44"
            style={{ top: p.top, left: p.left, transform: `rotate(${p.rot}deg)`, ...d(0.25 + i * 0.14) }}
          >
            <span className="tape left-1/2 top-[-12px] -translate-x-1/2 -rotate-3" />
            <img src={p.src} alt={p.cap} className="h-40 w-full object-cover" />
            <div className="font-script mt-1 text-center text-xl text-[#a85e66]">{p.cap}</div>
          </div>
        ))}
      </div>

      {/* Mobile column */}
      <div className="mt-9 flex w-full max-w-sm flex-col items-center gap-7 sm:hidden">
        {photos.slice(0, 4).map((p, i) => (
          <div
            key={i}
            className="reveal-pop polaroid w-52"
            style={{ transform: `rotate(${p.rot}deg)`, ...d(0.2 + i * 0.12) }}
          >
            <span className="tape left-1/2 top-[-12px] -translate-x-1/2 -rotate-3" />
            <img src={p.src} alt={p.cap} className="h-48 w-full object-cover" />
            <div className="font-script mt-1 text-center text-xl text-[#a85e66]">{p.cap}</div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <PrimaryButton testId="scrapbook-continue" onClick={onNext} delay={1}>
          Play our song
        </PrimaryButton>
      </div>
    </Scene>
  );
}

function MusicScene({ onNext }: { onNext: () => void }) {
  return (
    <Scene variant="blush">
      <ScriptHeading className="text-center text-5xl sm:text-6xl">
        A song that finds you
      </ScriptHeading>
      <p
        className="reveal mb-10 mt-3 max-w-md text-center font-serif italic text-[#6b524c]"
        style={d(0.25)}
      >
        Every time I hear it, I think of you.
      </p>

      <AudioPlayer />

      <div className="mt-10">
        <PrimaryButton testId="music-continue" onClick={onNext} delay={0.5}>
          One last thing
        </PrimaryButton>
      </div>
    </Scene>
  );
}

function FinalScene({ onReplay }: { onReplay: () => void }) {
  return (
    <Scene variant="blush">
      <Confetti />
      <motion.div
        className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-[#c4828a] to-[#a85e66] shadow-[0_18px_40px_-16px_rgba(168,94,102,0.9)]"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Heart className="h-10 w-10 fill-white text-white" />
      </motion.div>

      <ScriptHeading className="mt-8 text-center text-6xl sm:text-7xl" delay={0.2}>
        Happy Birthday
      </ScriptHeading>

      <p
        className="reveal mt-5 max-w-lg text-center font-serif text-lg italic leading-relaxed text-[#6b524c]"
        style={d(0.5)}
      >
        Here's to you — today, and every ordinary day I get to spend beside you. I hope this little
        card made you smile, even half as much as you make me.
      </p>

      <motion.button
        type="button"
        data-testid="replay-button"
        onClick={onReplay}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        style={d(0.9)}
        className="reveal mt-10 inline-flex items-center gap-2 rounded-full border border-[#a85e66]/30 bg-[#fffaf0]/70 px-6 py-3 text-sm font-semibold text-[#a85e66] shadow-md backdrop-blur"
      >
        <RotateCcw className="h-4 w-4" />
        Open it again
      </motion.button>
    </Scene>
  );
}
