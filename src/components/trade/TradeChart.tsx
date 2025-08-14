import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useKlines } from '../../services/query';
import { ChartHost } from '../ChartHost';

export const TradeChart: React.FC<{
  symbol: string;
  interval: '1m' | '5m' | '1h';
  height?: number;
  sl: number | null;
  tp: number | null;
  entryPrice: number;
  onChange: (v: { sl: number | null; tp: number | null }) => void;
}> = ({ symbol, interval, height = 260, sl, tp, entryPrice, onChange }) => {
  const { data = [] } = useKlines(symbol, interval);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState<null | 'sl' | 'tp'>(null);

  const [min, max] = useMemo(() => {
    if (!data.length) return [entryPrice * 0.9, entryPrice * 1.1];
    const min = Math.min(...data.map((d) => d.l));
    const max = Math.max(...data.map((d) => d.h));
    return [min, max];
  }, [data, entryPrice]);

  const candles = data;

  const indicator = useMemo(() => {
    const closes = data.map((k) => k.c);
    const period = interval === '1h' ? 20 : interval === '5m' ? 30 : 50;
    const ema: number[] = new Array(closes.length).fill(NaN);
    const k = 2 / (period + 1);
    let val = closes[0] ?? entryPrice;
    for (let i = 0; i < closes.length; i++) {
      val = i === 0 ? (closes[0] ?? entryPrice) : closes[i] * k + val * (1 - k);
      if (i >= period - 1) ema[i] = val;
    }
    const ts = data.map((k) => Math.floor(k.t / 1000));
    return ema.map((v, i) => ({ time: ts[i], value: v })).filter((d) => Number.isFinite(d.value));
  }, [data, interval, entryPrice]);

  const h = height;
  const priceToY = (p: number) => ((max - p) / (max - min)) * h;
  const yToPrice = (y: number) => max - (y / h) * (max - min);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const y = Math.min(Math.max(0, e.clientY - rect.top), h);
      const p = Number(yToPrice(y).toFixed(2));
      if (dragging === 'sl') onChange({ sl: p, tp });
      else onChange({ sl, tp: p });
    };
    const onUp = () => setDragging(null);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [dragging, h, sl, tp, onChange, yToPrice]);

  return (
    <div ref={containerRef} className="relative">
      <ChartHost candles={candles} indicator={indicator} height={height} />

      {sl != null && (
        <Handle
          y={priceToY(sl)}
          color="#EF4444"
          label={`SL ${sl.toFixed(2)}`}
          onMouseDown={() => setDragging('sl')}
        />
      )}
      {tp != null && (
        <Handle
          y={priceToY(tp)}
          color="#10B981"
          label={`TP ${tp.toFixed(2)}`}
          onMouseDown={() => setDragging('tp')}
        />
      )}

      <div className="absolute right-2 top-2 flex gap-2 bg-[var(--color-surface)]/90 backdrop-blur rounded-[var(--radius-sm)] p-1 border border-[var(--color-border)]">
        <button
          className="text-xs px-2 py-1 border border-[var(--color-border)] rounded-[var(--radius-sm)]"
          onClick={() => onChange({ sl: entryPrice * 0.98, tp })}
        >
          Set SL -2%
        </button>
        <button
          className="text-xs px-2 py-1 border border-[var(--color-border)] rounded-[var(--radius-sm)]"
          onClick={() => onChange({ sl, tp: entryPrice * 1.02 })}
        >
          Set TP +2%
        </button>
      </div>
    </div>
  );
};

const Handle: React.FC<{ y: number; color: string; label: string; onMouseDown: () => void }> = ({
  y,
  color,
  label,
  onMouseDown,
}) => {
  return (
    <div
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(100 - y)}
      style={{ top: y }}
      onMouseDown={onMouseDown}
      className="absolute left-0 right-0 cursor-row-resize select-none"
    >
      <div style={{ borderTop: `2px solid ${color}` }} />
      <div
        className="absolute right-2 -mt-3 text-xs px-2 py-1 rounded"
        style={{ background: color, color: '#fff' }}
      >
        {label}
      </div>
    </div>
  );
};
