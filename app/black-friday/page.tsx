import type { Metadata } from "next";
import Link from "next/link";
import BlackFridayHubClient from "@/components/BlackFridayHubClient";
import { BLACK_FRIDAY_DEALS } from "@/lib/black-friday-schedule";

export const revalidate = false;
export const dynamic = "force-static";

const SITE_URL = "https://www.kidenzo.store";

export const metadata: Metadata = {
  title: "Black Friday & Cyber Monday 2026 : Les Vraies Promos Vérifiées (Tech, Serveurs & Solaire)",
  description:
    "Calendrier officiel et sélection vérifiée Black Friday 2026 : serveurs VPS Hostinger (-20% code XVCFABRICNC4), kits solaires Lithium au Cameroun, cuisine Amazon FR et tech Amazon US.",
  alternates: {
    canonical: `${SITE_URL}/black-friday`,
  },
  openGraph: {
    title: "Black Friday & Cyber Monday 2026 : Sélection Officielle Vérifiée | Kidenzo Media",
    description:
      "Toutes les vraies remises testées sans piège : hébergement Cloud & VPS, autonomie solaire Cameroun, électroménager Amazon FR et batteries haute puissance Amazon US.",
    url: `${SITE_URL}/black-friday`,
    type: "website",
    siteName: "Kidenzo Media",
    locale: "fr_FR",
  },
};

const FAQ_ITEMS = [
  {
    question: "Comment être sûr qu'une promotion Black Friday est une vraie baisse de prix ?",
    answer:
      "Notre équipe compare les tarifs relevés pendant les 60 jours précédant novembre. Nous retenons uniquement les offres affichant une réduction réelle par rapport au prix moyen annuel, avec garantie constructeur officielle.",
  },
  {
    question: "Comment cumuler le code promo XVCFABRICNC4 sur Hostinger pendant le Black Friday ?",
    answer:
      "Rendez-vous sur Hostinger via notre lien officiel partenaire, choisissez un hébergement web ou un serveur VPS KVM (12 ou 24 mois), puis saisissez le code XVCFABRICNC4 dans le panier pour appliquer la réduction supplémentaire.",
  },
  {
    question: "Comment obtenir un devis solaire Black Friday à Douala ou Yaoundé ?",
    answer:
      "Appuyez sur le bouton WhatsApp de la page pour écrire directement à notre bureau technique au +237 693 845 941. Précisez votre ville et les appareils à alimenter (réfrigérateur, congélateur, climatiseur, éclairage) pour recevoir une étude gratuite sous 2 heures.",
  },
  {
    question: "Jusqu'à quelle date durent les offres Black Friday et Cyber Monday 2026 ?",
    answer:
      "Les offres d'avant-première démarrent le 24 novembre, atteignent leur pic le vendredi 27 novembre (Jour J), se prolongent le week-end des 28 et 29 novembre, et se clôturent après le Cyber Monday le mardi 1er décembre 2026 à 23h59.",
  },
];

export default function BlackFridayPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/black-friday#webpage`,
        "name": "Black Friday & Cyber Monday 2026 : Les Vraies Promos Vérifiées",
        "description":
          "Sélection officielle des offres Black Friday et Cyber Monday 2026 vérifiées par la rédaction de Kidenzo Media.",
        "url": `${SITE_URL}/black-friday`,
        "inLanguage": "fr-FR",
        "isPartOf": {
          "@type": "WebSite",
          "name": "Kidenzo Media",
          "url": SITE_URL,
        },
        "significantLink": BLACK_FRIDAY_DEALS.map((d) => d.affiliateUrl),
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/black-friday#deals`,
        "name": "Sélection Officielle Black Friday 2026 Kidenzo Media",
        "itemListElement": BLACK_FRIDAY_DEALS.map((deal, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": deal.title,
          "description": deal.simpleSubtitle,
          "url": deal.affiliateUrl,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/black-friday#faq`,
        "mainEntity": FAQ_ITEMS.map((item) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12">
        {/* Retour en arrière évident en haut à gauche (Règle UX Navigation Simple) */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-slate-800 hover:text-blue-700 font-bold text-sm shadow-2xs transition min-h-[48px]"
          >
            <span>← Retour à l&apos;accueil 🏠</span>
          </Link>
          <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
            Vous êtes ici : Accueil &rsaquo; Espace Black Friday 2026
          </span>
        </div>

        {/* Hub Interactif (Calendrier + Calculateur + Filtres + Offres) */}
        <BlackFridayHubClient />

        {/* Section Conseils Anti-Pièges & FAQ Accessible */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700">
              💬 Questions Fréquentes & Aide Simple
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Tout comprendre avant d&apos;acheter
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAQ_ITEMS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-slate-50 border border-slate-200/80 p-5 space-y-2"
              >
                <h3 className="font-black text-base sm:text-lg text-slate-900">
                  {faq.question}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
