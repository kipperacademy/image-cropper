"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import RecipeHistory from "./RecipeHistory";

// Crop box in natural image pixels. Always square (1:1).
type Crop = { x: number; y: number; size: number };
type Corner = "nw" | "ne" | "sw" | "se";

type DragState =
  | { kind: "move"; startX: number; startY: number; origin: Crop }
  | { kind: "resize"; corner: Corner; anchorX: number; anchorY: number };

const MIN_SIZE_PX = 24; // minimum crop size on screen
const CORNERS: Corner[] = ["nw", "ne", "sw", "se"];

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

export default function ImageCropper() {
  const [src, setSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("imagem");
  const [natural, setNatural] = useState({ w: 0, h: 0 });
  const [scale, setScale] = useState(1); // displayed px / natural px
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0, size: 0 });
  const [dragOver, setDragOver] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const drag = useRef<DragState | null>(null);

  const loadFile = useCallback((file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) return;
    setSrc((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    setFileName(file.name.replace(/\.[^.]+$/, "") || "imagem");
  }, []);

  const measure = useCallback(() => {
    const img = imgRef.current;
    if (!img || !img.naturalWidth) return;
    setScale(img.getBoundingClientRect().width / img.naturalWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const onImageLoad = () => {
    const img = imgRef.current!;
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    const size = Math.round(Math.min(w, h) * 0.8);
    setNatural({ w, h });
    setCrop({ x: Math.round((w - size) / 2), y: Math.round((h - size) / 2), size });
    measure();
  };

  // Pointer position in natural image pixels.
  const toImageCoords = (e: React.PointerEvent) => {
    const rect = imgRef.current!.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / scale,
      y: (e.clientY - rect.top) / scale,
    };
  };

  const startMove = (e: React.PointerEvent) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = toImageCoords(e);
    drag.current = { kind: "move", startX: p.x, startY: p.y, origin: crop };
  };

  const startResize = (corner: Corner) => (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    // Anchor is the opposite corner, which stays fixed while resizing.
    drag.current = {
      kind: "resize",
      corner,
      anchorX: corner.includes("w") ? crop.x + crop.size : crop.x,
      anchorY: corner.includes("n") ? crop.y + crop.size : crop.y,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const p = toImageCoords(e);

    if (d.kind === "move") {
      const { origin } = d;
      setCrop({
        size: origin.size,
        x: clamp(origin.x + p.x - d.startX, 0, natural.w - origin.size),
        y: clamp(origin.y + p.y - d.startY, 0, natural.h - origin.size),
      });
      return;
    }

    const dirX = d.corner.includes("e") ? 1 : -1;
    const dirY = d.corner.includes("s") ? 1 : -1;
    const maxSize = Math.min(
      dirX > 0 ? natural.w - d.anchorX : d.anchorX,
      dirY > 0 ? natural.h - d.anchorY : d.anchorY,
    );
    const minSize = Math.min(MIN_SIZE_PX / scale, maxSize);
    const size = clamp(
      Math.max(dirX * (p.x - d.anchorX), dirY * (p.y - d.anchorY)),
      minSize,
      maxSize,
    );
    setCrop({
      size,
      x: dirX > 0 ? d.anchorX : d.anchorX - size,
      y: dirY > 0 ? d.anchorY : d.anchorY - size,
    });
  };

  const endDrag = () => {
    drag.current = null;
  };

  // Live preview of the cropped area.
  useEffect(() => {
    const canvas = previewRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !crop.size) return;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, crop.x, crop.y, crop.size, crop.size, 0, 0, canvas.width, canvas.height);
  }, [crop]);

  const download = () => {
    const img = imgRef.current;
    if (!img) return;
    const size = Math.round(crop.size);
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    canvas
      .getContext("2d")!
      .drawImage(img, Math.round(crop.x), Math.round(crop.y), size, size, 0, 0, size, size);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}-crop.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  const reset = () => {
    if (src) URL.revokeObjectURL(src);
    setSrc(null);
    setCrop({ x: 0, y: 0, size: 0 });
    if (inputRef.current) inputRef.current.value = "";
  };

  const box = {
    left: crop.x * scale,
    top: crop.y * scale,
    width: crop.size * scale,
    height: crop.size * scale,
  };

  return (
    <div
      className="w-full"
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        loadFile(e.dataTransfer.files[0]);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => loadFile(e.target.files?.[0])}
      />

      {!src ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`flex h-80 w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed transition-colors ${
            dragOver
              ? "border-blue-500 bg-blue-500/5"
              : "border-zinc-300 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600"
          }`}
        >
          <span className="text-lg font-medium">Arraste uma imagem aqui</span>
          <span className="text-sm text-zinc-500">ou clique para escolher</span>
        </button>
      ) : (
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="flex flex-1 justify-center">
            <div
              className="relative touch-none select-none"
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- local blob URL, needs natural size for canvas */}
              <img
                ref={imgRef}
                src={src}
                alt="Imagem para cortar"
                onLoad={onImageLoad}
                draggable={false}
                className="block max-h-[70vh] max-w-full"
              />
              {crop.size > 0 && (
                <div
                  onPointerDown={startMove}
                  className="absolute cursor-move outline outline-2 outline-white"
                  style={{ ...box, boxShadow: "0 0 0 9999px rgba(0,0,0,0.55)" }}
                >
                  {/* rule-of-thirds guides */}
                  <div className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="border border-white/25" />
                    ))}
                  </div>
                  {CORNERS.map((c) => (
                    <div
                      key={c}
                      onPointerDown={startResize(c)}
                      className={`absolute h-4 w-4 rounded-sm border-2 border-zinc-900 bg-white ${
                        c === "nw"
                          ? "-left-2 -top-2 cursor-nwse-resize"
                          : c === "ne"
                            ? "-right-2 -top-2 cursor-nesw-resize"
                            : c === "sw"
                              ? "-bottom-2 -left-2 cursor-nesw-resize"
                              : "-bottom-2 -right-2 cursor-nwse-resize"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <aside className="flex flex-col items-center gap-3 lg:w-56">
            <canvas
              ref={previewRef}
              width={224}
              height={224}
              className="w-56 rounded-lg border border-zinc-200 dark:border-zinc-800"
            />
            <p className="text-sm tabular-nums text-zinc-500">
              {Math.round(crop.size)} × {Math.round(crop.size)} px
            </p>
            <button
              type="button"
              onClick={download}
              className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Baixar corte (PNG)
            </button>
            <button
              type="button"
              onClick={reset}
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              Trocar imagem
            </button>
          </aside>
        </div>
      )}
      <RecipeHistory recipe={src && crop.size > 0 ? {
        label: fileName, imageWidth: natural.w, imageHeight: natural.h,
        x: crop.x, y: crop.y, width: crop.size, height: crop.size,
      } : null} />
    </div>
  );
}
