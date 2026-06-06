"use client";
import { useState, type ChangeEvent } from "react";

export default function SubirImagen({
  imagenActual,
  onSubir,
}: {
  imagenActual: string;
  onSubir: (url: string) => void;
}) {
  const [subiendo, setSubiendo] = useState(false);

  async function manejarArchivo(e: ChangeEvent<HTMLInputElement>) {
    const archivo = e.target.files?.[0];
    if (!archivo) return;
    setSubiendo(true);
    try {
      const datos = new FormData();
      datos.append("file", archivo);
      datos.append("upload_preset", "portafolio_unsigned");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dw26ujhoo/image/upload",
        { method: "POST", body: datos }
      );
      const json = await res.json();
      if (json.secure_url) onSubir(json.secure_url);
    } finally {
      setSubiendo(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <img
        src={imagenActual}
        alt="Vista previa"
        className="w-16 h-16 rounded-lg object-cover border border-neutral-700"
      />
      <label className="text-sm text-emerald-400 cursor-pointer hover:underline">
        {subiendo ? "Subiendo…" : "Cambiar foto"}
        <input
          type="file"
          accept="image/*"
          onChange={manejarArchivo}
          disabled={subiendo}
          className="hidden"
        />
      </label>
    </div>
  );
}