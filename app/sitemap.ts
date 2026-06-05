import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://tienda-zapatos-gamma.vercel.app";
  const ruta = path.join(process.cwd(), "content", "data.json");
  const data = JSON.parse(fs.readFileSync(ruta, "utf-8"));
  const zapatos = data.zapatos as { slug: string }[];

  const paginasZapatos = zapatos.map((z) => ({
    url: `${base}/zapatos/${z.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/contacto`, lastModified: new Date() },
    ...paginasZapatos,
  ];
}