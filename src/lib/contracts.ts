export type CropRecipeInput = {
  label: string;
  imageWidth: number;
  imageHeight: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type CropRecipe = CropRecipeInput & { id: string; createdAt: string };

export function parseRecipe(value: unknown): CropRecipeInput | null {
  if (!value || typeof value !== "object") return null;
  const v = value as Record<string, unknown>;
  if (typeof v.label !== "string" || !v.label.trim() || v.label.length > 80) return null;
  const keys = ["imageWidth", "imageHeight", "x", "y", "width", "height"] as const;
  if (keys.some((key) => typeof v[key] !== "number" || !Number.isFinite(v[key]))) return null;
  const { imageWidth, imageHeight, x, y, width, height } = v as CropRecipeInput;
  if (imageWidth <= 0 || imageHeight <= 0 || imageWidth > 30000 || imageHeight > 30000) return null;
  if (!Number.isInteger(imageWidth) || !Number.isInteger(imageHeight)) return null;
  if (x < 0 || y < 0 || width <= 0 || height <= 0) return null;
  if (x + width > imageWidth || y + height > imageHeight) return null;
  return { label: v.label.trim(), imageWidth, imageHeight, x, y, width, height };
}
