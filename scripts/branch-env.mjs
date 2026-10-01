// Fetch credentials without writing them to stdout. Never copies the base/production .env.
import { execFileSync } from "node:child_process";
import { writeFileSync, existsSync } from "node:fs";
const [projectId, branchName] = process.argv.slice(2);
if (!projectId || !branchName || branchName === "main") throw new Error("Pass project ID and a non-main classroom branch.");
if (existsSync(".env.local")) throw new Error(".env.local already exists. Check its target before replacing it manually.");
const read = (pooled) => execFileSync("neon", ["connection-string", branchName, "--project-id", projectId, "--ssl", "verify-full", ...(pooled ? ["--pooled"] : [])], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
const pooled = read(true), direct = read(false);
if (![pooled, direct].every((url) => url.startsWith("postgresql://") || url.startsWith("postgres://"))) throw new Error("Unexpected CLI output; no env file written.");
writeFileSync(".env.local", `DATABASE_URL=${JSON.stringify(pooled)}\nDATABASE_URL_UNPOOLED=${JSON.stringify(direct)}\n`, { mode: 0o600, flag: "wx" });
console.log(`Environment saved for ${branchName}. Credentials were not printed.`);
