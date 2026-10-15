import { useEffect, useState } from 'react';
import { Waypoints } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
export { ConnectivityArt, FlowFooter } from '@/components/solicitacao/GuidedFlow';

const FONTS_HREF = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap';

/** Loads the brand fonts once (shared with Nova solicitação). */
export function useBrandFonts() {
  useEffect(() => {
    if (document.querySelector(`link[href="${FONTS_HREF}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = FONTS_HREF;
    document.head.appendChild(link);
  }, []);
}

/** Animated count from 0 to the value; jumps straight to it with reduced motion. */
export function CountUp({ value, duration = 700 }: { value: number; duration?: number }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || value === 0) { setShown(value); return; }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return <>{shown}</>;
}

export function LoadingRows({ rows = 6 }: { rows?: number }) {
  return (
    <div className="space-y-3 p-6" aria-label="Carregando">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full" style={{ opacity: 1 - i * 0.12 }} />
      ))}
    </div>
  );
}

export function CircuitState({ title, message, tone = 'muted' }: { title: string; message?: string; tone?: 'muted' | 'error' }) {
  return (
    <div className="bo-state">
      <svg viewBox="0 0 160 48" className="bo-state-art" aria-hidden="true">
        <path className="bo-state-line" d="M0 24H50L62 12H98L110 24H160" />
        <path className="bo-state-signal" d="M0 24H50L62 12H98L110 24H160" />
        <circle cx="62" cy="12" r="3" /><circle cx="98" cy="12" r="3" />
      </svg>
      <div className={`bo-state-mark ${tone === 'error' ? 'is-error' : ''}`}><Waypoints className="h-5 w-5" /></div>
      <h2 className="text-lg font-semibold">{title}</h2>
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
}
