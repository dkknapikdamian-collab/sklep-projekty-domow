import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Projekty Domów Premium",
  description: "Nowoczesny sklep z projektami domów"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
