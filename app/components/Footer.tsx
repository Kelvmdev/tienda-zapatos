import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-linea bg-grafito-deep">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <p className="font-display text-base font-extrabold tracking-tight text-hueso">
              SOLE<span className="text-tenue-2">.</span>
            </p>
            <p className="mt-3 text-xs leading-relaxed text-tenue-2">Sneakers curados.<br />Medellín, 2026.</p>
            <p className="mt-4 text-xs text-tenue">Instagram · TikTok · WhatsApp</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-tenue-3">Tienda</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-tenue">
              <Link href="/#catalogo" className="transition hover:text-hueso">Catálogo</Link>
              <Link href="/contacto" className="transition hover:text-hueso">Contacto</Link>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-tenue-3">Ayuda</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-tenue">
              <span>Envíos</span>
              <span>Cambios</span>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-tenue-3">Contacto</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-tenue">
              <span>Carrera 70 #C-23</span>
              <span>hola@sole.co</span>
              <span>+57 300 000 0000</span>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-linea-suave pt-6 text-xs text-tenue-3 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 SOLE. Todos los derechos reservados.</span>
          <span>Términos · Privacidad</span>
        </div>
      </div>
    </footer>
  );
}