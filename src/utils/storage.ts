import type { Settings, ShortcutItem } from '../types';

const DEFAULT_SETTINGS: Settings = {
  theme: 'system',
  wallpaperBlur: 0,
  wallpaperBrightness: 1,
  overlayOpacity: 0.28,
  gradient: ['#1E293B', '#0F172A'],
  fontFamily: 'Inter',
  searchEngine: 'google',
  cleanMode: false,
  premium: false,
  performanceMode: false
};

export async function getSettings() {
  const response = await chrome.storage.sync.get('settings');
  return { ...DEFAULT_SETTINGS, ...(response.settings ?? {}) } as Settings;
}

export async function saveSettings(settings: Partial<Settings>) {
  const current = await getSettings();
  await chrome.storage.sync.set({ settings: { ...current, ...settings } });
}

export async function getShortcuts() {
  const response = await chrome.storage.sync.get('shortcuts');
  return (response.shortcuts ?? []) as ShortcutItem[];
}

export async function saveShortcuts(shortcuts: ShortcutItem[]) {
  await chrome.storage.sync.set({ shortcuts });
}
