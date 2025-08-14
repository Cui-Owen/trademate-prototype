import React, { createContext, useContext, useMemo, useState } from 'react';
import { en } from './locales/en';
import { zh } from './locales/zh';

type Lang = 'en' | 'zh';
type Dict = typeof en;

const dicts: Record<Lang, Dict> = { en, zh };

type I18nCtx = {
  lang: Lang;
  t: (path: string) => string;
  setLang: (l: Lang) => void;
};

const I18nContext = createContext<I18nCtx | null>(null);

export const I18nProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [lang, setLang] = useState<Lang>('en');
  const t = useMemo(() => {
    const dict = dicts[lang];
    const getter = (path: string): string => {
      const parts = path.split('.');
      let cur: unknown = dict;
      for (const p of parts) {
        if (cur && typeof cur === 'object' && p in (cur as Record<string, unknown>)) {
          cur = (cur as Record<string, unknown>)[p];
        } else {
          return path; // fallback to key
        }
      }
      return typeof cur === 'string' ? cur : path;
    };
    return getter;
  }, [lang]);

  return <I18nContext.Provider value={{ lang, t, setLang }}>{children}</I18nContext.Provider>;
};

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
