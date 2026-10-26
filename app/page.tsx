import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { getFeaturedArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import HostingerBanner from "@/components/HostingerBanner";

export default function HomePage() {
  const featured = getFeaturedArticles();

  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 max-w-4xl mx-auto py-8 sm:py-14">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wide">
            <span>🇨🇲 & 🌍 Portail Média d'Information Officielle & Pratique</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            L'Information Claire, les Guides Officiels et les Solutions Vérifiées.
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Accédez en accès libre aux annales de concours au Cameroun, démarches foncières, tarifs administratifs, dimensionnement solaire, comparatifs tech et guides de voyage.
          </p>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs sm:text-sm font-semibold">
            <Link href="/concours" className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-blue-500 hover:text-blue-600 transition flex items-center space-x-1.5">
              <span>🎓</span>
              <span>Concours Cameroun</span>
            </Link>
            <Link href="/energie-solaire" className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-blue-500 hover:text-blue-600 transition flex items-center space-x-1.5">
              <span>☀️</span>
              <span>Solaire & Batteries</span>
            </Link>
            <Link href="/emploi" className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-blue-500 hover:text-blue-600 transition flex items-center space-x-1.5">
              <span>💼</span>
              <span>Offres d'Emploi</span>
            </Link>
            <Link href="/hebergement-web" className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-blue-500 hover:text-blue-600 transition flex items-center space-x-1.5">
              <span>⚡</span>
              <span>Smart Hostinger (-20%)</span>
            </Link>
            <Link href="/gadgets-amazon" className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-blue-500 hover:text-blue-600 transition flex items-center space-x-1.5">
              <span>🛒</span>
              <span>Tech Amazon</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-blue-600">À la une aujourd'hui</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Derniers Guides & Enquêtes Publiés
            </h2>
          </div>
          <span className="text-xs text-slate-500 mt-2 sm:mt-0 font-medium">
            100% Certifiés par nos experts terrain
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((art) => (
            <ArticleCard key={art.slug} article={art} />
          ))}
        </div>
      </section>

      {/* Hostinger Partner Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HostingerBanner />
      </section>

      {/* All 33 Subdirectories (Chemins) Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-black uppercase tracking-wider text-blue-600">Exploration Silotée</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Les 33 Rubriques Thématiques du Portail
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Chaque sous-dossier constitue un pôle d'expertise dédié, optimisé pour les moteurs de recherche et l'expérience utilisateur.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-400 p-6 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{cat.icon}</span>
                  <span className="text-[11px] font-mono font-bold text-slate-400 group-hover:text-blue-600 transition">
                    /{cat.slug}/
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                <span className="text-[11px] font-semibold text-slate-500 truncate max-w-[190px]">
                  {cat.featuredTopic}
                </span>
                <span className="group-hover:translate-x-1 transition-transform">Accéder →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust & E-E-A-T Guarantee Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 shadow-xl border border-slate-800">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400">Garantie Qualité & Transparence</span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Des contenus vérifiés sur le terrain, zéro promesse irréaliste.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Nos enquêtes administratives s'appuient sur les textes de lois, décrets et barèmes officiels camerounais. Nos guides technologiques résultent de tests réels en conditions tropicales et de benchmarks rigoureux.
            </p>
            <div className="pt-4 flex flex-wrap gap-4 text-xs font-bold text-slate-300">
              <span className="flex items-center space-x-1.5 bg-slate-800 px-3 py-1.5 rounded-lg">
                <span className="text-emerald-400">✓</span>
                <span>Sources Officielles Citées</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-slate-800 px-3 py-1.5 rounded-lg">
                <span className="text-emerald-400">✓</span>
                <span>Conformité E-E-A-T Google</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-slate-800 px-3 py-1.5 rounded-lg">
                <span className="text-emerald-400">✓</span>
                <span>Assistance WhatsApp Réactive</span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
