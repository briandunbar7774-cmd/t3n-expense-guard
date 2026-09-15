//! TEE contract stub for Expense Guard.
//! Full WIT/host deps: clone Terminal-3 reference and adapt, or follow
//! https://docs.terminal3.io/developers/adk/get-started/walkthrough/write-contract
//!
//! Recommended bootstrap:
//!   git clone https://github.com/Terminal-3/z-tenant-flight.git
//! then replace flight search/book with evaluate-expense / request-payout.

#![allow(dead_code)]

/// Pure policy logic mirrored from src/demo-policy-check.ts — keep in sync.
pub fn evaluate_expense_json(input: &[u8]) -> Result<Vec<u8>, String> {
    let v: serde_json::Value =
        serde_json::from_slice(input).map_err(|e| format!("bad json: {e}"))?;
    let amount = v
        .get("amountUsd")
        .and_then(|x| x.as_f64())
        .ok_or("missing amountUsd")?;
    let category = v
        .get("category")
        .and_then(|x| x.as_str())
        .unwrap_or("other");
    let limit = match category {
        "travel" => 2500.0,
        "meals" => 75.0,
        "software" => 500.0,
        _ => 200.0,
    };
    let allowed = amount > 0.0 && amount <= limit;
    let out = serde_json::json!({
        "allowed": allowed,
        "category": category,
        "amountUsd": amount,
        "limitUsd": limit,
        "reasons": if allowed { vec!["within policy"] } else { vec!["over cap or invalid"] },
    });
    serde_json::to_vec(&out).map_err(|e| e.to_string())
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn meal_ok() {
        let input = br#"{"amountUsd":40,"category":"meals"}"#;
        let out = evaluate_expense_json(input).unwrap();
        let v: serde_json::Value = serde_json::from_slice(&out).unwrap();
        assert_eq!(v["allowed"], true);
    }
}
