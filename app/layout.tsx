import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "研究儀表板 | MADHORSE Ltd.",
  description: "COO 市場情報儀表板",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-HK">
      <body>{children}</body>
    </html>
  );
}
