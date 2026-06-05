"use client";
import { useState } from "react";

const LAT = 6.243358767361717;
const LON = -75.59254746028859;
const NOMBRE = "Mi Tienda de Zapatos";
const ZONA = "Laureles - Estadio, Medellín";

export default function Mapa() {
  const [activo, setActivo] = useState(false);
  const mapSrc = `https://maps.google.com/maps?q=${LAT},${LON}&z=16&hl=es&output=embed`;
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${LAT},${LON}`;

  return (
    <section id="ubicacion" className="w-full bg-neutral-950 text-white px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Dónde estamos</h2>
        <p className="text-neutral-400 mb-8">Visítanos en {ZONA}.</p>

        <div className="relative w-full h-[60vh] min-h-96 rounded-2xl overflow-hidden border border-neutral-800">
          <iframe
            src={mapSrc}
            title={`Mapa · ${NOMBRE}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full border-0"
          />

          {!activo && (
            <button
              type="button"
              onClick={() => setActivo(true)}
              aria-label="Activar el mapa"
              className="absolute inset-0 flex items-center justify-center bg-transparent cursor-pointer"
            >
              <span className="pointer-events-none px-4 py-2 rounded-full bg-black/80 text-white text-sm shadow-lg">
                Clic para interactuar con el mapa
              </span>
            </button>
          )}

          
            <a
            href={mapHref}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 left-4 max-w-xs bg-white text-neutral-900 rounded-2xl shadow-2xl p-4 hover:shadow-xl transition"
          >
            <h3 className="font-semibold text-lg leading-tight">👟 {NOMBRE}</h3>
            <p className="text-sm text-neutral-700 mt-1">{ZONA}</p>
            <p className="text-xs text-emerald-700 font-medium mt-2">Ver en Google Maps &rarr;</p>
          </a>
        </div>
      </div>
    </section>
  );
}