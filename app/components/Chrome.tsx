"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const esAdmin = pathname?.startsWith("/admin");

  return (
    <>
      {!esAdmin && <Navbar />}
      {children}
      {!esAdmin && <Footer />}
    </>
  );
}