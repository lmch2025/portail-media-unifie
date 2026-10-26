import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryBySlug, CATEGORIES } from "@/lib/categories";
import { getArticlesByCategory } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import HostingerBanner from "@/components/HostingerBanner";

interface Props {
  params: { category: string };
}

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const category = getCategoryBySlug(params.category);
  if (!category) return {};

  return {
    title: `${category.name} | Guides et Actualités Officiels`,
    description: category.description,
    alternates: {
      canonical: `/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} | Portail Unifié Média`,
      description: category.description,
      type: "website",
    },
  };
}

export default function CategoryPage({ params }: Props) {
  const category = getCategoryBySlug(params.category);
  if (!category) notFound();

  const articles = getArticlesByCategory(category.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs
        items={[
          { label: category.name }
        ]}
      />

      {/* Category Hero Banner */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <span className="text-5xl sm:text-6xl p-4 bg-slate-50 rounded-2xl border border-slate-100 shrink-0 w-fit">
            {category.icon}
          </span>
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Chemin officiel : /{category.slug}/
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {category.name}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Category Specific Partner Callout */}
      {category.slug === "hebergement-web" && <HostingerBanner />}

      {/* Articles Listing */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <h2 className="text-xl font-black text-slate-900">
            Derniers articles publiés ({articles.length})
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Mises à jour quotidiennes
          </span>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((art) => (
              <ArticleCard key={art.slug} article={art} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <span className="text-4xl">📚</span>
            <h3 className="text-lg font-bold text-slate-800">
              Articles en cours d'importation
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Les guides de cette rubrique sont en cours de synchronisation avec les archives officielles.
            </p>
          </div>
        )}
      </section>

      {/* Cameroon Lead Gen Callout for Specific Categories */}
      {["concours", "tarifs-demarches", "emploi", "energie-solaire", "foncier-terrains", "immobilier-logement", "informatique-depannage", "automobile-mecanique", "douane-ports"].includes(category.slug) && (
        <section className="rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center sm:text-left">
            <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-300">
              Service Assistance Directe Cameroun
            </span>
            <h3 className="text-2xl font-black text-white">
              Besoin d'un devis personnalisé ou d'une vérification de dossier ?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Nos spécialistes à Douala et Yaoundé vous répondent sans délai par WhatsApp.
            </p>
          </div>

          <a
            href={`https://wa.me/237693845941?text=Bonjour,%20je%20vous%20contacte%20concernant%20la%20rubrique%20${category.slug}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 rounded-xl font-black text-sm bg-white text-emerald-900 hover:bg-emerald-50 active:bg-emerald-100 shadow-md transition-all shrink-0 min-h-[54px] flex items-center justify-center space-x-2"
          >
            <span>💬 Écrire sur WhatsApp</span>
          </a>
        </section>
      )}
    </div>
  );
}
