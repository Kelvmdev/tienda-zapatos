"use client";
import { useState } from "react";
import SubirImagen from "./SubirImagen";
import { guardarTodo, logout } from "./actions";

type Zapato = {
  slug: string;
  nombre: string;
  marca: string;
  precio: number;
  imagen: string;
  descripcion: string;
  tallas: number[];
};

export default function PanelClient({
  zapatosIniciales,
}: {
  zapatosIniciales: Zapato[];
}) {
  const [zapatos, setZapatos] = useState<Zapato[]>(zapatosIniciales);
  const [estado, setEstado] = useState<"idle" | "guardando" | "ok" | "error">("idle");

  function actualizar(slug: string, cambios: Partial<Zapato>) {
    setZapatos((prev) =>
      prev.map((z) => (z.slug === slug ? { ...z, ...cambios } : z))
    );
  }

  function agregar() {
    setZapatos((prev) => [
      ...prev,
      {
        slug: `zapato-${Date.now()}`,
        nombre: "",
        marca: "",
        precio: 0,
        imagen: "https://placehold.co/600x600?text=Nuevo",
        descripcion: "",
        tallas: [38, 39, 40, 41, 42],
      },
    ]);
  }

  function borrar(slug: string) {
    setZapatos((prev) => prev.filter((z) => z.slug !== slug));
  }

  async function guardar() {
    setEstado("guardando");
    try {
      await guardarTodo(zapatos);
      setEstado("ok");
    } catch {
      setEstado("error");
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Panel ✅</h1>
        <form action={logout}>
          <button type="submit" className="text-neutral-400 hover:text-white text-sm">
            Cerrar sesión
          </button>
        </form>
      </div>

      <p className="mt-2 text-sm text-neutral-500">
        Edita, agrega o borra los que quieras. Nada se guarda hasta que pulses{" "}
        <span className="text-emerald-400">Guardar todo</span>.
      </p>

      <div className="mt-8 flex flex-col gap-8">
        {zapatos.map((z) => (
          <div key={z.slug} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-neutral-500">{z.slug}</p>
              <button
                type="button"
                onClick={() => borrar(z.slug)}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Borrar
              </button>
            </div>

            <SubirImagen
              imagenActual={z.imagen}
              onSubir={(url) => actualizar(z.slug, { imagen: url })}
            />

            <label className="text-sm text-neutral-400">
              Nombre
              <input
                value={z.nombre}
                onChange={(e) => actualizar(z.slug, { nombre: e.target.value })}
                className="mt-1 w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2"
              />
            </label>
            <label className="text-sm text-neutral-400">
              Marca
              <input
                value={z.marca}
                onChange={(e) => actualizar(z.slug, { marca: e.target.value })}
                className="mt-1 w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2"
              />
            </label>
            <label className="text-sm text-neutral-400">
              Precio
              <input
                type="number"
                value={z.precio}
                onChange={(e) => actualizar(z.slug, { precio: Number(e.target.value) })}
                className="mt-1 w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2"
              />
            </label>
            <label className="text-sm text-neutral-400">
              Descripción
              <textarea
                value={z.descripcion}
                onChange={(e) => actualizar(z.slug, { descripcion: e.target.value })}
                rows={3}
                className="mt-1 w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2"
              />
            </label>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={guardar}
          disabled={estado === "guardando"}
          className="flex-1 bg-emerald-500 text-neutral-950 font-semibold rounded-lg px-4 py-3 hover:bg-emerald-400 transition disabled:opacity-60"
        >
          {estado === "guardando" ? "Guardando…" : "Guardar todo"}
        </button>
        <button
          type="button"
          onClick={agregar}
          className="flex-1 border border-emerald-500 text-emerald-400 font-semibold rounded-lg px-4 py-3 hover:bg-emerald-500 hover:text-neutral-950 transition"
        >
          + Agregar zapato
        </button>
      </div>

      {estado === "ok" && (
        <p className="mt-4 text-emerald-400 text-sm">✅ Guardado. El sitio se actualiza en ~1 min.</p>
      )}
      {estado === "error" && (
        <p className="mt-4 text-red-400 text-sm">❌ No se pudo guardar. Intenta de nuevo.</p>
      )}
    </div>
  );
}