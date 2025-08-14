import type { ChartAdapter } from './Adapter';
import { LightweightAdapter } from './adapters/lightweight';
import { TradingViewAdapter } from './adapters/tradingview';

export function getChartAdapter(): ChartAdapter {
  const viaQuery = new URLSearchParams(window.location.search).get('chart');
  if (viaQuery === 'tv') return TradingViewAdapter;
  return LightweightAdapter;
}
