"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const FORMSPREE = "https://formspree.io/f/mqeoeqob";

export default function ContactoPage() {
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function manejarEnvio(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setEnviando(true);

    const datos = new FormData(e.currentTarget);
    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        body: datos,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        router.push("/gracias");
      } else {
        setError("No se pudo enviar. Intenta de nuevo.");
        setEnviando(false);
      }
    } catch {
      setError("Error de conexión. Revisa tu internet e intenta otra vez.");
      setEnviando(false);
    }
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-16 md:py-20">
      <Link href="/" className="text-sm text-tenue transition hover:text-hueso">
        ← Volver a la tienda
      </Link>

      <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-hueso md:text-4xl">
        Contáctanos
      </h1>
      <p className="mt-3 mb-10 text-tenue">
        ¿Dudas sobre un modelo o tu talla? Escríbenos y te respondemos.
      </p>

      <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
        <input
          type="text"
          name="nombre"
          required
          placeholder="Tu nombre"
          className="rounded-lg border border-linea bg-grafito-deep px-4 py-3 text-sm text-hueso outline-none transition placeholder:text-tenue-2 focus:border-borde"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Tu correo"
          className="rounded-lg border border-linea bg-grafito-deep px-4 py-3 text-sm text-hueso outline-none transition placeholder:text-tenue-2 focus:border-borde"
        />
        <textarea
          name="mensaje"
          required
          rows={5}
          placeholder="Tu mensaje"
          className="resize-none rounded-lg border border-linea bg-grafito-deep px-4 py-3 text-sm text-hueso outline-none transition placeholder:text-tenue-2 focus:border-borde"
        />
        <button
          type="submit"
          disabled={enviando}
          className="rounded-lg bg-hueso py-3 text-sm font-medium text-grafito transition duration-150 active:scale-95 hover:opacity-90 disabled:opacity-60 disabled:active:scale-100"
        >
          {enviando ? "Enviando…" : "Enviar mensaje"}
        </button>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </form>
    </main>
  );
}