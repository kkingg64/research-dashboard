import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Research Dashboard | MADHORSE Ltd.",
  description: "COO Market Intelligence Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
