/**
 * Broadcast helpers — generate personal invitation links & WhatsApp
 * messages from a guest list (no database; guest name lives in the URL).
 */

export interface Guest {
  id: string;
  name: string;
  phone: string; // normalized to intl format (62...), "" if unknown
}

/**
 * Normalisasi nomor HP Indonesia ke format internasional untuk wa.me.
 * 0812.. -> 62812..  |  +62812.. -> 62812..  |  812.. -> 62812..
 */
export function normalizePhone(raw?: string | number | null): string {
  if (raw === undefined || raw === null) return "";
  const digits = String(raw).replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return "62" + digits.slice(1);
  if (digits.startsWith("8")) return "62" + digits;
  return digits;
}

/** Bangun link undangan personal: https://domain.com/?to=Nama%20Tamu */
export function buildInviteLink(baseUrl: string, name: string): string {
  const base = baseUrl.trim().replace(/\/+$/, "");
  return `${base}/?to=${encodeURIComponent(name.trim())}`;
}

/** Isi template dengan mengganti {nama} dan {link}. */
export function buildMessage(
  template: string,
  name: string,
  link: string
): string {
  return template
    .replace(/\{nama\}/gi, name.trim())
    .replace(/\{link\}/gi, link);
}

/** Link wa.me dengan pesan siap kirim. Tanpa nomor -> WA minta pilih kontak. */
export function buildWaLink(phone: string, message: string): string {
  const text = encodeURIComponent(message);
  return phone
    ? `https://wa.me/${phone}?text=${text}`
    : `https://wa.me/?text=${text}`;
}

const NAME_KEYS = ["nama", "name", "guest", "tamu"];
const PHONE_KEYS = [
  "hp", "no hp", "no. hp", "nohp", "nomor", "nomor hp", "no",
  "phone", "telepon", "telp", "whatsapp", "wa", "no wa",
];

function isNameHeader(v: string) {
  return NAME_KEYS.includes(v.trim().toLowerCase());
}
function isPhoneHeader(v: string) {
  return PHONE_KEYS.includes(v.trim().toLowerCase());
}

/**
 * Ubah array-of-arrays (hasil parse Excel) menjadi daftar tamu.
 * - Bila baris pertama berupa header (mengandung "nama"/"hp"/dll), kolom
 *   dideteksi otomatis.
 * - Bila tidak ada header, diasumsikan kolom A = nama, kolom B = nomor HP.
 */
export function parseGuestRows(rows: (string | number | null)[][]): Guest[] {
  const clean = rows.filter(
    (r) => Array.isArray(r) && r.some((c) => String(c ?? "").trim() !== "")
  );
  if (clean.length === 0) return [];

  const first = clean[0].map((c) => String(c ?? ""));
  const hasHeader = first.some((c) => isNameHeader(c) || isPhoneHeader(c));

  let nameIdx = 0;
  let phoneIdx = 1;
  let body = clean;

  if (hasHeader) {
    const ni = first.findIndex(isNameHeader);
    const pi = first.findIndex(isPhoneHeader);
    nameIdx = ni >= 0 ? ni : 0;
    phoneIdx = pi >= 0 ? pi : -1;
    body = clean.slice(1);
  }

  const guests: Guest[] = [];
  body.forEach((row, i) => {
    const name = String(row[nameIdx] ?? "").trim();
    if (!name) return;
    const phone =
      phoneIdx >= 0 ? normalizePhone(row[phoneIdx]) : "";
    guests.push({ id: `${i}-${name}`, name, phone });
  });
  return guests;
}
