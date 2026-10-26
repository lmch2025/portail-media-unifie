import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export default function Header() {
  const topCategories = CATEGORIES.slice(0, 6);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <span className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center text-white font-black text-2xl shadow-md group-hover:scale-105 transition-transform">
                P
              </span>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  Portail<span className="text-blue-600">Unifié</span>
                </span>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-500">
                  Guides & Actualités Officiels
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm text-slate-700">
            <Link href="/" className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-blue-600 transition-colors">
              Accueil
            </Link>
            {topCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-blue-600 transition-colors flex items-center space-x-1"
              >
                <span>{cat.icon}</span>
                <span>{cat.name.split(" ")[0]}</span>
              </Link>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3">
            <a
              href="https://wa.me/237693845941?text=Bonjour,%20je%20souhaite%20des%20informations%20depuis%20le%20portail."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all transform active:scale-95 min-h-[44px]"
            >
              <span className="mr-1.5 text-base">💬</span>
              <span className="hidden sm:inline">WhatsApp Direct</span>
              <span className="sm:hidden">Contact</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Quick Scroller */}
      <div className="lg:hidden border-t border-slate-100 bg-slate-50/80 overflow-x-auto py-2 px-4 flex space-x-2 text-xs font-semibold scrollbar-none">
        <Link href="/" className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 active:bg-blue-50">
          🏠 Accueil
        </Link>
        {CATEGORIES.slice(0, 10).map((cat) => (
          <Link
            key={cat.slug}
            href={`/${cat.slug}`}
            className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 active:bg-blue-50 flex items-center space-x-1"
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </Link>
        ))}
      </div>
    </header>
  );
}
