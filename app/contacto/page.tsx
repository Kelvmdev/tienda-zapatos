import fs from "node:fs";
import path from "node:path";
import { redirect } from "next/navigation";
import Link from "next/link";

async function guardarMensaje(formData: FormData) {
  "use server";
  const nombre = formData.get("nombre");
  const correo = formData.get("correo");
  const mensaje = formData.get("mensaje");

  const ruta = path.join(process.cwd(), "content", "mensajes.json");
  const mensajes = JSON.parse(fs.readFileSync(ruta, "utf-8"));
  mensajes.push({ nombre, correo, mensaje, fecha: new Date().toISOString() });
  fs.writeFileSync(ruta, JSON.stringify(mensajes, null, 2), "utf-8");

  redirect("/gracias");
}

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white px-6 py-12">
      <div className="mx-auto max-w-md">
        <Link href="/" className="text-emerald-400 hover:underline">← Volver al catálogo</Link>
        <h1 className="mt-6 text-3xl font-bold">Contáctanos</h1>
        <p className="mt-2 text-neutral-400">¿Te interesa algún par? Escríbenos.</p>

        <form action={guardarMensaje} className="mt-8 flex flex-col gap-4">
          <input name="nombre" type="text" required placeholder="Tu nombre"
            className="bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2" />
          <input name="correo" type="email" required placeholder="Tu correo"
            className="bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2" />
          <textarea name="mensaje" required rows={4} placeholder="Tu mensaje"
            className="bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2" />
          <button type="submit"
            className="bg-emerald-500 text-neutral-950 font-semibold rounded-lg px-4 py-2 hover:bg-emerald-400 transition">
            Enviar
          </button>
        </form>
      </div>
    </main>
  );
}