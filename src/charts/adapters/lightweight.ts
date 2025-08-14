import type { ChartAdapter, ChartHandle } from '../Adapter';

type Candle = { time: number; open: number; high: number; low: number; close: number };
type Point = { time: number; value: number };
type CandleSeries = { setData: (d: Candle[]) => void };
type LineSeries = { setData: (d: Point[]) => void };
type ChartT = {
  addCandlestickSeries: () => CandleSeries;
  addLineSeries: (o: unknown) => LineSeries;
  remove: () => void;
};

export const LightweightAdapter: ChartAdapter = {
  async mount(container, opts) {
    let chart: ChartT | null = null;
    let series: CandleSeries | null = null;
    let line: LineSeries | null = null;
    try {
      const lib = await import('lightweight-charts');
      chart = lib.createChart(container, {
        height: opts.height,
        layout: { background: { color: 'transparent' }, textColor: '#6B7280' },
        grid: { horzLines: { color: '#e5e7eb' }, vertLines: { color: '#f3f4f6' } },
      });
      series = chart.addCandlestickSeries();
      line = chart.addLineSeries({ color: '#60A5FA', lineWidth: 1 });
    } catch {
      // library missing
      const note = document.createElement('div');
      note.style.color = '#6B7280';
      note.style.fontSize = '12px';
      note.style.marginTop = '8px';
      note.textContent = 'Install lightweight-charts to enable rendering.';
      container.appendChild(note);
    }
    const handle: ChartHandle = {
      setCandles(candles) {
        if (!series) return;
        const mapped = candles.map((k) => ({
          time: Math.floor(k.t / 1000),
          open: k.o,
          high: k.h,
          low: k.l,
          close: k.c,
        }));
        series.setData(mapped);
      },
      setIndicator(points) {
        if (!line) return;
        line.setData(points);
      },
      destroy() {
        if (chart) chart.remove();
      },
    };
    return handle;
  },
};
