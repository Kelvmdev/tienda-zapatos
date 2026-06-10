import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Envíos",
  description:
    "Cobertura, tiempos de entrega y seguimiento de tus pedidos SOLE. en toda Colombia.",
};

export default function EnviosPage() {
  return (
    <main className="mx-auto max-w-xl px-6 py-16 md:py-20">
      <Link href="/" className="text-sm text-tenue transition hover:text-hueso">
        ← Volver al inicio
      </Link>

      <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-hueso md:text-4xl">
        Envíos
      </h1>
      <p className="mt-3 text-tenue">
        Enviamos a todo el país con transportadoras aliadas. Estos son nuestros
        tiempos y condiciones generales.
      </p>

      <div className="mt-10 flex flex-col gap-8">
        <section>
          <h2 className="font-display text-lg font-semibold text-hueso">Cobertura</h2>
          <p className="mt-2 leading-relaxed text-tenue">
            Llegamos a todo Colombia: Medellín, Bogotá, Cali, Barranquilla,
            Bucaramanga, Pereira y demás ciudades y municipios con cobertura de
            las transportadoras.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-hueso">Tiempos de entrega</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed text-tenue marker:text-tenue-2">
            <li>Ciudades principales: 2–4 días hábiles.</li>
            <li>Municipios y zonas apartadas: 3–6 días hábiles.</li>
            <li>Los pedidos se despachan en 24–48 horas tras confirmarse el pago.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-hueso">Costos</h2>
          <p className="mt-2 leading-relaxed text-tenue">
            El costo del envío se calcula según la ciudad de destino y se informa
            antes de confirmar tu pedido. Consulta promociones de envío gratis
            vigentes escribiéndonos por el formulario de contacto.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-hueso">Seguimiento</h2>
          <p className="mt-2 leading-relaxed text-tenue">
            Cuando despachamos tu pedido te enviamos el número de guía por correo
            o WhatsApp para que sigas el envío en línea hasta tu puerta.
          </p>
        </section>
      </div>
    </main>
  );
}
