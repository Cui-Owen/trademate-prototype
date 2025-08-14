import { z } from 'zod';
import type { ComplianceResult } from '../types/domain';

// DSL for rules
export const RuleInputSchema = z.object({
  assetClass: z.enum(['forex', 'index', 'commodity', 'equity', 'crypto']),
  leverage: z.number().int().positive(),
  customerType: z.enum(['retail', 'professional']).default('retail'),
  notional: z.number().positive().optional(),
});
export type RuleInput = z.infer<typeof RuleInputSchema>;

export type RuleOutcome = 'allow' | 'block' | 'notify';

export interface Rule {
  id: string;
  when: (input: RuleInput) => boolean;
  outcome: RuleOutcome;
  reason: string;
}

export interface RuleSet {
  region: string;
  rules: Rule[];
}

export function evaluateRules(input: RuleInput, ruleset: RuleSet): ComplianceResult {
  const validated = RuleInputSchema.parse(input);
  for (const rule of ruleset.rules) {
    if (rule.when(validated)) {
      const decision =
        rule.outcome === 'block' ? 'block' : rule.outcome === 'notify' ? 'notify' : 'allow';
      return { decision, reason: rule.reason, ruleId: rule.id, region: ruleset.region };
    }
  }
  return { decision: 'allow', reason: 'No rule matched', region: ruleset.region };
}
