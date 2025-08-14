// Domain Types centralization

export type AssetClass = 'forex' | 'index' | 'commodity' | 'equity' | 'crypto';

export interface Asset {
  symbol: string;
  name: string;
  assetClass: AssetClass;
}

export type OrderSide = 'buy' | 'sell';

export interface OrderDraft {
  asset: Asset;
  side: OrderSide;
  amount: number; // notional in account currency
  leverage: number; // e.g., 1, 5, 10
  stopLoss?: number | null; // price level
  takeProfit?: number | null; // price level
}

export interface ExecutedOrder extends OrderDraft {
  id: string;
  entryPrice: number;
  timestamp: string; // ISO
}

export type ComplianceDecision = 'allow' | 'block' | 'notify';

export interface ComplianceResult {
  decision: ComplianceDecision;
  reason: string;
  ruleId?: string;
  region?: string; // e.g., esma, asic
}

export interface RiskConfig {
  maxLeverageByClass: Partial<Record<AssetClass, number>>;
  maxNotionalPerTrade: number; // in account currency
  blockedAssetClasses?: AssetClass[];
}
