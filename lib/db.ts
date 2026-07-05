import { createPool, type VercelPool } from "@vercel/postgres";

/**
 * Ambil connection string dari beberapa nama env yang umum disuntikkan oleh
 * penyedia database (Vercel Postgres, Neon, marketplace, dll) — jadi tidak
 * perlu menebak nama variabel yang tepat.
 */
export function getConnectionString(): string | undefined {
  return (
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.DATABASE_POSTGRES_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.DATABASE_URL_UNPOOLED ||
    undefined
  );
}

export function isDbConfigured(): boolean {
  return Boolean(getConnectionString());
}

let pool: VercelPool | null = null;

export function getPool(): VercelPool {
  if (!pool) {
    pool = createPool({ connectionString: getConnectionString() });
  }
  return pool;
}
