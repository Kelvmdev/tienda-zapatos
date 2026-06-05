"use client";
import { useState } from "react";

export default function SubirImagen({ slug, imagenActual }: { slug: string; imagenActual: string }) {
  const [url, setUrl] = useState(imagenActual);
  const [subiendo, setSubiendo] = useState(false);

  async function subir(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setSubiendo(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", "portafolio_unsigned"); // ← tu preset unsigned
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dw26ujhoo/image/upload", // ← tu cloud name
        { method: "POST", body: fd }
      );
      const data = await res.json();
      if (data.secure_url) setUrl(data.secure_url);
    } finally {
      setSubiendo(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <img src={url} alt="" className="w-16 h-16 rounded-lg object-cover bg-neutral-800" />
      <div className="flex-1">
        <input type="file" accept="image/*" onChange={subir}
          className="text-sm text-neutral-400 file:mr-3 file:rounded-lg file:border-0 file:bg-neutral-700 file:px-3 file:py-1 file:text-white" />
        {subiendo && <p className="text-xs text-neutral-500 mt-1">Subiendo…</p>}
      </div>
      <input type="hidden" name={`imagen-${slug}`} value={url} />
    </div>
  );
}