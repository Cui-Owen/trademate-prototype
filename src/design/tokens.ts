export type ColorTokens = {
  primary: string;
  primaryContrast: string;
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  success: string;
  warning: string;
  danger: string;
  border: string;
};

export type SpaceTokens = {
  xxs: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
};

export type RadiusTokens = {
  sm: string;
  md: string;
  lg: string;
  pill: string;
};

export type ShadowTokens = {
  sm: string;
  md: string;
  lg: string;
};

export type MotionTokens = {
  fast: string;
  normal: string;
  slow: string;
};

export type DesignTokens = {
  color: ColorTokens;
  space: SpaceTokens;
  radius: RadiusTokens;
  shadow: ShadowTokens;
  motion: MotionTokens;
};

export const lightTokens: DesignTokens = {
  color: {
    primary: '#0A2540',
    primaryContrast: '#FFFFFF',
    bg: '#F6F9FC',
    surface: '#FFFFFF',
    text: '#1F2937',
    textMuted: '#6B7280',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    border: '#E5E7EB',
  },
  space: { xxs: '2px', xs: '4px', sm: '8px', md: '12px', lg: '16px', xl: '24px' },
  radius: { sm: '4px', md: '8px', lg: '12px', pill: '9999px' },
  shadow: {
    sm: '0 1px 2px rgba(0,0,0,0.06)',
    md: '0 4px 12px rgba(0,0,0,0.08)',
    lg: '0 10px 24px rgba(0,0,0,0.12)',
  },
  motion: { fast: '120ms', normal: '200ms', slow: '320ms' },
};

export const darkTokens: DesignTokens = {
  ...lightTokens,
  color: {
    primary: '#60A5FA',
    primaryContrast: '#0B1220',
    bg: '#0B1220',
    surface: '#111827',
    text: '#E5E7EB',
    textMuted: '#9CA3AF',
    success: '#34D399',
    warning: '#FBBF24',
    danger: '#F87171',
    border: '#1F2937',
  },
};

export function applyTokens(tokens: DesignTokens, root: HTMLElement = document.documentElement) {
  const entries: [string, string][] = [
    ['--color-primary', tokens.color.primary],
    ['--color-primary-contrast', tokens.color.primaryContrast],
    ['--color-bg', tokens.color.bg],
    ['--color-surface', tokens.color.surface],
    ['--color-text', tokens.color.text],
    ['--color-text-muted', tokens.color.textMuted],
    ['--color-success', tokens.color.success],
    ['--color-warning', tokens.color.warning],
    ['--color-danger', tokens.color.danger],
    ['--color-border', tokens.color.border],
    ['--space-xxs', tokens.space.xxs],
    ['--space-xs', tokens.space.xs],
    ['--space-sm', tokens.space.sm],
    ['--space-md', tokens.space.md],
    ['--space-lg', tokens.space.lg],
    ['--space-xl', tokens.space.xl],
    ['--radius-sm', tokens.radius.sm],
    ['--radius-md', tokens.radius.md],
    ['--radius-lg', tokens.radius.lg],
    ['--radius-pill', tokens.radius.pill],
    ['--shadow-sm', tokens.shadow.sm],
    ['--shadow-md', tokens.shadow.md],
    ['--shadow-lg', tokens.shadow.lg],
    ['--motion-fast', tokens.motion.fast],
    ['--motion-normal', tokens.motion.normal],
    ['--motion-slow', tokens.motion.slow],
  ];
  entries.forEach(([k, v]) => root.style.setProperty(k, v));
}
