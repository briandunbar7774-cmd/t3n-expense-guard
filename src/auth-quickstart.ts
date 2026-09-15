/**
 * Quickstart-equivalent: handshake + authenticate → print tenant DID.
 * Docs: https://docs.terminal3.io/developers/adk/get-started/quickstart
 *
 * Usage:
 *   export T3N_API_KEY=0x...   # from claim page (once)
 *   npm run auth
 */
import {
  T3nClient,
  setEnvironment,
  loadWasmComponent,
  fetchTrustedManifest,
  eth_get_address,
  metamask_sign,
  createEthAuthInput,
} from "@terminal3/t3n-sdk";

const key = process.env.T3N_API_KEY;
if (!key || key.includes("REPLACE")) {
  console.error(
    "Set T3N_API_KEY to the real key from https://go.terminal3.io/adk-community (shown once).",
  );
  process.exit(1);
}

const env = (process.env.T3N_ENV as "testnet" | "production") || "testnet";
setEnvironment(env);

const wasmComponent = await loadWasmComponent();
const address = eth_get_address(key);

const t3n = new T3nClient({
  trustAnchor: await fetchTrustedManifest(env),
  wasmComponent,
  handlers: {
    EthSign: metamask_sign(address, undefined, key),
  },
});

await t3n.handshake();
const did = await t3n.authenticate(createEthAuthInput(address));
const tenantDid = did.value;

console.log("Connected as:", tenantDid);
console.log("Wallet address (from key):", address);
console.log("Env:", env);
console.log(
  "Next: keep this session pattern for TenantClient + contract registration (see README).",
);
