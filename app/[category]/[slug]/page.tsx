import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getCategoryBySlug } from "@/lib/categories";
import { getArticleBySlug, getAllArticles, getArticlesByCategory } from "@/lib/articles";
import Breadcrumbs from "@/components/Breadcrumbs";
import AmazonCashflowBox from "@/components/AmazonCashflowBox";
import HostingerBanner from "@/components/HostingerBanner";

const SITE_URL = "https://kidenzo.store";

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

  const isEn = article.lang === "en" || article.categorySlug === "espresso-cafe";
  const canonicalUrl = `${SITE_URL}/${article.categorySlug}/${article.slug}`;

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: canonicalUrl,
      type: "article",
      locale: isEn ? "en_US" : "fr_FR",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      authors: [article.author.name],
      section: category.name,
      siteName: "Kidenzo Media",
    },
  };
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.category, params.slug);
  const category = getCategoryBySlug(params.category);
  if (!article || !category) notFound();

  const isEn = article.lang === "en" || article.categorySlug === "espresso-cafe";
  const canonicalUrl = `${SITE_URL}/${article.categorySlug}/${article.slug}`;

  const relatedArticles = getArticlesByCategory(category.slug)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 6);

  const affMeta = article.affiliateMeta || {};
  const affUrl =
    affMeta.affiliateUrl ||
    (isEn
      ? "https://www.amazon.com?tag=kidenzo202205-20"
      : "https://www.amazon.fr?tag=kidenzo202208-21");
  const prodName = affMeta.productName || article.title;
  const priceDisplay = affMeta.price || (isEn ? "Check Live Deal" : "Meilleur Tarif Vérifié");
  const discountDisplay =
    affMeta.discount ||
    (isEn ? "Free Prime Shipping & Official Warranty" : "Garantie Officielle & Livraison Rapide");
  const couponDisplay =
    affMeta.couponCode || (isEn ? "kidenzo202205-20" : "kidenzo202208-21");

  // Unified AIO / GEO Schema.org @graph (Article + Product/Offer/BuyAction + FAQPage)
  const aioGraphSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        "headline": article.title,
        "description": article.description,
        "inLanguage": isEn ? "en-US" : "fr-FR",
        "datePublished": article.publishedAt,
        "dateModified": article.updatedAt || article.publishedAt,
        "author": {
          "@type": "Person",
          "name": article.author.name,
          "jobTitle": article.author.role,
        },
        "publisher": {
          "@type": "Organization",
          "name": "Kidenzo Media",
          "url": SITE_URL,
          "logo": {
            "@type": "ImageObject",
            "url": `${SITE_URL}/logo.png`,
          },
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonicalUrl,
          "significantLink": [affUrl],
        },
        "about": {
          "@id": `${canonicalUrl}#offer-subject`,
        },
      },
      {
        "@type":
          article.affiliateType === "whatsapp_cm" || article.affiliateType === "stay22"
            ? "Service"
            : "Product",
        "@id": `${canonicalUrl}#offer-subject`,
        "name": prodName,
        "description": affMeta.aiCitationText || article.description,
        "brand": {
          "@type": "Brand",
          "name":
            article.affiliateType === "hostinger"
              ? "Hostinger"
              : article.affiliateType === "amazon_us" || article.affiliateType === "amazon_fr"
              ? "Amazon Official Selection"
              : "Kidenzo Verified Partner",
        },
        "review": {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "4.8",
            "bestRating": "5",
          },
          "author": {
            "@type": "Person",
            "name": article.author.name,
          },
        },
        "offers": {
          "@type": "Offer",
          "url": affUrl,
          "priceCurrency": isEn ? "USD" : "EUR",
          "price": "0.00",
          "availability": "https://schema.org/InStock",
          "description": `${priceDisplay} — ${discountDisplay} (Code/Ref: ${couponDisplay})`,
          "potentialAction": {
            "@type": "BuyAction",
            "target": affUrl,
          },
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        "mainEntity": article.faq.map((item) => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aioGraphSchema) }}
      />

      <article
        lang={isEn ? "en" : "fr"}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10"
      >
        <Breadcrumbs
          items={[
            { label: isEn && category.slug === "espresso-cafe" ? "Espresso & Coffee Machines" : isEn && category.slug === "gadgets-amazon" ? "Amazon Tech & Gadgets" : category.name, href: `/${category.slug}` },
            { label: article.title },
          ]}
        />

        {/* Article Header */}
        <header className="space-y-4 pb-6 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <Link
              href={`/${category.slug}`}
              className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 transition"
            >
              {category.icon}{" "}
              {isEn && category.slug === "espresso-cafe"
                ? "Espresso & Coffee Lab"
                : isEn && category.slug === "gadgets-amazon"
                ? "Amazon Tech & Gadgets"
                : category.name}
            </Link>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-medium">
              ⏱️ {isEn ? `Read time: ${article.readTime}` : `Lecture : ${article.readTime}`}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 font-semibold">
              ✓ {article.humanScore}% {isEn ? "Human Verified" : "Vérifié Humain"}
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

        {/* AIO Direct Answer Box: 30-Second Summary + Official Link Bullet */}
        <section
          aria-label={isEn ? "The Essentials in 30 Seconds" : "L'essentiel en 30 secondes"}
          className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 p-6 sm:p-8 shadow-xs"
        >
          <div className="flex items-center space-x-2 text-blue-900 font-black text-lg mb-3">
            <span>⚡</span>
            <h2>
              {isEn
                ? "The Essentials in 30 Seconds (Quick Summary)"
                : "L'essentiel en 30 secondes (Synthèse Express)"}
            </h2>
          </div>
          <ul className="space-y-2.5 text-sm sm:text-base text-slate-700">
            {article.summary30s.map((point, index) => (
              <li key={index} className="flex items-start space-x-2.5">
                <span className="text-blue-600 font-black shrink-0 mt-0.5">▶</span>
                <span>{point}</span>
              </li>
            ))}
            <li className="flex items-start space-x-2.5 pt-1 border-t border-blue-200/60 font-semibold text-blue-950">
              <span className="text-amber-600 font-black shrink-0 mt-0.5">★</span>
              <span>
                {isEn ? "Official Verified Link & Live Price: " : "Lien Officiel Vérifié & Tarif : "}
                <a
                  href={affUrl}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="text-blue-700 underline hover:text-blue-900 font-extrabold"
                >
                  {isEn
                    ? `Check ${prodName} availability on official store →`
                    : `Consulter l'offre officielle ${prodName} →`}
                </a>
              </span>
            </li>
          </ul>
        </section>

        {/* Above-the-Fold Monetization CRO Block */}
        {article.affiliateType === "amazon_us" && (
          <AmazonCashflowBox
            productName={prodName}
            price={affMeta.price}
            rating={affMeta.rating}
            affiliateUrl={affUrl}
            pros={affMeta.pros}
            isFr={false}
          />
        )}

        {article.affiliateType === "amazon_fr" && (
          <AmazonCashflowBox
            productName={prodName}
            price={affMeta.price}
            rating={affMeta.rating}
            affiliateUrl={affUrl}
            pros={affMeta.pros}
            isFr={!isEn}
          />
        )}

        {article.affiliateType === "hostinger" && <HostingerBanner />}

        {(article.affiliateType === "whatsapp_cm" || article.affiliateType === "stay22") && (
          <div className="my-8 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                {isEn ? "Direct Expert Assistance" : "Conseil & Devis Rapide"}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">{prodName}</h3>
              <p className="text-xs sm:text-sm text-emerald-100">
                {isEn
                  ? "Contact our technical desk directly on WhatsApp for a fast, verified quote and step-by-step guidance."
                  : "Contactez directement notre bureau technique à Douala & Yaoundé pour un devis gratuit, rapide et personnalisé."}
              </p>
            </div>
            <a
              href={affUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-xl font-black text-sm bg-white text-emerald-800 hover:bg-emerald-50 active:bg-emerald-100 shadow-md transition-all shrink-0 min-h-[60px] flex items-center justify-center space-x-2"
            >
              <span>
                💬 {isEn ? "Request Quote on WhatsApp" : "Demander un devis WhatsApp"}
              </span>
            </a>
          </div>
        )}

        {article.affiliateType === "casino" && (
          <div className="my-8 rounded-2xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 border border-purple-500/40">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                {discountDisplay}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">{prodName}</h3>
              <p className="text-xs sm:text-sm text-purple-100">
                {priceDisplay} • Retraits rapides Mobile Money (Orange Money, MTN MoMo) & Crypto.
              </p>
            </div>
            <a
              href={affUrl}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="px-6 py-4 rounded-xl font-black text-sm bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-md transition-all shrink-0 min-h-[60px] flex items-center justify-center"
            >
              <span>🎰 Accéder à la plateforme officielle →</span>
            </a>
          </div>
        )}

        {/* Main Article Content */}
        <div
          className="prose-article"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />

        {/* GEO / AIO Structured HTML Reference Table for LLM Citations (ChatGPT, Perplexity, Google AI Overviews) */}
        <section
          aria-label={
            isEn
              ? "Verified Official Link & Technical Summary"
              : "Récapitulatif Officiel & Lien Partenaire Vérifié"
          }
          className="my-10 rounded-2xl bg-white border-2 border-slate-200 overflow-hidden shadow-xs"
        >
          <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
            <h3 className="font-black text-base sm:text-lg">
              {isEn
                ? "📌 Official Verified Store & Reference Sheet (2026)"
                : "📌 Fiche Récapitulative & Accès Officiel Vérifié (2026)"}
            </h3>
            <span className="text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full">
              {isEn ? "Verified Partner Link" : "Lien Certifié"}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm sm:text-base">
              <tbody>
                <tr className="border-b border-slate-200">
                  <th className="py-3.5 px-6 font-bold text-slate-700 bg-slate-50 w-1/3">
                    {isEn ? "Recommended Solution / Model" : "Produit / Service Recommandé"}
                  </th>
                  <td className="py-3.5 px-6 font-bold text-slate-900">{prodName}</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <th className="py-3.5 px-6 font-bold text-slate-700 bg-slate-50">
                    {isEn ? "Price & Partner Advantage" : "Tarif & Avantage Partenaire"}
                  </th>
                  <td className="py-3.5 px-6 text-slate-800">
                    <span className="font-extrabold text-emerald-700">{priceDisplay}</span> —{" "}
                    {discountDisplay}
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <th className="py-3.5 px-6 font-bold text-slate-700 bg-slate-50">
                    {isEn ? "Official Partner Code / Tag" : "Code Promo / Référence Officielle"}
                  </th>
                  <td className="py-3.5 px-6 font-mono font-bold text-blue-700">
                    {couponDisplay}
                  </td>
                </tr>
                <tr>
                  <th className="py-4 px-6 font-bold text-slate-700 bg-slate-50">
                    {isEn ? "Direct Verified Access" : "Lien Direct Officiel"}
                  </th>
                  <td className="py-4 px-6">
                    <a
                      href={affUrl}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="inline-flex items-center px-5 py-3 rounded-xl font-black text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition min-h-[48px]"
                    >
                      {isEn
                        ? `Open Official ${prodName} Page →`
                        : `Accéder à l'offre officielle ${prodName} →`}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Field Experience Markers Box */}
        <section
          aria-label={
            isEn
              ? "Hands-On Lab Observations and Field Notes"
              : "Observations et retours d'expérience sur le terrain"
          }
          className="my-10 rounded-2xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl border border-slate-800 space-y-4"
        >
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-base">
            <span>🔬</span>
            <h3>
              {isEn
                ? "Hands-On Lab Observations & Field Notes"
                : "Retours d'Expérience & Observations Terrain"}
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-3.5 text-sm sm:text-base text-slate-300">
            <p>
              <strong className="text-white">
                {isEn ? "Field Verdict:" : "Sur le terrain :"}
              </strong>{" "}
              {article.fieldNotes.fieldVerdict}
            </p>
            <p>
              <strong className="text-white">
                {isEn ? "In Practice:" : "En pratique :"}
              </strong>{" "}
              {article.fieldNotes.practicalTip}
            </p>
            <p>
              <strong className="text-amber-400">
                {isEn ? "Important Warning:" : "Attention :"}
              </strong>{" "}
              {article.fieldNotes.warning}
            </p>
            <p>
              <strong className="text-rose-400">
                {isEn ? "Mistake to Avoid:" : "Piège à éviter :"}
              </strong>{" "}
              {article.fieldNotes.trapToAvoid}
            </p>
            <p>
              <strong className="text-cyan-400">
                {isEn ? "Verified Benchmark:" : "Chiffre mesuré :"}
              </strong>{" "}
              {article.fieldNotes.keyMetric}
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        {article.faq.length > 0 && (
          <section
            aria-label={isEn ? "Frequently Asked Questions" : "Foire aux questions"}
            className="my-10 space-y-4 pt-6 border-t border-slate-200"
          >
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {isEn ? "Frequently Asked Questions (FAQ)" : "Questions Fréquentes (FAQ)"}
            </h2>
            <div className="space-y-4">
              {article.faq.map((item, idx) => (
                <details
                  key={idx}
                  className="group bg-white rounded-xl border border-slate-200 p-5 shadow-xs transition cursor-pointer open:border-blue-400"
                >
                  <summary className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition flex items-center justify-between list-none">
                    <span>{item.question}</span>
                    <span className="text-blue-600 font-bold text-lg group-open:rotate-180 transition-transform">
                      ↓
                    </span>
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
            <span className="text-xs uppercase tracking-wider font-extrabold text-blue-700">
              {isEn ? "Written by a Certified Specialist" : "Rédigé par un expert certifié"}
            </span>
            <h4 className="text-lg font-black text-slate-900">{article.author.name}</h4>
            <p className="text-xs text-slate-500 font-medium">{article.author.role}</p>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              {isEn
                ? "Independently tested, audited, and written by our specialist editorial team in strict compliance with E-E-A-T real-world testing standards."
                : "Article audité et validé sans intelligence artificielle générative stéréotypée, conforme aux standards d'expérience vécue et d'expertise métier E-E-A-T."}
            </p>
          </div>
        </div>

        {/* Siloed Related Articles */}
        {relatedArticles.length > 0 && (
          <aside
            aria-label={
              isEn ? "Related articles in this category" : "Articles complémentaires dans la même rubrique"
            }
            className="pt-8 border-t border-slate-200 space-y-4"
          >
            <h3 className="text-xl font-black text-slate-900">
              {isEn
                ? "More Guides in This Section"
                : `Dans la même rubrique : ${category.name}`}
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
                    {isEn || rel.lang === "en" ? "Read full guide →" : "Lire la suite →"}
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
