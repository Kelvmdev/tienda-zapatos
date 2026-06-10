import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center md:py-32">
      <p className="font-display text-sm font-medium uppercase tracking-[0.24em] text-tenue-2">
        Error 404
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-hueso md:text-4xl">
        Página no encontrada
      </h1>
      <p className="mt-4 leading-relaxed text-tenue">
        El enlace que seguiste no existe o el producto ya no está disponible.
      </p>
      <Link
        href="/#catalogo"
        className="mt-10 inline-block rounded-lg bg-hueso px-7 py-3 text-sm font-medium text-grafito transition duration-150 active:scale-95 hover:opacity-90"
      >
        Volver al catálogo
      </Link>
    </main>
  );
}
