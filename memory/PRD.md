# PRD — Interactive Birthday Card ("A Birthday, Just For You")

## Original Problem Statement
Recreate the experience/animation quality/visual polish of a reference video (interactive
romantic birthday card) on an EXISTING TanStack-Start project, WITHOUT rebuilding. No Instagram
branding/watermark/UI, no copied text or images — original assets only. Match: envelope opening,
typography, decorative flowers, scrapbook aesthetic, polaroid gallery, floating effects, smooth
transitions, custom music player, confetti final reveal. Mobile responsive, 60fps, Lighthouse 90+.

## User Choices (gathered)
- Occasion: Romantic.
- Photos: tasteful placeholders for now (existing /src/assets memory images reused).
- Music: CUSTOM MP3 UPLOAD player (title/artist, play/pause, seekable progress, mute/unmute,
  mobile responsive). Default track path `/public/audio/birthday-song.mp3`. No royalty-free
  placeholder, no Spotify embed.
- Palette: soft scrapbook — warm cream, blush pink, dusty rose, muted peach, sage green.
  No bright pink gradients, no SaaS colors.
- Priority: visuals + mobile equally.

## Tech Stack
- TanStack Start + Vite 7 + React 19 + TypeScript, Tailwind v4, framer-motion 12 (frontend-only).
- Fonts: Parisienne (script), Fraunces (editorial serif), Mulish (body) via Google Fonts.
- Served on port 3000. Supervisor `frontend` runs `/app/frontend/package.json` start →
  proxies to `cd /app && npm run dev` (the Vite app lives at repo root /app).

## Architecture / Key Files
- `src/routes/index.tsx` — single-page staged experience (sealed → intro → menu →
  message/flower/cake → scrapbook → music → final). Entrance reveals are CSS-driven
  (rAF-independent → robust under backgrounded/headless tabs); framer used for interactions,
  idle loops, envelope-open sequence, scene transitions, confetti.
- `src/components/AudioPlayer.tsx` — custom MP3 player + upload.
- `src/components/Decor.tsx` — SVG blooms/sprigs, CSS petals, confetti, corner flower clusters.
- `src/styles.css` — palette tokens, paper textures, envelope/polaroid/vinyl styles, keyframes.
- `public/audio/` — drop `birthday-song.mp3` to set default track.

## Implemented (2026-06-05)
- Full romantic redesign matching reference structure with soft scrapbook palette.
- Envelope with wax-heart seal + open animation; floating petals; corner florals.
- Polaroid scrapbook gallery (tape, rotations, hover lift); flower bouquet with affirmations;
  cake make-a-wish; custom audio player; confetti + emotional final message.
- All Instagram branding/handles REMOVED; legacy bouquet components deleted. Original copy.

## Backlog / Next
- P1: Let user upload gallery photos (currently placeholder assets).
- P1: Persist uploaded song (needs backend/object storage; currently session object URL).
- P2: Per-section ambient sound effects (soft pop on envelope open).
- P2: Shareable personalised link (name/message via URL params).
