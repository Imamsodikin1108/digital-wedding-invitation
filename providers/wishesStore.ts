import { create } from "zustand";
import { censorMessage } from "@/lib/profanity";

export type Attending = "yes" | "no" | "maybe";

export interface Wish {
  id: string;
  name: string;
  attending: Attending;
  message: string;
  createdAt: number;
}

export interface WishInput {
  name: string;
  attending: Attending;
  message: string;
}

const LS_KEY = "wedding_wishes";

function loadLocal(): Wish[] {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "[]") as Wish[];
  } catch {
    return [];
  }
}
function saveLocal(list: Wish[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable */
  }
}

interface WishesState {
  wishes: Wish[];
  loading: boolean;
  loaded: boolean;
  /** true bila ucapan tersimpan di server (dibagikan ke semua tamu). */
  shared: boolean;
  refresh: () => Promise<void>;
  submit: (data: WishInput) => Promise<{ ok: boolean; error?: string }>;
  editWish: (
    id: string,
    data: WishInput,
    token: string
  ) => Promise<{ ok: boolean; error?: string }>;
  removeWish: (id: string, token: string) => Promise<{ ok: boolean; error?: string }>;
}

/**
 * Sumber ucapan. Mengutamakan server (API /api/wishes → Vercel Postgres) agar
 * ucapan dibagikan antar tamu. Bila server belum dikonfigurasi / gagal,
 * otomatis fallback ke localStorage (hanya terlihat di perangkat tamu itu).
 */
export const useWishesStore = create<WishesState>((set) => ({
  wishes: [],
  loading: false,
  loaded: false,
  shared: false,

  refresh: async () => {
    set({ loading: true });
    try {
      const res = await fetch("/api/wishes", { cache: "no-store" });
      const data = await res.json();
      if (data.configured) {
        set({ wishes: data.wishes, shared: true, loading: false, loaded: true });
        return;
      }
    } catch {
      /* jaringan gagal → fallback */
    }
    set({ wishes: loadLocal(), shared: false, loading: false, loaded: true });
  },

  submit: async (data) => {
    // 1) Coba simpan ke server.
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 201) {
        const { wish } = await res.json();
        set((s) => ({ wishes: [wish, ...s.wishes], shared: true }));
        return { ok: true };
      }
      if (res.status !== 503) {
        const err = await res.json().catch(() => ({}));
        return { ok: false, error: err.error || "Gagal mengirim ucapan." };
      }
      // 503 = server belum dikonfigurasi → lanjut ke fallback lokal.
    } catch {
      /* jaringan gagal → fallback lokal */
    }

    // 2) Fallback: simpan lokal (dengan filter yang sama).
    const wish: Wish = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: censorMessage(data.name).clean,
      attending: data.attending,
      message: censorMessage(data.message).clean,
      createdAt: Date.now(),
    };
    const next = [wish, ...loadLocal()];
    saveLocal(next);
    set({ wishes: next, shared: false });
    return { ok: true };
  },

  editWish: async (id, data, token) => {
    try {
      const res = await fetch("/api/wishes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify({ id, ...data }),
      });
      if (res.ok) {
        const { wish } = await res.json();
        set((s) => ({ wishes: s.wishes.map((w) => (w.id === id ? wish : w)) }));
        return { ok: true };
      }
      if (res.status !== 503) {
        const err = await res.json().catch(() => ({}));
        return { ok: false, error: err.error || "Gagal memperbarui ucapan." };
      }
    } catch {
      /* fallback lokal */
    }
    const clean: Partial<Wish> = {
      name: censorMessage(data.name).clean,
      attending: data.attending,
      message: censorMessage(data.message).clean,
    };
    const list = loadLocal().map((w) => (w.id === id ? { ...w, ...clean } : w));
    saveLocal(list);
    set({ wishes: list });
    return { ok: true };
  },

  removeWish: async (id, token) => {
    try {
      const res = await fetch(`/api/wishes?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { "x-admin-token": token },
      });
      if (res.ok) {
        set((s) => ({ wishes: s.wishes.filter((w) => w.id !== id) }));
        return { ok: true };
      }
      if (res.status !== 503) {
        const err = await res.json().catch(() => ({}));
        return { ok: false, error: err.error || "Gagal menghapus ucapan." };
      }
    } catch {
      /* fallback lokal */
    }
    const list = loadLocal().filter((w) => w.id !== id);
    saveLocal(list);
    set({ wishes: list });
    return { ok: true };
  },
}));
