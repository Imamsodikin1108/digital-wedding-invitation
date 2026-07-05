import { NextResponse } from "next/server";
import { z } from "zod";
import {
  isWishesDbConfigured, listWishes, insertWish, updateWish, deleteWish,
} from "@/lib/wishesDb";
import { requireAdmin } from "@/lib/adminAuth";
import { censorMessage } from "@/lib/profanity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bodySchema = z.object({
  name: z.string().min(2).max(80),
  attending: z.enum(["yes", "no", "maybe"]),
  message: z.string().min(1).max(300),
});

const editSchema = bodySchema.extend({ id: z.string().min(1) });

export async function GET() {
  if (!isWishesDbConfigured()) {
    return NextResponse.json({ configured: false, wishes: [] });
  }
  try {
    return NextResponse.json({ configured: true, wishes: await listWishes() });
  } catch {
    // DB error → biarkan klien fallback ke localStorage
    return NextResponse.json({ configured: false, wishes: [] });
  }
}

export async function POST(req: Request) {
  if (!isWishesDbConfigured()) {
    return NextResponse.json(
      { configured: false, error: "Database ucapan belum dikonfigurasi." },
      { status: 503 }
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Body tidak valid." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Data ucapan tidak valid." }, { status: 400 });
  }

  const { name, attending, message } = parsed.data;
  // Filter otomatis kata kurang pantas sebelum disimpan.
  const cleanName = censorMessage(name).clean;
  const cleanMessage = censorMessage(message).clean;

  try {
    const wish = await insertWish({
      name: cleanName,
      attending,
      message: cleanMessage,
    });
    return NextResponse.json({ configured: true, wish }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Gagal menyimpan ucapan." }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  if (!isWishesDbConfigured()) {
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
  const parsed = editSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Data ucapan tidak valid." }, { status: 400 });
  }
  const { id, name, attending, message } = parsed.data;
  try {
    const wish = await updateWish(id, {
      name: censorMessage(name).clean,
      attending,
      message: censorMessage(message).clean,
    });
    if (!wish) {
      return NextResponse.json({ error: "Ucapan tidak ditemukan." }, { status: 404 });
    }
    return NextResponse.json({ configured: true, wish });
  } catch {
    return NextResponse.json({ error: "Gagal memperbarui ucapan." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!isWishesDbConfigured()) {
    return NextResponse.json({ configured: false }, { status: 503 });
  }
  const denied = requireAdmin(req);
  if (denied) return denied;

  const id = new URL(req.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id wajib diisi." }, { status: 400 });
  }
  try {
    const ok = await deleteWish(id);
    if (!ok) {
      return NextResponse.json({ error: "Ucapan tidak ditemukan." }, { status: 404 });
    }
    return NextResponse.json({ configured: true, deleted: id });
  } catch {
    return NextResponse.json({ error: "Gagal menghapus ucapan." }, { status: 500 });
  }
}
