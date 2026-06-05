export function LetterCard() {
  return (
    <div className="relative">
      {/* envelope back */}
      <div className="absolute -inset-x-6 -bottom-6 top-1/2 -z-10 rounded-b-[28px] bg-[oklch(0.84_0.06_15)] shadow-[0_25px_60px_-30px_rgba(0,0,0,0.45)]" />
      <div className="w-[320px] max-w-[86vw] -rotate-[3deg] rounded-md bg-[#f7f1e6] p-6 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.4)]">
        <p className="font-hand text-2xl leading-snug text-[oklch(0.25_0.05_30)]">
          From: Zoey<br />For Jim
        </p>
        <p className="font-hand mt-4 text-[22px] leading-[1.45] text-[oklch(0.25_0.05_30)]">
          I hope you continue to grow through every experience and find happiness in
          both the quiet moments and the exciting ones. Wishing you a future filled with
          peace, success, and people who truly appreciate you ✨
        </p>
      </div>
    </div>
  );
}