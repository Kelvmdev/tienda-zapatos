import type { Metadata } from "next";
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";

type Zapato = {
  slug: string;
  nombre: string;
  marca: string;
  precio: number;
  imagen: string;
  descripcion: string;
  tallas: number[];
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ruta = path.join(process.cwd(), "content", "data.json");
  const data = JSON.parse(fs.readFileSync(ruta, "utf-8")) as { zapatos: Zapato[] };
  const zapato = data.zapatos.find((z) => z.slug === slug);
  if (!zapato) return { title: "Zapato no encontrado" };
  return {
    title: zapato.nombre,
    description: zapato.descripcion,
    openGraph: {
      title: zapato.nombre,
      description: zapato.descripcion,
      images: [zapato.imagen],
    },
  };
}
export default async function ZapatoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const ruta = path.join(process.cwd(), "content", "data.json");
  const data = JSON.parse(fs.readFileSync(ruta, "utf-8"));
  const zapatos: Zapato[] = data.zapatos;

  const zapato = zapatos.find((z) => z.slug === slug);

  if (!zapato) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-emerald-400 hover:underline">← Volver al catálogo</Link>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <img
            src={zapato.imagen}
            alt={zapato.nombre}
            className="w-full aspect-square object-cover rounded-2xl"
          />

          <div>
            <p className="text-sm text-neutral-400">{zapato.marca}</p>
            <h1 className="text-3xl font-bold">{zapato.nombre}</h1>
            <p className="mt-4 text-2xl text-emerald-400 font-bold">
              ${zapato.precio.toLocaleString("es-CO")} COP
            </p>
            <p className="mt-6 text-neutral-300 leading-relaxed">{zapato.descripcion}</p>

            <div className="mt-6">
              <p className="text-sm text-neutral-400 mb-2">Tallas disponibles:</p>
              <div className="flex flex-wrap gap-2">
                {zapato.tallas.map((talla) => (
                  <span key={talla} className="border border-neutral-700 rounded-lg px-3 py-1 text-sm">
                    {talla}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}