import { NextResponse } from "next/server";

/**
 * Verifikasi hak admin lewat header `x-admin-token` dibanding env `ADMIN_TOKEN`.
 * Token yang sama dipakai untuk semua halaman admin (broadcast & ucapan).
 * Mengembalikan NextResponse error bila ditolak, atau null bila lolos.
 */
export function requireAdmin(req: Request): NextResponse | null {
  const secret = process.env.ADMIN_TOKEN;
  if (!secret) {
    return NextResponse.json(
      { error: "ADMIN_TOKEN belum diatur di server." },
      { status: 403 }
    );
  }
  if (req.headers.get("x-admin-token") !== secret) {
    return NextResponse.json({ error: "Token admin salah." }, { status: 401 });
  }
  return null;
}
