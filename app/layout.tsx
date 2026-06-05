import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mi Tienda de Zapatos | Tenis al mejor precio",
    template: "%s | Mi Tienda de Zapatos",
  },
  description:
    "Tienda de tenis y zapatillas deportivas: Nike, Adidas, Puma y más, al mejor precio en Colombia.",
  openGraph: {
    title: "Mi Tienda de Zapatos",
    description: "Tenis y zapatillas deportivas al mejor precio.",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
