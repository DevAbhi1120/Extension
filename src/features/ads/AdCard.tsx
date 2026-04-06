import { AnimatePresence, motion } from 'framer-motion';
import { useIdleAdVisibility } from '../../hooks/useIdleAdVisibility';

export function AdCard({ isPremium }: { isPremium: boolean }) {
  const show = useIdleAdVisibility(true, isPremium);

  return (
    <AnimatePresence>
      {show && (
        <motion.aside
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          className="glass-card fixed bottom-5 left-1/2 w-[min(560px,92vw)] -translate-x-1/2 p-3"
        >
          <p className="text-sm text-white/90">Support us to keep this extension free ❤️</p>
          <p className="mt-1 text-xs text-white/70">Non-intrusive sponsored card (hidden on interaction).</p>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
