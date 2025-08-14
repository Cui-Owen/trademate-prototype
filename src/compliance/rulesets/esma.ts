import type { RuleSet } from '../core';

// Simplified ESMA-like leverage caps for illustration
const maxLev: Record<string, number> = {
  forex: 30,
  index: 20,
  commodity: 10,
  equity: 5,
  crypto: 2,
};

export const esmaRuleset: RuleSet = {
  region: 'esma',
  rules: [
    {
      id: 'esma-max-leverage',
      when: ({ assetClass, leverage, customerType }) =>
        customerType === 'retail' && leverage > (maxLev[assetClass] ?? 1),
      outcome: 'block',
      reason: 'Leverage exceeds ESMA retail cap',
    },
    {
      id: 'esma-crypto-notify',
      when: ({ assetClass }) => assetClass === 'crypto',
      outcome: 'notify',
      reason: 'Crypto carries higher risk; ensure suitability',
    },
  ],
};
