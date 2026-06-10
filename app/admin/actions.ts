"use server";

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

type Site = {
  hero: {
    eyebrow: string;
    titulo: string;
    subtitulo: string;
    ctaTexto: string;
    imagen: string;
    imagenAlt: string;
  };
  marcas: { titulo: string };
  confianza: { titulo: string; detalle: string }[];
  ubicacion: {
    eyebrow: string;
    nombre: string;
    direccion: string;
    ciudad: string;
    horario: string;
    telefono: string;
    ctaTexto: string;
    lat: number;
    lon: number;
    zoom: number;
  };
  footer: {
    tagline: string;
    redes: { nombre: string; url: string }[];
    copyright: string;
    contacto: { direccion: string; email: string; telefono: string };
  };
};

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

export async function guardarTodo(site: Site, zapatos: Zapato[]) {
  const limpios = zapatos.map((z) => ({
    slug: z.slug,
    nombre: String(z.nombre ?? "").trim(),
    marca: String(z.marca ?? "").trim(),
    precio: Number(z.precio) || 0,
    imagen: String(z.imagen ?? "").trim(),
    descripcion: String(z.descripcion ?? "").trim(),
    tallas: Array.isArray(z.tallas) ? z.tallas : [],
  }));

  // Escribimos el contenido COMPLETO (site + zapatos) en un solo commit.
  // El panel ya tiene el objeto entero en estado, así que no hace falta merge.
  await commitData(JSON.stringify({ site, zapatos: limpios }, null, 2));
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function logout() {
  (await cookies()).delete("sesion");
  redirect("/admin/login");
}