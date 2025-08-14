import type {
  Candle,
  MarketAPI,
  OrderAPI,
  OrderRequest,
  OrderResponse,
  SDKError,
  TradeMateSDK,
} from './types';
import { getProvider } from '../providers';

class MarketMock implements MarketAPI {
  async getQuote(symbol: string) {
    const q = await getProvider().getQuote(symbol);
    return { symbol: q.symbol, price: q.price, ts: Date.now() };
  }
  async getKlines(symbol: string, interval: string): Promise<Candle[]> {
    const ks = await getProvider().getKlines(symbol, interval);
    return ks.map((k) => ({ t: k.t, o: k.o, h: k.h, l: k.l, c: k.c }));
  }
}

class OrderMock implements OrderAPI {
  async place(req: OrderRequest): Promise<OrderResponse | SDKError> {
    // Simulate risk block at high leverage
    if (req.leverage > 30) {
      return { type: 'RiskBlocked', ruleId: 'esma-max-leverage', message: 'Leverage exceeds cap' };
    }
    // Simulate random timeout
    if (Math.random() < 0.02) {
      return { type: 'Timeout', message: 'Upstream timeout' };
    }
    return { id: String(Date.now()), status: 'accepted' };
  }
}

let sdk: TradeMateSDK = { market: new MarketMock(), order: new OrderMock() };

export function getSdk(): TradeMateSDK {
  return sdk;
}
export function setSdk(next: TradeMateSDK) {
  sdk = next;
}
