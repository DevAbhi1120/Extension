import { motion } from 'framer-motion';
import { useClock } from '../hooks/useClock';

export function ClockCard() {
  const now = useClock();
  const time = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(now);
  const date = new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).format(now);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
      <p className="text-5xl font-bold tracking-tight">{time}</p>
      <p className="mt-2 text-white/80">{date}</p>
      <p className="mt-1 text-sm text-white/60">Have a focused day ✨</p>
    </motion.div>
  );
}
