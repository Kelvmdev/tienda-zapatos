"use client";
import Link from "next/link";
import { useState } from "react";

const enlaces = [
  { href: "/#catalogo", texto: "Catálogo" },
  { href: "/#ubicacion", texto: "Visítanos" },
  { href: "/contacto", texto: "Contacto" },
];

export default function Navbar() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="border-b border-linea">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-lg font-extrabold tracking-tight text-hueso"
          onClick={() => setAbierto(false)}
        >
          SOLE<span className="text-tenue-2">.</span>
        </Link>

        <div className="hidden items-center gap-6 text-sm text-tenue md:flex">
          {enlaces.map((e) => (
            <Link key={e.href} href={e.href} className="transition hover:text-hueso">
              {e.texto}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setAbierto(!abierto)}
          aria-label="Abrir menú"
          className="text-hueso transition active:scale-90 md:hidden"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {abierto ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {abierto && (
        <div className="flex flex-col border-t border-linea md:hidden">
          {enlaces.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              onClick={() => setAbierto(false)}
              className="px-6 py-3 text-sm text-tenue transition hover:bg-grafito-deep hover:text-hueso"
            >
              {e.texto}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}