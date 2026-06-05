import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function login(formData: FormData) {
  "use server";
  const clave = formData.get("clave");
  if (clave !== process.env.ADMIN_PASSWORD) {
    redirect("/admin/login");
  }
  const cookieStore = await cookies();
  cookieStore.set("sesion", "ok", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8,
    path: "/",
  });
  redirect("/admin");
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-6">
      <form action={login} className="w-full max-w-sm flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Panel de administración</h1>
        <input name="clave" type="password" required placeholder="Contraseña"
          className="bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2" />
        <button type="submit"
          className="bg-emerald-500 text-neutral-950 font-semibold rounded-lg px-4 py-2 hover:bg-emerald-400 transition">
          Entrar
        </button>
      </form>
    </main>
  );
}