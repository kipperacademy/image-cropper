import { desc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { cropRecipes } from "@/lib/db/schema";
import { getOwnerId } from "@/lib/session";
import { parseRecipe } from "@/lib/contracts";

export async function GET() {
  try {
    const ownerId = await getOwnerId();
    const rows = await getDb().select().from(cropRecipes).where(eq(cropRecipes.ownerId, ownerId))
      .orderBy(desc(cropRecipes.createdAt)).limit(20);
    return Response.json({ items: rows.map(({ ownerId: _owner, ...row }) => { void _owner; return row; }) }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Não foi possível carregar o histórico." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) return Response.json({ error: "Origem inválida." }, { status: 403 });
  const length = Number(request.headers.get("content-length"));
  if (length > 4096) return Response.json({ error: "Receita muito grande." }, { status: 413 });
  let raw: string;
  try { raw = await request.text(); } catch { return Response.json({ error: "Corpo inválido." }, { status: 400 }); }
  if (raw.length > 4096) return Response.json({ error: "Receita muito grande." }, { status: 413 });
  let value: unknown;
  try { value = JSON.parse(raw); } catch { return Response.json({ error: "JSON inválido." }, { status: 400 }); }
  const recipe = parseRecipe(value);
  if (!recipe) return Response.json({ error: "Confira o nome e os limites do corte." }, { status: 400 });
  try {
    const ownerId = await getOwnerId();
    const [row] = await getDb().insert(cropRecipes).values({ ...recipe, ownerId }).returning();
    const { ownerId: _owner, ...item } = row; void _owner;
    return Response.json({ item }, { status: 201 });
  } catch {
    return Response.json({ error: "Não foi possível salvar o corte." }, { status: 503 });
  }
}
