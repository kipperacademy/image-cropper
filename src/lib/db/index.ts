import "server-only";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { attachDatabasePool } from "@vercel/functions";
import * as schema from "./schema";

const globalDb = globalThis as unknown as { cropPool?: Pool };

export function getDb() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
  if (!globalDb.cropPool) {
    globalDb.cropPool = new Pool({ connectionString: process.env.DATABASE_URL, max: 5, connectionTimeoutMillis: 10000 });
    attachDatabasePool(globalDb.cropPool);
  }
  return drizzle(globalDb.cropPool, { schema });
}
