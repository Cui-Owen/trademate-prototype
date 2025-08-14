import React, { useEffect, useRef } from 'react';
import { useKlines } from '../services/query';

type Props = {
  symbol: string;
  interval: '1m' | '5m' | '1h';
  height?: number;
  indicator?: 'none' | 'ma' | 'ema';
};

// Lightweight wrapper; uses dynamic import to avoid build-time dependency
export const ChartShell: React.FC<Props> = ({
  symbol,
  interval,
  height = 260,
  indicator = 'none',
}) => {
  type Candle = { time: number; open: number; high: number; low: number; close: number };
  type Point = { time: number; value: number };
  type CandleSeries = { setData: (d: Candle[]) => void };
  type LineSeries = { setData: (d: Point[]) => void };
  type ChartT = {
    addCandlestickSeries: () => CandleSeries;
    addLineSeries: (o: unknown) => LineSeries;
    remove: () => void;
  };
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<ChartT | null>(null);
  const seriesRef = useRef<CandleSeries | null>(null);
  const { data } = useKlines(symbol, interval);
  const indicatorRef = useRef<LineSeries | null>(null);

  useEffect(() => {
    async function init() {
      if (!containerRef.current) return;
      try {
        const lib = await import('lightweight-charts');
        chartRef.current = lib.createChart(containerRef.current, {
          height,
          layout: { background: { color: 'transparent' }, textColor: '#6B7280' },
          grid: { horzLines: { color: '#e5e7eb' }, vertLines: { color: '#f3f4f6' } },
        });
        seriesRef.current = chartRef.current!.addCandlestickSeries();
      } catch (e) {
        // library not installed; noop fallback
      }
    }
    init();
    const cleanup = () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
    return cleanup;
  }, [height]);

  useEffect(() => {
    if (!seriesRef.current || !data) return;
    const mapped = data.map((k) => ({
      time: Math.floor(k.t / 1000),
      open: k.o,
      high: k.h,
      low: k.l,
      close: k.c,
    }));
    try {
      seriesRef.current.setData(mapped);
    } catch (e) {
      // ignore if seriesRef is not available
    }
    // indicator overlay
    (async () => {
      if (!chartRef.current) return;
      if (!indicatorRef.current) {
        try {
          await import('lightweight-charts');
          indicatorRef.current = chartRef.current.addLineSeries({ color: '#60A5FA', lineWidth: 1 });
        } catch (e) {
          // adapter not available in environment
          return;
        }
      }
      if (indicator === 'none') {
        indicatorRef.current.setData([]);
        return;
      }
      const closes = data.map((k) => k.c);
      const period = interval === '1h' ? 20 : interval === '5m' ? 30 : 50;
      const values = computeIndicator(closes, period, indicator);
      const ts = data.map((k) => Math.floor(k.t / 1000));
      const lined = values
        .map((v, i) => ({ time: ts[i], value: v }))
        .filter((d) => Number.isFinite(d.value));
      try {
        indicatorRef.current.setData(lined);
      } catch (e) {
        // ignore
      }
    })();
  }, [data]);

  return (
    <div>
      <div ref={containerRef} style={{ width: '100%', height }} />
      {!chartRef.current && (
        <div className="text-xs text-[var(--color-text-muted)] mt-2">
          Dev note: install lightweight-charts to enable rendering.
        </div>
      )}
    </div>
  );
};

function computeIndicator(closes: number[], period: number, kind: 'ma' | 'ema') {
  const out = new Array(closes.length).fill(NaN);
  if (kind === 'ma') {
    let sum = 0;
    for (let i = 0; i < closes.length; i++) {
      sum += closes[i];
      if (i >= period) sum -= closes[i - period];
      if (i >= period - 1) out[i] = sum / period;
    }
  } else {
    const k = 2 / (period + 1);
    let ema = closes[0];
    for (let i = 0; i < closes.length; i++) {
      ema = i === 0 ? closes[0] : closes[i] * k + ema * (1 - k);
      if (i >= period - 1) out[i] = ema;
    }
  }
  return out;
}
