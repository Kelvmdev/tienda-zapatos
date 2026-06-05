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

  return (
    <>
      <main className="min-h-screen bg-neutral-950 text-white px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">👟 Mi Tienda de Zapatos</h1>
          <p className="text-neutral-400 mb-10">Los mejores tenis, al mejor precio.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {zapatos.map((zapato) => (
              <Link
                key={zapato.slug}
                href={`/zapatos/${zapato.slug}`}
                className="bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 transition hover:border-neutral-600 hover:-translate-y-1"
              >
                <img
                  src={zapato.imagen}
                  alt={zapato.nombre}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4">
                  <p className="text-sm text-neutral-400">{zapato.marca}</p>
                  <h2 className="text-lg font-semibold">{zapato.nombre}</h2>
                  <p className="mt-2 text-emerald-400 font-bold">
                    ${zapato.precio.toLocaleString("es-CO")} COP
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Mapa />
    </>
  );
}