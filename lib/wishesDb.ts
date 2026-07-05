import { sql } from "@vercel/postgres";

export interface DbWish {
  id: string;
  name: string;
  attending: string;
  message: string;
  createdAt: number;
}

/** True bila env Vercel Postgres (Neon) sudah diisi. */
export function isWishesDbConfigured(): boolean {
  return Boolean(process.env.POSTGRES_URL);
}

let ensured = false;
async function ensureTable() {
  if (ensured) return;
  await sql`
    CREATE TABLE IF NOT EXISTS wishes (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      attending TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  ensured = true;
}

function mapRow(r: Record<string, unknown>): DbWish {
  return {
    id: String(r.id),
    name: r.name as string,
    attending: r.attending as string,
    message: r.message as string,
    createdAt: new Date(r.created_at as string).getTime(),
  };
}

export async function listWishes(limit = 200): Promise<DbWish[]> {
  await ensureTable();
  const { rows } = await sql`
    SELECT id, name, attending, message, created_at
    FROM wishes ORDER BY created_at DESC LIMIT ${limit}
  `;
  return rows.map(mapRow);
}

export async function insertWish(w: {
  name: string;
  attending: string;
  message: string;
}): Promise<DbWish> {
  await ensureTable();
  const { rows } = await sql`
    INSERT INTO wishes (name, attending, message)
    VALUES (${w.name}, ${w.attending}, ${w.message})
    RETURNING id, name, attending, message, created_at
  `;
  return mapRow(rows[0]);
}

export async function updateWish(
  id: string,
  w: { name: string; attending: string; message: string }
): Promise<DbWish | null> {
  await ensureTable();
  const { rows } = await sql`
    UPDATE wishes
    SET name = ${w.name}, attending = ${w.attending}, message = ${w.message}
    WHERE id = ${Number(id)}
    RETURNING id, name, attending, message, created_at
  `;
  return rows[0] ? mapRow(rows[0]) : null;
}

export async function deleteWish(id: string): Promise<boolean> {
  await ensureTable();
  const { rowCount } = await sql`DELETE FROM wishes WHERE id = ${Number(id)}`;
  return (rowCount ?? 0) > 0;
}
