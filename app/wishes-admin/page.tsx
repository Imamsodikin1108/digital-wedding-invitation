"use client";

import { useEffect, useState } from "react";
import {
  MessageSquareHeart, RefreshCw, Plus, Pencil, Trash2, Check, X,
  Globe, Smartphone, Loader2, KeyRound,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  useWishesStore, type Attending, type Wish, type WishInput,
} from "@/providers/wishesStore";
import { cn } from "@/lib/utils";

const ATTENDING: { value: Attending; label: string }[] = [
  { value: "yes", label: "Hadir" },
  { value: "maybe", label: "Mungkin Hadir" },
  { value: "no", label: "Tidak Hadir" },
];
const LABEL: Record<Attending, string> = {
  yes: "Hadir",
  maybe: "Mungkin Hadir",
  no: "Tidak Hadir",
};

const inputCls =
  "w-full px-3 h-10 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-jakarta text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold";

export default function WishesAdminPage() {
  const wishes = useWishesStore((s) => s.wishes);
  const loaded = useWishesStore((s) => s.loaded);
  const shared = useWishesStore((s) => s.shared);
  const refresh = useWishesStore((s) => s.refresh);
  const submit = useWishesStore((s) => s.submit);
  const editWish = useWishesStore((s) => s.editWish);
  const removeWish = useWishesStore((s) => s.removeWish);

  const [token, setToken] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    refresh();
    setToken(sessionStorage.getItem("wishes_admin_token") || "");
  }, [refresh]);

  useEffect(() => {
    sessionStorage.setItem("wishes_admin_token", token);
  }, [token]);

  function flash(msg: string) {
    setNotice(msg);
    setTimeout(() => setNotice(""), 3000);
  }

  return (
    <main className="min-h-screen bg-[var(--background)] py-10 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        <header className="text-center flex flex-col gap-2">
          <span className="font-cinzel text-gold text-xs tracking-[0.25em] uppercase">
            Admin Panel
          </span>
          <h1 className="font-cormorant font-semibold text-4xl text-[var(--foreground)]">
            Kelola Ucapan
          </h1>
          <span className="inline-flex items-center justify-center gap-1.5 font-jakarta text-[11px] text-[var(--muted-foreground)]">
            {shared ? (
              <><Globe className="w-3.5 h-3.5 text-gold" /> Server aktif — dibagikan ke semua tamu</>
            ) : (
              <><Smartphone className="w-3.5 h-3.5 text-gold" /> Mode lokal — hanya perangkat ini</>
            )}
          </span>
        </header>

        {/* Admin token — hanya relevan saat server aktif */}
        {shared && (
          <label className="flex flex-col gap-1.5">
            <span className="font-jakarta text-xs font-semibold text-[var(--foreground)] flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-gold" /> Token Admin
            </span>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Isi ADMIN_TOKEN"
              className={inputCls}
            />
            <span className="font-jakarta text-[11px] text-[var(--muted-foreground)]">
              Wajib untuk edit / hapus. Sesuai env <code className="text-gold">ADMIN_TOKEN</code>.
            </span>
          </label>
        )}

        {notice && (
          <p className="font-jakarta text-xs text-rose text-center">{notice}</p>
        )}

        <AddForm
          onAdd={async (data) => {
            const r = await submit(data);
            if (!r.ok) flash(r.error || "Gagal menambah ucapan.");
          }}
        />

        {/* List */}
        <div className="flex items-center justify-between">
          <h2 className="font-jakarta text-sm font-semibold text-[var(--foreground)]">
            Daftar Ucapan ({wishes.length})
          </h2>
          <button
            onClick={refresh}
            className="inline-flex items-center gap-1 text-xs text-[var(--muted-foreground)] hover:text-gold transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Muat ulang
          </button>
        </div>

        {!loaded ? (
          <div className="flex items-center justify-center gap-2 py-10 text-[var(--muted-foreground)]">
            <Loader2 className="w-5 h-5 animate-spin text-gold" />
            <span className="font-jakarta text-sm">Memuat…</span>
          </div>
        ) : wishes.length === 0 ? (
          <p className="text-center font-jakarta text-sm text-[var(--muted-foreground)] py-8">
            Belum ada ucapan.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {wishes.map((w) => (
              <AdminWishCard
                key={w.id}
                wish={w}
                onSave={async (data) => {
                  const r = await editWish(w.id, data, token);
                  if (!r.ok) flash(r.error || "Gagal menyimpan.");
                  return r.ok;
                }}
                onDelete={async () => {
                  const r = await removeWish(w.id, token);
                  if (!r.ok) flash(r.error || "Gagal menghapus.");
                }}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function AddForm({ onAdd }: { onAdd: (d: WishInput) => Promise<void> }) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<Attending>("yes");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function handle() {
    if (name.trim().length < 2 || message.trim().length < 1) return;
    setBusy(true);
    await onAdd({ name: name.trim(), attending, message: message.trim() });
    setBusy(false);
    setName("");
    setMessage("");
    setAttending("yes");
  }

  return (
    <div className="rounded-2xl border border-gold/30 bg-[var(--card)] p-4 flex flex-col gap-3">
      <span className="font-jakarta text-xs font-semibold text-[var(--foreground)] flex items-center gap-1.5">
        <Plus className="w-4 h-4 text-gold" /> Tambah Ucapan
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama"
          className={inputCls}
        />
        <select
          value={attending}
          onChange={(e) => setAttending(e.target.value as Attending)}
          className={inputCls}
        >
          {ATTENDING.map((a) => (
            <option key={a.value} value={a.value}>{a.label}</option>
          ))}
        </select>
      </div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ucapan / doa"
        rows={2}
        className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-jakarta text-sm resize-y focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      />
      <div>
        <Button size="sm" onClick={handle} disabled={busy}>
          <Plus className="w-4 h-4" /> {busy ? "Menyimpan…" : "Tambah"}
        </Button>
      </div>
    </div>
  );
}

function AdminWishCard({
  wish,
  onSave,
  onDelete,
}: {
  wish: Wish;
  onSave: (d: WishInput) => Promise<boolean>;
  onDelete: () => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(wish.name);
  const [attending, setAttending] = useState<Attending>(wish.attending);
  const [message, setMessage] = useState(wish.message);
  const [busy, setBusy] = useState(false);

  async function save() {
    setBusy(true);
    const ok = await onSave({ name: name.trim(), attending, message: message.trim() });
    setBusy(false);
    if (ok) setEditing(false);
  }

  if (editing) {
    return (
      <div className="rounded-xl border border-gold/40 bg-[var(--card)] p-3.5 flex flex-col gap-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
          <select
            value={attending}
            onChange={(e) => setAttending(e.target.value as Attending)}
            className={inputCls}
          >
            {ATTENDING.map((a) => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={2}
          className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-jakarta text-sm resize-y focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        />
        <div className="flex gap-2">
          <Button size="sm" onClick={save} disabled={busy}>
            <Check className="w-4 h-4" /> Simpan
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setName(wish.name);
              setAttending(wish.attending);
              setMessage(wish.message);
              setEditing(false);
            }}
          >
            <X className="w-4 h-4" /> Batal
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3.5 flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <h4 className="font-cormorant font-semibold text-lg text-[var(--foreground)] min-w-0 truncate">
          {wish.name}
        </h4>
        <span
          className={cn(
            "shrink-0 font-jakarta text-[10px] px-2.5 py-1 rounded-full",
            wish.attending === "no" ? "bg-rose/15 text-rose" : "bg-green/15 text-green"
          )}
        >
          {LABEL[wish.attending]}
        </span>
      </div>
      <p className="font-jakarta text-sm text-[var(--muted-foreground)] leading-relaxed whitespace-pre-line">
        {wish.message}
      </p>
      <div className="flex gap-2 pt-1">
        <button
          onClick={() => setEditing(true)}
          className="inline-flex items-center gap-1 text-xs text-[var(--muted-foreground)] hover:text-gold transition-colors"
        >
          <Pencil className="w-3.5 h-3.5" /> Edit
        </button>
        <button
          onClick={() => {
            if (confirm(`Hapus ucapan dari "${wish.name}"?`)) onDelete();
          }}
          className="inline-flex items-center gap-1 text-xs text-[var(--muted-foreground)] hover:text-rose transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" /> Hapus
        </button>
      </div>
    </div>
  );
}
