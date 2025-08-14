export type SDKError =
  | { type: 'Timeout'; message: string }
  | { type: 'Rejected'; code: string; message: string }
  | { type: 'RiskBlocked'; ruleId: string; message: string };

export type Quote = { symbol: string; price: number; ts: number };
export type Candle = { t: number; o: number; h: number; l: number; c: number };

export interface MarketAPI {
  getQuote(symbol: string): Promise<Quote>;
  getKlines(symbol: string, interval: string): Promise<Candle[]>;
}

export type OrderSide = 'buy' | 'sell';
export interface OrderRequest {
  symbol: string;
  side: OrderSide;
  amount: number;
  leverage: number;
}
export interface OrderResponse {
  id: string;
  status: 'accepted' | 'rejected';
  reason?: string;
}

export interface OrderAPI {
  place(req: OrderRequest): Promise<OrderResponse | SDKError>;
}

export interface TradeMateSDK {
  market: MarketAPI;
  order: OrderAPI;
}
