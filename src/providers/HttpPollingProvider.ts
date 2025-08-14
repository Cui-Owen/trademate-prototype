import type { MarketDataProvider, Quote } from './MarketDataProvider';

// Simple mock polling provider using random walk when no backend is available
export class HttpPollingProvider implements MarketDataProvider {
  async getQuote(symbol: string): Promise<Quote> {
    const base = this.seedFromSymbol(symbol);
    const price = this.randomWalk(base);
    const change = Number((price - base).toFixed(2));
    const changePercent = Number(((change / base) * 100).toFixed(2));
    return {
      symbol,
      price: Number(price.toFixed(2)),
      change,
      changePercent,
      spread: 0.02,
      volume: '1.2M',
    };
  }

  async getKlines(symbol: string, _interval: string) {
    const t0 = Date.now() - 60 * 60 * 1000;
    const base = this.seedFromSymbol(symbol);
    const result = Array.from({ length: 60 }).map((_, i) => {
      const t = t0 + i * 60 * 1000;
      const o = this.randomWalk(base + i * 0.02);
      const h = o + Math.random() * 0.5;
      const l = o - Math.random() * 0.5;
      const c = l + Math.random() * (h - l);
      return { t, o: round2(o), h: round2(h), l: round2(l), c: round2(c) };
    });
    return result;
  }

  private seedFromSymbol(symbol: string) {
    return 100 + (symbol.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % 50);
  }

  private randomWalk(base: number) {
    return base + (Math.random() - 0.5) * 2;
  }
}

function round2(n: number) {
  return Number(n.toFixed(2));
}
