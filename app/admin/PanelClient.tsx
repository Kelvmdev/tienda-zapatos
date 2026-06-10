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

type Red = { nombre: string; url: string };
type Confianza = { titulo: string; detalle: string };

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
  confianza: Confianza[];
  ubicacion: {
    eyebrow: string;
    nombre: string;
    direccion: string;
    ciudad: string;
    horario: string;
    telefono: string;
    ctaTexto: string;
    lat: number;
    lon: number;
    zoom: number;
  };
  footer: {
    tagline: string;
    redes: Red[];
    copyright: string;
    contacto: { direccion: string; email: string; telefono: string };
  };
};

// Campos reutilizables (a nivel de módulo para no perder el foco al teclear).
const inputCls =
  "mt-1 w-full rounded-lg border border-linea bg-grafito px-3 py-2 text-sm text-hueso outline-none transition focus:border-borde";

function Campo({
  label,
  value,
  onChange,
  type = "text",
  step,
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  step?: string;
}) {
  return (
    <label className="text-sm text-tenue">
      {label}
      <input
        type={type}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      />
    </label>
  );
}

function Area({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <label className="text-sm text-tenue">
      {label}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className={`${inputCls} resize-none whitespace-pre-line`}
      />
    </label>
  );
}

function Seccion({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3 rounded-xl border border-linea bg-grafito-deep p-4">
      <h2 className="font-display text-sm font-bold uppercase tracking-wide text-hueso">
        {titulo}
      </h2>
      {children}
    </section>
  );
}

