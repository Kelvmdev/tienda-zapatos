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
    <main className="min-h-screen bg-neutral-950 text-white px-6 py-12">
      <div className="mx-auto max-w-xl">
        <Link href="/" className="text-sm text-neutral-400 hover:text-white">
          ← Volver a la tienda
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-2">Contáctanos</h1>
        <p className="text-neutral-400 mb-8">
          ¿Dudas sobre un modelo o tu talla? Escríbenos y te respondemos.
        </p>

        <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
          <input
            type="text"
            name="nombre"
            required
            placeholder="Tu nombre"
            className="rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 outline-none focus:border-neutral-500"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Tu correo"
            className="rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 outline-none focus:border-neutral-500"
          />
          <textarea
            name="mensaje"
            required
            rows={5}
            placeholder="Tu mensaje"
            className="rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 outline-none focus:border-neutral-500 resize-none"
          />
          <button
            type="submit"
            disabled={enviando}
            className="rounded-xl bg-emerald-500 text-neutral-950 font-semibold py-3 transition hover:bg-emerald-400 disabled:opacity-60"
          >
            {enviando ? "Enviando…" : "Enviar mensaje"}
          </button>
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </form>
      </div>
    </main>
  );
}