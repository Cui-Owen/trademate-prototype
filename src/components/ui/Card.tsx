import React from 'react';

export const Card: React.FC<
  React.PropsWithChildren<{ title?: string; actions?: React.ReactNode }>
> = ({ title, actions, children }) => {
  return (
    <div
      style={{ boxShadow: 'var(--shadow-sm)' }}
      className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border)] p-4"
    >
      {(title || actions) && (
        <div className="flex items-center justify-between mb-3">
          {title && <h3 className="text-[var(--color-text)] text-base font-semibold">{title}</h3>}
          {actions}
        </div>
      )}
      <div className="text-[var(--color-text)]">{children}</div>
    </div>
  );
};
