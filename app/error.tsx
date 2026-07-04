"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-6">
      <div className="flex flex-col items-center text-center gap-6 max-w-sm">
        <AlertCircle className="w-12 h-12 text-rose" />
        <div>
          <h1 className="font-cormorant font-semibold text-2xl text-[var(--foreground)] mb-2">
            Maaf, terjadi kesalahan
          </h1>
          <p className="font-jakarta text-sm text-[var(--muted-foreground)]">
            Silakan coba beberapa saat lagi.
          </p>
        </div>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold text-white font-jakarta text-sm font-medium hover:bg-gold-dark transition-all duration-300 shadow-[var(--shadow-gold)] focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
        >
          <RefreshCw className="w-4 h-4" />
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
