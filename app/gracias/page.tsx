import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gracias",
  description: "Recibimos tu mensaje. Te contactaremos pronto.",
  robots: { index: false },
};

export default function GraciasPage() {
  return (
    <main className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center md:py-32">
      <p className="text-4xl" aria-hidden="true">
        🎉
      </p>
      <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-hueso md:text-4xl">
        ¡Gracias!
      </h1>
      <p className="mt-4 leading-relaxed text-tenue">
        Recibimos tu mensaje. Te contactaremos pronto.
      </p>
      <Link
        href="/"
        className="mt-10 inline-block rounded-lg bg-hueso px-7 py-3 text-sm font-medium text-grafito transition duration-150 active:scale-95 hover:opacity-90"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
