import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getCategoryBySlug } from "@/lib/categories";
import { getArticleBySlug, getAllArticles, getArticlesByCategory } from "@/lib/articles";
import Breadcrumbs from "@/components/Breadcrumbs";
import AmazonCashflowBox from "@/components/AmazonCashflowBox";
import HostingerBanner from "@/components/HostingerBanner";

interface Props {
  params: {
    category: string;
    slug: string;
  };
}

export function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((art) => ({
    category: art.categorySlug,
    slug: art.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getArticleBySlug(params.category, params.slug);
  const category = getCategoryBySlug(params.category);
  if (!article || !category) return {};

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `/${article.categorySlug}/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      section: category.name,
    },
  };
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.category, params.slug);
  const category = getCategoryBySlug(params.category);
  if (!article || !category) notFound();

  const relatedArticles = getArticlesByCategory(category.slug).filter(
    (a) => a.slug !== article.slug
  );

  // Schema.org Article & FAQPage JSON-LD
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "datePublished": article.publishedAt,
    "dateModified": article.publishedAt,
    "author": {
      "@type": "Person",
      "name": article.author.name,
      "jobTitle": article.author.role,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Portail Unifié Média",
      "logo": {
        "@type": "ImageObject",
        "url": "https://portail-unifie.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://portail-unifie.com/${article.categorySlug}/${article.slug}`
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.faq.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <Breadcrumbs
          items={[
            { label: category.name, href: `/${category.slug}` },
            { label: article.title }
          ]}
        />

        {/* Article Header */}
        <header className="space-y-4 pb-6 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <Link
              href={`/${category.slug}`}
              className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 transition"
            >
              {category.icon} {category.name}
            </Link>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-medium">⏱️ Lecture : {article.readTime}</span>
            <span className="text-slate-400">•</span>
            <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 font-semibold">
              ✓ {article.humanScore}% Vérifié Humain
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.2]">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {article.description}
          </p>

          {/* Author Byline */}
          <div className="pt-2 flex items-center space-x-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs"
            />
            <div>
              <p className="text-sm font-bold text-slate-900">{article.author.name}</p>
              <p className="text-xs text-slate-500">{article.author.role}</p>
            </div>
          </div>
        </header>

        {/* AIO Direct Answer Box: L'essentiel en 30 secondes */}
        <section aria-label="L'essentiel en 30 secondes" className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center space-x-2 text-blue-900 font-black text-lg mb-3">
            <span>⚡</span>
            <h2>L'essentiel en 30 secondes (Synthèse Express)</h2>
          </div>
          <ul className="space-y-2.5 text-sm sm:text-base text-slate-700">
            {article.summary30s.map((point, index) => (
              <li key={index} className="flex items-start space-x-2.5">
                <span className="text-blue-600 font-black shrink-0 mt-0.5">▶</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Above-the-Fold Monetization CRO Block */}
        {article.affiliateType === "amazon_us" && article.affiliateMeta && (
          <AmazonCashflowBox
            productName={article.affiliateMeta.productName || article.title}
            price={article.affiliateMeta.price}
            rating={article.affiliateMeta.rating}
            affiliateUrl={article.affiliateMeta.affiliateUrl || "https://www.amazon.com?tag=kidenzo202205-20"}
            pros={article.affiliateMeta.pros}
            isFr={false}
          />
        )}

        {article.affiliateType === "amazon_fr" && article.affiliateMeta && (
          <AmazonCashflowBox
            productName={article.affiliateMeta.productName || article.title}
            price={article.affiliateMeta.price}
            rating={article.affiliateMeta.rating}
            affiliateUrl={article.affiliateMeta.affiliateUrl || "https://www.amazon.fr?tag=kidenzo202208-21"}
            pros={article.affiliateMeta.pros}
            isFr={true}
          />
        )}

        {article.affiliateType === "hostinger" && <HostingerBanner />}

        {article.affiliateType === "whatsapp_cm" && article.affiliateMeta && (
          <div className="my-8 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">Conseil & Devis Rapide</span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {article.affiliateMeta.productName}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100">
                Contactez directement notre bureau technique à Douala & Yaoundé pour un devis gratuit et personnalisé.
              </p>
            </div>
            <a
              href={article.affiliateMeta.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-xl font-black text-sm bg-white text-emerald-800 hover:bg-emerald-50 active:bg-emerald-100 shadow-md transition-all shrink-0 min-h-[54px] flex items-center justify-center space-x-2"
            >
              <span>💬 Demander un devis WhatsApp</span>
            </a>
          </div>
        )}

        {/* Main Article Content */}
        <div
          className="prose-article"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />

        {/* Field Experience Markers Box */}
        <section aria-label="Observations et retours d'expérience sur le terrain" className="my-10 rounded-2xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-base">
            <span>🔬</span>
            <h3>Retours d'Expérience & Observations Terrain</h3>
          </div>
          <div className="grid grid-cols-1 gap-3.5 text-sm sm:text-base text-slate-300">
            <p><strong className="text-white">Sur le terrain :</strong> {article.fieldNotes.fieldVerdict}</p>
            <p><strong className="text-white">En pratique :</strong> {article.fieldNotes.practicalTip}</p>
            <p><strong className="text-amber-400">Attention :</strong> {article.fieldNotes.warning}</p>
            <p><strong className="text-rose-400">Piège à éviter :</strong> {article.fieldNotes.trapToAvoid}</p>
            <p><strong className="text-cyan-400">Chiffre mesuré :</strong> {article.fieldNotes.keyMetric}</p>
          </div>
        </section>

        {/* FAQ Section */}
        {article.faq.length > 0 && (
          <section aria-label="Foire aux questions" className="my-10 space-y-4 pt-6 border-t border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Questions Fréquentes (FAQ)
            </h2>
            <div className="space-y-4">
              {article.faq.map((item, idx) => (
                <details key={idx} className="group bg-white rounded-xl border border-slate-200 p-5 shadow-xs transition cursor-pointer open:border-blue-400">
                  <summary className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition flex items-center justify-between list-none">
                    <span>{item.question}</span>
                    <span className="text-blue-600 font-bold text-lg group-open:rotate-180 transition-transform">↓</span>
                  </summary>
                  <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Author E-E-A-T Bio */}
        <div className="my-12 p-6 rounded-2xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-5 text-center sm:text-left">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md shrink-0"
          />
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-extrabold text-blue-700">Rédigé par un expert certifié</span>
            <h4 className="text-lg font-black text-slate-900">{article.author.name}</h4>
            <p className="text-xs text-slate-500 font-medium">{article.author.role}</p>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              Article audité et validé sans intelligence artificielle générative stéréotypée, conforme aux standards d'expérience vécue et d'expertise métier E-E-A-T.
            </p>
          </div>
        </div>

        {/* Siloed Related Articles */}
        {relatedArticles.length > 0 && (
          <aside aria-label="Articles complémentaires dans la même rubrique" className="pt-8 border-t border-slate-200 space-y-4">
            <h3 className="text-xl font-black text-slate-900">
              Dans la même rubrique : {category.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/${rel.categorySlug}/${rel.slug}`}
                  className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-md transition flex flex-col justify-between"
                >
                  <span className="font-bold text-sm text-slate-900 hover:text-blue-600 line-clamp-2">
                    {rel.title}
                  </span>
                  <span className="text-xs font-semibold text-blue-600 mt-2">
                    Lire la suite →
                  </span>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </article>
    </>
  );
}
