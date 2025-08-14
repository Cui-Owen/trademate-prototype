import { z } from 'zod';

export const AssetSchema = z.object({
  symbol: z.string().min(1),
  name: z.string().min(1),
  assetClass: z.enum(['forex', 'index', 'commodity', 'equity', 'crypto']),
});

export type Asset = z.infer<typeof AssetSchema>;
