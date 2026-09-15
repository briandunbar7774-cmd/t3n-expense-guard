/**
 * Authenticate as the *agent* (separate key/credits) and print agent DID.
 * Docs: https://docs.terminal3.io/developers/agents/register-agent
 *       https://docs.terminal3.io/developers/adk/get-started/member-delegation
 *
 * Usage:
 *   export AGENT_KEY=0x...   # second claim — do NOT reuse T3N_API_KEY
 *   npm run agent:whoami
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

const key = process.env.AGENT_KEY;
if (!key || key.includes("REPLACE")) {
  console.error(
    "Set AGENT_KEY from a *second* claim on the ADK page (agent needs its own credits).",
  );
  process.exit(1);
}

const env = (process.env.T3N_ENV as "testnet" | "production") || "testnet";
setEnvironment(env);

const wasmComponent = await loadWasmComponent();
const address = eth_get_address(key);

const agentClient = new T3nClient({
  trustAnchor: await fetchTrustedManifest(env),
  wasmComponent,
  handlers: {
    EthSign: metamask_sign(address, undefined, key),
  },
});

await agentClient.handshake();
const agentDid = await agentClient.authenticate(createEthAuthInput(address));

console.log("Agent DID:", agentDid.value);
console.log("Agent address:", address);
console.log(
  "Update agent-card.json DID service endpoint, then:\n  npx @terminal3/t3n-sdk agent host-card --file agent-card.json --env",
  env,
);
