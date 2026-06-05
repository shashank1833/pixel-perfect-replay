import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import envelopeSealed from "@/assets/envelope-sealed.png";
import bouquet from "@/assets/bouquet.jpg";
import collageBg from "@/assets/collage-bg.jpg";
import hibiscus from "@/assets/hibiscus.png";
import smallBouquet from "@/assets/small-bouquet.png";
import memory1 from "@/assets/memory1.jpg";
import memory2 from "@/assets/memory2.jpg";
import memory3 from "@/assets/memory3.jpg";
import { InstagramBadge } from "@/components/bouquet/InstagramBadge";
import { SpotifyCard } from "@/components/bouquet/SpotifyCard";
import { LetterCard } from "@/components/bouquet/LetterCard";
import { MemoryMap } from "@/components/bouquet/MemoryMap";
import { VoiceNote } from "@/components/bouquet/VoiceNote";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Bouquet for You" },
      { name: "description", content: "A handcrafted gift card experience — open your bouquet." },
      { property: "og:title", content: "A Bouquet for You" },
      { property: "og:description", content: "Open the envelope and let the flowers bloom." },
    ],
  }),
  component: Index,
});

function Index() {
  // 0: envelope sealed, 1: bouquet bloom, 2: flower wall zoom, 3: scrapbook
  const [stage, setStage] = useState(0);

  // Auto-advance bloom → wall zoom → scrapbook
  useEffect(() => {
    if (stage === 1) {
      const t = setTimeout(() => setStage(2), 2200);
      return () => clearTimeout(t);
    }
    if (stage === 2) {
      const t = setTimeout(() => setStage(3), 2200);
      return () => clearTimeout(t);
    }
  }, [stage]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[oklch(0.93_0.025_85)]">
      <AnimatePresence mode="wait">
        {stage === 0 && <SealedScene key="sealed" onOpen={() => setStage(1)} />}
        {stage === 1 && <BloomScene key="bloom" />}
        {stage === 2 && <WallScene key="wall" />}
        {stage === 3 && <ScrapbookScene key="book" />}
      </AnimatePresence>
    </div>
  );
}

