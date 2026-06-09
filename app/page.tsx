import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import Mapa from "./Mapa";
import { marcasUnicas } from "./lib/marcas";
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

export default function HomePage() {
  const ruta = path.join(process.cwd(), "content", "data.json");
  const data = JSON.parse(fs.readFileSync(ruta, "utf-8"));
  const zapatos: Zapato[] = data.zapatos;
  const marcas = marcasUnicas(zapatos);

  return (
    <>
      <main>
        <section className="border-b border-linea">
          <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2">
            <div className="px-6 py-20 md:py-28">
              <p className="mb-5 text-xs uppercase tracking-[0.24em] text-tenue-2">Colección 2026</p>
              <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[0.95] tracking-tight text-hueso">
                Cada par,<br />una declaración.
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-tenue">
                Sneakers curados. Sin ruido, solo forma. El producto manda.
              </p>
              <Link
                href="#catalogo"
                className="mt-8 inline-block rounded-lg bg-hueso px-7 py-3 text-sm font-medium text-grafito transition duration-150 active:scale-95 hover:opacity-90"
              >
                Ver catálogo
              </Link>
            </div>

            <div className="relative min-h-[18rem] overflow-hidden border-t border-linea bg-grafito-deep md:min-h-0 md:border-l md:border-t-0">
              <img
                src="https://res.cloudinary.com/dw26ujhoo/image/upload/f_auto,q_auto,w_1200/v1781022100/pexels-masonamccall-18614839_ncveij.jpg"
                alt="SOLE. sneakers" fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="border-b border-linea">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <p className="text-center text-xs uppercase tracking-[0.2em] text-tenue-3">
              Las marcas que llevamos
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 font-display text-sm font-bold uppercase tracking-wide text-tenue">
              {marcas.map((m, i) => (
                <span key={m.slug} className="flex items-center gap-4">
                  {i > 0 && <span className="font-normal text-linea-suave">/</span>}
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
            <span className="text-sm text-tenue">{zapatos.length} productos</span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {zapatos.map((zapato) => (
              <TarjetaZapato key={zapato.slug} {...zapato} />
            ))}
          </div>
        </section>

        <section className="border-y border-linea">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px bg-linea sm:grid-cols-3">
            <div className="bg-grafito-deep px-6 py-8 text-center">
              <p className="font-display text-sm font-medium text-hueso">Envíos a todo Colombia</p>
              <p className="mt-1 text-xs text-tenue-2">2–4 días hábiles</p>
            </div>
            <div className="bg-grafito-deep px-6 py-8 text-center">
              <p className="font-display text-sm font-medium text-hueso">100% originales</p>
              <p className="mt-1 text-xs text-tenue-2">Garantía verificada</p>
            </div>
            <div className="bg-grafito-deep px-6 py-8 text-center">
              <p className="font-display text-sm font-medium text-hueso">Pago seguro</p>
              <p className="mt-1 text-xs text-tenue-2">Múltiples métodos</p>
            </div>
          </div>
        </section>
      </main>

      <Mapa />
    </>
  );
}