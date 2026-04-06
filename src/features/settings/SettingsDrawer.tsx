import { Paintbrush, SlidersHorizontal } from 'lucide-react';
import type { Settings } from '../../types';

interface Props {
  settings: Settings;
  onChange: (patch: Partial<Settings>) => void;
}

export function SettingsDrawer({ settings, onChange }: Props) {
  return (
    <aside className="glass-card space-y-4 p-4">
      <div>
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <Paintbrush size={14} /> Appearance
        </h3>
        <div className="mt-2 grid gap-2 text-xs">
          <label className="flex items-center justify-between">
            Theme
            <select
              className="rounded-xl bg-black/20 px-2 py-1"
              value={settings.theme}
              onChange={(event) => onChange({ theme: event.target.value as Settings['theme'] })}
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
          <label className="flex items-center justify-between">
            Blur
            <input
              type="range"
              min={0}
              max={18}
              value={settings.wallpaperBlur}
              onChange={(event) => onChange({ wallpaperBlur: Number(event.target.value) })}
            />
          </label>
        </div>
      </div>

      <div>
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <SlidersHorizontal size={14} /> Behavior
        </h3>
        <label className="mt-2 flex items-center justify-between text-xs">
          Performance Mode
          <input type="checkbox" checked={settings.performanceMode} onChange={(event) => onChange({ performanceMode: event.target.checked })} />
        </label>
        <label className="mt-2 flex items-center justify-between text-xs">
          Clean Mode
          <input type="checkbox" checked={settings.cleanMode} onChange={(event) => onChange({ cleanMode: event.target.checked })} />
        </label>
      </div>
    </aside>
  );
}
