import React from 'react';
import type { RiskInput } from '../../risk/model';
import { computeRisk } from '../../risk/model';
import { Card } from '../ui/Card';
import { useI18n } from '../../i18n';

export const RiskPanel: React.FC<{ input: RiskInput }> = ({ input }) => {
  const { t } = useI18n();
  const risk = computeRisk(input);
  return (
    <Card title={t('risk.title')}>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-[var(--color-text-muted)]">{t('risk.margin')}</div>
          <div className="text-[var(--color-text)]">${risk.initialMargin.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-[var(--color-text-muted)]">{t('risk.liqPrice')}</div>
          <div className="text-[var(--color-text)]">{risk.liquidationPrice.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-[var(--color-text-muted)]">Expected P&L</div>
          <div className="text-[var(--color-text)]">${risk.expectedPnl.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-[var(--color-text-muted)]">Worst Drawdown</div>
          <div className="text-[var(--color-text)]">${risk.worstDrawdown.toFixed(2)}</div>
        </div>
      </div>
    </Card>
  );
};
