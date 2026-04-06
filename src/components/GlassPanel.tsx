import type { PropsWithChildren } from 'react';

export function GlassPanel({ children }: PropsWithChildren) {
  return <section className="glass-card p-4 md:p-5">{children}</section>;
}
