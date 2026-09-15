/**
 * STUB — Member delegation pattern (do not run until keys + contract_id exist).
 * Docs: https://docs.terminal3.io/developers/adk/get-started/member-delegation
 *
 * Auth proves identity; grants authorize specific contract functions + hosts.
 */
export const DELEGATION_EXAMPLE = {
  grantee: "did:t3n:AGENT_DID_FROM_WHOAMI",
  contract_id: "z:TENANT_HEX:expense-guard",
  version_req: "0.1.0",
  functions: ["evaluate-expense", "request-payout"],
  // omitted allowed_hosts => no egress; set explicitly when calling external APIs
  allowed_hosts: [] as string[],
  scopes: [] as string[],
};

/**
 * Pseudocode (data-owner client, not agent):
 *
 * await userClient.updateMemberDelegation({
 *   grantee: agentDid,
 *   contract_id: TENANT_CONTRACT,
 *   version_req: contractVersion,
 *   functions: ["evaluate-expense", "request-payout"],
 *   allowed_hosts: [], // or e.g. ["api.stripe.com"] for Agent Connect test mode
 * });
 */
