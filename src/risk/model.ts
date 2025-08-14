export type RiskInput = {
  side: 'buy' | 'sell';
  entryPrice: number; // price
  leverage: number; // e.g., 1,5,10
  amount: number; // notional in account currency
  sl?: number | null; // stop-loss price
  tp?: number | null; // take-profit price
  slippage?: number; // percent 0..1
  maintenanceMarginRate?: number; // percent 0..1, e.g., 0.005
};

export type RiskOutput = {
  positionSize: number; // units = amount / entryPrice
  initialMargin: number; // amount / leverage
  liquidationPrice: number; // rough estimate
  expectedPnl: number; // expectation from sl/tp with 50/50 naive prior
  worstDrawdown: number; // to SL (or heuristic)
  pointValue: number; // per 1% move
};

export function computeRisk(input: RiskInput): RiskOutput {
  const {
    entryPrice,
    leverage,
    amount,
    sl,
    tp,
    slippage = 0.0005,
    maintenanceMarginRate = 0.005,
  } = input;
  const positionSize = amount / entryPrice;
  const initialMargin = amount / leverage;
  const liquidationPrice = entryPrice * (1 - 1 / leverage + maintenanceMarginRate);
  const pointValue = amount * 0.01 * (input.side === 'buy' ? 1 : -1); // 1% move P&L sign-adjusted

  let expectedPnl = 0;
  let worstDrawdown = 0;
  if (sl && tp) {
    const moveSl = (sl - entryPrice) / entryPrice; // negative if sl < entry
    const moveTp = (tp - entryPrice) / entryPrice; // positive if tp > entry
    // naive 50/50 expectation minus slippage costs
    expectedPnl = amount * (0.5 * moveTp + 0.5 * moveSl) - amount * slippage;
    worstDrawdown = Math.min(moveSl, moveTp) * amount;
  } else if (sl) {
    const moveSl = (sl - entryPrice) / entryPrice;
    expectedPnl = amount * (0.25 * moveSl) - amount * slippage; // conservative prior
    worstDrawdown = moveSl * amount;
  }

  return {
    positionSize,
    initialMargin,
    liquidationPrice,
    expectedPnl,
    worstDrawdown,
    pointValue,
  };
}
