import { z } from 'zod';

export const AssetClassSchema = z.enum(['forex', 'index', 'commodity', 'equity', 'crypto']);

const MaxLeverageByClassSchema = z
  .object({
    forex: z.number().int().positive(),
    index: z.number().int().positive(),
    commodity: z.number().int().positive(),
    equity: z.number().int().positive(),
    crypto: z.number().int().positive(),
  })
  .partial();

export const RiskConfigSchema = z.object({
  maxLeverageByClass: MaxLeverageByClassSchema,
  maxNotionalPerTrade: z.number().positive(),
  blockedAssetClasses: z.array(AssetClassSchema).optional(),
});

export type RiskConfig = z.infer<typeof RiskConfigSchema>;
