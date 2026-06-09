import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import Mapa from "./Mapa";

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
  const marcas = [...new Set(zapatos.map((z) => z.marca))];

  return (
    <>
      <main>
        <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
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
        </section>

        <section className="border-y border-linea">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-5 font-display text-sm font-bold tracking-wide text-tenue-3">
            {marcas.map((m) => (
              <span key={m} className="uppercase">{m}</span>
            ))}
          </div>
        </section>

        <section id="catalogo" className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight text-hueso">Catálogo</h2>
            <span className="text-sm text-tenue">{zapatos.length} productos</span>
          </div>
          <div className="grid grid-cols-1 gap-px bg-linea sm:grid-cols-2 lg:grid-cols-3">
            {zapatos.map((zapato) => (
              <Link
                key={zapato.slug}
                href={`/zapatos/${zapato.slug}`}
                className="group block bg-grafito p-4 transition hover:bg-grafito-deep"
              >
                <div className="mb-4 aspect-square overflow-hidden rounded-lg bg-superficie">
                  <img
                    src={zapato.imagen}
                    alt={zapato.nombre}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="text-xs uppercase tracking-widest text-tenue-2">{zapato.marca}</p>
                <h3 className="mt-1 font-display text-base font-medium text-hueso">{zapato.nombre}</h3>
                <p className="mt-1 text-sm text-tenue">${zapato.precio.toLocaleString("es-CO")}</p>
              </Link>
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