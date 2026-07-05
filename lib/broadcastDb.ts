import { getPool, isDbConfigured } from "@/lib/db";

/** True bila koneksi database sudah tersedia (env apa pun namanya). */
export function isBroadcastDbConfigured(): boolean {
  return isDbConfigured();
}

let ensured = false;
async function ensureTable() {
  if (ensured) return;
  await getPool().sql`
    CREATE TABLE IF NOT EXISTS broadcast_sent (
      name TEXT PRIMARY KEY,
      phone TEXT,
      sent_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  ensured = true;
}

/** Daftar nama tamu yang sudah dikirim undangannya. */
export async function listSent(): Promise<string[]> {
  await ensureTable();
  const { rows } = await getPool().sql`SELECT name FROM broadcast_sent`;
  return rows.map((r) => r.name as string);
}

export async function markSentDb(name: string, phone: string | null) {
  await ensureTable();
  await getPool().sql`
    INSERT INTO broadcast_sent (name, phone)
    VALUES (${name}, ${phone})
    ON CONFLICT (name) DO UPDATE SET phone = EXCLUDED.phone, sent_at = now()
  `;
}

export async function unmarkSentDb(name: string) {
  await ensureTable();
  await getPool().sql`DELETE FROM broadcast_sent WHERE name = ${name}`;
}

export async function resetSentDb() {
  await ensureTable();
  await getPool().sql`DELETE FROM broadcast_sent`;
}
