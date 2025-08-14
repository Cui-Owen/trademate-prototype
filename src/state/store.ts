import { create } from 'zustand';
import type { Asset, OrderDraft, RiskConfig } from '../types/domain';

type DraftState = {
  draft: OrderDraft | null;
  risk: RiskConfig;
};

type Actions = {
  setDraft: (draft: OrderDraft) => void;
  clearDraft: () => void;
  setRisk: (risk: RiskConfig) => void;
  selectAsset: (asset: Asset) => void;
};

const defaultRisk: RiskConfig = {
  maxLeverageByClass: { forex: 30, index: 20, commodity: 10, equity: 5, crypto: 2 },
  maxNotionalPerTrade: 100000,
  blockedAssetClasses: [],
};

type Store = DraftState & Actions;

export const useTradeStore = create<Store>((set) => ({
  draft: null,
  risk: defaultRisk,
  setDraft: (draft: OrderDraft) => set({ draft }),
  clearDraft: () => set({ draft: null }),
  setRisk: (risk: RiskConfig) => set({ risk }),
  selectAsset: (asset: Asset) =>
    set((state) => ({
      draft: state.draft
        ? { ...state.draft, asset }
        : {
            asset,
            side: 'buy',
            amount: 1000,
            leverage: 1,
            stopLoss: null,
            takeProfit: null,
          },
    })),
}));
