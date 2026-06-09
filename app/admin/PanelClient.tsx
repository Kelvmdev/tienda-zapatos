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
        <h1 className="font-display text-3xl font-bold tracking-tight text-hueso">Panel</h1>
        <form action={logout}>
          <button type="submit" className="text-sm text-tenue transition hover:text-hueso">
            Cerrar sesión
          </button>
        </form>
      </div>

      <p className="mt-2 text-sm text-tenue-2">
        Edita, agrega o borra los que quieras. Nada se guarda hasta que pulses{" "}
        <span className="text-hueso">Guardar todo</span>.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        {zapatos.map((z) => (
          <div key={z.slug} className="flex flex-col gap-3 rounded-xl border border-linea bg-grafito-deep p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-tenue-2">{z.slug}</p>
              <button
                type="button"
                onClick={() => borrar(z.slug)}
                className="text-sm text-red-400 transition hover:text-red-300"
              >
                Borrar
              </button>
            </div>

            <SubirImagen
              imagenActual={z.imagen}
              onSubir={(url) => actualizar(z.slug, { imagen: url })}
            />

            <label className="text-sm text-tenue">
              Nombre
              <input
                value={z.nombre}
                onChange={(e) => actualizar(z.slug, { nombre: e.target.value })}
                className="mt-1 w-full rounded-lg border border-linea bg-grafito px-3 py-2 text-sm text-hueso outline-none transition focus:border-borde"
              />
            </label>
            <label className="text-sm text-tenue">
              Marca
              <input
                value={z.marca}
                onChange={(e) => actualizar(z.slug, { marca: e.target.value })}
                className="mt-1 w-full rounded-lg border border-linea bg-grafito px-3 py-2 text-sm text-hueso outline-none transition focus:border-borde"
              />
            </label>
            <label className="text-sm text-tenue">
              Precio
              <input
                type="number"
                value={z.precio}
                onChange={(e) => actualizar(z.slug, { precio: Number(e.target.value) })}
                className="mt-1 w-full rounded-lg border border-linea bg-grafito px-3 py-2 text-sm text-hueso outline-none transition focus:border-borde"
              />
            </label>
            <label className="text-sm text-tenue">
              Descripción
              <textarea
                value={z.descripcion}
                onChange={(e) => actualizar(z.slug, { descripcion: e.target.value })}
                rows={3}
                className="mt-1 w-full resize-none rounded-lg border border-linea bg-grafito px-3 py-2 text-sm text-hueso outline-none transition focus:border-borde"
              />
            </label>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={guardar}
          disabled={estado === "guardando"}
          className="flex-1 rounded-lg bg-hueso px-4 py-3 text-sm font-medium text-grafito transition duration-150 active:scale-95 hover:opacity-90 disabled:opacity-60 disabled:active:scale-100"
        >
          {estado === "guardando" ? "Guardando…" : "Guardar todo"}
        </button>
        <button
          type="button"
          onClick={agregar}
          className="flex-1 rounded-lg border border-borde px-4 py-3 text-sm font-medium text-hueso transition duration-150 active:scale-95 hover:bg-superficie"
        >
          + Agregar zapato
        </button>
      </div>

      {estado === "ok" && (
        <p className="mt-4 text-sm text-hueso">✅ Guardado. El sitio se actualiza en ~1 min.</p>
      )}
      {estado === "error" && (
        <p className="mt-4 text-sm text-red-400">❌ No se pudo guardar. Intenta de nuevo.</p>
      )}
    </div>
  );
}