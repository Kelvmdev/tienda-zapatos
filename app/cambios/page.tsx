import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cambios y devoluciones",
  description:
    "Plazos, condiciones y pasos para cambiar o devolver tu compra en SOLE.",
};

export default function CambiosPage() {
  return (
    <main className="mx-auto max-w-xl px-6 py-16 md:py-20">
      <Link href="/" className="text-sm text-tenue transition hover:text-hueso">
        ← Volver al inicio
      </Link>

      <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-hueso md:text-4xl">
        Cambios y devoluciones
      </h1>
      <p className="mt-3 text-tenue">
        Queremos que tu par te quede perfecto. Si algo no encaja, te ayudamos con
        el cambio o la devolución.
      </p>

      <div className="mt-10 flex flex-col gap-8">
        <section>
          <h2 className="font-display text-lg font-semibold text-hueso">Plazo</h2>
          <p className="mt-2 leading-relaxed text-tenue">
            Tienes hasta 5 días hábiles desde que recibes el pedido para solicitar
            un cambio o devolución.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-hueso">Condiciones</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed text-tenue marker:text-tenue-2">
            <li>El producto debe estar sin uso y en perfecto estado.</li>
            <li>Debe conservar su caja original y etiquetas.</li>
            <li>
              Los cambios de talla están sujetos a disponibilidad del inventario.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-hueso">Cómo solicitarlo</h2>
          <p className="mt-2 leading-relaxed text-tenue">
            Escríbenos desde la página de{" "}
            <Link href="/contacto" className="text-hueso underline-offset-4 hover:underline">
              contacto
            </Link>{" "}
            indicando tu número de pedido y el motivo. Te confirmamos los pasos y
            la dirección de recogida o envío.
          </p>
        </section>
      </div>
    </main>
  );
}
