import { z } from 'zod';
import { AssetSchema } from './asset';

export const OrderSideSchema = z.enum(['buy', 'sell']);

export const OrderDraftSchema = z.object({
  asset: AssetSchema,
  side: OrderSideSchema,
  amount: z.number().positive(),
  leverage: z.number().int().positive(),
  stopLoss: z.number().positive().nullable().optional(),
  takeProfit: z.number().positive().nullable().optional(),
});

export const ExecutedOrderSchema = OrderDraftSchema.extend({
  id: z.string(),
  entryPrice: z.number().positive(),
  timestamp: z.string().datetime(),
});

export type OrderDraft = z.infer<typeof OrderDraftSchema>;
export type ExecutedOrder = z.infer<typeof ExecutedOrderSchema>;
