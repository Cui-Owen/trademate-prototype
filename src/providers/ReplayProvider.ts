import type { MarketDataProvider, Quote } from './MarketDataProvider';

// Minimal in-memory replay provider for demos; accepts ?provider=replay
export class ReplayProvider implements MarketDataProvider {
  private idx = 0;
  private series: number[];

  constructor() {
    // deterministic sequence
    this.series = Array.from({ length: 300 }, (_, i) => 150 + Math.sin(i / 10) * 5 + i * 0.01);
  }

  async getQuote(symbol: string): Promise<Quote> {
    const price = this.series[this.idx % this.series.length];
    const prev = this.series[(this.idx - 1 + this.series.length) % this.series.length];
    this.idx++;
    const change = Number((price - prev).toFixed(2));
    const changePercent = Number(((change / prev) * 100).toFixed(2));
    return { symbol, price: round2(price), change, changePercent, spread: 0.01, volume: 'replay' };
  }

  async getKlines(_symbol: string, _interval: string) {
    const now = Date.now();
    return Array.from({ length: 60 }, (_, i) => {
      const base = this.series[(this.idx + i) % this.series.length];
      const o = base + 0.1;
      const h = base + 0.3;
      const l = base - 0.3;
      const c = base + 0.05;
      return {
        t: now - (60 - i) * 60 * 1000,
        o: round2(o),
        h: round2(h),
        l: round2(l),
        c: round2(c),
      };
    });
  }
}

function round2(n: number) {
  return Number(n.toFixed(2));
}
