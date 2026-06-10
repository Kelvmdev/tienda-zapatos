import type { Metadata } from "next";
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { imagenOptimizada } from "../../lib/img";
import { construirMeta } from "../../lib/meta";

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
  return construirMeta({
    title: zapato.nombre,
    description: zapato.descripcion,
    image: imagenOptimizada(zapato.imagen, 1200),
  });
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: zapato.nombre,
    description: zapato.descripcion,
    image: zapato.imagen,
    brand: { "@type": "Brand", name: zapato.marca },
    offers: {
      "@type": "Offer",
      price: zapato.precio,
      priceCurrency: "COP",
      availability: "https://schema.org/InStock",
      url: `https://tienda-zapatos-gamma.vercel.app/zapatos/${zapato.slug}`,
    },
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href="/#catalogo" className="text-sm text-tenue transition hover:text-hueso">
        ← Volver al catálogo
      </Link>

      <div className="mt-8 grid grid-cols-1 gap-8 md:mt-12 md:grid-cols-2 md:gap-12">
        <div className="overflow-hidden rounded-2xl bg-superficie">
          <img
            src={imagenOptimizada(zapato.imagen, 1000)}
            alt={zapato.nombre}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-xs uppercase tracking-widest text-tenue-2">{zapato.marca}</p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-hueso md:text-4xl">
            {zapato.nombre}
          </h1>
          <p className="mt-4 text-2xl font-medium text-hueso">
            ${zapato.precio.toLocaleString("es-CO")}
          </p>
          <p className="mt-6 leading-relaxed text-tenue">{zapato.descripcion}</p>

          <div className="mt-8">
            <p className="mb-3 text-xs uppercase tracking-widest text-tenue-2">Tallas disponibles</p>
            <div className="flex flex-wrap gap-2">
              {zapato.tallas.map((talla) => (
                <span
                  key={talla}
                  className="min-w-11 rounded-lg border border-borde px-3 py-2 text-center text-sm text-hueso"
                >
                  {talla}
                </span>
              ))}
            </div>
          </div>

          <Link
            href="/contacto"
            className="mt-10 inline-block rounded-lg bg-hueso px-7 py-3 text-center text-sm font-medium text-grafito transition duration-150 active:scale-95 hover:opacity-90"
          >
            Consultar disponibilidad
          </Link>
        </div>
      </div>
    </main>
  );
}