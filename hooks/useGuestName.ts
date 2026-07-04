"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function useGuestName(): string {
  const searchParams = useSearchParams();
  const raw = searchParams.get("to");

  return useMemo(() => {
    if (!raw) return "Tamu Undangan";
    const decoded = decodeURIComponent(raw).trim();
    return decoded.length > 0 ? decoded : "Tamu Undangan";
  }, [raw]);
}
