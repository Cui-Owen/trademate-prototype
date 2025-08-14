export type EventName =
  | 'onboarding_step'
  | 'leverage_change'
  | 'rule_triggered'
  | 'order_submitted'
  | 'order_abandoned';

export type EventPayloads = {
  onboarding_step: { step: string; completed: boolean };
  leverage_change: { from: number; to: number };
  rule_triggered: { ruleId: string; decision: 'allow' | 'block' | 'notify' };
  order_submitted: { symbol: string; notional: number; leverage: number };
  order_abandoned: { stage: string; dwellMs: number };
};

export type AnalyticsEvent<K extends EventName = EventName> = {
  name: K;
  ts: number;
  payload: EventPayloads[K];
};
