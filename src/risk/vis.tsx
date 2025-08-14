import React from 'react';
import type { RiskOutput } from './model';

export const RiskDistribution: React.FC<{ risk: RiskOutput }> = ({ risk }) => {
  const bins = [
    { label: '-3%', value: -0.03 },
    { label: '-2%', value: -0.02 },
    { label: '-1%', value: -0.01 },
    { label: '+1%', value: 0.01 },
    { label: '+2%', value: 0.02 },
    { label: '+3%', value: 0.03 },
  ];
  return (
    <div>
      <div className="text-sm text-[var(--color-text-muted)] mb-2">P/L Distribution (per move)</div>
      <div className="grid grid-cols-6 gap-2">
        {bins.map((b) => {
          const pnl = b.value * (risk.pointValue * 100);
          const height = Math.min(100, Math.abs(pnl) / 10);
          const positive = pnl >= 0;
          return (
            <div key={b.label} className="flex flex-col items-center">
              <div
                className={`${positive ? 'bg-[var(--color-success)]' : 'bg-[var(--color-danger)]'} w-6`}
                style={{ height }}
                title={`${b.label}: ${pnl.toFixed(2)}`}
              />
              <div className="text-xs text-[var(--color-text-muted)] mt-1">{b.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
