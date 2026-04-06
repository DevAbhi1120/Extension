import { useState } from 'react';

export function OnboardingModal() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/45 p-4">
      <div className="glass-card max-w-lg p-6">
        <h2 className="text-xl font-semibold">Welcome to AuraTab</h2>
        <p className="mt-2 text-sm text-white/80">Customize your wallpaper, shortcuts, workspace and theme in seconds.</p>
        <button className="mt-4 rounded-2xl bg-accent/90 px-4 py-2 text-sm" onClick={() => setOpen(false)}>
          Start Exploring
        </button>
      </div>
    </div>
  );
}