export default function PanelClient({
  zapatosIniciales,
  siteInicial,
}: {
  zapatosIniciales: Zapato[];
  siteInicial: Site;
}) {
  const [tab, setTab] = useState<"sitio" | "catalogo">("catalogo");
  const [zapatos, setZapatos] = useState<Zapato[]>(zapatosIniciales);
  const [site, setSite] = useState<Site>(siteInicial);
  const [estado, setEstado] = useState<"idle" | "guardando" | "ok" | "error">("idle");

  // --- Catálogo (sin cambios de comportamiento) ---
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
      await guardarTodo(site, zapatos);
      setEstado("ok");
    } catch {
      setEstado("error");
    }
  }

  // --- Sitio (solo estado local en esta etapa; aún no se persiste) ---
  const patchHero = (v: Partial<Site["hero"]>) =>
    setSite((s) => ({ ...s, hero: { ...s.hero, ...v } }));
  const patchMarcas = (v: Partial<Site["marcas"]>) =>
    setSite((s) => ({ ...s, marcas: { ...s.marcas, ...v } }));
  const patchUbic = (v: Partial<Site["ubicacion"]>) =>
    setSite((s) => ({ ...s, ubicacion: { ...s.ubicacion, ...v } }));
  const patchFooter = (v: Partial<Site["footer"]>) =>
    setSite((s) => ({ ...s, footer: { ...s.footer, ...v } }));
  const patchContacto = (v: Partial<Site["footer"]["contacto"]>) =>
    setSite((s) => ({
      ...s,
      footer: { ...s.footer, contacto: { ...s.footer.contacto, ...v } },
    }));

  const patchConfianza = (i: number, v: Partial<Confianza>) =>
    setSite((s) => ({
      ...s,
      confianza: s.confianza.map((c, idx) => (idx === i ? { ...c, ...v } : c)),
    }));
  const addConfianza = () =>
    setSite((s) => ({ ...s, confianza: [...s.confianza, { titulo: "", detalle: "" }] }));
  const removeConfianza = (i: number) =>
    setSite((s) => ({ ...s, confianza: s.confianza.filter((_, idx) => idx !== i) }));

  const patchRed = (i: number, v: Partial<Red>) =>
    setSite((s) => ({
      ...s,
      footer: {
        ...s.footer,
        redes: s.footer.redes.map((r, idx) => (idx === i ? { ...r, ...v } : r)),
      },
    }));
  const addRed = () =>
    setSite((s) => ({
      ...s,
      footer: { ...s.footer, redes: [...s.footer.redes, { nombre: "", url: "" }] },
    }));
  const removeRed = (i: number) =>
    setSite((s) => ({
      ...s,
      footer: { ...s.footer, redes: s.footer.redes.filter((_, idx) => idx !== i) },
    }));

  const tabCls = (activo: boolean) =>
    `rounded-lg px-4 py-2 text-sm font-medium transition duration-150 active:scale-95 ${
      activo
        ? "bg-hueso text-grafito"
        : "border border-borde text-hueso hover:bg-superficie"
    }`;

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

      <div className="mt-6 flex gap-2">
        <button type="button" onClick={() => setTab("sitio")} className={tabCls(tab === "sitio")}>
          Sitio
        </button>
        <button
          type="button"
          onClick={() => setTab("catalogo")}
          className={tabCls(tab === "catalogo")}
        >
          Catálogo
        </button>
      </div>

      {/* ---------------- CATÁLOGO ---------------- */}
      {tab === "catalogo" && (
        <>
          <p className="mt-6 text-sm text-tenue-2">
            Edita, agrega o borra los que quieras. Nada se guarda hasta que pulses{" "}
            <span className="text-hueso">Guardar todo</span> (abajo).
          </p>

          <div className="mt-8 flex flex-col gap-6">
            {zapatos.map((z) => (
              <div
                key={z.slug}
                className="flex flex-col gap-3 rounded-xl border border-linea bg-grafito-deep p-4"
              >
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
                    className={inputCls}
                  />
                </label>
                <label className="text-sm text-tenue">
                  Marca
                  <input
                    value={z.marca}
                    onChange={(e) => actualizar(z.slug, { marca: e.target.value })}
                    className={inputCls}
                  />
                </label>
                <label className="text-sm text-tenue">
                  Precio
                  <input
                    type="number"
                    value={z.precio}
                    onChange={(e) => actualizar(z.slug, { precio: Number(e.target.value) })}
                    className={inputCls}
                  />
                </label>
                <label className="text-sm text-tenue">
                  Descripción
                  <textarea
                    value={z.descripcion}
                    onChange={(e) => actualizar(z.slug, { descripcion: e.target.value })}
                    rows={3}
                    className={`${inputCls} resize-none`}
                  />
                </label>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={agregar}
              className="w-full rounded-lg border border-borde px-4 py-3 text-sm font-medium text-hueso transition duration-150 active:scale-95 hover:bg-superficie sm:w-auto"
            >
              + Agregar zapato
            </button>
          </div>
        </>
      )}

      {/* ---------------- SITIO ---------------- */}
      {tab === "sitio" && (
        <div className="mt-8 flex flex-col gap-6">
          <Seccion titulo="Hero">
            <Campo label="Eyebrow" value={site.hero.eyebrow} onChange={(v) => patchHero({ eyebrow: v })} />
            <Area
              label="Título (Enter = salto de línea)"
              value={site.hero.titulo}
              onChange={(v) => patchHero({ titulo: v })}
              rows={2}
            />
            <Campo label="Subtítulo" value={site.hero.subtitulo} onChange={(v) => patchHero({ subtitulo: v })} />
            <Campo label="Texto del botón" value={site.hero.ctaTexto} onChange={(v) => patchHero({ ctaTexto: v })} />
            <Campo label="Imagen (URL)" value={site.hero.imagen} onChange={(v) => patchHero({ imagen: v })} />
            <Campo label="Alt de la imagen" value={site.hero.imagenAlt} onChange={(v) => patchHero({ imagenAlt: v })} />
          </Seccion>

          <Seccion titulo="Marcas">
            <Campo label="Título" value={site.marcas.titulo} onChange={(v) => patchMarcas({ titulo: v })} />
          </Seccion>

          <Seccion titulo="Banda de confianza">
            {site.confianza.map((c, i) => (
              <div key={i} className="flex flex-col gap-3 rounded-lg border border-linea bg-grafito p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-tenue-2">Ítem {i + 1}</p>
                  <button
                    type="button"
                    onClick={() => removeConfianza(i)}
                    className="text-sm text-red-400 transition hover:text-red-300"
                  >
                    Borrar
                  </button>
                </div>
                <Campo label="Título" value={c.titulo} onChange={(v) => patchConfianza(i, { titulo: v })} />
                <Campo label="Detalle" value={c.detalle} onChange={(v) => patchConfianza(i, { detalle: v })} />
              </div>
            ))}
            <button
              type="button"
              onClick={addConfianza}
              className="self-start rounded-lg border border-borde px-3 py-2 text-sm text-hueso transition hover:bg-superficie"
            >
              + Agregar ítem
            </button>
          </Seccion>

          <Seccion titulo="Ubicación">
            <Campo label="Eyebrow" value={site.ubicacion.eyebrow} onChange={(v) => patchUbic({ eyebrow: v })} />
            <Area
              label="Nombre (Enter = salto de línea)"
              value={site.ubicacion.nombre}
              onChange={(v) => patchUbic({ nombre: v })}
              rows={2}
            />
            <Campo label="Dirección" value={site.ubicacion.direccion} onChange={(v) => patchUbic({ direccion: v })} />
            <Campo label="Ciudad" value={site.ubicacion.ciudad} onChange={(v) => patchUbic({ ciudad: v })} />
            <Campo label="Horario" value={site.ubicacion.horario} onChange={(v) => patchUbic({ horario: v })} />
            <Campo label="Teléfono" value={site.ubicacion.telefono} onChange={(v) => patchUbic({ telefono: v })} />
            <Campo label="Texto del botón" value={site.ubicacion.ctaTexto} onChange={(v) => patchUbic({ ctaTexto: v })} />
            <div className="grid grid-cols-3 gap-3">
              <Campo
                label="Lat"
                type="number"
                step="any"
                value={site.ubicacion.lat}
                onChange={(v) => patchUbic({ lat: Number(v) })}
              />
              <Campo
                label="Lon"
                type="number"
                step="any"
                value={site.ubicacion.lon}
                onChange={(v) => patchUbic({ lon: Number(v) })}
              />
              <Campo
                label="Zoom"
                type="number"
                value={site.ubicacion.zoom}
                onChange={(v) => patchUbic({ zoom: Number(v) })}
              />
            </div>
          </Seccion>

          <Seccion titulo="Footer">
            <Area
              label="Tagline (Enter = salto de línea)"
              value={site.footer.tagline}
              onChange={(v) => patchFooter({ tagline: v })}
              rows={2}
            />

            <p className="mt-1 text-xs uppercase tracking-widest text-tenue-3">Redes</p>
            {site.footer.redes.map((r, i) => (
              <div key={i} className="flex flex-col gap-3 rounded-lg border border-linea bg-grafito p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-tenue-2">Red {i + 1}</p>
                  <button
                    type="button"
                    onClick={() => removeRed(i)}
                    className="text-sm text-red-400 transition hover:text-red-300"
                  >
                    Borrar
                  </button>
                </div>
                <Campo label="Nombre" value={r.nombre} onChange={(v) => patchRed(i, { nombre: v })} />
                <Campo label="URL (vacío = solo texto)" value={r.url} onChange={(v) => patchRed(i, { url: v })} />
              </div>
            ))}
            <button
              type="button"
              onClick={addRed}
              className="self-start rounded-lg border border-borde px-3 py-2 text-sm text-hueso transition hover:bg-superficie"
            >
              + Agregar red
            </button>

            <Campo label="Copyright" value={site.footer.copyright} onChange={(v) => patchFooter({ copyright: v })} />

            <p className="mt-1 text-xs uppercase tracking-widest text-tenue-3">Contacto</p>
            <Campo
              label="Dirección"
              value={site.footer.contacto.direccion}
              onChange={(v) => patchContacto({ direccion: v })}
            />
            <Campo
              label="Email"
              value={site.footer.contacto.email}
              onChange={(v) => patchContacto({ email: v })}
            />
            <Campo
              label="Teléfono"
              value={site.footer.contacto.telefono}
              onChange={(v) => patchContacto({ telefono: v })}
            />
          </Seccion>

          <p className="text-xs text-tenue-2">
            Pulsa <span className="text-hueso">Guardar todo</span> (abajo) para publicar
            estos cambios junto con el catálogo.
          </p>
        </div>
      )}

      {/* ---------- Acción global: persiste site + zapatos en un commit ---------- */}
      <div className="mt-10 border-t border-linea pt-6">
        <button
          type="button"
          onClick={guardar}
          disabled={estado === "guardando"}
          className="w-full rounded-lg bg-hueso px-4 py-3 text-sm font-medium text-grafito transition duration-150 active:scale-95 hover:opacity-90 disabled:opacity-60 disabled:active:scale-100"
        >
          {estado === "guardando" ? "Guardando…" : "Guardar todo"}
        </button>
        {estado === "ok" && (
          <p className="mt-4 text-sm text-hueso">✅ Guardado. El sitio se actualiza en ~1 min.</p>
        )}
        {estado === "error" && (
          <p className="mt-4 text-sm text-red-400">❌ No se pudo guardar. Intenta de nuevo.</p>
        )}
      </div>
    </div>
  );
}
