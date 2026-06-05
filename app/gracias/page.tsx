import Link from "next/link";

export default function GraciasPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-emerald-400">¡Gracias! 🎉</h1>
        <p className="mt-4 text-neutral-300">Recibimos tu mensaje. Te contactaremos pronto.</p>
        <Link href="/" className="mt-8 inline-block text-emerald-400 hover:underline">← Volver al catálogo</Link>
      </div>
    </main>
  );
}