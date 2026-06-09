import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-linea">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg font-extrabold tracking-tight text-hueso">
          SOLE<span className="text-tenue-2">.</span>
        </Link>
        <div className="flex items-center gap-6 text-sm text-tenue">
          <Link href="/#catalogo" className="transition hover:text-hueso">Catálogo</Link>
          <Link href="/#ubicacion" className="transition hover:text-hueso">Visítanos</Link>
          <Link href="/contacto" className="transition hover:text-hueso">Contacto</Link>
        </div>
      </nav>
    </header>
  );
}