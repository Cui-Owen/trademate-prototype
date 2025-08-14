# Compliance Engine

This prototype uses a simple, declarative rule engine to turn scattered conditionals into consistent, explainable decisions.

- Inputs: assetClass, leverage, customerType, optional notional
- Outputs: decision (Allow/Block/Notify), reason, ruleId, region

Files:

- `src/compliance/core.ts` — DSL, validation, and evaluator
- `src/compliance/rulesets/esma.ts`, `src/compliance/rulesets/asic.ts` — sample rulesets
- `src/compliance/__tests__/core.spec.ts` — parameterized examples

Extend by adding a new ruleset file and passing it into `evaluateRules`.
