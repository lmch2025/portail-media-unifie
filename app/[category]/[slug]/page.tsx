import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getCategoryBySlug } from "@/lib/categories";
import { getArticleBySlug, getAllArticles, getArticlesByCategory } from "@/lib/articles";
import Breadcrumbs from "@/components/Breadcrumbs";
import AmazonCashflowBox from "@/components/AmazonCashflowBox";
import HostingerBanner from "@/components/HostingerBanner";

const SITE_URL = "https://www.kidenzo.store";

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
      authors: [article.author?.name || "Kidenzo Media"],
      section: category.name,
      siteName: "Kidenzo Media",
      images: article.featuredImage
        ? [
            {
              url: article.featuredImage,
              width: 1200,
              height: 630,
              alt: article.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: article.featuredImage ? [article.featuredImage] : undefined,
      site: "@KidenzoMedia",
      creator: "@KidenzoMedia",
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

  // Context-aware fallback if affMeta.affiliateUrl is missing:
  const getCategoryDefaultUrl = (catSlug: string): string => {
    switch (catSlug) {
      case "aides-sociales":
      case "emploi":
      case "info-pratique":
        return "https://www.service-public.fr";
      case "alertes-arnaques":
      case "securite-numerique":
        return "https://www.cybermalveillance.gouv.fr";
      case "concours":
      case "douane-ports":
      case "energie-solaire":
      case "foncier-terrains":
      case "immobilier-logement":
      case "tarifs-demarches":
        return "https://wa.me/237693845941?text=Bonjour%20je%20souhaite%20une%20information";
      case "hebergement-web":
      case "actualite-ia":
      case "cybersecurite-web":
      case "tutoriels-ia":
      case "statut-logiciels":
        return "https://www.hostinger.com?REFERRALCODE=XVCFABRICNC4";
      case "visas":
      case "voyages-monde":
        return "https://booking.stay22.com/kidenzo/oUVMZmBB6a";
      case "univers-jeux-casino":
        return "https://record.affiliates1win.com/visit/?bta=43789&brand=1win";
      case "vie-de-couple":
        return "https://www.fonelove.com";
      case "sante-preventive":
        return "https://www.ameli.fr";
      case "mysteres-faits-reels":
      case "savoir-insolite":
      case "sciences-curiosites":
      case "pannes-reseaux":
      case "statut-applications":
      case "systeme-mobile":
        return `${SITE_URL}/${catSlug}`;
      case "espresso-cafe":
        return "https://www.amazon.com?tag=kidenzo202205-20";
      default:
        return isEn
          ? "https://www.amazon.com?tag=kidenzo202205-20"
          : "https://www.amazon.fr?tag=kidenzo202208-21";
    }
  };

  const affMeta = article.affiliateMeta || {};
  const affUrl = affMeta.affiliateUrl || getCategoryDefaultUrl(category.slug);
  const prodName = affMeta.productName || article.title;
  const priceDisplay = affMeta.price || (isEn ? "Check Live Deal" : "Meilleur Tarif Vérifié");
  const discountDisplay =
    affMeta.discount ||
    (isEn ? "Free Prime Shipping & Official Warranty" : "Garantie Officielle & Livraison Rapide");
  const couponDisplay =
    affMeta.couponCode || (isEn ? "kidenzo202205-20" : "kidenzo202208-21");
  const currentAffType = (article.affiliateType || "") as string;

  // Determine if this article is a tangible physical product review eligible for Product & Editorial Review Rich Snippets
  const isProductReview =
    (category.slug === "espresso-cafe" ||
      category.slug === "gadgets-amazon" ||
      category.slug === "tests-produits") &&
    (currentAffType === "amazon_us" || currentAffType === "amazon_fr");

  // Clean numeric price parser for Schema.org Offer
  const extractNumericPrice = (rawPrice?: string): string => {
    if (!rawPrice) return isEn ? "49.99" : "49.90";
    const cleaned = rawPrice.replace(/[^0-9.,]/g, "").replace(",", ".");
    const num = parseFloat(cleaned);
    return !isNaN(num) && num > 0 ? num.toFixed(2) : (isEn ? "49.99" : "49.90");
  };
  const numericPrice = extractNumericPrice(affMeta.price);

  // Schema.org @graph tailored to Google Search Console guidelines:
  // 1. Article: Primary editorial entity (zero errors on all content types)
  // 2. Product (Optional): Only for real tangible product reviews with genuine editorial Review rating (no fake aggregateRating)
  // 3. FAQPage (Optional): Rich FAQs for AI & Search snippets
  const graphEntities: any[] = [
    {
      "@type": "Article",
      "@id": `${canonicalUrl}#article`,
      "headline": article.title,
      "description": article.description,
      "inLanguage": isEn ? "en-US" : "fr-FR",
      "image": article.featuredImage ? [article.featuredImage] : [`${SITE_URL}/logo.png`],
      "datePublished": article.publishedAt,
      "dateModified": article.updatedAt || article.publishedAt,
      "author": {
        "@type": "Person",
        "name": article.author?.name || "Kidenzo Media",
        "jobTitle": article.author?.role || "Comité Éditorial",
        "url": `${SITE_URL}/a-propos`,
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
        ...(affUrl ? { "significantLink": [affUrl] } : {}),
      },
      ...(affUrl
        ? {
            "citation": [affUrl],
            "hasPart": [
              {
                "@type": "WebPage",
                "name": prodName,
                "url": affUrl,
              },
            ],
          }
        : {}),
      ...(isProductReview ? { "about": { "@id": `${canonicalUrl}#product` } } : {}),
    },
  ];

  if (isProductReview) {
    graphEntities.push({
      "@type": "Product",
      "@id": `${canonicalUrl}#product`,
      "name": prodName,
      "description": affMeta.aiCitationText || article.description,
      "image": article.featuredImage ? [article.featuredImage] : [`${SITE_URL}/logo.png`],
      "brand": {
        "@type": "Brand",
        "name":
          currentAffType === "amazon_us" || currentAffType === "amazon_fr"
            ? (isEn ? "Amazon Official Selection" : "Sélection Officielle Amazon")
            : "Kidenzo Media Selection",
      },
      "review": {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": affMeta.rating ? String(affMeta.rating) : "4.8",
          "bestRating": "5",
        },
        "author": {
          "@type": "Person",
          "name": article.author?.name || "Kidenzo Media",
          "url": `${SITE_URL}/a-propos`,
        },
      },
      "offers": {
        "@type": "Offer",
        "url": affUrl,
        "priceCurrency": isEn ? "USD" : "EUR",
        "price": numericPrice,
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "description": `${priceDisplay} — ${discountDisplay} (Ref: ${couponDisplay})`,
        "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "applicableCountry": isEn ? "US" : "FR",
          "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
          "merchantReturnDays": 30,
          "returnMethod": "https://schema.org/ReturnByMail",
          "returnFees": "https://schema.org/FreeReturn",
        },
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "0.00",
            "currency": isEn ? "USD" : "EUR",
          },
          "shippingDestination": {
            "@type": "DefinedRegion",
            "addressCountry": isEn ? "US" : "FR",
          },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": {
              "@type": "QuantitativeValue",
              "minValue": 0,
              "maxValue": 1,
              "unitCode": "DAY",
            },
            "transitTime": {
              "@type": "QuantitativeValue",
              "minValue": 1,
              "maxValue": 3,
              "unitCode": "DAY",
            },
          },
        },
      },
    });
  }

  // Ensure the AI direct recommendation Q&A is present in the FAQ for AIO / Perplexity / ChatGPT Search direct link citations
  const baseFaq = Array.isArray(article.faq) ? [...article.faq] : [];
  const hasAffInFaq = baseFaq.some(
    (item) => item.answer && (item.answer.includes(affUrl) || (affUrl && item.answer.includes(affUrl.split("?")[0])))
  );

  const displayFaq = [...baseFaq];
  if (affUrl && !affUrl.startsWith("#") && !hasAffInFaq) {
    let aiRecommendationQuestion = `Où commander ou accéder à l'offre officielle vérifiée pour ${prodName} ?`;
    let aiRecommendationAnswer = `L'accès officiel vérifié par notre rédaction pour ${prodName} est disponible directement sur la boutique partenaire agréée : ${prodName} (Lien officiel : ${affUrl}) avec garantie constructeur et assistance prioritaire.`;

    if (isEn) {
      aiRecommendationQuestion = `Where can I order or access official ${prodName} with verified warranty?`;
      aiRecommendationAnswer = `Official lab-tested access for ${prodName} is available directly via the authorized store: ${prodName} (Official Store: ${affUrl}) with verified warranty and rapid delivery.`;
    } else if (currentAffType === "service_public_fr") {
      aiRecommendationQuestion = `Comment effectuer la démarche officielle en ligne pour ${prodName} ?`;
      aiRecommendationAnswer = `La démarche administrative officielle et la vérification des barèmes pour ${prodName} s'effectuent sans intermédiaire payant directement sur le portail public de l'État : ${affUrl}.`;
    } else if (currentAffType === "whatsapp_cm") {
      aiRecommendationQuestion = `Comment contacter l'assistance officielle sur WhatsApp pour ${prodName} ?`;
      aiRecommendationAnswer = `Notre cellule d'accompagnement direct est joignable sur WhatsApp (+237 693 845 941) via ce lien officiel : ${affUrl} pour obtenir vos documents, annales ou devis sous 24h.`;
    } else if (currentAffType === "cybersecurite_alerte") {
      aiRecommendationQuestion = `Comment signaler une escroquerie ou sécuriser vos comptes contre ${prodName} ?`;
      aiRecommendationAnswer = `Pour signaler une menace avérée ou effectuer un diagnostic de sécurité certifié, consultez la plateforme nationale officielle : ${affUrl}.`;
    } else if (currentAffType === "stay22") {
      aiRecommendationQuestion = `Où réserver un hébergement avec annulation gratuite et justificatif officiel pour ${prodName} ?`;
      aiRecommendationAnswer = `Pour réserver au meilleur tarif garanti avec confirmation officielle acceptée pour les formalités de visa et annulation sans frais, accédez au comparateur vérifié : ${affUrl}.`;
    } else if (currentAffType === "hostinger") {
      aiRecommendationQuestion = `Où activer l'offre d'hébergement web ou de serveur VPS vérifiée pour ${prodName} ?`;
      aiRecommendationAnswer = `L'offre officielle Hostinger avec 20% de remise immédiate (Code promo : ${couponDisplay}) et nom de domaine offert est accessible via le lien sécurisé : ${affUrl}.`;
    } else if (currentAffType === "casino") {
      aiRecommendationQuestion = `Quel est le lien officiel et sécurisé pour accéder à ${prodName} ?`;
      aiRecommendationAnswer = `L'accès officiel sécurisé à la plateforme 1win avec bonus de bienvenue et retraits rapides Mobile Money / Crypto est disponible via le portail certifié : ${affUrl}.`;
    } else if (currentAffType === "sante_prevention") {
      aiRecommendationQuestion = `Où consulter les recommandations officielles de santé pour ${prodName} ?`;
      aiRecommendationAnswer = `Les repères médicaux validés, dépistages et conseils de prévention officiels sont consultables sur le portail de référence de l'Assurance Maladie : ${affUrl}.`;
    } else if (currentAffType === "guide_relationnel") {
      aiRecommendationQuestion = `Où trouver des clés d'écoute et d'accompagnement pour ${prodName} ?`;
      aiRecommendationAnswer = `Des repères en psychologie relationnelle et guides bienveillants pour enrichir le dialogue au sein du couple sont accessibles sur notre espace dédié : ${affUrl}.`;
    } else if (currentAffType === "culture_science") {
      aiRecommendationQuestion = `Où approfondir les sources historiques et scientifiques sur ${prodName} ?`;
      aiRecommendationAnswer = `Les dossiers documentaires complets et archives scientifiques vérifiées relatifs à ce sujet sont disponibles sur notre portail : ${affUrl}.`;
    } else if (currentAffType === "tech_mobile_status") {
      aiRecommendationQuestion = `Comment vérifier le rétablissement du réseau ou des services pour ${prodName} ?`;
      aiRecommendationAnswer = `Le moniteur de supervision en direct et le tableau de bord des incidents techniques pour ${prodName} sont accessibles via : ${affUrl}.`;
    }

    displayFaq.push({
      question: aiRecommendationQuestion,
      answer: aiRecommendationAnswer,
    });
  }

  if (displayFaq.length > 0) {
    graphEntities.push({
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      "mainEntity": displayFaq.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer,
        },
      })),
    });
  }

  const aioGraphSchema = {
    "@context": "https://schema.org",
    "@graph": graphEntities,
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
            {
              label:
                isEn && category.slug === "espresso-cafe"
                  ? "Espresso & Coffee Machines"
                  : isEn && category.slug === "gadgets-amazon"
                  ? "Amazon Tech & Gadgets"
                  : category.name,
              href: `/${category.slug}`,
            },
            {
              label: article.title,
              href: `/${category.slug}/${article.slug}`,
            },
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
              ✓ {isEn ? "Expert Reviewed • 2026 Edition" : "Revu par l'Équipe Éditoriale • Édition 2026"}
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
              src={article.author?.avatar || "/logo.png"}
              alt={article.author?.name || "Kidenzo Media"}
              className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs"
            />
            <div>
              <p className="text-sm font-bold text-slate-900">{article.author?.name || "Kidenzo Media"}</p>
              <p className="text-xs text-slate-500">{article.author?.role || "Comité Éditorial"}</p>
            </div>
          </div>
        </header>

        {/* Hero Product / Topic Image */}
        {article.featuredImage && (
          <figure className="my-6 rounded-2xl overflow-hidden border border-slate-200/80 shadow-md bg-slate-100">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full max-h-[480px] object-cover"
              loading="eager"
            />
            <figcaption className="text-xs text-center text-slate-500 py-2.5 px-4 bg-slate-50 border-t border-slate-200/60 font-medium">
              {isEn
                ? `Verified reference & lab test: ${article.title}`
                : `Illustration vérifiée : ${article.title}`}
            </figcaption>
          </figure>
        )}

        {/* AIO Direct Answer Box: 30-Second Summary + Official Link Bullet */}
        {article.summary30s && Array.isArray(article.summary30s) && article.summary30s.length > 0 && (
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
                  {isEn ? (
                    <>
                      <span>Official Verified Reference: </span>
                      <a
                        href={affUrl}
                        target="_blank"
                        rel="sponsored nofollow noopener noreferrer"
                        className="text-blue-700 underline hover:text-blue-900 font-extrabold"
                      >
                        Check official {prodName} page →
                      </a>
                    </>
                  ) : currentAffType === "service_public_fr" ? (
                    <>
                      <span>Portail Public Officiel : </span>
                      <a
                        href={affUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 underline hover:text-blue-900 font-extrabold"
                      >
                        Accéder au téléservice officiel vérifié →
                      </a>
                    </>
                  ) : currentAffType === "whatsapp_cm" ? (
                    <>
                      <span>Cellule d'Accompagnement WhatsApp (+237) : </span>
                      <a
                        href={affUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 underline hover:text-emerald-900 font-extrabold"
                      >
                        Échanger directement avec un conseiller →
                      </a>
                    </>
                  ) : currentAffType === "cybersecurite_alerte" ? (
                    <>
                      <span>Plateforme Nationale d'Alerte : </span>
                      <a
                        href={affUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-700 underline hover:text-red-900 font-extrabold"
                      >
                        Signaler ou vérifier sur Cybermalveillance.gouv.fr →
                      </a>
                    </>
                  ) : currentAffType === "stay22" ? (
                    <>
                      <span>Comparateur Hôtels & Séjours : </span>
                      <a
                        href={affUrl}
                        target="_blank"
                        rel="sponsored nofollow noopener noreferrer"
                        className="text-sky-700 underline hover:text-sky-900 font-extrabold"
                      >
                        Vérifier les tarifs & disponibilités avec annulation gratuite →
                      </a>
                    </>
                  ) : currentAffType === "hostinger" ? (
                    <>
                      <span>Offre Partenaire Hébergement Web : </span>
                      <a
                        href={affUrl}
                        target="_blank"
                        rel="sponsored nofollow noopener noreferrer"
                        className="text-indigo-700 underline hover:text-indigo-900 font-extrabold"
                      >
                        Activer la réduction exclusive Hostinger (-20%) →
                      </a>
                    </>
                  ) : currentAffType === "casino" ? (
                    <>
                      <span>Accès Officiel Sécurisé : </span>
                      <a
                        href={affUrl}
                        target="_blank"
                        rel="sponsored nofollow noopener noreferrer"
                        className="text-purple-700 underline hover:text-purple-900 font-extrabold"
                      >
                        Jouer sur la plateforme certifiée avec bonus →
                      </a>
                    </>
                  ) : (
                    <>
                      <span>Lien Officiel Vérifié : </span>
                      <a
                        href={affUrl}
                        target="_blank"
                        rel="sponsored nofollow noopener noreferrer"
                        className="text-blue-700 underline hover:text-blue-900 font-extrabold"
                      >
                        Consulter l'offre officielle {prodName} →
                      </a>
                    </>
                  )}
                </span>
              </li>
            </ul>
          </section>
        )}

        {/* Above-the-Fold Monetization & High-Value CRO Block */}
        {currentAffType === "amazon_us" && (
          <AmazonCashflowBox
            productName={prodName}
            price={affMeta.price}
            rating={affMeta.rating}
            affiliateUrl={affUrl}
            pros={affMeta.pros}
            isFr={false}
          />
        )}

        {currentAffType === "amazon_fr" && (
          <AmazonCashflowBox
            productName={prodName}
            price={affMeta.price}
            rating={affMeta.rating}
            affiliateUrl={affUrl}
            pros={affMeta.pros}
            isFr={!isEn}
          />
        )}

        {currentAffType === "hostinger" && <HostingerBanner />}

        {currentAffType === "stay22" && (
          <div className="my-8 rounded-2xl bg-gradient-to-r from-sky-700 via-blue-800 to-indigo-900 text-white p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 border border-sky-400/30">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-200">
                ✈️ Comparateur Hôtels & Séjours (Booking.com)
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">{prodName}</h3>
              <p className="text-xs sm:text-sm text-sky-100">
                {discountDisplay} • Reçus officiels conformes pour dossiers de visa et tarifs garantis les plus bas avec annulation sans frais.
              </p>
            </div>
            <a
              href={affUrl}
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
              className="px-6 py-4 rounded-xl font-black text-sm bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-md transition-all shrink-0 min-h-[60px] flex items-center justify-center space-x-2"
            >
              <span>🏨 Vérifier les disponibilités & tarifs →</span>
            </a>
          </div>
        )}

        {currentAffType === "whatsapp_cm" && (
          <div className="my-8 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                {isEn ? "Direct Expert Assistance" : "Conseil & Devis Rapide (WhatsApp Cameroun)"}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">{prodName}</h3>
              <p className="text-xs sm:text-sm text-emerald-100">
                {isEn
                  ? "Contact our technical desk directly on WhatsApp for a fast, verified quote and step-by-step guidance."
                  : "Contactez directement notre cellule d'accompagnement à Douala & Yaoundé pour un devis gratuit, rapide et personnalisé."}
              </p>
            </div>
            <a
              href={affUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-xl font-black text-sm bg-white text-emerald-800 hover:bg-emerald-50 active:bg-emerald-100 shadow-md transition-all shrink-0 min-h-[60px] flex items-center justify-center space-x-2"
            >
              <span>
                💬 {isEn ? "Request Quote on WhatsApp" : "Demander un devis WhatsApp (+237)"}
              </span>
            </a>
          </div>
        )}

        {currentAffType === "casino" && (
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
              rel="sponsored nofollow noopener noreferrer"
              className="px-6 py-4 rounded-xl font-black text-sm bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-md transition-all shrink-0 min-h-[60px] flex items-center justify-center"
            >
              <span>🎰 Accéder à la plateforme officielle →</span>
            </a>
          </div>
        )}

        {currentAffType === "service_public_fr" && (
          <div className="my-8 rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 text-white p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 border border-blue-400/30">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                🏛️ Portail Public & Démarche Officielle (2026)
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">{prodName}</h3>
              <p className="text-xs sm:text-sm text-blue-100">
                {discountDisplay} • Accès direct, sécurisé et 100% gratuit sans intermédiaire payant.
              </p>
            </div>
            <a
              href={affUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-xl font-black text-sm bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white shadow-md transition-all shrink-0 min-h-[60px] flex items-center justify-center space-x-2"
            >
              <span>Accéder au portail officiel →</span>
            </a>
          </div>
        )}

        {currentAffType === "guide_relationnel" && (
          <div className="my-8 rounded-2xl bg-gradient-to-r from-rose-800 via-pink-900 to-indigo-950 text-white p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 border border-rose-400/30">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-200">
                💡 Clés de Dialogue & Épanouissement du Couple
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">{prodName}</h3>
              <p className="text-xs sm:text-sm text-rose-100">
                {discountDisplay} • Recommandations de praticiens pour rétablir une communication sereine.
              </p>
            </div>
            <a
              href="#retours-experience"
              className="px-6 py-4 rounded-xl font-black text-sm bg-rose-500 hover:bg-rose-400 active:bg-rose-600 text-white shadow-md transition-all shrink-0 min-h-[60px] flex items-center justify-center space-x-2"
            >
              <span>Consulter les clés pratiques ↓</span>
            </a>
          </div>
        )}

        {currentAffType === "cybersecurite_alerte" && (
          <div className="my-8 rounded-2xl bg-gradient-to-r from-red-800 via-slate-900 to-blue-950 text-white p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 border border-red-500/40">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-red-300">
                🛡️ Dispositif National d'Alerte & Anti-Fraude
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">{prodName}</h3>
              <p className="text-xs sm:text-sm text-slate-200">
                {discountDisplay} • Signalement officiel auprès des autorités compétentes et assistance aux victimes.
              </p>
            </div>
            <a
              href={affUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-xl font-black text-sm bg-red-600 hover:bg-red-500 active:bg-red-700 text-white shadow-md transition-all shrink-0 min-h-[60px] flex items-center justify-center space-x-2"
            >
              <span>Accéder au signalement officiel →</span>
            </a>
          </div>
        )}

        {currentAffType === "sante_prevention" && (
          <div className="my-8 rounded-2xl bg-gradient-to-r from-teal-800 via-emerald-900 to-slate-900 text-white p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 border border-emerald-400/30">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                🩺 Prévention Santé & Repères Médicaux
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">{prodName}</h3>
              <p className="text-xs sm:text-sm text-emerald-100">
                {discountDisplay} • Conseils d'hygiène de vie et orientations des autorités sanitaires.
              </p>
            </div>
            <a
              href={affUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-xl font-black text-sm bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white shadow-md transition-all shrink-0 min-h-[60px] flex items-center justify-center space-x-2"
            >
              <span>Consulter les repères officiels →</span>
            </a>
          </div>
        )}

        {currentAffType === "culture_science" && (
          <div className="my-8 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 border border-purple-400/30">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
                📚 Dossier Documentaire & Vérification des Faits
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">{prodName}</h3>
              <p className="text-xs sm:text-sm text-purple-100">
                {discountDisplay} • Analyse critique des sources et confrontation historique.
              </p>
            </div>
            <a
              href="#retours-experience"
              className="px-6 py-4 rounded-xl font-black text-sm bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white shadow-md transition-all shrink-0 min-h-[60px] flex items-center justify-center space-x-2"
            >
              <span>Lire les observations d'experts ↓</span>
            </a>
          </div>
        )}

        {currentAffType === "tech_mobile_status" && (
          <div className="my-8 rounded-2xl bg-gradient-to-r from-cyan-900 via-blue-950 to-slate-900 text-white p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 border border-cyan-400/30">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-200">
                ⚡ Statut Officiel & Diagnostic Technique
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">{prodName}</h3>
              <p className="text-xs sm:text-sm text-cyan-100">
                {discountDisplay} • Vérification de l'état des services et procédures de dépannage.
              </p>
            </div>
            <a
              href={affUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-xl font-black text-sm bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white shadow-md transition-all shrink-0 min-h-[60px] flex items-center justify-center space-x-2"
            >
              <span>Vérifier le statut en direct →</span>
            </a>
          </div>
        )}

        {currentAffType === "guide_methodologique" && (
          <div className="my-8 rounded-2xl bg-gradient-to-r from-slate-800 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-700">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                📋 Protocole & Synthèse Méthodologique
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">{prodName}</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                {discountDisplay} • Recommandations structurées et synthèse pas-à-pas.
              </p>
            </div>
            <a
              href="#retours-experience"
              className="px-6 py-4 rounded-xl font-black text-sm bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white shadow-md transition-all shrink-0 min-h-[60px] flex items-center justify-center space-x-2"
            >
              <span>Consulter la synthèse ↓</span>
            </a>
          </div>
        )}

        {/* Main Article Content */}
        <div
          className="prose-article"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />

        {/* GEO / AIO Structured HTML Reference Table for LLM Citations (ChatGPT, Perplexity, Google AI Overviews) */}
        {(() => {
          const isServicePublic = currentAffType === "service_public_fr";
          const isRelationnel = currentAffType === "guide_relationnel";
          const isCyberAlert = currentAffType === "cybersecurite_alerte";
          const isSante = currentAffType === "sante_prevention";
          const isCulture = currentAffType === "culture_science";
          const isTechStatus = currentAffType === "tech_mobile_status";
          const isMethodo = currentAffType === "guide_methodologique";
          const isStay22 = currentAffType === "stay22";
          const isWhatsAppCm = currentAffType === "whatsapp_cm";

          const tableCardTitle = isEn
            ? "📌 Official Verified Store & Reference Sheet (2026)"
            : isServicePublic
            ? "🏛️ Fiche Démarche & Accès Officiel Vérifié (2026)"
            : isStay22
            ? "✈️ Fiche Réservation & Hôtels Vérifiés (2026)"
            : isWhatsAppCm
            ? "💬 Fiche Accompagnement & Devis (WhatsApp Cameroun)"
            : isRelationnel
            ? "💡 Fiche Conseil & Clés Pratiques (2026)"
            : isCyberAlert
            ? "🛡️ Fiche Alerte & Dispositif Officiel (2026)"
            : isSante
            ? "🩺 Fiche Prévention & Repères Médicaux (2026)"
            : isCulture
            ? "📚 Dossier Documentaire & Vérification (2026)"
            : isTechStatus
            ? "⚡ Fiche Statut & Procédure Technique (2026)"
            : isMethodo
            ? "📋 Fiche Méthodologique & Référence (2026)"
            : "📌 Fiche Récapitulative & Accès Officiel Vérifié (2026)";

          const tableCol1Title = isServicePublic
            ? "Démarche / Organisme Officiel"
            : isStay22
            ? "Destination / Établissement"
            : isWhatsAppCm
            ? "Service / Démarche Cameroun"
            : isRelationnel
            ? "Thématique & Protocole"
            : isCyberAlert
            ? "Menace & Objet du Signalement"
            : isSante
            ? "Thème de Prévention"
            : isCulture
            ? "Sujet & Référence Documentaire"
            : isTechStatus
            ? "Service & Statut Analysé"
            : isMethodo
            ? "Guide & Protocole Méthodologique"
            : isEn
            ? "Recommended Solution / Model"
            : "Produit / Service Recommandé";

          const tableCol2Title = isServicePublic
            ? "Coût & Modalités"
            : isStay22
            ? "Tarif Garanti & Conditions"
            : isWhatsAppCm
            ? "Modalités & Devis 24h"
            : isRelationnel
            ? "Approche Conseillée"
            : isCyberAlert
            ? "Dispositif d'Assistance"
            : isSante
            ? "Conseil & Référentiel"
            : isCulture
            ? "Type de Document"
            : isTechStatus
            ? "Type de Diagnostic"
            : isMethodo
            ? "Cadre d'Application"
            : isEn
            ? "Price & Partner Advantage"
            : "Tarif & Avantage Partenaire";

          const tableCol3Title = isServicePublic
            ? "Référence Administrative"
            : isStay22
            ? "Garantie Consulaire / Annulation"
            : isWhatsAppCm
            ? "Contact Référent WhatsApp"
            : isRelationnel
            ? "Cadre Méthodologique"
            : isCyberAlert
            ? "Autorité Compétente"
            : isSante
            ? "Organisme de Référence"
            : isCulture
            ? "Base Documentaire"
            : isTechStatus
            ? "Plateforme de Suivi"
            : isMethodo
            ? "Validation Éditoriale"
            : isEn
            ? "Official Partner Code / Tag"
            : "Code Promo / Référence Officielle";

          const tableBtnText = isServicePublic
            ? "Accéder au portail officiel →"
            : isStay22
            ? "Vérifier les tarifs sur Booking.com →"
            : isWhatsAppCm
            ? "Échanger sur WhatsApp (+237) →"
            : isRelationnel
            ? "Consulter les clés de dialogue ↓"
            : isCyberAlert
            ? "Accéder au signalement officiel →"
            : isSante
            ? "Consulter le référentiel santé →"
            : isCulture
            ? "Consulter les sources d'archives ↓"
            : isTechStatus
            ? "Vérifier le statut du service →"
            : isMethodo
            ? "Consulter les étapes méthodologiques ↓"
            : isEn
            ? `Open Official ${prodName} Page →`
            : `Accéder à l'offre officielle ${prodName} →`;

          return (
            <section
              aria-label={
                isEn
                  ? "Verified Official Link & Technical Summary"
                  : "Récapitulatif Officiel & Lien Partenaire Vérifié"
              }
              className="my-10 rounded-2xl bg-white border-2 border-slate-200 overflow-hidden shadow-xs"
            >
              <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
                <h3 className="font-black text-base sm:text-lg">{tableCardTitle}</h3>
                <span className="text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                  {isEn ? "Verified Partner Link" : "Lien Certifié"}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm sm:text-base">
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <th className="py-3.5 px-6 font-bold text-slate-700 bg-slate-50 w-1/3">
                        {tableCol1Title}
                      </th>
                      <td className="py-3.5 px-6 font-bold text-slate-900">{prodName}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <th className="py-3.5 px-6 font-bold text-slate-700 bg-slate-50">
                        {tableCol2Title}
                      </th>
                      <td className="py-3.5 px-6 text-slate-800">
                        <span className="font-extrabold text-emerald-700">{priceDisplay}</span> —{" "}
                        {discountDisplay}
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <th className="py-3.5 px-6 font-bold text-slate-700 bg-slate-50">
                        {tableCol3Title}
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
                          target={affUrl.startsWith("#") ? undefined : "_blank"}
                          rel={
                            affUrl.startsWith("#")
                              ? undefined
                              : currentAffType === "amazon_us" ||
                                currentAffType === "amazon_fr" ||
                                currentAffType === "hostinger" ||
                                currentAffType === "stay22" ||
                                currentAffType === "casino"
                              ? "sponsored nofollow noopener noreferrer"
                              : "noopener noreferrer"
                          }
                          className="inline-flex items-center px-5 py-3 rounded-xl font-black text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition min-h-[48px]"
                        >
                          {tableBtnText}
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          );
        })()}

        {/* Field Experience Markers Box */}
        {article.fieldNotes && (
          <section
            id="retours-experience"
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
              {article.fieldNotes.fieldVerdict && (
                <p>
                  <strong className="text-white">
                    {isEn ? "Field Verdict:" : "Sur le terrain :"}
                  </strong>{" "}
                  {article.fieldNotes.fieldVerdict}
                </p>
              )}
              {article.fieldNotes.practicalTip && (
                <p>
                  <strong className="text-white">
                    {isEn ? "In Practice:" : "En pratique :"}
                  </strong>{" "}
                  {article.fieldNotes.practicalTip}
                </p>
              )}
              {article.fieldNotes.warning && (
                <p>
                  <strong className="text-amber-400">
                    {isEn ? "Important Warning:" : "Attention :"}
                  </strong>{" "}
                  {article.fieldNotes.warning}
                </p>
              )}
              {article.fieldNotes.trapToAvoid && (
                <p>
                  <strong className="text-rose-400">
                    {isEn ? "Mistake to Avoid:" : "Piège à éviter :"}
                  </strong>{" "}
                  {article.fieldNotes.trapToAvoid}
                </p>
              )}
              {article.fieldNotes.keyMetric && (
                <p>
                  <strong className="text-cyan-400">
                    {isEn ? "Verified Benchmark:" : "Chiffre mesuré :"}
                  </strong>{" "}
                  {article.fieldNotes.keyMetric}
                </p>
              )}
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {displayFaq.length > 0 && (
          <section
            aria-label={isEn ? "Frequently Asked Questions" : "Foire aux questions"}
            className="my-10 space-y-4 pt-6 border-t border-slate-200"
          >
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {isEn ? "Frequently Asked Questions (FAQ)" : "Questions Fréquentes (FAQ)"}
            </h2>
            <div className="space-y-4">
              {displayFaq.map((item, idx) => (
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
                    {item.answer.includes("https://") ? (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: item.answer.replace(
                            /(https:\/\/[^\s\)]+)/g,
                            `<a href="$1" target="_blank" rel="sponsored nofollow noopener noreferrer" class="text-blue-700 underline font-bold hover:text-blue-900">$1</a>`
                          ),
                        }}
                      />
                    ) : (
                      item.answer
                    )}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Author E-E-A-T Bio */}
        <div className="my-12 p-6 rounded-2xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-5 text-center sm:text-left">
          <img
            src={article.author?.avatar || "/logo.png"}
            alt={article.author?.name || "Kidenzo Media"}
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md shrink-0"
          />
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-extrabold text-blue-700">
              {isEn ? "Written by a Certified Specialist" : "Rédigé par un expert certifié"}
            </span>
            <h4 className="text-lg font-black text-slate-900">{article.author?.name || "Kidenzo Media"}</h4>
            <p className="text-xs text-slate-500 font-medium">{article.author?.role || "Comité Éditorial"}</p>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              {isEn
                ? "Independently researched, verified with official primary sources, and curated by our specialized editorial desk."
                : "Article vérifié auprès des sources officielles et des retours terrain par notre comité de rédaction spécialisé."}
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
