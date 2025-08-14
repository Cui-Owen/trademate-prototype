import React from 'react';

export const ComplianceNotice: React.FC<{
  decision: 'allow' | 'block' | 'notify';
  reason: string;
}> = ({ decision, reason }) => {
  const color =
    decision === 'block'
      ? 'bg-[var(--color-danger)]'
      : decision === 'notify'
        ? 'bg-[var(--color-warning)]'
        : 'bg-[var(--color-success)]';
  const label = decision.toUpperCase();
  return (
    <div
      className={`text-white ${color} rounded-[var(--radius-md)] px-3 py-2 text-sm`}
      role="alert"
    >
      <strong className="mr-2">{label}</strong>
      <span>{reason}</span>
    </div>
  );
};
