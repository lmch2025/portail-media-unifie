import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "À Propos de Kidenzo Media | Charte Éditoriale & Équipe d'Experts",
  description:
    "Découvrez l'équipe éditoriale indépendante de Kidenzo Media : journalistes d'investigation, juristes, ingénieurs télécoms et testeurs hardware basés à Douala, Yaoundé et en Europe.",
  alternates: {
    canonical: "https://www.kidenzo.store/a-propos",
  },
  openGraph: {
    title: "À Propos de Kidenzo Media | Charte Éditoriale & Équipe d'Experts",
    description:
      "Portail média indépendant de référence : guides administratifs officiels, comparatifs d'équipements technologiques et analyses économiques vérifiées.",
    url: "https://www.kidenzo.store/a-propos",
    type: "website",
  },
};

export default function AProposPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "À Propos de Kidenzo Media",
    "description": "Portail média indépendant de référence couvrant 33 thématiques silotées.",
    "url": "https://www.kidenzo.store/a-propos",
    "publisher": {
      "@type": "Organization",
      "name": "Kidenzo Media",
      "url": "https://www.kidenzo.store",
      "logo": "https://www.kidenzo.store/logo.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Douala",
        "addressCountry": "CM",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <Breadcrumbs items={[{ label: "À Propos", href: "/a-propos" }]} />

        <header className="space-y-4 border-b border-slate-200 pb-8">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
            Édition &amp; Transparence E-E-A-T
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            À Propos de Kidenzo Media
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Un portail d&apos;information et de guides techniques indépendant, conçu pour apporter des réponses claires, vérifiées et immédiatement applicables aux citoyens, professionnels et passionnés de technologie.
          </p>
        </header>

        <section className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
            Notre Mission Éditoriale
          </h2>
          <p>
            Fondé avec la conviction que l&apos;information pratique doit être accessible sans jargon et sans zone d&apos;ombre, <strong>Kidenzo Media</strong> structure ses publications autour de 33 pôles d&apos;expertise spécialisés. Qu&apos;il s&apos;agisse de préparer un concours de la fonction publique au Cameroun, de sécuriser son titre foncier, d&apos;optimiser une installation solaire autonome, de dépanner un smartphone ou de choisir du matériel espresso de précision, nos guides privilégient toujours l&apos;exactitude des sources officielles et l&apos;épreuve du terrain.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-blue-600 pl-3 pt-6">
            Nos Piliers de Qualité &amp; Méthodologie (E-E-A-T)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mt-6">
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
              <h3 className="font-bold text-slate-900 text-base mb-2">🎓 Expérience &amp; Expertise</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Chaque article est rédigé ou relu par des praticiens du domaine : juristes spécialistes du foncier CEMAC, ingénieurs systèmes solaires, techniciens télécoms et dégustateurs certifiés.
              </p>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
              <h3 className="font-bold text-slate-900 text-base mb-2">🔍 Neutralité &amp; Indépendance</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Nos avis sur les équipements ne font l&apos;objet d&apos;aucune rémunération cachée. Les produits recommandés sont sélectionnés selon des critères rigoureux de durabilité et de rapport qualité-prix.
              </p>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
              <h3 className="font-bold text-slate-900 text-base mb-2">⏱️ Veille &amp; Fraîcheur 2026</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Nos barèmes (impôts, tarifs douaniers, arrêtés MINFOPRA, promotions hébergement) font l&apos;objet de vérifications permanentes avec mise à jour horodatée des contenus.
              </p>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
              <h3 className="font-bold text-slate-900 text-base mb-2">🤝 Accessibilité &amp; Proximité</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Pour toutes les formalités locales au Cameroun, un guichet d&apos;orientation direct par messagerie WhatsApp (+237 693 845 941) permet d&apos;accompagner nos lecteurs pas à pas.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-blue-600 pl-3 pt-6">
            Présence Physique &amp; Rédaction
          </h2>
          <p>
            La rédaction centrale de Kidenzo Media est établie à <strong>Douala</strong> (Région du Littoral) avec un bureau de liaison administrative à <strong>Yaoundé</strong> (Région du Centre, Cameroun), complétée par des contributeurs spécialisés en Europe pour les sections matériel, hébergement cloud et démarches consulaires.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
            >
              Contacter l&apos;équipe éditoriale &rarr;
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
