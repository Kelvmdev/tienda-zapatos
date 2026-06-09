export function slugMarca(marca: string): string {
  return marca
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

export function marcasUnicas(
  zapatos: { marca: string }[]
): { nombre: string; slug: string }[] {
  const vistas = new Map<string, string>();
  for (const z of zapatos) {
    const s = slugMarca(z.marca);
    if (!vistas.has(s)) vistas.set(s, z.marca.trim());
  }
  return [...vistas.entries()].map(([slug, nombre]) => ({ nombre, slug }));
}