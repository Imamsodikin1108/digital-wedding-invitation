import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kelola Ucapan",
  robots: { index: false, follow: false },
};

export default function WishesAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
