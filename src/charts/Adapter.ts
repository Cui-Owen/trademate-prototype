export type Candle = { t: number; o: number; h: number; l: number; c: number };

export type ChartHandle = {
  setCandles: (candles: Candle[]) => void;
  setIndicator: (points: { time: number; value: number }[]) => void;
  destroy: () => void;
};

export interface ChartAdapter {
  mount: (container: HTMLElement, opts: { height: number }) => Promise<ChartHandle> | ChartHandle;
}
