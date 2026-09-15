# Google Doc outline — T3N Expense Guard (Earn submission)

**Publish as:** Public Google Doc (Anyone with the link can view)  
**Paste Doc URL** into Earn as the primary submission link  
**Deadline:** Tue Sep 16, 2026 **10:59 AM CT**

Copy sections below into a new Google Doc. Replace `TBD` after SSO + GitHub push.  
**Do not put API keys in the Doc.** DIDs (`did:t3n:…`) are OK.

---

## Title
Expense Guard — Trusted Enterprise Agent on Terminal 3 (T3N)  
Superteam Earn: T3N Agent Build Challenge  
Author: Brian Dunbar · GitHub: briandunbar7774-cmd · Date: 2026-09-16

---

## 1. One-liner
Enterprise expense-policy agent with verifiable T3N identity, scoped delegation, and a maintainable TS + TEE skeleton so orgs can approve expenses without putting bank details in prompts.

---

## 2. Public GitHub repo
- **URL:** `https://github.com/briandunbar7774-cmd/t3n-expense-guard` *(TBD after CloudAgent push)*
- Branch: `main`
- License: MIT

---

## 3. Earn form answers (copy into Earn UI)

| Earn field | Answer |
| --- | --- |
| Email address | `TBD — Brian’s email` |
| What is your DID generated from the page? | `did:t3n:TBD` (tenant DID from claim / `npm run auth`) |
| Would you want to continue running this / pass it to us to run it? | **Pass to Terminal 3 to run** after the challenge, with repo + this Doc as handover. (Or: Continue running — will monitor testnet credits.) |
| Main submission link | **This Google Doc URL** |

---

## 4. What we built
- TypeScript ADK quickstart auth (`src/auth-quickstart.ts`)
- Separate agent identity path (`src/agent-whoami.ts`) + ERC-8004 `agent-card.json`
- Offline / maintainable policy engine (`src/demo-policy-check.ts`)
- Rust TEE stub + pointer to official `z-tenant-flight` walkthrough (`tee-contract/`)
- Delegation stub documenting auth ≠ authz

### Usefulness (enterprise)
- Clear expense categories + caps
- Manager-approval band
- Opaque payment instrument refs (no PAN/account in agent context)
- Path to placeholder-resolved payouts inside TEE

### Ease of maintenance
- Policy logic in plain TS (unit-testable without WASM)
- Pinned `@terminal3/t3n-sdk@5.2.0`
- `.env.example` only — no secrets in git
- Single README path from claim → auth → card → TEE

---

## 5. How to run (judges / handover)
1. Claim keys: https://go.terminal3.io/adk-community  
2. `cp .env.example .env` → set `T3N_API_KEY` + `AGENT_KEY`  
3. `npm install`  
4. `npm run demo:policy` (no keys)  
5. `npm run auth` / `npm run agent:whoami`  
6. Update + `host-card` per README  
7. Optional: complete TEE walkthrough with Rust toolchain

---

## 6. Screenshots (paste images here)
- [ ] ADK claim success screen (**redact API key**; show credits / that DID issued)
- [ ] Terminal: `npm run auth` → `Connected as: did:t3n:…`
- [ ] Terminal: `npm run agent:whoami` → agent DID
- [ ] Terminal: `npm run demo:policy` decision JSON
- [ ] (If done) `host-card` published URL or `curl` of agent card
- [ ] (If done) contract register / invoke success

---

## 7. Bugs / docs friction faced
*(Judging includes bug submission quality — be specific.)*

| # | Area | What happened | Workaround / ask |
| --- | --- | --- | --- |
| 1 | Claim UX | API key shown only once | Saved offline before leaving page |
| 2 | Env naming | Marketing “sandbox” vs Quickstart `testnet` | Used `testnet` per Quickstart |
| 3 | TBD | … | … |

---

## 8. Architecture (simple diagram)

```
[Employee / Ops chat]
        │
        ▼
[Expense Guard agent — did:t3n:agent…]
        │  member-delegation grant
        ▼
[TEE contract evaluate-expense / request-payout]
        │  secrets map + http-with-placeholders
        ▼
[Ledger audit row + optional payout API]
```

---

## 9. Handover process (if passing to T3)
1. Public repo + this Doc  
2. Tenant + agent DIDs listed above (keys **not** transferred via Doc — rotate/re-claim under T3 org if needed)  
3. Policy caps in `demo-policy-check.ts` / tee stub  
4. Contact on Earn email field  

---

## 10. Bonus social
- X post tagging **@terminal3io** with Doc + repo links — URL: `TBD`

---

## 11. Resources used
- https://docs.terminal3.io/developers/adk/get-started/quickstart  
- https://docs.terminal3.io/developers/agents/register-agent  
- https://docs.terminal3.io/developers/adk/get-started/member-delegation  
- https://go.terminal3.io/adk-community  
