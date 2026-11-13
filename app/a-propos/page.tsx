export const revalidate = false;
export const dynamic = "force-static";

import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Ã€ Propos de Kidenzo Media | Charte Ã‰ditoriale & Ã‰quipe d'Experts",
  description:
    "DÃ©couvrez l'Ã©quipe Ã©ditoriale indÃ©pendante de Kidenzo Media : journalistes d'investigation, juristes, ingÃ©nieurs tÃ©lÃ©coms et testeurs hardware basÃ©s Ã  Douala, YaoundÃ© et en Europe.",
  alternates: {
    canonical: "https://www.kidenzo.store/a-propos",
  },
  openGraph: {
    title: "Ã€ Propos de Kidenzo Media | Charte Ã‰ditoriale & Ã‰quipe d'Experts",
    description:
      "Portail mÃ©dia indÃ©pendant de rÃ©fÃ©rence : guides administratifs officiels, comparatifs d'Ã©quipements technologiques et analyses Ã©conomiques vÃ©rifiÃ©es.",
    url: "https://www.kidenzo.store/a-propos",
    type: "website",
  },
};

export default function AProposPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Ã€ Propos de Kidenzo Media",
    "description": "Portail mÃ©dia indÃ©pendant de rÃ©fÃ©rence couvrant 33 thÃ©matiques silotÃ©es.",
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
        <Breadcrumbs items={[{ label: "Ã€ Propos", href: "/a-propos" }]} />

        <header className="space-y-4 border-b border-slate-200 pb-8">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
            Ã‰dition &amp; Transparence E-E-A-T
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Ã€ Propos de Kidenzo Media
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Un portail d&apos;information et de guides techniques indÃ©pendant, conÃ§u pour apporter des rÃ©ponses claires, vÃ©rifiÃ©es et immÃ©diatement applicables aux citoyens, professionnels et passionnÃ©s de technologie.
          </p>
        </header>

        <section className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
            Notre Mission Ã‰ditoriale
          </h2>
          <p>
            FondÃ© avec la conviction que l&apos;information pratique doit Ãªtre accessible sans jargon et sans zone d&apos;ombre, <strong>Kidenzo Media</strong> structure ses publications autour de 33 pÃ´les d&apos;expertise spÃ©cialisÃ©s. Qu&apos;il s&apos;agisse de prÃ©parer un concours de la fonction publique au Cameroun, de sÃ©curiser son titre foncier, d&apos;optimiser une installation solaire autonome, de dÃ©panner un smartphone ou de choisir du matÃ©riel espresso de prÃ©cision, nos guides privilÃ©gient toujours l&apos;exactitude des sources officielles et l&apos;Ã©preuve du terrain.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-blue-600 pl-3 pt-6">
            Nos Piliers de QualitÃ© &amp; MÃ©thodologie (E-E-A-T)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mt-6">
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
              <h3 className="font-bold text-slate-900 text-base mb-2">ðŸŽ“ ExpÃ©rience &amp; Expertise</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Chaque article est rÃ©digÃ© ou relu par des praticiens du domaine : juristes spÃ©cialistes du foncier CEMAC, ingÃ©nieurs systÃ¨mes solaires, techniciens tÃ©lÃ©coms et dÃ©gustateurs certifiÃ©s.
              </p>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
              <h3 className="font-bold text-slate-900 text-base mb-2">ðŸ” NeutralitÃ© &amp; IndÃ©pendance</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Nos avis sur les Ã©quipements ne font l&apos;objet d&apos;aucune rÃ©munÃ©ration cachÃ©e. Les produits recommandÃ©s sont sÃ©lectionnÃ©s selon des critÃ¨res rigoureux de durabilitÃ© et de rapport qualitÃ©-prix.
              </p>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
              <h3 className="font-bold text-slate-900 text-base mb-2">â±ï¸ Veille &amp; FraÃ®cheur 2026</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Nos barÃ¨mes (impÃ´ts, tarifs douaniers, arrÃªtÃ©s MINFOPRA, promotions hÃ©bergement) font l&apos;objet de vÃ©rifications permanentes avec mise Ã  jour horodatÃ©e des contenus.
              </p>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
              <h3 className="font-bold text-slate-900 text-base mb-2">ðŸ¤ AccessibilitÃ© &amp; ProximitÃ©</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Pour toutes les formalitÃ©s locales au Cameroun, un guichet d&apos;orientation direct par messagerie WhatsApp (+237 693 845 941) permet d&apos;accompagner nos lecteurs pas Ã  pas.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-blue-600 pl-3 pt-6">
            PrÃ©sence Physique &amp; RÃ©daction
          </h2>
          <p>
            La rÃ©daction centrale de Kidenzo Media est Ã©tablie Ã  <strong>Douala</strong> (RÃ©gion du Littoral) avec un bureau de liaison administrative Ã  <strong>YaoundÃ©</strong> (RÃ©gion du Centre, Cameroun), complÃ©tÃ©e par des contributeurs spÃ©cialisÃ©s en Europe pour les sections matÃ©riel, hÃ©bergement cloud et dÃ©marches consulaires.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
            >
              Contacter l&apos;Ã©quipe Ã©ditoriale &rarr;
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

