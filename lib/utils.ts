import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  return String(n).padStart(2, "0");
}

export function encodeGuestName(name: string): string {
  return encodeURIComponent(name.trim());
}

export function generateInvitationUrl(
  baseUrl: string,
  guestName: string
): string {
  return `${baseUrl}?to=${encodeGuestName(guestName)}`;
}
