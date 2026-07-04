import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Broadcast Undangan",
  robots: { index: false, follow: false },
};

export default function BroadcastLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
