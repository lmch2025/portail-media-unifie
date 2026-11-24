"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BLACK_FRIDAY_DEALS,
  DEAL_SEGMENTS,
  SAVINGS_PRESETS,
  TIMELINE_MILESTONES,
  DealSegment,
  getBlackFridayPhase,
  getCountdownParts,
  BlackFridayPhase,
  CountdownParts,
} from "@/lib/black-friday-schedule";

export default function BlackFridayHubClient() {
  const [mounted, setMounted] = useState(false);
  const [activeSegment, setActiveSegment] = useState<DealSegment>("all");
  const [selectedPresetId, setSelectedPresetId] = useState<string>(SAVINGS_PRESETS[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [phase, setPhase] = useState<BlackFridayPhase>(() => getBlackFridayPhase());
  const [countdown, setCountdown] = useState<CountdownParts>(() =>
    getCountdownParts(getBlackFridayPhase().targetIso)
  );

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const now = new Date();
      const p = getBlackFridayPhase(now);
      setPhase(p);
      setCountdown(getCountdownParts(p.targetIso, now));
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyPromoCode = (code: string, dealId: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedId(dealId);
      setTimeout(() => setCopiedId(null), 4000);
    }
  };

  const filteredDeals =
    activeSegment === "all"
      ? BLACK_FRIDAY_DEALS
      : BLACK_FRIDAY_DEALS.filter((d) => d.segment === activeSegment);

  const activePreset =
    SAVINGS_PRESETS.find((p) => p.id === selectedPresetId) || SAVINGS_PRESETS[0];

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="space-y-14">
      {/* 1. HERO DYNAMIQUE AVEC COMPTE À REBOURS ET CALENDRIER PLANIFIÉ */}
      <section
        className={`rounded-3xl bg-gradient-to-br ${phase.accentGradient} text-white p-6 sm:p-10 lg:p-14 shadow-2xl border border-amber-400/30 relative overflow-hidden`}
      >
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 border border-amber-300/50 px-4 py-1.5 text-xs sm:text-sm font-black text-amber-300 tracking-wide">
            <span>{phase.badgeLabel}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
            {phase.shortTitle}
          </h1>

          <p className="text-base sm:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto">
            Nous avons trié les vraies baisses de prix sur les serveurs web, les kits solaires au Cameroun et les équipements maison et tech testés par notre équipe.
          </p>

          {/* Compte à rebours géant ultra-lisible */}
          {phase.isActive && mounted && !countdown.isExpired && (
            <div className="pt-2">
              <p className="text-xs sm:text-sm uppercase tracking-wider font-bold text-amber-200 mb-3">
                ⏳ {phase.countdownLabel}
              </p>
              <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-md mx-auto">
                <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-2xl p-3 sm:p-4">
                  <div className="text-2xl sm:text-4xl font-black text-amber-300 font-mono">
                    {pad(countdown.days)}
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-slate-200 mt-1">
                    Jours
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-2xl p-3 sm:p-4">
                  <div className="text-2xl sm:text-4xl font-black text-amber-300 font-mono">
                    {pad(countdown.hours)}
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-slate-200 mt-1">
                    Heures
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-2xl p-3 sm:p-4">
                  <div className="text-2xl sm:text-4xl font-black text-amber-300 font-mono">
                    {pad(countdown.minutes)}
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-slate-200 mt-1">
                    Minutes
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-2xl p-3 sm:p-4">
                  <div className="text-2xl sm:text-4xl font-black text-amber-300 font-mono">
                    {pad(countdown.seconds)}
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-slate-200 mt-1">
                    Secondes
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Boutons d'action immédiate >= 60px */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            <a
              href="#offres-verifiees"
              className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-black text-base sm:text-lg bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 shadow-lg transition-all min-h-[60px]"
            >
              <span>🎁 Voir les offres vérifiées ↓</span>
            </a>
            <a
              href="https://wa.me/237693845941?text=Bonjour%20Kidenzo%20Media,%20pouvez-vous%20me%20conseiller%20sur%20les%20offres%20Black%20Friday%20?"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-4 rounded-2xl font-bold text-base bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white shadow-md transition-all min-h-[60px]"
            >
              <span>💬 Demander conseil sur WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Calendrier Visuel des 4 Étapes Planifiées */}
        <div className="mt-10 pt-8 border-t border-white/15">
          <p className="text-center text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-300 mb-5">
            📅 Calendrier Officiel de l&apos;Opération Black Friday 2026
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {TIMELINE_MILESTONES.map((step, idx) => {
              const isCurrent = phase.isActive && phase.stepIndex === idx;
              const isPast = phase.stepIndex > idx;
              return (
                <div
                  key={step.id}
                  className={`rounded-2xl p-4 border transition-all ${
                    isCurrent
                      ? "bg-amber-400/20 border-amber-300 shadow-lg ring-2 ring-amber-300/60"
                      : isPast
                      ? "bg-white/5 border-white/10 opacity-75"
                      : "bg-white/10 border-white/15"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">
                      {isPast ? "✅" : step.icon}
                    </span>
                    <span
                      className={`text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                        isCurrent
                          ? "bg-amber-400 text-slate-950"
                          : isPast
                          ? "bg-emerald-500/30 text-emerald-200"
                          : "bg-white/15 text-slate-200"
                      }`}
                    >
                      {isCurrent ? "En cours" : isPast ? "Terminé" : `Étape ${step.stepNumber}`}
                    </span>
                  </div>
                  <h2 className="font-black text-base text-white">{step.title}</h2>
                  <p className="text-xs font-bold text-amber-300 mt-0.5">{step.dateRangeLabel}</p>
                  <p className="text-xs text-slate-200 mt-1.5 leading-relaxed">{step.shortDesc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. SIMULATEUR ULTRA-SIMPLE D'ÉCONOMIES EN 1 CLIC */}
      <section className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl mx-auto text-center space-y-2 mb-8">
          <span className="text-xs font-black uppercase tracking-wider text-blue-600">
            🧮 Calculateur Rapide en 1 Touche
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Combien peux-tu économiser cette semaine ?
          </h2>
          <p className="text-base text-slate-600">
            Touche ton besoin ci-dessous pour voir immédiatement le tarif normal et le tarif réduit.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-4xl mx-auto mb-8">
          {SAVINGS_PRESETS.map((preset) => {
            const active = preset.id === activePreset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => setSelectedPresetId(preset.id)}
                aria-pressed={active}
                className={`text-left p-4 rounded-2xl border-2 transition-all min-h-[64px] flex items-center gap-3.5 ${
                  active
                    ? "border-blue-600 bg-blue-50/80 text-slate-900 shadow-md"
                    : "border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-300 text-slate-800"
                }`}
              >
                <span className="text-3xl shrink-0">{preset.icon}</span>
                <div>
                  <div className="font-black text-sm sm:text-base">{preset.label}</div>
                  <div className="text-xs text-slate-600 mt-0.5">{preset.whoIsItFor}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Résultat immédiat et clair */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border-2 border-emerald-300 p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left items-center">
            <div>
              <div className="text-xs font-bold uppercase text-slate-500">Prix habituel</div>
              <div className="text-lg font-bold text-slate-600 line-through mt-1">
                {activePreset.beforePrice}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase text-emerald-800">Tarif Black Friday</div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {activePreset.nowPrice}
              </div>
              <div className="inline-block mt-1 px-3 py-0.5 rounded-full bg-emerald-600 text-white text-xs font-black">
                ✓ {activePreset.savedAmount}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href={activePreset.actionUrl}
                target="_blank"
                rel="sponsored nofollow noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-4 rounded-xl font-black text-sm sm:text-base bg-emerald-700 hover:bg-emerald-800 text-white shadow-md transition min-h-[60px] text-center"
              >
                <span>{activePreset.actionLabel} →</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FILTRE PAR BESOIN & CARTES D'OFFRES VÉRIFIÉES */}
      <section id="offres-verifiees" className="space-y-8 scroll-mt-24">
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-wider text-amber-600">
            🛡️ Zéro Fausse Promo • Prix & Garanties Vérifiés
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Choisis ce que tu cherches aujourd&apos;hui
          </h2>
          <p className="text-base text-slate-600">
            Appuie sur une catégorie pour afficher uniquement les offres qui t&apos;intéressent.
          </p>
        </div>

        {/* Boutons de filtre larges et explicites (>= 60px) */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {DEAL_SEGMENTS.map((seg) => {
            const isSelected = activeSegment === seg.id;
            return (
              <button
                key={seg.id}
                type="button"
                onClick={() => setActiveSegment(seg.id)}
                aria-pressed={isSelected}
                className={`px-5 py-3.5 rounded-2xl font-black text-sm sm:text-base border-2 transition-all min-h-[60px] inline-flex items-center gap-2 ${
                  isSelected
                    ? "bg-slate-900 text-white border-slate-900 shadow-lg"
                    : "bg-white text-slate-800 border-slate-200 hover:border-blue-400 hover:text-blue-700"
                }`}
              >
                <span className="text-xl">{seg.icon}</span>
                <span>{seg.label}</span>
              </button>
            );
          })}
        </div>

        {/* Grille Responsive Mobile-First (1 col mobile -> 2 cols desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {filteredDeals.map((deal) => {
            const isCopied = copiedId === deal.id;
            return (
              <article
                key={deal.id}
                className="bg-white rounded-3xl border-2 border-slate-200 hover:border-amber-400 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* En-tête badge + icône */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black">
                      <span>{deal.icon}</span>
                      <span>{deal.badge}</span>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                      {deal.savingsBadge}
                    </span>
                  </div>

                  {/* Titre et explication en langage courant */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                      {deal.title}
                    </h3>
                    <p className="text-base text-slate-600 mt-2 leading-relaxed">
                      {deal.simpleSubtitle}
                    </p>
                  </div>

                  {/* Encadré de comparaison de prix transparent */}
                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-semibold text-slate-500 block">
                        Avant : <span className="line-through">{deal.normalPrice}</span>
                      </span>
                      <span className="text-lg sm:text-xl font-black text-emerald-700">
                        {deal.promoPrice}
                      </span>
                    </div>
                    {deal.couponCode && (
                      <button
                        type="button"
                        onClick={() => copyPromoCode(deal.couponCode!, deal.id)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 text-slate-900 font-bold text-sm transition min-h-[52px]"
                      >
                        <span>
                          Code : <strong className="font-mono">{deal.couponCode}</strong>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-amber-300 text-slate-950 text-xs font-black">
                          {isCopied ? "✓ Code copié !" : "📋 Copier"}
                        </span>
                      </button>
                    )}
                  </div>

                  {isCopied && (
                    <p
                      role="status"
                      className="text-xs sm:text-sm font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3.5 py-2"
                    >
                      ✓ Ton code promo est copié ! Il te suffit de le coller au moment du paiement.
                    </p>
                  )}

                  {/* Points forts vérifiés */}
                  <ul className="space-y-2 text-sm sm:text-base text-slate-700">
                    {deal.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-emerald-600 font-black shrink-0 mt-0.5">✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Note de transparence E-E-A-T */}
                  <p className="text-xs text-slate-500 bg-slate-50/80 rounded-xl p-3 border border-slate-100">
                    ℹ️ <strong>Bon à savoir :</strong> {deal.transparencyNote}
                  </p>
                </div>

                {/* Boutons d'action larges et espacés */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <a
                    href={deal.affiliateUrl}
                    target="_blank"
                    rel={
                      deal.isSponsored
                        ? "sponsored nofollow noopener noreferrer"
                        : "noopener noreferrer"
                    }
                    className="w-full inline-flex items-center justify-center px-6 py-4 rounded-2xl font-black text-base bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-md hover:shadow-lg transition-all min-h-[60px] text-center"
                  >
                    <span>{deal.ctaLabel} →</span>
                  </a>

                  <Link
                    href={deal.guideHref}
                    className="w-full inline-flex items-center justify-center px-5 py-3.5 rounded-2xl font-bold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition min-h-[52px] text-center"
                  >
                    <span>📖 {deal.guideLabel}</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
