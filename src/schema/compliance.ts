import { z } from 'zod';

export const ComplianceDecisionSchema = z.enum(['allow', 'block', 'notify']);

export const ComplianceResultSchema = z.object({
  decision: ComplianceDecisionSchema,
  reason: z.string().min(1),
  ruleId: z.string().optional(),
  region: z.string().optional(),
});

export type ComplianceResult = z.infer<typeof ComplianceResultSchema>;
