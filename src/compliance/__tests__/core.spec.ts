import { evaluateRules } from '../core';
import { esmaRuleset } from '../rulesets/esma';

describe('Compliance engine', () => {
  it('blocks excessive leverage for retail under ESMA', () => {
    const result = evaluateRules(
      { assetClass: 'forex', leverage: 100, customerType: 'retail' },
      esmaRuleset
    );
    expect(result.decision).toBe('block');
    expect(result.reason).toMatch(/Leverage exceeds ESMA/);
  });

  it('allows within caps', () => {
    const result = evaluateRules(
      { assetClass: 'equity', leverage: 2, customerType: 'retail' },
      esmaRuleset
    );
    expect(result.decision).toBe('allow');
  });

  it('notifies on crypto', () => {
    const result = evaluateRules(
      { assetClass: 'crypto', leverage: 1, customerType: 'retail' },
      esmaRuleset
    );
    expect(result.decision).toBe('notify');
  });
});
