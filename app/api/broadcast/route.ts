import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/adminAuth";
import {
  isBroadcastDbConfigured, listSent, markSentDb, unmarkSentDb, resetSentDb,
} from "@/lib/broadcastDb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const markSchema = z.object({
  name: z.string().min(1).max(120),
  phone: z.string().max(20).optional(),
});

export async function GET() {
  if (!isBroadcastDbConfigured()) {
    return NextResponse.json({ configured: false, sent: [] });
  }
  try {
    return NextResponse.json({ configured: true, sent: await listSent() });
  } catch {
    return NextResponse.json({ configured: false, sent: [] });
  }
}

export async function POST(req: Request) {
  if (!isBroadcastDbConfigured()) {
    return NextResponse.json({ configured: false }, { status: 503 });
  }
  const denied = requireAdmin(req);
  if (denied) return denied;

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Body tidak valid." }, { status: 400 });
  }
  const parsed = markSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Data tidak valid." }, { status: 400 });
  }
  try {
    await markSentDb(parsed.data.name, parsed.data.phone ?? null);
    return NextResponse.json({ configured: true, ok: true });
  } catch {
    return NextResponse.json({ error: "Gagal menyimpan." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!isBroadcastDbConfigured()) {
    return NextResponse.json({ configured: false }, { status: 503 });
  }
  const denied = requireAdmin(req);
  if (denied) return denied;

  const params = new URL(req.url).searchParams;
  try {
    if (params.get("all") === "1") {
      await resetSentDb();
      return NextResponse.json({ configured: true, reset: true });
    }
    const name = params.get("name");
    if (!name) {
      return NextResponse.json({ error: "name wajib diisi." }, { status: 400 });
    }
    await unmarkSentDb(name);
    return NextResponse.json({ configured: true, ok: true });
  } catch {
    return NextResponse.json({ error: "Gagal menghapus." }, { status: 500 });
  }
}
