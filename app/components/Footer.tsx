import Link from "next/link";
import data from "../../content/data.json";

export default function Footer() {
  // Footer vive en el árbol cliente (lo monta Chrome, que es "use client"),
  // por eso no puede leer fs como page.tsx: importamos el JSON estático, que
  // es idéntico en SSR e hidratación → sin desajustes.
  const footer = data.site.footer;

  return (
    <footer className="border-t border-linea bg-grafito-deep">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <p className="font-display text-base font-extrabold tracking-tight text-hueso">
              SOLE<span className="text-tenue-2">.</span>
            </p>
            <p className="mt-3 whitespace-pre-line text-xs leading-relaxed text-tenue-2">{footer.tagline}</p>
            <p className="mt-4 text-xs text-tenue">
              {footer.redes.map((red, i) => (
                <span key={red.nombre}>
                  {i > 0 && " · "}
                  {red.url ? (
                    <a
                      href={red.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition hover:text-hueso"
                    >
                      {red.nombre}
                    </a>
                  ) : (
                    red.nombre
                  )}
                </span>
              ))}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-tenue-2">Tienda</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-tenue">
              <Link href="/#catalogo" className="transition hover:text-hueso">Catálogo</Link>
              <Link href="/contacto" className="transition hover:text-hueso">Contacto</Link>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-tenue-2">Ayuda</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-tenue">
              <span>Envíos</span>
              <span>Cambios</span>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-tenue-2">Contacto</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-tenue">
              <span>{footer.contacto.direccion}</span>
              <span>{footer.contacto.email}</span>
              <span>{footer.contacto.telefono}</span>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-linea-suave pt-6 text-xs text-tenue-2 sm:flex-row sm:items-center sm:justify-between">
          <span>{footer.copyright}</span>
          <span>Términos · Privacidad</span>
        </div>
      </div>
    </footer>
  );
}