export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[var(--background)]"
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Golden ring spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-gold/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold animate-spin" />
        </div>

        {/* Brand text */}
        <div className="flex flex-col items-center gap-1">
          <span className="font-cinzel text-gold text-[10px] tracking-[0.3em] uppercase">
            Harmony of Java
          </span>
          <span className="font-cormorant italic text-[var(--muted-foreground)] text-sm">
            Memuat undangan...
          </span>
        </div>
      </div>
    </div>
  );
}
