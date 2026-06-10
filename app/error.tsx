"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center md:py-32">
      <p className="font-display text-sm font-medium uppercase tracking-[0.24em] text-tenue-2">
        Algo salió mal
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-hueso md:text-4xl">
        Ocurrió un error inesperado
      </h1>
      <p className="mt-4 leading-relaxed text-tenue">
        Intenta de nuevo. Si el problema persiste, vuelve más tarde.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-hueso px-7 py-3 text-sm font-medium text-grafito transition duration-150 active:scale-95 hover:opacity-90"
        >
          Reintentar
        </button>
        <Link
          href="/"
          className="rounded-lg border border-borde px-7 py-3 text-sm font-medium text-hueso transition duration-150 active:scale-95 hover:bg-superficie"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
