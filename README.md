# SOLE. — Tienda de zapatos

E-commerce de sneakers con catálogo público, filtro por marca y un **panel CMS privado** para gestionar productos, contenido e imágenes sin tocar código. Caso de **optimización de rendimiento**: LCP de **24 s → 2.3 s**.

🔗 **En vivo:** https://tienda-zapatos-gamma.vercel.app

---

## Qué es

**SOLE.** es una tienda de zapatos (Nike, Adidas, Puma…) con catálogo navegable, ficha de producto con datos estructurados, formulario de contacto y un **panel `/admin`** para cargar productos y editar el sitio. Los datos se guardan en GitHub vía API, así el cliente edita la tienda desde el navegador y los cambios quedan versionados.

## Características

- **Catálogo de productos** con tarjetas (imagen, marca, precio en COP).
- **Ficha de producto** (`/zapatos/[slug]`) con **JSON-LD `Product`** (schema.org), precio, descripción y tallas.
- **Filtro por marca** (`/marcas/[marca]`).
- **Formulario de contacto** (`/contacto`) integrado con **Formspree** + página `/gracias`.
- **Mapa interactivo** (Google Maps embed, Medellín) con overlay anti-hijack táctil.
- **Panel CMS** (`/admin`) — alta/edición/borrado de productos, edición del contenido global (hero, ubicación, footer, redes) y **subida de imágenes a Cloudinary**.
- **SEO técnico** — `sitemap.xml` y `robots.txt` dinámicos, imágenes Open Graph y Twitter, meta por página y `metadataBase` para URLs absolutas.
- **Accesible** — skip-link, foco visible, `aria-label`/`aria-hidden`, HTML semántico y `alt` en imágenes.
- **Rendimiento** — **PageSpeed 98**; LCP optimizado de **24 s → 2.3 s**.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **GitHub Contents API** como almacén de datos
- **Cloudinary** para imágenes (`f_auto, q_auto`)
- Deploy en **Vercel**

## Decisiones técnicas

- **Datos en `content/data.json`:** única fuente de verdad para productos y configuración del sitio. El panel escribe el archivo en GitHub vía API (rama `main`) sin necesidad de Git en el cliente; en SSR se lee local y en `/admin` se lee de GitHub (`no-store`) para ver siempre lo último.
- **Imágenes Cloudinary:** `imagenOptimizada(url, ancho)` añade `f_auto, q_auto, w_*` (WebP + calidad automática); `imagenOG(url)` recorta a `c_fill,1200×630` para Open Graph.
- **Auth del panel:** contraseña por env var; sesión en cookie `httpOnly` con vencimiento (8 h).
- **URL base resiliente:** prioriza `NEXT_PUBLIC_SITE_URL`, cae a `VERCEL_PROJECT_PRODUCTION_URL` y, en último caso, a `localhost`.

## Correr en local

```bash
git clone https://github.com/Kelvmdev/tienda-zapatos.git
cd tienda-zapatos
npm install
npm run dev
```

Abre http://localhost:3000

### Variables de entorno

Crea un `.env.local` (no se versiona):

```
ADMIN_PASSWORD=<contraseña del panel /admin>
GITHUB_TOKEN=<PAT con scope repo>
GITHUB_OWNER=Kelvmdev
GITHUB_REPO=tienda-zapatos
GITHUB_BRANCH=main
NEXT_PUBLIC_SITE_URL=<https://tu-dominio>   # opcional; si falta, se resuelve solo
```

## Scripts

| Comando | Acción |
| :--- | :--- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm start` | Sirve el build |
| `npm run lint` | ESLint |

---

Hecho por [Kervin Martínez](https://mi-portafolio-eta-hazel.vercel.app) · Asistido con Claude Code.
