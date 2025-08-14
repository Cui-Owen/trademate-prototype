import type { MarketDataProvider } from './MarketDataProvider';
import { HttpPollingProvider } from './HttpPollingProvider';
import { ReplayProvider } from './ReplayProvider';

let cached: MarketDataProvider | null = null;

export function getProvider(): MarketDataProvider {
  if (cached) return cached;
  const isReplay = new URLSearchParams(window.location.search).get('provider') === 'replay';
  cached = isReplay ? new ReplayProvider() : new HttpPollingProvider();
  return cached;
}
