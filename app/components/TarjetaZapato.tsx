import Link from "next/link";

type Props = {
  slug: string;
  nombre: string;
  marca: string;
  precio: number;
  imagen: string;
};

export default function TarjetaZapato({ slug, nombre, marca, precio, imagen }: Props) {
  return (
    <Link
      href={`/zapatos/${slug}`}
      className="group block overflow-hidden rounded-xl border border-linea bg-grafito transition duration-150 hover:border-borde hover:bg-grafito-deep"
    >
      <div className="aspect-square overflow-hidden bg-superficie">
        <img
          src={imagen}
          alt={nombre}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <p className="text-xs uppercase tracking-widest text-tenue-2">{marca}</p>
        <h3 className="mt-1 font-display text-base font-medium text-hueso">{nombre}</h3>
        <p className="mt-1 text-sm text-tenue">${precio.toLocaleString("es-CO")}</p>
      </div>
    </Link>
  );
}