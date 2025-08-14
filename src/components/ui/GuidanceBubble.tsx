import React from 'react';

export const GuidanceBubble: React.FC<{
  message: string;
  onClose?: () => void;
}> = ({ message, onClose }) => {
  return (
    <div
      role="status"
      className="max-w-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] shadow-md p-3"
    >
      <div className="text-[var(--color-text)] text-sm">{message}</div>
      {onClose && (
        <div className="text-right mt-2">
          <button
            onClick={onClose}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] text-xs"
            aria-label="Dismiss"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};
