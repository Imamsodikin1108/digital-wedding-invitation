import type { LoveStoryItem } from "@/types/wedding";
import { IMAGES } from "@/lib/assets";

export const LOVE_STORY: LoveStoryItem[] = [
  {
    id: "ls-1",
    date: "Awal Perjalanan",
    title: "Pertemuan yang Tak Disangka",
    description:
      "Katanya, jodoh datang dengan cara yang tak disangka. Ternyata… benar juga. Berawal dari pertemuan yang sederhana, yang tak pernah kami duga akan membawa kami sampai sejauh ini.",
    photo: IMAGES.story[1],
  },
  {
    id: "ls-2",
    date: "Mengenal Lebih Dekat",
    title: "Dari Kenalan Menjadi Sahabat",
    description:
      "Hari demi hari, cerita demi cerita. Kami saling mengenal bukan hanya sebagai kenalan, tapi sebagai dua jiwa yang menemukan kenyamanan satu sama lain.",
    photo: IMAGES.story[2],
  },
  {
    id: "ls-3",
    date: "Perjalanan Bersama",
    title: "Cerita yang Ingin Dilanjutkan",
    description:
      "Pertemuan sederhana itu perlahan berubah menjadi cerita yang ingin kami lanjutkan seumur hidup. Terima kasih sudah ikut menjadi bagian dari perjalanan kami.",
    photo: IMAGES.story[3],
  },
  {
    id: "ls-4",
    date: "Lamaran",
    title: "Memantapkan Hati",
    description:
      "Dengan penuh rasa syukur dan keyakinan, kami memutuskan untuk mengubah status dari 'dua orang yang saling menemukan' menjadi 'suami dan istri.'",
    photo: IMAGES.story[4],
  },
  {
    id: "ls-5",
    date: "19 Juli 2026",
    title: "Babak Baru Kehidupan",
    description:
      "Kini, kami mengundang Anda untuk menjadi saksi awal cerita baru kami. Bersama, selamanya.",
    photo: IMAGES.story[5],
  },
];
