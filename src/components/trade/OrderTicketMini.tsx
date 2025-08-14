import React from 'react';
import { Button } from '../ui/Button';
import { useI18n } from '../../i18n';
import { getAnalytics } from '../../observability/gateway';

export type OrderDraftMini = {
  symbol: string;
  side: 'buy' | 'sell';
  amount: number;
  leverage: number;
};

export const OrderTicketMini: React.FC<{
  value: OrderDraftMini;
  onChange: (v: OrderDraftMini) => void;
  onSubmit?: (v: OrderDraftMini) => void;
}> = ({ value, onChange, onSubmit }) => {
  const { t } = useI18n();
  const a = getAnalytics();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        a.track('order_submitted', {
          symbol: value.symbol,
          notional: value.amount,
          leverage: value.leverage,
        });
        onSubmit?.(value);
      }}
      className="grid grid-cols-2 gap-3 text-sm"
    >
      <label className="flex flex-col">
        <span className="text-[var(--color-text-muted)] mb-1">Symbol</span>
        <input
          required
          className="border border-[var(--color-border)] rounded-[var(--radius-sm)] px-2 py-1"
          value={value.symbol}
          onChange={(e) => onChange({ ...value, symbol: e.target.value })}
        />
      </label>
      <label className="flex flex-col">
        <span className="text-[var(--color-text-muted)] mb-1">Side</span>
        <select
          className="border border-[var(--color-border)] rounded-[var(--radius-sm)] px-2 py-1"
          value={value.side}
          onChange={(e) => onChange({ ...value, side: e.target.value as 'buy' | 'sell' })}
        >
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
      </label>
      <label className="flex flex-col">
        <span className="text-[var(--color-text-muted)] mb-1">{t('common.amount')}</span>
        <input
          type="number"
          min={1}
          className="border border-[var(--color-border)] rounded-[var(--radius-sm)] px-2 py-1"
          value={value.amount}
          onChange={(e) => onChange({ ...value, amount: Number(e.target.value) })}
        />
      </label>
      <label className="flex flex-col">
        <span className="text-[var(--color-text-muted)] mb-1">{t('common.leverage')}</span>
        <input
          type="number"
          min={1}
          className="border border-[var(--color-border)] rounded-[var(--radius-sm)] px-2 py-1"
          value={value.leverage}
          onChange={(e) => {
            const lv = Number(e.target.value);
            a.track('leverage_change', { from: value.leverage, to: lv });
            onChange({ ...value, leverage: lv });
          }}
        />
      </label>
      <div className="col-span-2 mt-1">
        <Button type="submit" className="w-full">
          {t('common.submit')}
        </Button>
      </div>
    </form>
  );
};
