# Expense Guard — Trusted Enterprise Agent on T3N

**Policy checks run before any expense is approved.** Expense Guard is a maintainable enterprise agent for Terminal 3 Network (T3N): it evaluates category caps, memos, and manager-approval bands in code — not inside an LLM prompt — and keeps payment details as opaque refs.

Prepared for Superteam Earn:  
[Try out new docs to build a trusted agent with T3N](https://superteam.fun/earn/listing/t3n-agent-build-challenge)

> **Status:** Public-ready scaffold. **Never commit real DID values, API keys, or `.env`.** Copy `.env.example` locally after SSO. Live keys are shown once on the claim page and must stay offline.

## Judges: verify in 60 seconds (no keys)

```bash
git clone https://github.com/briandunbar7774-cmd/t3n-expense-guard.git
cd t3n-expense-guard
npm install
npm run demo:policy
```

`npm run demo:policy` is **offline**. It prints a sample meal expense and the policy decision JSON (`allowed`, `reasons`, `requiresManagerApproval`). No T3N credentials required.

## Claim identity (when you need live DIDs)

1. Google SSO at **https://go.terminal3.io/adk-community**
2. Copy the API key immediately (shown once) → local `.env` only as `T3N_API_KEY`
3. Claim a **second** key for the agent → `AGENT_KEY` (own credits; never reuse the tenant key)
4. Run `npm run auth` / `npm run agent:whoami` and record only `did:t3n:…` values in the Earn Doc

Do **not** paste keys into git, chat, Earn, or the public Google Doc. DIDs are not secrets; API keys are.

## Why this agent (useful + easy to maintain)

Enterprises need agents that can **approve or reject expenses** without stuffing bank account numbers into LLM prompts.

| Concern | How Expense Guard addresses it |
| --- | --- |
| Policy-before-approval | Pure-TS engine in `src/demo-policy-check.ts` (caps, 80% manager band, audit memo) |
| Identity | Separate tenant + agent `did:t3n` via ADK claim + SDK auth |
| Authorization | Member-delegation grants for named contract functions only |
| Secrets / PII | Opaque payment refs in TS; TEE + `http-with-placeholders` for payouts |
| Maintainability | Policy core mirrored by a small Rust stub; one README path |
| Hosting | ERC-8004 agent card JSON; `t3n agent host-card` publishes on T3N |

## Repo layout

```
src/
  demo-policy-check.ts   # offline policy engine (no keys) — run: npm run demo:policy
  auth-quickstart.ts     # tenant handshake + DID (Quickstart)
  agent-whoami.ts        # agent DID (separate key)
  print-agent-card.ts    # local card preview
  delegation.stub.ts     # member-delegation pattern notes
tee-contract/            # Rust WASM stub + walkthrough pointers
scripts/                 # SSO claim checklist
agent-card.json          # ERC-8004 registration card template
.env.example             # placeholders only — never commit a filled .env
SUBMISSION-DOC-OUTLINE.md
```

## Prerequisites

- Node.js ≥ 18
- Google account for SSO claim: https://go.terminal3.io/adk-community
- (Walkthrough) Rust + `wasm32-wasip2` — [Set Up Dev Env](https://docs.terminal3.io/developers/adk/get-started/prerequisites/set-up-dev-env)

## Setup

```bash
cp .env.example .env
# Fill T3N_API_KEY and AGENT_KEY after claim (keys shown once — store safely)
# Leave .env untracked. .gitignore already excludes .env and secrets/

npm install
npm run demo:policy    # works without keys — policy check before approval
npm run auth           # requires T3N_API_KEY → prints tenant did:t3n:…
npm run agent:whoami   # requires AGENT_KEY → prints agent did:t3n:…
npm run agent:card     # validates agent-card.json size / placeholders
```

Pin matches official Quickstart: `@terminal3/t3n-sdk@5.2.0`, `setEnvironment("testnet")`.

### Publish agent card (after whoami)

1. Put agent DID into `agent-card.json` → `services` entry `name: "DID"`.
2. Replace A2A/MCP endpoints or remove unused services.
3. With `AGENT_KEY` in the environment:
   ```bash
   npx @terminal3/t3n-sdk agent host-card --file agent-card.json --env testnet
   ```

### TEE walkthrough (next depth)

See `tee-contract/README.md`. Official reference clone:

```bash
git clone https://github.com/Terminal-3/z-tenant-flight.git
```

Adapt to `evaluate-expense` / `request-payout`, register via TenantClient, then grant the agent via [Member Delegation](https://docs.terminal3.io/developers/adk/get-started/member-delegation).

## Handover / continue running

Default for this challenge submission: **pass to Terminal 3 to run** after winners, with this repo + Doc as handover.  
If continuing: keep sandbox/testnet keys rotated, document credit top-up via https://t.me/wardumb (quote Superteam + DID).

## Docs followed

- Quickstart: https://docs.terminal3.io/developers/adk/get-started/quickstart
- Register public agent: https://docs.terminal3.io/developers/agents/register-agent
- Member delegation: https://docs.terminal3.io/developers/adk/get-started/member-delegation
- ADK tour: https://docs.terminal3.io/developers/adk/overview/adk-tour
- SSO claim: https://go.terminal3.io/adk-community

## License

MIT
