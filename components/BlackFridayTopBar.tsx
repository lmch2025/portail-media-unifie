"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getBlackFridayPhase,
  getCountdownParts,
  BlackFridayPhase,
  CountdownParts,
} from "@/lib/black-friday-schedule";

const DISMISS_STORAGE_KEY = "kidenzo_bf2026_bar_dismissed";

export default function BlackFridayTopBar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [phase, setPhase] = useState<BlackFridayPhase>(() => getBlackFridayPhase());
  const [countdown, setCountdown] = useState<CountdownParts>(() =>
    getCountdownParts(getBlackFridayPhase().targetIso)
  );

  useEffect(() => {
    setMounted(true);
    try {
      if (sessionStorage.getItem(DISMISS_STORAGE_KEY) === "1") {
        setDismissed(true);
      }
    } catch {
      // Ignore storage errors in restricted privacy modes
    }

    const tick = () => {
      const now = new Date();
      const currentPhase = getBlackFridayPhase(now);
      setPhase(currentPhase);
      setCountdown(getCountdownParts(currentPhase.targetIso, now));
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_STORAGE_KEY, "1");
    } catch {
      // Ignore storage errors
    }
  };

  // Auto-extinction propre dès la fin du Cyber Monday ou si fermé par le lecteur
  if (!phase.isActive || dismissed) {
    return null;
  }

  const isOnHub = pathname === "/black-friday";
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      role="region"
      aria-label="Annonce spéciale promotions Black Friday"
      className={`bg-gradient-to-r ${phase.accentGradient} text-white border-b border-amber-400/30`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 flex flex-col md:flex-row items-center justify-between gap-2.5 text-xs sm:text-sm">
        {/* Message principal clair et direct */}
        <div className="flex items-center justify-center md:justify-start gap-2 text-center md:text-left font-bold">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping shrink-0 hidden sm:inline-block" />
          <span className="leading-snug">{phase.topBarMessage}</span>
        </div>

        {/* Compte à rebours lisible + Action directe */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 shrink-0">
          {mounted && !countdown.isExpired && (
            <div
              aria-live="polite"
              className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-xl px-3 py-1.5 font-mono text-xs font-extrabold text-amber-300"
            >
              <span className="font-sans font-semibold text-slate-200 hidden xl:inline">
                {phase.countdownLabel}
              </span>
              <span>{countdown.days}j</span>
              <span>:</span>
              <span>{pad(countdown.hours)}h</span>
              <span>:</span>
              <span>{pad(countdown.minutes)}m</span>
              <span>:</span>
              <span>{pad(countdown.seconds)}s</span>
            </div>
          )}

          {!isOnHub && (
            <Link
              href="/black-friday"
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-sm transition-all min-h-[44px]"
            >
              <span>{phase.ctaLabel}</span>
            </Link>
          )}

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Fermer le bandeau d'information Black Friday"
            className="inline-flex items-center justify-center px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-semibold transition min-h-[44px]"
          >
            <span>✕ Fermer</span>
          </button>
        </div>
      </div>
    </div>
  );
}
