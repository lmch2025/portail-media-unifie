"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getBlackFridayPhase, BlackFridayPhase } from "@/lib/black-friday-schedule";

export default function BlackFridayHomeSpotlight() {
  const [phase, setPhase] = useState<BlackFridayPhase>(() => getBlackFridayPhase());

  useEffect(() => {
    setPhase(getBlackFridayPhase(new Date()));
  }, []);

  if (!phase.isActive) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className={`rounded-3xl bg-gradient-to-r ${phase.accentGradient} text-white p-6 sm:p-10 shadow-xl border border-amber-400/40 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6`}
      >
        <div className="space-y-2.5 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
            <span>{phase.badgeLabel}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Ne ratez pas les vraies réductions vérifiées de cette semaine
          </h2>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            Serveurs web Hostinger (-20% supplémentaires), études kits solaires Lithium offertes au Cameroun et ventes flash Amazon testées sans fausse remise.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
          <Link
            href="/black-friday"
            className="inline-flex items-center justify-center px-7 py-4 rounded-2xl font-black text-base bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 shadow-lg transition-all min-h-[60px] text-center"
          >
            <span>🎁 Ouvrir l&apos;Espace Black Friday →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
