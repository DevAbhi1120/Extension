import type { ThemeMode } from '../types';

export function applyTheme(mode: ThemeMode) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const nextTheme = mode === 'system' ? (prefersDark ? 'dark' : 'light') : mode;
  document.documentElement.setAttribute('data-theme', nextTheme);
}

export function extractPaletteFromImage(_imageUrl?: string) {
  return {
    surface: '24 30 52',
    accent: '140 102 255'
  };
}
