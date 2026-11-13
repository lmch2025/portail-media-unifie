export const revalidate = false;
export const dynamic = "force-static";

import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Politique de ConfidentialitÃ© & Protection des DonnÃ©es | Kidenzo Media",
  description:
    "Engagements de Kidenzo Media en matiÃ¨re de confidentialitÃ©, respect du RGPD, gestion des cookies et sÃ©curisation des donnÃ©es personnelles de nos visiteurs.",
  alternates: {
    canonical: "https://www.kidenzo.store/confidentialite",
  },
};

export default function ConfidentialitePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ label: "ConfidentialitÃ© & RGPD", href: "/confidentialite" }]} />

      <header className="space-y-4 border-b border-slate-200 pb-8">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Politique de ConfidentialitÃ© &amp; Cookies
        </h1>
        <p className="text-slate-600">
          Votre vie privÃ©e est essentielle. DÃ©couvrez comment Kidenzo Media traite et protÃ¨ge vos donnÃ©es conformÃ©ment aux normes internationales (RGPD et lÃ©gislation CEMAC).
        </p>
      </header>

      <section className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
        <h2 className="text-xl font-bold text-slate-900">1. Principes Fondamentaux</h2>
        <p>
          Kidenzo Media applique un principe strict de <strong>minimisation des donnÃ©es</strong> : nous ne collectons aucune donnÃ©e nominative superflue. La navigation et la consultation des 1 400+ articles et simulateurs du portail sont 100 % libres et anonymes, sans crÃ©ation de compte obligatoire.
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">2. DonnÃ©es CollectÃ©es lors des Contacts</h2>
        <p>
          Lorsque vous prenez contact avec notre rÃ©daction par email ou via notre messagerie technique WhatsApp (+237 693 845 941), votre numÃ©ro de tÃ©lÃ©phone et l&apos;historique de vos Ã©changes sont utilisÃ©s exclusivement pour vous rÃ©pondre et traiter votre demande d&apos;orientation ou de devis technique. Ces informations ne sont <strong>jamais revendues, cÃ©dÃ©es ni louÃ©es</strong> Ã  des tiers publicitaires.
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">3. Cookies &amp; Mesure d&apos;Audience</h2>
        <p>
          Le portail peut utiliser des traceurs techniques anonymisÃ©s indispensables au bon fonctionnement du site (mÃ©morisation de vos prÃ©fÃ©rences de navigation, sÃ©curitÃ© contre les attaques par dÃ©ni de service) ainsi que des cookies d&apos;analyse statistique (Google Analytics anonymisÃ©) permettant de mesurer le volume de consultations et d&apos;amÃ©liorer nos guides Ã©ditoriaux.
        </p>
        <p>
          Vous pouvez Ã  tout moment configurer votre navigateur web pour bloquer ou supprimer ces cookies sans que cela n&apos;affecte votre accÃ¨s Ã  l&apos;information.
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">4. PublicitÃ© Google AdSense &amp; Cookies Publicitaires</h2>
        <p>
          Pour financer la gratuitÃ© de nos enquÃªtes, simulateurs et guides pratiques, Kidenzo Media utilise le rÃ©seau publicitaire <strong>Google AdSense</strong> (identifiant Ã©diteur officiel : <code>pub-3034343595064419</code>).
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Les fournisseurs tiers, y compris Google, utilisent des cookies (tels que le cookie DoubleClick) pour diffuser des annonces pertinentes en fonction des visites antÃ©rieures des internautes sur ce portail ou sur d&apos;autres pages web.
          </li>
          <li>
            GrÃ¢ce aux cookies publicitaires, Google et ses partenaires adaptent les annonces qui vous sont prÃ©sentÃ©es selon votre navigation.
          </li>
          <li>
            Vous pouvez dÃ©sactiver Ã  tout moment la publicitÃ© personnalisÃ©e en accÃ©dant aux{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline font-semibold hover:text-blue-800"
            >
              ParamÃ¨tres des annonces Google
            </a>{" "}
            ou via la plateforme d&apos;autorÃ©gulation{" "}
            <a
              href="https://www.aboutads.info"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline font-semibold hover:text-blue-800"
            >
              www.aboutads.info
            </a>.
          </li>
        </ul>

        <h2 className="text-xl font-bold text-slate-900 pt-4">5. Liens Partenaires &amp; Cookies d&apos;Affiliation</h2>
        <p>
          Lorsque vous cliquez sur un lien partenaire vÃ©rifiÃ© (Amazon, Hostinger, Stay22), un cookie technique temporaire est dÃ©posÃ© par le marchand partenaire pour authentifier que la visite provient de notre recommandation. Ce cookie ne contient aucune donnÃ©e personnelle sensible et expire automatiquement conformÃ©ment aux politiques de chaque commerÃ§ant (gÃ©nÃ©ralement 24h Ã  30 jours).
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">6. Vos Droits d&apos;AccÃ¨s, de Rectification et d&apos;Effacement</h2>
        <p>
          ConformÃ©ment aux rÃ©glementations sur la protection des donnÃ©es, vous disposez d&apos;un droit d&apos;accÃ¨s, de rectification et d&apos;effacement total de vos donnÃ©es. Pour exercer ce droit, Ã©crivez simplement Ã  : <strong>dpo@kidenzo.store</strong>.
        </p>
      </section>
    </div>
  );
}

