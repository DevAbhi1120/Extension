import { useEffect, useState } from 'react';
import type { Settings } from '../types';
import { getSettings, saveSettings } from '../utils/storage';

export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    void getSettings().then(setSettings);
  }, []);

  const updateSettings = async (patch: Partial<Settings>) => {
    if (!settings) return;
    const next = { ...settings, ...patch };
    setSettings(next);
    await saveSettings(patch);
  };

  return { settings, updateSettings };
}
