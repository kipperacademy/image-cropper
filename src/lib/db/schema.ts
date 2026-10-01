import { doublePrecision, index, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const cropRecipes = pgTable("crop_recipes", {
  id: uuid("id").primaryKey().defaultRandom(),
  ownerId: uuid("owner_id").notNull(),
  label: text("label").notNull(),
  imageWidth: integer("image_width").notNull(),
  imageHeight: integer("image_height").notNull(),
  x: doublePrecision("x").notNull(),
  y: doublePrecision("y").notNull(),
  width: doublePrecision("width").notNull(),
  height: doublePrecision("height").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [index("recipes_owner_created_idx").on(table.ownerId, table.createdAt)]);
