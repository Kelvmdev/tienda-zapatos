import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import Image from "next/image";
import Mapa from "./Mapa";
import { marcasUnicas } from "./lib/marcas";
import { conteoProductos } from "./lib/texto";
import TarjetaZapato from "./components/TarjetaZapato";

type Zapato = {
  slug: string;
  nombre: string;
  marca: string;
  precio: number;
  imagen: string;
  descripcion: string;
  tallas: number[];
};

type Site = {
  hero: {
    eyebrow: string;
    titulo: string;
    subtitulo: string;
    ctaTexto: string;
    imagen: string;
    imagenAlt: string;
  };
  marcas: { titulo: string };
  confianza: { titulo: string; detalle: string }[];
};

export default function HomePage() {
  const ruta = path.join(process.cwd(), "content", "data.json");
  const data = JSON.parse(fs.readFileSync(ruta, "utf-8"));
  const zapatos: Zapato[] = data.zapatos;
  const site: Site = data.site;
  const marcas = marcasUnicas(zapatos);

  return (
    <>
      <main>
        <section className="border-b border-linea">
          <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2">
            <div className="px-6 py-20 md:py-28">
              <p className="mb-5 text-xs uppercase tracking-[0.24em] text-tenue-2">{site.hero.eyebrow}</p>
              <h1 className="whitespace-pre-line font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[0.95] tracking-tight text-hueso">
                {site.hero.titulo}
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-tenue">
                {site.hero.subtitulo}
              </p>
              <Link
                href="#catalogo"
                className="mt-8 inline-block rounded-lg bg-hueso px-7 py-3 text-sm font-medium text-grafito transition duration-150 active:scale-95 hover:opacity-90"
              >
                {site.hero.ctaTexto}
              </Link>
            </div>

            <div className="relative min-h-[18rem] overflow-hidden border-t border-linea bg-grafito-deep md:min-h-0 md:border-l md:border-t-0">
              <Image
                src={site.hero.imagen}
                alt={site.hero.imagenAlt}
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="border-b border-linea">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <p className="text-center text-xs uppercase tracking-[0.2em] text-tenue-2">
              {site.marcas.titulo}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 font-display text-sm font-bold uppercase tracking-wide text-tenue">
              {marcas.map((m, i) => (
                <span key={m.slug} className="flex items-center gap-4">
                  {i > 0 && <span aria-hidden="true" className="font-normal text-linea-suave">/</span>}
                  <Link href={`/marcas/${m.slug}`} className="transition hover:text-hueso">
                    {m.nombre}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="catalogo" className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight text-hueso">Catálogo</h2>
            <span className="text-sm text-tenue">{conteoProductos(zapatos.length)}</span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {zapatos.map((zapato) => (
              <TarjetaZapato key={zapato.slug} {...zapato} />
            ))}
          </div>
        </section>

        <section className="border-y border-linea">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px bg-linea sm:grid-cols-3">
            {site.confianza.map((item) => (
              <div key={item.titulo} className="bg-grafito-deep px-6 py-8 text-center">
                <p className="font-display text-sm font-medium text-hueso">{item.titulo}</p>
                <p className="mt-1 text-xs text-tenue-2">{item.detalle}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Mapa />
    </>
  );
}