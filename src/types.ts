export type ThemeMode = 'light' | 'dark' | 'system';

export interface ShortcutItem {
  id: string;
  title: string;
  url: string;
  icon?: string;
  category?: string;
}

export interface Settings {
  theme: ThemeMode;
  wallpaper?: string;
  wallpaperBlur: number;
  wallpaperBrightness: number;
  overlayOpacity: number;
  gradient: [string, string];
  fontFamily: string;
  customFontData?: string;
  searchEngine: 'google' | 'duckduckgo' | 'bing' | 'brave';
  cleanMode: boolean;
  premium: boolean;
  performanceMode: boolean;
}
