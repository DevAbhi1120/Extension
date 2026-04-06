import { lazy, Suspense, useEffect } from 'react';
import { ClockCard } from '../components/ClockCard';
import { CommandPalette } from '../features/command-palette/CommandPalette';
import { OnboardingModal } from '../features/onboarding/OnboardingModal';
import { PremiumButton } from '../features/premium/PremiumButton';
import { QuickLinks } from '../features/quick-links/QuickLinks';
import { SearchBar } from '../features/search/SearchBar';
import { SettingsDrawer } from '../features/settings/SettingsDrawer';
import { WallpaperLayer } from '../features/wallpaper/WallpaperLayer';
import { WeatherWidget } from '../features/weather/WeatherWidget';
import { useSettings } from '../hooks/useSettings';
import { applyTheme, extractPaletteFromImage } from '../utils/theme';

const WorkspacePanels = lazy(() => import('../features/multitasking/WorkspacePanels').then((mod) => ({ default: mod.WorkspacePanels })));
const AdCard = lazy(() => import('../features/ads/AdCard').then((mod) => ({ default: mod.AdCard })));

export function NewTabPage() {
  const { settings, updateSettings } = useSettings();

  useEffect(() => {
    if (!settings) return;
    applyTheme(settings.theme);
    const palette = extractPaletteFromImage(settings.wallpaper);
    document.documentElement.style.setProperty('--surface', palette.surface);
    document.documentElement.style.setProperty('--accent', palette.accent);
  }, [settings]);

  if (!settings) {
    return <div className="grid h-full place-items-center bg-slate-950 text-white">Loading AuraTab…</div>;
  }

  return (
    <main className="relative min-h-screen overflow-hidden p-4 text-white md:p-8" style={{ fontFamily: settings.fontFamily }}>
      <WallpaperLayer settings={settings} />
      <OnboardingModal />
      <CommandPalette />

      <div className="mx-auto grid max-w-7xl gap-4 xl:grid-cols-[280px_1fr]">
        <SettingsDrawer settings={settings} onChange={updateSettings} />

        <section className="space-y-4">
          {!settings.cleanMode && (
            <>
              <ClockCard />
              <div className="grid gap-4 md:grid-cols-2">
                <WeatherWidget />
                <PremiumButton />
              </div>
              <SearchBar engine={settings.searchEngine} />
              <QuickLinks />
            </>
          )}

          <Suspense fallback={<div className="glass-card p-4">Loading workspace…</div>}>
            <WorkspacePanels />
          </Suspense>
        </section>
      </div>

      <Suspense fallback={null}>
        <AdCard isPremium={settings.premium} />
      </Suspense>
    </main>
  );
}
