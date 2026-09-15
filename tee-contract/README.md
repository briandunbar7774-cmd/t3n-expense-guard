# TEE contract — Expense Guard

This folder is a **minimal** Rust stub. To complete the official Walkthrough:

1. Install Rust + `wasm32-wasip2` (ADK Set Up Dev Env).
2. Prefer cloning the maintained reference and adapting it:
   ```bash
   git clone https://github.com/Terminal-3/z-tenant-flight.git
   ```
3. Replace Duffel flight functions with `evaluate-expense` / `request-payout`.
4. For any payout call that needs real account details, use
   `http-with-placeholders` and `{{profile.*}}` markers — never put PII in WASM.
5. Register via `TenantClient` / walkthrough **register-contract** + **invoke**.

Unit-test the pure JSON policy without WASM:
```bash
cd tee-contract && cargo test
```
