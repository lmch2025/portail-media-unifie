import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Politique de Confidentialité & Protection des Données | Kidenzo Media",
  description:
    "Engagements de Kidenzo Media en matière de confidentialité, respect du RGPD, gestion des cookies et sécurisation des données personnelles de nos visiteurs.",
  alternates: {
    canonical: "https://www.kidenzo.store/confidentialite",
  },
};

export default function ConfidentialitePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ label: "Confidentialité & RGPD", href: "/confidentialite" }]} />

      <header className="space-y-4 border-b border-slate-200 pb-8">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Politique de Confidentialité &amp; Cookies
        </h1>
        <p className="text-slate-600">
          Votre vie privée est essentielle. Découvrez comment Kidenzo Media traite et protège vos données conformément aux normes internationales (RGPD et législation CEMAC).
        </p>
      </header>

      <section className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
        <h2 className="text-xl font-bold text-slate-900">1. Principes Fondamentaux</h2>
        <p>
          Kidenzo Media applique un principe strict de <strong>minimisation des données</strong> : nous ne collectons aucune donnée nominative superflue. La navigation et la consultation des 1 400+ articles et simulateurs du portail sont 100 % libres et anonymes, sans création de compte obligatoire.
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">2. Données Collectées lors des Contacts</h2>
        <p>
          Lorsque vous prenez contact avec notre rédaction par email ou via notre messagerie technique WhatsApp (+237 693 845 941), votre numéro de téléphone et l&apos;historique de vos échanges sont utilisés exclusivement pour vous répondre et traiter votre demande d&apos;orientation ou de devis technique. Ces informations ne sont <strong>jamais revendues, cédées ni louées</strong> à des tiers publicitaires.
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">3. Cookies &amp; Mesure d&apos;Audience</h2>
        <p>
          Le portail peut utiliser des traceurs techniques anonymisés indispensables au bon fonctionnement du site (mémorisation de vos préférences de navigation, sécurité contre les attaques par déni de service) ainsi que des cookies d&apos;analyse statistique (Google Analytics anonymisé) permettant de mesurer le volume de consultations et d&apos;améliorer nos guides éditoriaux.
        </p>
        <p>
          Vous pouvez à tout moment configurer votre navigateur web pour bloquer ou supprimer ces cookies sans que cela n&apos;affecte votre accès à l&apos;information.
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">4. Liens Partenaires &amp; Cookies Tiers</h2>
        <p>
          Lorsque vous cliquez sur un lien partenaire vérifié (Amazon, Hostinger, Stay22), un cookie technique temporaire est déposé par le marchand partenaire pour authentifier que la visite provient de notre recommandation. Ce cookie ne contient aucune donnée personnelle sensible et expire automatiquement conformément aux politiques de chaque commerçant (généralement 24h à 30 jours).
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">5. Vos Droits d&apos;Accès, de Rectification et d&apos;Effacement</h2>
        <p>
          Conformément aux réglementations sur la protection des données, vous disposez d&apos;un droit d&apos;accès, de rectification et d&apos;effacement total de vos données. Pour exercer ce droit, écrivez simplement à : <strong>dpo@kidenzo.store</strong>.
        </p>
      </section>
    </div>
  );
}
