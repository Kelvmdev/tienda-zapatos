import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    "Condiciones de uso del sitio, precios, disponibilidad y propiedad intelectual de SOLE.",
};

export default function TerminosPage() {
  return (
    <main className="mx-auto max-w-xl px-6 py-16 md:py-20">
      <Link href="/" className="text-sm text-tenue transition hover:text-hueso">
        ← Volver al inicio
      </Link>

      <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-hueso md:text-4xl">
        Términos y condiciones
      </h1>
      <p className="mt-3 text-tenue">
        Al usar este sitio y realizar pedidos en SOLE. aceptas las siguientes
        condiciones.
      </p>

      <div className="mt-10 flex flex-col gap-8">
        <section>
          <h2 className="font-display text-lg font-semibold text-hueso">Uso del sitio</h2>
          <p className="mt-2 leading-relaxed text-tenue">
            Este sitio es para uso personal e informativo. Te comprometes a
            entregar datos veraces al contactarnos o realizar un pedido y a no
            darle un uso indebido a la plataforma.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-hueso">Precios y disponibilidad</h2>
          <p className="mt-2 leading-relaxed text-tenue">
            Los precios están expresados en pesos colombianos (COP) e incluyen los
            impuestos aplicables. Pueden cambiar sin previo aviso. La
            disponibilidad de cada modelo y talla está sujeta a inventario y se
            confirma al momento de procesar el pedido.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-hueso">Propiedad intelectual</h2>
          <p className="mt-2 leading-relaxed text-tenue">
            La marca SOLE., el contenido editorial y las imágenes de este sitio
            son propiedad de la tienda o de sus respectivos titulares y no pueden
            reproducirse sin autorización.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-hueso">Contacto</h2>
          <p className="mt-2 leading-relaxed text-tenue">
            Si tienes dudas sobre estos términos, escríbenos desde la página de{" "}
            <Link href="/contacto" className="text-hueso underline-offset-4 hover:underline">
              contacto
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
