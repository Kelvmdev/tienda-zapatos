import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Qué datos recogemos, con qué fin los usamos y cómo ejercer tus derechos en SOLE.",
};

export default function PrivacidadPage() {
  return (
    <main className="mx-auto max-w-xl px-6 py-16 md:py-20">
      <Link href="/" className="text-sm text-tenue transition hover:text-hueso">
        ← Volver al inicio
      </Link>

      <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-hueso md:text-4xl">
        Política de privacidad
      </h1>
      <p className="mt-3 text-tenue">
        Cuidamos tus datos. Aquí te contamos qué información recogemos y para qué
        la usamos.
      </p>

      <div className="mt-10 flex flex-col gap-8">
        <section>
          <h2 className="font-display text-lg font-semibold text-hueso">Qué datos recogemos</h2>
          <p className="mt-2 leading-relaxed text-tenue">
            Cuando nos escribes desde el formulario de contacto recogemos tu
            nombre, tu correo electrónico y el mensaje que nos envías. No pedimos
            datos sensibles ni de pago a través del sitio.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-hueso">Para qué los usamos</h2>
          <p className="mt-2 leading-relaxed text-tenue">
            Usamos esta información únicamente para responder tus consultas y darte
            seguimiento. No vendemos ni compartimos tus datos con terceros, salvo
            los proveedores necesarios para prestar el servicio (por ejemplo, la
            transportadora de tu envío).
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-hueso">Tus derechos</h2>
          <p className="mt-2 leading-relaxed text-tenue">
            Puedes solicitar acceder, rectificar o eliminar tus datos en cualquier
            momento escribiéndonos a{" "}
            <a
              href="mailto:hola@sole.co"
              className="text-hueso underline-offset-4 hover:underline"
            >
              hola@sole.co
            </a>{" "}
            o desde la página de{" "}
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
