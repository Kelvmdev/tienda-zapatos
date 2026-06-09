"use client";
import { useState } from "react";

const LAT = 6.243358767361717;
const LON = -75.59254746028859;
const NOMBRE = "SOLE.";

export default function Mapa() {
  const [activo, setActivo] = useState(false);
  const mapSrc = `https://maps.google.com/maps?q=${LAT},${LON}&z=16&hl=es&output=embed`;
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${LAT},${LON}`;

  return (
    <section id="ubicacion" className="border-t border-linea">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <p className="mb-8 text-xs uppercase tracking-[0.24em] text-tenue-2">Visítanos</p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-10">
          <div>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-hueso md:text-4xl">
              Laureles<br />Estadio
            </h2>

            <div className="mt-6 space-y-1 text-sm leading-relaxed text-tenue">
              <p>Carrera 70 #C-23</p>
              <p>Medellín, Colombia</p>
            </div>

            <div className="mt-5 space-y-1 text-sm leading-relaxed text-tenue">
              <p>Lun – Sáb · 10:00 a 20:00</p>
              <p>+57 300 000 0000</p>
            </div>

            <a
              href={mapHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-lg border border-borde px-5 py-3 text-sm text-hueso transition duration-150 active:scale-95 hover:bg-superficie"
            >
              Cómo llegar <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-linea md:aspect-auto md:min-h-[26rem]">
            <iframe
              src={mapSrc}
              title={`Mapa · ${NOMBRE}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 [filter:invert(0.92)_hue-rotate(180deg)]"
            />

            {!activo && (
              <button
                type="button"
                onClick={() => setActivo(true)}
                aria-label="Activar el mapa"
                className="absolute inset-0 flex cursor-pointer items-center justify-center bg-transparent"
              >
                <span className="pointer-events-none rounded-full bg-[#141414cc] px-4 py-2 text-sm text-hueso shadow-lg">
                  Clic para interactuar con el mapa
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}