export function imagenOptimizada(url: string, ancho: number): string {
  if (!url.includes("res.cloudinary.com/") || !url.includes("/upload/")) {
    return url;
  }
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${ancho}/`);
}

/**
 * Recorta a banner Open Graph real (1200×630) con c_fill, para que las
 * dimensiones declaradas en la metadata coincidan con la imagen servida.
 */
export function imagenOG(url: string): string {
  if (!url.includes("res.cloudinary.com/") || !url.includes("/upload/")) {
    return url;
  }
  return url.replace("/upload/", "/upload/c_fill,w_1200,h_630,f_auto,q_auto/");
}