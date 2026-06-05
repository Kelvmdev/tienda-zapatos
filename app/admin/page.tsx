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

const RUTA = path.join(process.cwd(), "content", "data.json");

function leerData(): { zapatos: Zapato[] } {
  return JSON.parse(fs.readFileSync(RUTA, "utf-8"));
}

async function commitData(contenido: string) {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH;
  const token = process.env.GITHUB_TOKEN;
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/content/data.json`;

  const getRes = await fetch(`${apiUrl}?ref=${branch}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "tienda-zapatos-cms",
    },
    cache: "no-store",
  });
  if (!getRes.ok) throw new Error(`No pude leer GitHub: ${getRes.status}`);
  const sha = (await getRes.json()).sha;

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
  if (!putRes.ok) throw new Error(`GitHub rechazó: ${putRes.status} ${await putRes.text()}`);
}

async function logout() {
  "use server";
  (await cookies()).delete("sesion");
  redirect("/admin/login");
}

async function guardar(formData: FormData) {
  "use server";
  const data = leerData();
  data.zapatos = data.zapatos.map((z) => {
    const nombre = formData.get(`nombre-${z.slug}`);
    if (nombre === null) return z; // no vino en el formulario → no lo toques
    return {
      ...z,
      nombre: String(nombre),
      marca: String(formData.get(`marca-${z.slug}`)),
      precio: Number(formData.get(`precio-${z.slug}`)),
      descripcion: String(formData.get(`descripcion-${z.slug}`)),
    };
  });
  await commitData(JSON.stringify(data, null, 2));
  revalidatePath("/");
  revalidatePath("/admin");
}

async function agregar() {
  "use server";
  const data = leerData();
  data.zapatos.push({
    slug: `zapato-${Date.now()}`,
    nombre: "Nuevo zapato",
    marca: "Marca",
    precio: 0,
    imagen: "https://placehold.co/600x600?text=Nuevo",
    descripcion: "Descripción del zapato.",
    tallas: [38, 39, 40, 41, 42],
  });
  await commitData(JSON.stringify(data, null, 2));
  revalidatePath("/");
  revalidatePath("/admin");
}

async function borrar(slug: string) {
  "use server";
  const data = leerData();
  data.zapatos = data.zapatos.filter((z) => z.slug !== slug);
  await commitData(JSON.stringify(data, null, 2));
  revalidatePath("/");
  revalidatePath("/admin");
}

export default async function AdminPage() {
  if ((await cookies()).get("sesion")?.value !== "ok") {
    redirect("/admin/login");
  }
  const data = leerData();

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
              <div className="flex items-center justify-between">
                <p className="text-xs text-neutral-500">{z.slug}</p>
                <button type="submit" formAction={borrar.bind(null, z.slug)}
                  className="text-red-400 hover:text-red-300 text-sm">Borrar</button>
              </div>

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

          <div className="flex flex-col sm:flex-row gap-3">
            <button type="submit"
              className="flex-1 bg-emerald-500 text-neutral-950 font-semibold rounded-lg px-4 py-3 hover:bg-emerald-400 transition">
              Guardar cambios
            </button>
            <button type="submit" formAction={agregar}
              className="flex-1 border border-emerald-500 text-emerald-400 font-semibold rounded-lg px-4 py-3 hover:bg-emerald-500 hover:text-neutral-950 transition">
              + Agregar zapato
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}