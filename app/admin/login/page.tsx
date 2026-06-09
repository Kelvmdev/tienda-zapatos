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
    <main className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-6">
      <h1 className="font-display text-2xl font-bold tracking-tight text-hueso">
        Panel de administración
      </h1>
      <form action={login} className="mt-6 flex flex-col gap-4">
        <input
          name="clave"
          type="password"
          required
          placeholder="Contraseña"
          className="rounded-lg border border-linea bg-grafito-deep px-4 py-3 text-sm text-hueso outline-none transition placeholder:text-tenue-2 focus:border-borde"
        />
        <button
          type="submit"
          className="rounded-lg bg-hueso px-4 py-3 text-sm font-medium text-grafito transition duration-150 active:scale-95 hover:opacity-90"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}