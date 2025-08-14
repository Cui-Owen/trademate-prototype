import type { RuleSet } from '../core';

// Placeholder ASIC-like rules
export const asicRuleset: RuleSet = {
  region: 'asic',
  rules: [
    {
      id: 'asic-max-leverage-forex',
      when: ({ assetClass, leverage, customerType }) =>
        customerType === 'retail' && assetClass === 'forex' && leverage > 30,
      outcome: 'block',
      reason: 'Leverage exceeds ASIC retail cap for forex',
    },
    {
      id: 'asic-notional-alert',
      when: ({ notional }) => !!notional && notional > 50_000,
      outcome: 'notify',
      reason: 'Large trade size; confirm appropriateness',
    },
  ],
};
