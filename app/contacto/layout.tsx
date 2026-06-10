import type { Metadata } from "next";
import { construirMeta } from "../lib/meta";

// La página de contacto es "use client" y no puede exportar metadata;
// este layout (server component) le da la suya y solo renderiza el contenido.
export const metadata: Metadata = construirMeta({
  title: "Contacto",
  description: "¿Dudas sobre un modelo o tu talla? Escríbenos y te respondemos.",
});

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
