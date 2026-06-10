import type { Metadata } from "next";

// Portada global del sitio (app/opengraph-image.tsx). La imagen por convención
// solo se aplica a "/", no se hereda a rutas anidadas, así que la referenciamos
// explícitamente como fallback. Es relativa: Next la vuelve absoluta con
// metadataBase del layout raíz.
const IMAGEN_OG_POR_DEFECTO = "/opengraph-image";

type Opciones = {
  title: string;
  description: string;
  /**
   * URL de la imagen (idealmente ya optimizada, p. ej. con imagenOptimizada).
   * Si se omite, se usa la portada global del sitio.
   */
  image?: string;
};

/**
 * Arma metadata coherente por página: title + description + Open Graph + Twitter
 * con la misma fuente de verdad. El title se combina con el template
 * "%s | SOLE." del layout raíz para el <title> del documento.
 */
export function construirMeta({ title, description, image }: Opciones): Metadata {
  const images = [{ url: image ?? IMAGEN_OG_POR_DEFECTO, width: 1200, height: 630 }];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}
