import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', ...rest }) => {
  const base = 'inline-flex items-center justify-center font-medium transition-colors';
  const styles: Record<string, string> = {
    primary:
      'bg-[var(--color-primary)] text-[var(--color-primary-contrast)] hover:opacity-90 rounded-[var(--radius-md)] px-4 py-2',
    secondary:
      'bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-bg)] rounded-[var(--radius-md)] px-4 py-2',
    ghost:
      'text-[var(--color-text)] hover:bg-[var(--color-bg)] rounded-[var(--radius-md)] px-3 py-2',
  };
  return <button className={`${base} ${styles[variant]} ${className}`} {...rest} />;
};