function SealedScene({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className="group relative flex min-h-screen w-full cursor-pointer items-center justify-center bg-[oklch(0.93_0.025_85)]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      aria-label="Tap to reveal your bouquet"
    >
      <motion.div
        initial={{ scale: 0.96, y: 0 }}
        animate={{ scale: [0.98, 1.02, 0.98], y: [0, -6, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <img
          src={envelopeSealed}
          alt="Sealed envelope"
          className="h-[220px] w-auto drop-shadow-[0_25px_30px_rgba(120,90,70,0.25)] sm:h-[260px]"
          width={1024}
          height={1024}
        />
      </motion.div>
      <div className="absolute left-1/2 top-[64%] -translate-x-1/2 select-none">
        <span className="font-hand animate-tap-pulse text-2xl text-[oklch(0.45_0.08_30)] sm:text-3xl">
          Tap to reveal
        </span>
      </div>
      <InstagramBadge />
    </motion.button>
  );
}

function BloomScene() {
  return (
    <motion.div
      className="relative flex min-h-screen w-full items-center justify-center bg-[oklch(0.93_0.025_85)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <motion.img
        src={bouquet}
        alt="Bouquet blooming"
        width={1024}
        height={1024}
        className="h-[80vmin] w-[80vmin] rounded-full object-cover [mask-image:radial-gradient(circle,black_55%,transparent_72%)]"
        initial={{ scale: 0.05, opacity: 0 }}
        animate={{ scale: [0.05, 0.45, 0.9], opacity: [0, 1, 1] }}
        transition={{ duration: 2.1, ease: [0.22, 1, 0.36, 1], times: [0, 0.55, 1] }}
      />
      <InstagramBadge />
      <BottomTicker />
    </motion.div>
  );
}

function WallScene() {
  return (
    <motion.div
      className="relative min-h-screen w-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      <motion.img
        src={bouquet}
        alt="Wall of flowers"
        width={1024}
        height={1024}
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.05 }}
        animate={{ scale: [1.05, 1.55, 2.4], filter: ["blur(0px)", "blur(0px)", "blur(8px)"] }}
        transition={{ duration: 2.1, ease: [0.6, 0, 0.4, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
      <div className="absolute left-1/2 top-[58%] -translate-x-1/2 select-none">
        <span className="font-hand animate-tap-pulse text-2xl text-white/95 drop-shadow-lg sm:text-3xl">
          Tap to reveal
        </span>
      </div>
      <InstagramBadge />
      <BottomTicker />
    </motion.div>
  );
}

function BottomTicker() {
  const text = "Nadira Ayuningrum • A Song Just For You • Forever Yours • ";
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-6 z-30 overflow-hidden text-center">
      <div className="font-hand inline-flex w-[200%] animate-marquee whitespace-nowrap text-lg text-white/85 drop-shadow sm:text-xl">
        <span>{text.repeat(6)}</span>
        <span>{text.repeat(6)}</span>
      </div>
    </div>
  );
}

function ScrapbookScene() {
  return (
    <motion.div
      className="relative min-h-[260vh] w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.8 } }}
      style={{
        backgroundImage: `linear-gradient(180deg, oklch(0.78 0.07 200 / 0.4), oklch(0.86 0.05 30 / 0.35)), url(${collageBg})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <InstagramBadge />

      {/* Section 1: Letter + Spotify */}
      <section className="relative grid min-h-screen place-items-center px-6 py-24">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-20">
          <motion.div
            initial={{ x: -60, opacity: 0, rotate: -8 }}
            whileInView={{ x: 0, opacity: 1, rotate: -3 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <LetterCard />
          </motion.div>
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:mt-10"
          >
            <SpotifyCard />
          </motion.div>
        </div>

        {/* floating decorations */}
        <img
          src={hibiscus}
          alt=""
          loading="lazy"
          width={1024}
          height={1024}
          className="animate-float-slow pointer-events-none absolute -right-10 bottom-10 h-56 w-auto opacity-90 sm:right-10"
        />
        <div className="pointer-events-none absolute left-8 top-24 h-16 w-16 rounded-full bg-white/40 blur-sm animate-float" />
        <div className="pointer-events-none absolute right-1/4 top-32 h-10 w-10 rounded-full bg-white/55 blur-[2px] animate-float-slow" />
      </section>

      {/* Section 2: Polaroid memories */}
      <section className="relative min-h-screen px-6 py-20">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
          <Polaroid src={memory1} rotate={-7} caption="sunset, june" delay={0} />
          <Polaroid src={memory2} rotate={4} caption="our café" delay={0.1} />
          <Polaroid src={memory3} rotate={-3} caption="that picnic" delay={0.2} />
          <Polaroid src={memory2} rotate={6} caption="warm hours" delay={0.05} />
          <Polaroid src={memory1} rotate={-5} caption="golden hour" delay={0.15} />
          <Polaroid src={memory3} rotate={2} caption="laughing again" delay={0.25} />
        </div>

        <img
          src={smallBouquet}
          alt=""
          loading="lazy"
          width={1024}
          height={1024}
          className="pointer-events-none absolute -left-10 top-10 h-44 w-auto animate-float opacity-90 sm:left-8"
        />
      </section>

      {/* Section 3: Memory map + voice note */}
      <section className="relative min-h-screen px-6 py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-12">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <MemoryMap />
          </motion.div>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <VoiceNote />
          </motion.div>

          <div className="mt-10 text-center">
            <div className="font-hand text-3xl text-white drop-shadow-md sm:text-4xl">
              with love, always
            </div>
            <div className="font-display mt-3 text-2xl font-extrabold tracking-tight text-white drop-shadow">
              @FLOWERISBLOOMINGG
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function Polaroid({
  src,
  rotate,
  caption,
  delay,
}: {
  src: string;
  rotate: number;
  caption: string;
  delay: number;
}) {
  return (
    <motion.figure
      initial={{ y: 40, opacity: 0, rotate: rotate * 1.6 }}
      whileInView={{ y: 0, opacity: 1, rotate }}
      whileHover={{ rotate: 0, scale: 1.04 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto bg-[#fbf7ec] p-3 pb-12 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.45)] ring-1 ring-black/5"
      style={{ width: 200 }}
    >
      <img
        src={src}
        alt={caption}
        loading="lazy"
        width={768}
        height={768}
        className="h-44 w-full object-cover"
      />
      <figcaption className="font-hand mt-3 text-center text-lg text-[oklch(0.3_0.04_30)]">
        {caption}
      </figcaption>
    </motion.figure>
  );
}
