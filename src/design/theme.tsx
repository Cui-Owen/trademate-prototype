import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { applyTokens, darkTokens, lightTokens } from './tokens';

type Theme = 'light' | 'dark';

type ThemeCtx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<ThemeCtx | null>(null);

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  useEffect(() => {
    applyTokens(theme === 'light' ? lightTokens : darkTokens);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="text-[var(--color-text)] border border-[var(--color-border)] rounded-[var(--radius-sm)] px-2 py-1"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
    </button>
  );
};
