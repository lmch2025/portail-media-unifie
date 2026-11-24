"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { getBlackFridayPhase } from "@/lib/black-friday-schedule";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [bfActive, setBfActive] = useState(() => getBlackFridayPhase().isActive);

  useEffect(() => {
    setBfActive(getBlackFridayPhase(new Date()).isActive);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 group">
              <span className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-2xl shadow-md group-hover:scale-105 transition-transform">
                K
              </span>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  Kidenzo<span className="text-blue-600">Media</span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-slate-500">
                  Guides Officiels &amp; Comparatifs Tech
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm text-slate-700">
            <Link href="/" className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-blue-600 transition-colors">
              Accueil
            </Link>
            {bfActive && (
              <Link
                href="/black-friday"
                className="px-3 py-2 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 font-black transition-colors flex items-center space-x-1 border border-amber-300"
              >
                <span>🔥</span>
                <span>Black Friday</span>
              </Link>
            )}
            <Link href="/concours" className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-blue-600 transition-colors flex items-center space-x-1">
              <span>🎓</span>
              <span>Concours</span>
            </Link>
            <Link href="/energie-solaire" className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-blue-600 transition-colors flex items-center space-x-1">
              <span>☀️</span>
              <span>Solaire</span>
            </Link>
            <Link href="/emploi" className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-blue-600 transition-colors flex items-center space-x-1">
              <span>💼</span>
              <span>Emploi</span>
            </Link>
            <Link href="/actualite-ia" className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-blue-600 transition-colors flex items-center space-x-1">
              <span>🤖</span>
              <span>Tech &amp; IA</span>
            </Link>
            <Link href="/hebergement-web" className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-blue-600 transition-colors flex items-center space-x-1">
              <span>⚡</span>
              <span>Hébergement</span>
            </Link>
            <Link href="/gadgets-amazon" className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-blue-600 transition-colors flex items-center space-x-1">
              <span>🛒</span>
              <span>Tests Matériel</span>
            </Link>

            {/* All Rubriques Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-800 font-semibold transition-colors flex items-center space-x-1.5"
                aria-expanded={categoriesOpen}
              >
                <span>📂</span>
                <span>Toutes Rubriques</span>
                <span className="text-xs">▼</span>
              </button>

              {categoriesOpen && (
                <div
                  onMouseLeave={() => setCategoriesOpen(false)}
                  className="absolute right-0 mt-2 w-96 max-h-[70vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 grid grid-cols-2 gap-2 z-50 text-xs font-medium animate-in fade-in zoom-in-95 duration-150"
                >
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/${cat.slug}`}
                      onClick={() => setCategoriesOpen(false)}
                      className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 flex items-center space-x-2 transition text-slate-700 truncate"
                    >
                      <span className="text-base shrink-0">{cat.icon}</span>
                      <span className="truncate">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/a-propos" className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-blue-600 transition-colors">
              À Propos
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded-xl font-bold text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 transition min-h-[44px]"
            >
              Contact
            </Link>
            <a
              href="https://wa.me/237693845941?text=Bonjour,%20je%20souhaite%20des%20informations%20depuis%20le%20portail%20Kidenzo%20Media."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all transform active:scale-95 min-h-[44px]"
            >
              <span className="mr-1.5 text-base">💬</span>
              <span className="hidden sm:inline">WhatsApp Rédaction</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Quick Scroller */}
      <div className="lg:hidden border-t border-slate-100 bg-slate-50/90 overflow-x-auto py-2.5 px-4 flex space-x-2 text-xs font-semibold scrollbar-none">
        {bfActive && (
          <Link
            href="/black-friday"
            className="whitespace-nowrap px-3.5 py-1.5 rounded-full bg-amber-400 border border-amber-500 text-slate-950 font-black flex items-center space-x-1 shadow-xs"
          >
            <span>🔥</span>
            <span>Black Friday</span>
          </Link>
        )}
        <Link href="/" className="whitespace-nowrap px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 active:bg-blue-50 shadow-2xs">
          🏠 Accueil
        </Link>
        <Link href="/concours" className="whitespace-nowrap px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 active:bg-blue-50 flex items-center space-x-1 shadow-2xs">
          <span>🎓</span>
          <span>Concours</span>
        </Link>
        <Link href="/energie-solaire" className="whitespace-nowrap px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 active:bg-blue-50 flex items-center space-x-1 shadow-2xs">
          <span>☀️</span>
          <span>Solaire</span>
        </Link>
        <Link href="/emploi" className="whitespace-nowrap px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 active:bg-blue-50 flex items-center space-x-1 shadow-2xs">
          <span>💼</span>
          <span>Emploi</span>
        </Link>
        <Link href="/actualite-ia" className="whitespace-nowrap px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 active:bg-blue-50 flex items-center space-x-1 shadow-2xs">
          <span>🤖</span>
          <span>Tech &amp; IA</span>
        </Link>
        <Link href="/hebergement-web" className="whitespace-nowrap px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 active:bg-blue-50 flex items-center space-x-1 shadow-2xs">
          <span>⚡</span>
          <span>Hostinger</span>
        </Link>
        <Link href="/a-propos" className="whitespace-nowrap px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 active:bg-blue-50 flex items-center space-x-1 shadow-2xs">
          <span>ℹ️</span>
          <span>À Propos</span>
        </Link>
        <Link href="/contact" className="whitespace-nowrap px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 active:bg-blue-50 flex items-center space-x-1 shadow-2xs">
          <span>✉️</span>
          <span>Contact</span>
        </Link>
      </div>
    </header>
  );
}
