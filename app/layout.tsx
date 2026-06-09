import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import Chrome from "./components/Chrome";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SOLE. | Sneakers curados",
    template: "%s | SOLE.",
  },
  description:
    "Sneakers curados: Nike, Adidas, Puma y más. Originales y envíos a todo Colombia.",
  openGraph: {
    title: "SOLE.",
    description: "Sneakers curados. Originales y envíos a todo Colombia.",
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
      <body className={`${manrope.variable} ${inter.variable} antialiased`}>
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}