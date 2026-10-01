"use client";
import { useCallback, useEffect, useState } from "react";
import type { CropRecipe, CropRecipeInput } from "@/lib/contracts";

export default function RecipeHistory({ recipe }: { recipe: CropRecipeInput | null }) {
  const [items, setItems] = useState<CropRecipe[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const refresh = useCallback(() => fetch("/api/recipes")
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      return data;
    })
    .then((data) => { setItems(data.items); setMessage(""); })
    .catch(() => { setMessage("Histórico indisponível. Você ainda pode recortar e baixar a imagem."); })
    .finally(() => { setLoading(false); }), []);
  useEffect(() => { void refresh(); }, [refresh]);
  const save = async () => {
    if (!recipe || saving) return;
    setSaving(true);
    try {
      const response = await fetch("/api/recipes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(recipe) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setItems((old) => [data.item, ...old].slice(0, 20)); setMessage("Corte salvo.");
    } catch { setMessage("Não foi possível salvar. Tente novamente."); }
    finally { setSaving(false); }
  };
  return <section className="mt-8 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800" aria-label="Histórico de cortes">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 className="font-semibold">Seus últimos cortes</h2>
      <button type="button" disabled={!recipe || saving || loading} onClick={save} className="rounded-lg border px-3 py-2 text-sm disabled:opacity-40">{saving ? "Salvando…" : "Salvar receita do corte"}</button>
    </div>
    <p className="mt-2 text-sm text-zinc-500">O histórico fica associado a este navegador. Salvamos apenas o nome e as medidas; a imagem permanece no seu dispositivo.</p>
    <p role="status" className="mt-2 text-sm">{message || (loading ? "Carregando histórico…" : items.length ? "" : "Nenhum corte salvo ainda.")}</p>
    {message.includes("indisponível") && <button type="button" onClick={() => { setLoading(true); void refresh(); }} className="mt-2 underline">Tentar novamente</button>}
    <ul className="mt-3 grid gap-2 sm:grid-cols-2">{items.map((item) => <li key={item.id} className="rounded-lg bg-zinc-100 p-3 text-sm dark:bg-zinc-900">
      <p className="truncate font-medium">{item.label}</p>
      <p>{Math.round(item.width)} × {Math.round(item.height)} px · {new Date(item.createdAt).toLocaleString("pt-BR")}</p>
    </li>)}</ul>
  </section>;
}
