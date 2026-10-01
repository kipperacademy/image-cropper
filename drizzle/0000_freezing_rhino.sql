CREATE TABLE "crop_recipes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_id" uuid NOT NULL,
	"label" text NOT NULL,
	"image_width" integer NOT NULL,
	"image_height" integer NOT NULL,
	"x" double precision NOT NULL,
	"y" double precision NOT NULL,
	"width" double precision NOT NULL,
	"height" double precision NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "recipes_owner_created_idx" ON "crop_recipes" USING btree ("owner_id","created_at");