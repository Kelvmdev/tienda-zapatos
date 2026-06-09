import type { Metadata } from "next";
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { slugMarca } from "../../lib/marcas";
import TarjetaZapato from "../../components/TarjetaZapato";

type Zapato = {
  slug: string;
  nombre: string;
  marca: string;
  precio: number;
  imagen: string;
  descripcion: string;
  tallas: number[];
};

function leerZapatos(): Zapato[] {
  const ruta = path.join(process.cwd(), "content", "data.json");
  const data = JSON.parse(fs.readFileSync(ruta, "utf-8"));
  return data.zapatos as Zapato[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ marca: string }>;
}): Promise<Metadata> {
  const { marca } = await params;
  const encontrado = leerZapatos().find((z) => slugMarca(z.marca) === marca);
  if (!encontrado) return { title: "Marca no encontrada" };
  return {
    title: encontrado.marca,
    description: `Todos los tenis ${encontrado.marca} disponibles en SOLE.`,
  };
}

export default async function MarcaPage({
  params,
}: {
  params: Promise<{ marca: string }>;
}) {
  const { marca } = await params;
  const dela = leerZapatos().filter((z) => slugMarca(z.marca) === marca);

  if (dela.length === 0) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <Link href="/#catalogo" className="text-sm text-tenue transition hover:text-hueso">
        ← Volver al catálogo
      </Link>

      <div className="mb-8 mt-6 flex items-baseline justify-between">
        <h1 className="font-display text-3xl font-bold tracking-tight text-hueso md:text-4xl">
          {dela[0].marca}
        </h1>
        <span className="text-sm text-tenue">{dela.length} productos</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dela.map((zapato) => (
          <TarjetaZapato key={zapato.slug} {...zapato} />
        ))}
      </div>
    </main>
  );
}