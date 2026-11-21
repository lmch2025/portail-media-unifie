"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem("kidenzo_cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  if (!mounted || !showBanner) return null;

  const handleAccept = () => {
    localStorage.setItem("kidenzo_cookie_consent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("kidenzo_cookie_consent", "declined");
    setShowBanner(false);
  };

  return (
    <aside
      aria-label="Gestion des cookies et confidentialité"
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-slate-900/95 backdrop-blur-md text-white border-t border-slate-800 shadow-2xl transition-all animate-in fade-in slide-in-from-bottom duration-300"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start space-x-3 text-sm text-slate-300">
          <span className="text-2xl shrink-0 mt-0.5">🍪</span>
          <p className="leading-relaxed">
            <strong className="text-white font-semibold">Respect de votre vie privée :</strong>{" "}
            Kidenzo Media utilise des cookies techniques, de mesure d&apos;audience et de personnalisation publicitaire{" "}
            (partenaire officiel <strong>Google AdSense</strong>) pour financer la gratuité de nos guides et simulateurs.{" "}
            <Link
              href="/confidentialite"
              className="text-blue-400 hover:text-blue-300 underline font-medium"
            >
              En savoir plus sur notre politique de confidentialité &rarr;
            </Link>
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-end">
          <button
            onClick={handleDecline}
            type="button"
            className="flex-1 md:flex-none px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs sm:text-sm font-semibold text-slate-300 transition"
          >
            Continuer sans accepter
          </button>
          <button
            onClick={handleAccept}
            type="button"
            className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-xs sm:text-sm font-bold text-white shadow-md transition transform active:scale-95"
          >
            ✓ Tout Accepter
          </button>
        </div>
      </div>
    </aside>
  );
}
