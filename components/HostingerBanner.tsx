"use client";

import { useState } from "react";

export default function HostingerBanner() {
  const [copied, setCopied] = useState(false);
  const coupon = "XVCFABRICNC4";

  const copyCode = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(coupon);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="my-8 rounded-2xl bg-gradient-to-r from-violet-900 via-indigo-900 to-purple-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden border border-violet-700/50">
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center space-x-2 bg-violet-800/80 border border-violet-500/40 text-violet-200 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">
            <span>⚡ Offre Partenaire Officielle Hostinger</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            -20% Immédiats sur VPS KVM & Hébergement Web
          </h3>
          <p className="text-sm text-violet-200 leading-relaxed">
            Profitez du code promo exclusif pour déployer votre site WordPress ou serveur cloud NVMe ultra-rapide avec nom de domaine et SSL offerts.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button
            onClick={copyCode}
            type="button"
            className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl bg-violet-800/90 hover:bg-violet-700 active:bg-violet-900 text-white font-mono font-bold text-sm border border-violet-400/40 transition-all min-h-[52px]"
          >
            <span>Code : <strong className="text-amber-300">{coupon}</strong></span>
            <span className="text-xs bg-violet-700 px-2 py-0.5 rounded">
              {copied ? "✓ Copié !" : "Copier"}
            </span>
          </button>

          <a
            href="https://www.hostinger.com?REFERRALCODE=XVCFABRICNC4"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-black text-sm bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-900 shadow-lg hover:shadow-amber-400/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 min-h-[52px]"
          >
            <span>Activer l'offre (-20%) →</span>
          </a>
        </div>
      </div>
    </div>
  );
}
