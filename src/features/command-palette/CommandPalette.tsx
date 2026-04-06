import { Command } from 'lucide-react';
import { useEffect, useState } from 'react';

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-start bg-black/40 p-10">
      <div className="glass-card w-full max-w-xl p-3">
        <div className="flex items-center gap-2 text-xs text-white/70">
          <Command size={14} /> Command Palette
        </div>
        <input className="mt-2 w-full rounded-xl bg-black/20 px-3 py-2 text-sm outline-none" placeholder="Type a command..." autoFocus />
      </div>
    </div>
  );
}
