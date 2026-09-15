/**
 * Offline demo of the enterprise policy the TEE contract will enforce.
 * Safe to run without API keys — shows maintainable pure-TS policy core.
 *
 * Full T3N path (after claim): auth → register WASM TEE contract →
 * member-delegation grant → agent invoke. See tee-contract/ and README.
 */
export type ExpenseRequest = {
  employeeId: string;
  category: "travel" | "meals" | "software" | "other";
  amountUsd: number;
  merchant: string;
  /** Never log raw account numbers — opaque handle only */
  paymentInstrumentRef: string;
  memo: string;
};

export type PolicyDecision = {
  allowed: boolean;
  reasons: string[];
  requiresManagerApproval: boolean;
};

const LIMITS: Record<ExpenseRequest["category"], number> = {
  travel: 2500,
  meals: 75,
  software: 500,
  other: 200,
};

export function evaluateExpense(req: ExpenseRequest): PolicyDecision {
  const reasons: string[] = [];
  let allowed = true;
  let requiresManagerApproval = false;

  const limit = LIMITS[req.category];
  if (req.amountUsd <= 0) {
    allowed = false;
    reasons.push("amount must be positive");
  }
  if (req.amountUsd > limit) {
    allowed = false;
    reasons.push(`${req.category} exceeds policy cap $${limit}`);
  }
  if (req.amountUsd > limit * 0.8 && allowed) {
    requiresManagerApproval = true;
    reasons.push("within cap but >80% — manager approval required");
  }
  if (!req.memo || req.memo.trim().length < 8) {
    allowed = false;
    reasons.push("memo too short for audit");
  }
  if (req.paymentInstrumentRef.startsWith("acct_")) {
    // Illustrates the product rule: raw PANs/accounts never enter agent prompts
    reasons.push("instrument is opaque ref (good) — TEE substitutes real payout details");
  }

  if (allowed && reasons.length === 0) reasons.push("within policy");
  return { allowed, reasons, requiresManagerApproval };
}

const sample: ExpenseRequest = {
  employeeId: "emp_42",
  category: "meals",
  amountUsd: 62,
  merchant: "Airport Cafe",
  paymentInstrumentRef: "acct_tok_opaque_9f3a",
  memo: "Client dinner — Q3 kickoff",
};

const decision = evaluateExpense(sample);
console.log("Sample request:", sample);
console.log("Decision:", decision);
