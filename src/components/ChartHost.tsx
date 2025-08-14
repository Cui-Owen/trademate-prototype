import React, { useEffect, useRef } from 'react';
import type { Candle, ChartHandle } from '../charts/Adapter';
import { getChartAdapter } from '../charts';

export const ChartHost: React.FC<{
  candles: Candle[];
  indicator?: { time: number; value: number }[];
  height?: number;
}> = ({ candles, indicator = [], height = 260 }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<ChartHandle | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const adapter = getChartAdapter();
    let destroyed = false;
    const maybePromise = adapter.mount(containerRef.current, { height });
    Promise.resolve(maybePromise).then((h: ChartHandle) => {
      if (destroyed) return;
      handleRef.current = h;
      h.setCandles(candles);
      if (indicator.length) h.setIndicator(indicator);
    });
    return () => {
      destroyed = true;
      if (handleRef.current) handleRef.current.destroy();
      handleRef.current = null;
    };
  }, [height]);

  useEffect(() => {
    if (handleRef.current) handleRef.current.setCandles(candles);
  }, [candles]);

  useEffect(() => {
    if (handleRef.current) handleRef.current.setIndicator(indicator);
  }, [indicator]);

  return <div ref={containerRef} style={{ width: '100%', height }} />;
};
