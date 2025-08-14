import type { MarketDataProvider, Quote } from './MarketDataProvider';
import { getReplayController } from './replay/controller';

type Candle = { t: number; o: number; h: number; l: number; c: number };

// Dataset-backed replay provider; accepts ?provider=replay&dataset=volatile|gap|range
export class ReplayProvider implements MarketDataProvider {
  private idx = 0;
  private candles: Candle[] = [];
  private latest: Quote | null = null;

  constructor() {
    const dataset = new URLSearchParams(window.location.search).get('dataset') || 'volatile';
    fetch(`${process.env.PUBLIC_URL || ''}/datasets/${dataset}.ndjson`)
      .then((r) => r.text())
      .then((text) => {
        this.candles = text
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean)
          .map((l) => JSON.parse(l));
        this.startLoop();
      })
      .catch(() => {
        // fallback to synthetic if dataset missing
        this.candles = Array.from({ length: 240 }, (_, i) => {
          const base = 150 + Math.sin(i / 10) * 5;
          return {
            t: Date.now() + i * 60_000,
            o: base,
            h: base + 0.4,
            l: base - 0.4,
            c: base + 0.1,
          };
        });
        this.startLoop();
      });
  }

  private startLoop() {
    const ctrl = getReplayController();
    const tick = () => {
      const { playing, speed } = ctrl.get();
      if (playing && this.candles.length) {
        this.idx = (this.idx + speed) % this.candles.length;
        const k = this.candles[this.idx];
        this.latest = {
          symbol: 'AAPL',
          price: round2(k.c),
          change: round2(k.c - this.candles[Math.max(0, this.idx - 1)].c),
          changePercent: round2(((k.c - this.candles[Math.max(0, this.idx - 1)].c) / k.c) * 100),
          spread: 0.01,
          volume: 'replay',
        };
      }
    };
    window.setInterval(tick, 1000);
    ctrl.subscribe((s) => {
      if (!s.playing) return;
      // index changed externally
      this.idx = s.index % (this.candles.length || 1);
    });
  }

  async getQuote(symbol: string): Promise<Quote> {
    if (!this.latest && this.candles.length) {
      const k = this.candles[this.idx];
      this.latest = {
        symbol,
        price: round2(k.c),
        change: 0,
        changePercent: 0,
        spread: 0.01,
        volume: 'replay',
      };
    }
    return (
      this.latest || {
        symbol,
        price: 150,
        change: 0,
        changePercent: 0,
        spread: 0.01,
        volume: 'replay',
      }
    );
  }

  async getKlines(_symbol: string, _interval: string) {
    const from = Math.max(0, this.idx - 60);
    return this.candles
      .slice(from, this.idx + 1)
      .map((c) => ({ ...c, o: round2(c.o), h: round2(c.h), l: round2(c.l), c: round2(c.c) }));
  }
}

function round2(n: number) {
  return Number(n.toFixed(2));
}
