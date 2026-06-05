import fs from "node:fs";
import path from "node:path";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

type Zapato = {
  slug: string;
  nombre: string;
  marca: string;
  precio: number;
  imagen: string;
  descripcion: string;
  tallas: number[];
};

async function logout() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.delete("sesion");
  redirect("/admin/login");
}

async function commitData(contenido: string) {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH;
  const token = process.env.GITHUB_TOKEN;
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/content/data.json`;

  // 1) Traer el "sha" (huella) de la versión actual
  const getRes = await fetch(`${apiUrl}?ref=${branch}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "tienda-zapatos-cms",
    },
    cache: "no-store",
  });
  if (!getRes.ok) {
    throw new Error(`No pude leer el archivo de GitHub: ${getRes.status}`);
  }
  const archivo = await getRes.json();
  const sha = archivo.sha;

  // 2) Commitear la nueva versión (en base64)
  const putRes = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "tienda-zapatos-cms",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "Actualizar catálogo desde el panel",
      content: Buffer.from(contenido, "utf-8").toString("base64"),
      sha,
      branch,
    }),
  });
  if (!putRes.ok) {
    const txt = await putRes.text();
    throw new Error(`GitHub rechazó el guardado: ${putRes.status} ${txt}`);
  }
}

async function guardar(formData: FormData) {
  "use server";
  const ruta = path.join(process.cwd(), "content", "data.json");
  const data = JSON.parse(fs.readFileSync(ruta, "utf-8")) as { zapatos: Zapato[] };

  data.zapatos = data.zapatos.map((z) => ({
    ...z,
    nombre: String(formData.get(`nombre-${z.slug}`)),
    marca: String(formData.get(`marca-${z.slug}`)),
    precio: Number(formData.get(`precio-${z.slug}`)),
    descripcion: String(formData.get(`descripcion-${z.slug}`)),
  }));

  await commitData(JSON.stringify(data, null, 2));

  revalidatePath("/");
  revalidatePath("/admin");
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  if (cookieStore.get("sesion")?.value !== "ok") {
    redirect("/admin/login");
  }

  const ruta = path.join(process.cwd(), "content", "data.json");
  const data = JSON.parse(fs.readFileSync(ruta, "utf-8")) as { zapatos: Zapato[] };

  return (
    <main className="min-h-screen bg-neutral-950 text-white px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Panel ✅</h1>
          <form action={logout}>
            <button type="submit" className="text-neutral-400 hover:text-white text-sm">Cerrar sesión</button>
          </form>
        </div>

        <form action={guardar} className="mt-8 flex flex-col gap-8">
          {data.zapatos.map((z) => (
            <div key={z.slug} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex flex-col gap-3">
              <p className="text-xs text-neutral-500">{z.slug}</p>

              <label className="text-sm text-neutral-400">Nombre
                <input name={`nombre-${z.slug}`} defaultValue={z.nombre}
                  className="mt-1 w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2" />
              </label>

              <label className="text-sm text-neutral-400">Marca
                <input name={`marca-${z.slug}`} defaultValue={z.marca}
                  className="mt-1 w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2" />
              </label>

              <label className="text-sm text-neutral-400">Precio
                <input name={`precio-${z.slug}`} type="number" defaultValue={z.precio}
                  className="mt-1 w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2" />
              </label>

              <label className="text-sm text-neutral-400">Descripción
                <textarea name={`descripcion-${z.slug}`} defaultValue={z.descripcion} rows={3}
                  className="mt-1 w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2" />
              </label>
            </div>
          ))}

          <button type="submit"
            className="bg-emerald-500 text-neutral-950 font-semibold rounded-lg px-4 py-3 hover:bg-emerald-400 transition">
            Guardar cambios
          </button>
        </form>
      </div>
    </main>
  );
}