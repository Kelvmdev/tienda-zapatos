import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PanelClient from "./PanelClient";

type Zapato = {
  slug: string;
  nombre: string;
  marca: string;
  precio: number;
  imagen: string;
  descripcion: string;
  tallas: number[];
};

async function leerData(): Promise<{ zapatos: Zapato[] }> {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH;
  const token = process.env.GITHUB_TOKEN;
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/content/data.json?ref=${branch}`;

  const res = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "tienda-zapatos-cms",
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`No pude leer data.json de GitHub: ${res.status}`);
  const json = await res.json();
  const contenido = Buffer.from(json.content, "base64").toString("utf-8");
  return JSON.parse(contenido);
}

export default async function AdminPage() {
  if ((await cookies()).get("sesion")?.value !== "ok") {
    redirect("/admin/login");
  }
  const data = await leerData();

  return (
    <main className="min-h-screen px-6 py-12">
      <PanelClient zapatosIniciales={data.zapatos} />
    </main>
  );
}