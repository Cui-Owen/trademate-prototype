import React from 'react';
import { useI18n } from '../../i18n';

export const LanguageSwitcher: React.FC = () => {
  const { lang, setLang } = useI18n();
  return (
    <select
      aria-label="Language"
      value={lang}
      onChange={(e) => setLang(e.target.value as 'en' | 'zh')}
      className="border border-[var(--color-border)] rounded-[var(--radius-sm)] px-2 py-1"
    >
      <option value="en">English</option>
      <option value="zh">中文</option>
    </select>
  );
};
