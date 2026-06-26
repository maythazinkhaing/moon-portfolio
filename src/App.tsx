import { useCallback, useEffect, useState } from 'react';
import BottomNav from './components/BottomNav';
import ChibiMascot from './components/ChibiMascot';
import Hero from './components/Hero';
import TabWindow from './components/TabWindow';
import ThemeToggle from './components/ThemeToggle';
import type { SectionKey } from './data/content';
import { useTheme } from './hooks/useTheme';
import { playClose, playPop } from './lib/sounds';

const BASE = import.meta.env.BASE_URL;

const STARS = [
  { top: '14%', left: '22%', size: 10, dur: '3.2s', delay: '0s' },
  { top: '26%', left: '70%', size: 8, dur: '2.4s', delay: '.6s' },
  { top: '18%', left: '48%', size: 6, dur: '2.8s', delay: '1.1s' },
  { top: '40%', left: '12%', size: 9, dur: '3.6s', delay: '.3s' },
];

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [open, setOpen] = useState<SectionKey | null>(null);

  const openSection = useCallback((key: SectionKey) => {
    playPop();
    setOpen(key);
  }, []);

  const close = useCallback(() => {
    playClose();
    setOpen(null);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  return (
    <div data-theme={theme} className="fixed inset-0 overflow-hidden font-sans text-ink">
      {/* Crossfading sky backgrounds */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-[900ms]"
        style={{ backgroundImage: `url('${BASE}assets/bg-night.png')`, opacity: theme === 'night' ? 1 : 0 }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-[900ms]"
        style={{ backgroundImage: `url('${BASE}assets/bg-sunset.png')`, opacity: theme === 'sunset' ? 1 : 0 }}
      />

      {/* Twinkling stars */}
      {STARS.map((s, i) => (
        <span
          key={i}
          className="animate-twinkle pointer-events-none absolute text-white"
          style={{ top: s.top, left: s.left, fontSize: s.size, animationDuration: s.dur, animationDelay: s.delay }}
        >
          ✦
        </span>
      ))}

      <ThemeToggle theme={theme} onToggle={toggleTheme} />

      {/* Hero */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 mobile-land:items-start mobile-land:overflow-y-auto mobile-land:py-16 mobile-land:pb-28">
        <Hero />
      </div>

      <ChibiMascot />
      <BottomNav onOpen={openSection} />

      {open && <TabWindow section={open} onClose={close} />}
    </div>
  );
}
