import "server-only";
import { cookies } from "next/headers";
import { randomUUID } from "node:crypto";

// Anonymous browser capability: not a login, and not recoverable on another device.
export async function getOwnerId() {
  const jar = await cookies();
  const existing = jar.get("crop_session")?.value;
  if (existing && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(existing)) return existing;
  const owner = randomUUID();
  jar.set("crop_session", owner, {
    httpOnly: true, secure: process.env.NODE_ENV === "production",
    sameSite: "strict", path: "/", maxAge: 60 * 60 * 24 * 7,
  });
  return owner;
}
