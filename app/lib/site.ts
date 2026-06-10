/**
 * URL base del sitio, fuente única para metadataBase (layout) y para las URLs
 * absolutas del JSON-LD. Prefiere una variable explícita, luego la URL de
 * producción de Vercel, y cae a localhost en desarrollo.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
