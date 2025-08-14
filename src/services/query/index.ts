import { useQuery } from '@tanstack/react-query';
import { getProvider } from '../../providers';

export function useQuote(symbol: string) {
  const provider = getProvider();
  return useQuery({
    queryKey: ['quote', symbol],
    queryFn: () => provider.getQuote(symbol),
    staleTime: 5_000,
    refetchInterval: 10_000,
  });
}

export function useKlines(symbol: string, interval: string) {
  const provider = getProvider();
  return useQuery({
    queryKey: ['klines', symbol, interval],
    queryFn: () => provider.getKlines(symbol, interval),
    staleTime: 60_000,
    refetchInterval: 60_000,
  });
}
