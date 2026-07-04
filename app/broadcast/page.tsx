"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Upload, Users, MessageCircle, Copy, Check, Download, Trash2, Link2,
  RotateCcw, Circle, CheckCircle2, Zap, Square, Info, Pencil, X, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WEDDING } from "@/constants/wedding";
import {
  parseGuestRows, buildInviteLink, buildMessage, buildWaLink, normalizePhone,
  type Guest,
} from "@/lib/broadcast";
import { cn } from "@/lib/utils";

const DEFAULT_TEMPLATE = `Assalamu'alaikum Warahmatullahi Wabarakatuh

Kepada Yth.
Bapak/Ibu/Saudara/i
*{nama}*

Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:

*${WEDDING.groom.nickname} & ${WEDDING.bride.nickname}*
🗓️ ${WEDDING.date}

Berikut link undangan digital kami:
{link}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Terima kasih 🙏
Wassalamu'alaikum Warahmatullahi Wabarakatuh`;

export default function BroadcastPage() {
  const [baseUrl, setBaseUrl] = useState("");
  const [template, setTemplate] = useState(DEFAULT_TEMPLATE);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState<Set<string>>(new Set());

  useEffect(() => {
    setBaseUrl(window.location.origin);
    try {
      const raw = localStorage.getItem("broadcast_sent");
      if (raw) setSent(new Set(JSON.parse(raw) as string[]));
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  function writeStorage(s: Set<string>) {
    try {
      localStorage.setItem("broadcast_sent", JSON.stringify([...s]));
    } catch {
      /* storage unavailable */
    }
  }

  // Functional updates → aman dari stale closure saat dipanggil di dalam loop.
  const markSent = useCallback((name: string) => {
    setSent((prev) => {
      if (prev.has(name)) return prev;
      const next = new Set(prev);
      next.add(name);
      writeStorage(next);
      return next;
    });
  }, []);

  const toggleSent = useCallback((name: string) => {
    setSent((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      writeStorage(next);
      return next;
    });
  }, []);

  const resetSent = useCallback(() => {
    setSent(() => {
      const empty = new Set<string>();
      writeStorage(empty);
      return empty;
    });
  }, []);

  // Edit nomor HP tamu (termasuk yang sudah tercatat terkirim).
  const updatePhone = useCallback((id: string, raw: string) => {
    setGuests((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, phone: normalizePhone(raw) } : g
      )
    );
  }, []);

  // ── Kirim Otomatis (berurutan, assisted) ──────────────────
  const [autoRunning, setAutoRunning] = useState(false);
  const [autoPos, setAutoPos] = useState(0);
  const [autoTotal, setAutoTotal] = useState(0);
  const [intervalSec, setIntervalSec] = useState(8);
  const [autoError, setAutoError] = useState("");
  const [autoCountdown, setAutoCountdown] = useState(0);

  const waWinRef = useRef<Window | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const fallbackTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const queueRef = useRef<Guest[]>([]);
  const nextIndexRef = useRef(0);
  const countdownRef = useRef(0);
  const baseUrlRef = useRef(baseUrl);
  const templateRef = useRef(template);
  const intervalRef = useRef(intervalSec);
  baseUrlRef.current = baseUrl;
  templateRef.current = template;
  intervalRef.current = intervalSec;

  // Dibuka sebagai POPUP WINDOW (bukan tab) agar tab admin tetap terlihat,
  // sehingga setTimeout tidak di-throttle browser & loop terus berjalan.
  const WA_FEATURES = "popup=yes,width=1024,height=760,left=120,top=80";

  const stopAuto = useCallback(() => {
    workerRef.current?.postMessage({ type: "stop" });
    if (fallbackTimerRef.current) {
      clearInterval(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
    setAutoRunning(false);
    setAutoCountdown(0);
  }, []);

  // Navigasi jendela yang SAMA ke tamu ke-i — tak pernah membuka tab/window baru.
  const sendOne = useCallback(
    (i: number) => {
      const win = waWinRef.current;
      if (!win || win.closed) {
        setAutoError(
          "Jendela WhatsApp tertutup / diblokir. Izinkan pop-up, lalu klik Mulai lagi."
        );
        stopAuto();
        return;
      }
      const queue = queueRef.current;
      if (i >= queue.length) {
        stopAuto();
        return;
      }
      const g = queue[i];
      const link = buildInviteLink(baseUrlRef.current, g.name);
      const msg = buildMessage(templateRef.current, g.name, link);
      win.location.href = `https://web.whatsapp.com/send?phone=${g.phone}&text=${encodeURIComponent(msg)}`;
      win.focus();
      markSent(g.name);
      setAutoPos(i + 1);
      nextIndexRef.current = i + 1;
    },
    [markSent, stopAuto]
  );

  // Dipanggil tiap 1 detik. Saat countdown habis → kirim tamu berikutnya.
  const tick = useCallback(() => {
    const next = countdownRef.current - 1;
    if (next <= 0) {
      if (nextIndexRef.current >= queueRef.current.length) {
        stopAuto();
        return;
      }
      sendOne(nextIndexRef.current);
      countdownRef.current = Math.max(3, intervalRef.current);
      setAutoCountdown(countdownRef.current);
    } else {
      countdownRef.current = next;
      setAutoCountdown(next);
    }
  }, [sendOne, stopAuto]);
  const tickRef = useRef(tick);
  tickRef.current = tick;

  // Sumber detak 1 detik. Web Worker TIDAK di-throttle browser walau jendela
  // admin tertutup jendela WhatsApp. Fallback ke setInterval bila Worker gagal.
  const startTicker = useCallback(() => {
    countdownRef.current = Math.max(3, intervalRef.current);
    setAutoCountdown(countdownRef.current);
    try {
      if (!workerRef.current) {
        const code =
          "let id;onmessage=function(e){if(e.data.type==='start'){clearInterval(id);id=setInterval(function(){postMessage('t');},1000);}else if(e.data.type==='stop'){clearInterval(id);}};";
        const url = URL.createObjectURL(
          new Blob([code], { type: "text/javascript" })
        );
        const w = new Worker(url);
        w.onmessage = () => tickRef.current();
        workerRef.current = w;
      }
      workerRef.current.postMessage({ type: "start" });
    } catch {
      if (fallbackTimerRef.current) clearInterval(fallbackTimerRef.current);
      fallbackTimerRef.current = setInterval(() => tickRef.current(), 1000);
    }
  }, []);

  const startAuto = useCallback(() => {
    const queue = guests.filter((g) => g.phone && !sent.has(g.name));
    if (queue.length === 0) return;
    setAutoError("");
    // Buka popup window DALAM gesture klik (satu-satunya window.open).
    const win = window.open("about:blank", "wa_broadcast", WA_FEATURES);
    if (!win) {
      setAutoError(
        "Pop-up diblokir browser. Izinkan pop-up untuk situs ini, lalu klik Mulai lagi."
      );
      return;
    }
    waWinRef.current = win;
    queueRef.current = queue;
    setAutoTotal(queue.length);
    setAutoPos(0);
    setAutoRunning(true);
    sendOne(0);
    startTicker();
  }, [guests, sent, sendOne, startTicker]);

  // Lanjut ke tamu berikutnya segera + reset hitungan jeda.
  const skipNow = useCallback(() => {
    if (!autoRunning) return;
    if (nextIndexRef.current >= queueRef.current.length) {
      stopAuto();
      return;
    }
    sendOne(nextIndexRef.current);
    countdownRef.current = Math.max(3, intervalRef.current);
    setAutoCountdown(countdownRef.current);
  }, [autoRunning, sendOne, stopAuto]);

  useEffect(
    () => () => {
      workerRef.current?.terminate();
      if (fallbackTimerRef.current) clearInterval(fallbackTimerRef.current);
    },
    []
  );

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setLoading(true);
    try {
      const XLSX = await import("xlsx");
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf, { type: "array" });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<(string | number | null)[]>(sheet, {
        header: 1,
        blankrows: false,
      });
      const parsed = parseGuestRows(rows);
      if (parsed.length === 0) {
        setError("Tidak ada nama tamu yang terbaca. Pastikan ada kolom Nama.");
      }
      setGuests(parsed);
      setFileName(file.name);
    } catch {
      setError("Gagal membaca file. Pastikan format .xlsx / .xls valid.");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  }

  async function downloadSample() {
    const XLSX = await import("xlsx");
    const ws = XLSX.utils.aoa_to_sheet([
      ["Nama", "No HP"],
      ["Bapak Budi Santoso", "081234567890"],
      ["Ibu Siti & Keluarga", "081298765432"],
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tamu");
    XLSX.writeFile(wb, "contoh-daftar-tamu.xlsx");
  }

  const withPhone = useMemo(
    () => guests.filter((g) => g.phone).length,
    [guests]
  );

  const sentCount = useMemo(
    () => guests.filter((g) => sent.has(g.name)).length,
    [guests, sent]
  );
  const progress = guests.length
    ? Math.round((sentCount / guests.length) * 100)
    : 0;
  const hasPhones = useMemo(() => guests.some((g) => g.phone), [guests]);
  const phoneUnsent = useMemo(
    () => guests.filter((g) => g.phone && !sent.has(g.name)).length,
    [guests, sent]
  );

  return (
    <main className="min-h-screen bg-[var(--background)] py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <header className="text-center flex flex-col gap-2">
          <span className="font-cinzel text-gold text-xs tracking-[0.25em] uppercase">
            Admin Panel
          </span>
          <h1 className="font-cormorant font-semibold text-4xl text-[var(--foreground)]">
            Broadcast Undangan
          </h1>
          <p className="font-jakarta text-sm text-[var(--muted-foreground)] max-w-md mx-auto">
            Upload Excel daftar tamu, lalu kirim undangan personal via WhatsApp.
            Nama tamu otomatis muncul di halaman &quot;Kepada Yth.&quot;
          </p>
        </header>

        {/* Settings */}
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="font-jakarta text-xs font-semibold text-[var(--foreground)] flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-gold" /> Base URL Undangan
            </span>
            <input
              type="url"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://undangan-anda.vercel.app"
              className="h-10 px-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-jakarta text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            />
            <span className="font-jakarta text-[11px] text-[var(--muted-foreground)]">
              Ganti ke domain produksi Anda setelah deploy.
            </span>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="font-jakarta text-xs font-semibold text-[var(--foreground)] flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-gold" /> Template Pesan WhatsApp
            </span>
            <textarea
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              rows={8}
              className="px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-jakarta text-sm leading-relaxed resize-y focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            />
            <span className="font-jakarta text-[11px] text-[var(--muted-foreground)]">
              Gunakan <code className="text-gold">{"{nama}"}</code> dan{" "}
              <code className="text-gold">{"{link}"}</code> — akan diganti otomatis per tamu.
            </span>
          </label>
        </section>

        {/* Upload */}
        <section className="rounded-2xl border border-dashed border-gold/40 bg-[var(--card)] p-6 flex flex-col items-center gap-4 text-center">
          <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
            <Upload className="w-6 h-6 text-gold" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-jakarta text-sm font-semibold text-[var(--foreground)]">
              Upload Daftar Tamu (.xlsx)
            </p>
            <p className="font-jakarta text-xs text-[var(--muted-foreground)]">
              Kolom: <b>Nama</b> (wajib) &amp; <b>No HP</b> (opsional)
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <label>
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFile}
                className="hidden"
              />
              <span className="inline-flex items-center gap-2 h-11 px-7 rounded-full bg-gold text-white font-jakarta font-medium text-sm cursor-pointer hover:bg-gold-dark transition-colors shadow-[var(--shadow-gold)]">
                <Upload className="w-4 h-4" /> {loading ? "Membaca..." : "Pilih File Excel"}
              </span>
            </label>
            <Button variant="outline" size="md" onClick={downloadSample}>
              <Download className="w-4 h-4" /> Contoh Format
            </Button>
          </div>
          {fileName && (
            <p className="font-jakarta text-xs text-green">
              ✓ {fileName} — {guests.length} tamu ({withPhone} dengan nomor HP)
            </p>
          )}
          {error && (
            <p className="font-jakarta text-xs text-rose">{error}</p>
          )}
        </section>

        {/* Guest list */}
        {guests.length > 0 && (
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="font-jakarta text-sm font-semibold text-[var(--foreground)] flex items-center gap-2">
                <Users className="w-4 h-4 text-gold" /> Daftar Tamu ({guests.length})
              </h2>
              <button
                onClick={() => {
                  setGuests([]);
                  setFileName("");
                }}
                className="inline-flex items-center gap-1 text-xs text-[var(--muted-foreground)] hover:text-rose transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Hapus daftar
              </button>
            </div>

            {/* Progress "sudah dikirim" */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="font-jakarta text-xs font-semibold text-[var(--foreground)] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green" />
                  Sudah dikirim:{" "}
                  <span className="text-green">{sentCount}</span>
                  <span className="text-[var(--muted-foreground)]">
                    / {guests.length} ({progress}%)
                  </span>
                </span>
                {sentCount > 0 && (
                  <button
                    onClick={resetSent}
                    className="inline-flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] hover:text-rose transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset status
                  </button>
                )}
              </div>
              <div className="h-2 rounded-full bg-[var(--muted)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-green transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Kirim Otomatis (berurutan) */}
            {hasPhones && (
              <div className="rounded-xl border border-gold/30 bg-[var(--card)] p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-gold" />
                  <span className="font-jakarta text-xs font-semibold text-[var(--foreground)]">
                    Kirim Otomatis (berurutan)
                  </span>
                </div>

                <div className="flex items-start gap-2 rounded-lg bg-[var(--muted)] p-2.5">
                  <Info className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                  <p className="font-jakarta text-[11px] text-[var(--muted-foreground)] leading-relaxed">
                    Sebuah <b>jendela pop-up</b> WhatsApp Web dibuka lalu berpindah
                    otomatis ke tamu berikutnya tiap jeda. Anda cukup menekan tombol{" "}
                    <b className="text-green">kirim (➤)</b> di tiap chat yang muncul —
                    WhatsApp tidak mengizinkan penekanan tombol kirim secara otomatis.
                    <br />
                    <b>Penting:</b> izinkan pop-up, sudah login WhatsApp Web, dan{" "}
                    <b>jangan tutup / minimize tab admin ini</b> agar loop tidak
                    berhenti. Jika sempat tertunda, klik <b>Lanjut sekarang</b>.
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <label className="flex items-center gap-1.5 font-jakarta text-xs text-[var(--muted-foreground)]">
                    Jeda
                    <input
                      type="number"
                      min={3}
                      max={120}
                      value={intervalSec}
                      onChange={(e) =>
                        setIntervalSec(Math.max(3, Number(e.target.value) || 3))
                      }
                      disabled={autoRunning}
                      className="w-16 h-9 px-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:opacity-50"
                    />
                    detik
                  </label>

                  {!autoRunning ? (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={startAuto}
                      disabled={phoneUnsent === 0}
                    >
                      <Zap className="w-4 h-4" />
                      Mulai Kirim Otomatis ({phoneUnsent})
                    </Button>
                  ) : (
                    <>
                      <Button variant="secondary" size="sm" onClick={stopAuto}>
                        <Square className="w-4 h-4" />
                        Berhenti ({autoPos}/{autoTotal})
                      </Button>
                      <Button variant="primary" size="sm" onClick={skipNow}>
                        <ChevronRight className="w-4 h-4" />
                        Lanjut sekarang
                      </Button>
                    </>
                  )}
                </div>

                {autoRunning && (
                  <p className="font-jakarta text-[11px] text-gold">
                    Tamu ke-{autoPos} dari {autoTotal} terkirim · pindah ke berikutnya
                    dalam <b>{autoCountdown}s</b> · tekan kirim (➤) di WhatsApp.
                  </p>
                )}
                {autoError && (
                  <p className="font-jakarta text-[11px] text-rose leading-relaxed">
                    ⚠️ {autoError}
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-col gap-2.5">
              {guests.map((g) => (
                <GuestRow
                  key={g.id}
                  guest={g}
                  baseUrl={baseUrl}
                  template={template}
                  isSent={sent.has(g.name)}
                  onMarkSent={markSent}
                  onToggleSent={toggleSent}
                  onUpdatePhone={updatePhone}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function GuestRow({
  guest,
  baseUrl,
  template,
  isSent,
  onMarkSent,
  onToggleSent,
  onUpdatePhone,
}: {
  guest: Guest;
  baseUrl: string;
  template: string;
  isSent: boolean;
  onMarkSent: (name: string) => void;
  onToggleSent: (name: string) => void;
  onUpdatePhone: (id: string, raw: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);
  const [phoneInput, setPhoneInput] = useState(guest.phone);
  const link = buildInviteLink(baseUrl, guest.name);
  const message = buildMessage(template, guest.name, link);
  const waLink = buildWaLink(guest.phone, message);

  async function copyLink() {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function savePhone() {
    onUpdatePhone(guest.id, phoneInput);
    setEditing(false);
  }
  function cancelEdit() {
    setPhoneInput(guest.phone);
    setEditing(false);
  }

  return (
    <div
      className={cn(
        "rounded-xl border p-3.5 flex items-center gap-3 transition-colors",
        isSent
          ? "border-green/40 bg-green/5"
          : "border-[var(--border)] bg-[var(--card)]"
      )}
    >
      {/* Status toggle */}
      <button
        onClick={() => onToggleSent(guest.name)}
        className={cn(
          "shrink-0 transition-colors",
          isSent ? "text-green" : "text-[var(--muted-foreground)]/40 hover:text-gold"
        )}
        aria-label={isSent ? "Tandai belum dikirim" : "Tandai sudah dikirim"}
        title={isSent ? "Sudah dikirim — klik untuk batalkan" : "Tandai sudah dikirim"}
      >
        {isSent ? (
          <CheckCircle2 className="w-5 h-5" />
        ) : (
          <Circle className="w-5 h-5" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p className="font-jakarta text-sm font-semibold text-[var(--foreground)] truncate">
          {guest.name}
        </p>
        {editing ? (
          <div className="flex items-center gap-1.5 mt-1">
            <input
              type="tel"
              value={phoneInput}
              autoFocus
              onChange={(e) => setPhoneInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") savePhone();
                if (e.key === "Escape") cancelEdit();
              }}
              placeholder="08xxxxxxxxxx"
              className="w-36 h-7 px-2 rounded-md border border-gold/40 bg-[var(--background)] text-[var(--foreground)] text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            />
            <button
              onClick={savePhone}
              className="text-green hover:opacity-70"
              aria-label="Simpan nomor"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={cancelEdit}
              className="text-[var(--muted-foreground)] hover:text-rose"
              aria-label="Batal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setPhoneInput(guest.phone);
              setEditing(true);
            }}
            className="group/phone inline-flex items-center gap-1.5 font-jakarta text-xs text-[var(--muted-foreground)] hover:text-gold transition-colors"
            title="Edit nomor HP"
          >
            {guest.phone ? `+${guest.phone}` : "Tambah nomor HP"}
            <Pencil className="w-3 h-3 opacity-0 group-hover/phone:opacity-100 transition-opacity" />
          </button>
        )}
      </div>

      <button
        onClick={copyLink}
        className={cn(
          "shrink-0 inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-xs font-jakarta font-medium transition-colors border",
          copied
            ? "border-green text-green"
            : "border-[var(--border)] text-[var(--muted-foreground)] hover:border-gold hover:text-gold"
        )}
        aria-label="Salin link undangan"
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? "Tersalin" : "Link"}
      </button>

      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onMarkSent(guest.name)}
        className="shrink-0 inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-xs font-jakarta font-semibold text-white transition-colors"
        style={{ backgroundColor: "#25D366" }}
        aria-label={`Kirim WhatsApp ke ${guest.name}`}
      >
        <MessageCircle className="w-3.5 h-3.5" /> Kirim
      </a>
    </div>
  );
}
