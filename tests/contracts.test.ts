import test from "node:test";
import assert from "node:assert/strict";
import { parseRecipe } from "../src/lib/contracts";
const base = { label: "Avatar", imageWidth: 100, imageHeight: 80, x: 10, y: 10, width: 50, height: 50 };
test("valid recipe preserves natural coordinates and trims label", () => assert.deepEqual(parseRecipe({ ...base, label: " Avatar " }), base));
test("rejects overflow, empty area, non-finite values and invalid image size", () => {
  for (const change of [{ x: -1 }, { x: 60 }, { y: 40 }, { width: 0 }, { height: -1 }, { x: NaN }, { width: Infinity }, { imageWidth: 0 }, { imageWidth: 100.5 }, { imageHeight: 30001 }, { label: " " }]) assert.equal(parseRecipe({ ...base, ...change }), null);
});
test("accepts a rectangular crop at exact image boundaries", () => assert.ok(parseRecipe({ ...base, x: 0, y: 0, width: 100, height: 80 })));
