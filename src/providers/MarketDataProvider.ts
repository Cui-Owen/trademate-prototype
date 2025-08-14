export type Quote = {
  symbol: string;
  price: number;
  change: number; // absolute
  changePercent: number;
  spread?: number;
  volume?: string | number;
};

export interface MarketDataProvider {
  getQuote(symbol: string): Promise<Quote>;
  getKlines(
    symbol: string,
    interval: string
  ): Promise<{ t: number; o: number; h: number; l: number; c: number }[]>;
  subscribe?(symbol: string, cb: (q: Quote) => void): () => void;
}
