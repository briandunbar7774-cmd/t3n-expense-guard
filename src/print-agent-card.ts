/**
 * Local preview of agent-card.json (does not publish).
 * Publishing: npx @terminal3/t3n-sdk agent host-card --file agent-card.json --env testnet
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const card = JSON.parse(readFileSync(join(root, "agent-card.json"), "utf8"));

const bytes = Buffer.byteLength(JSON.stringify(card));
console.log(JSON.stringify(card, null, 2));
console.log(`\nSize: ${bytes} bytes (T3N host-card limit: 16 KiB)`);
if (String(card.services?.find((s: { name: string }) => s.name === "DID")?.endpoint || "").includes("REPLACE")) {
  console.warn("WARN: DID endpoint still a placeholder — run npm run agent:whoami first.");
}
