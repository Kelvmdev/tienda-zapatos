/** Devuelve "1 producto" / "N productos" con el plural correcto. */
export function conteoProductos(n: number): string {
  return `${n} ${n === 1 ? "producto" : "productos"}`;
}
