export const revalidate = false;
export const dynamic = "force-static";

import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Mentions LÃ©gales & Informations Ã‰diteur | Kidenzo Media",
  description:
    "Mentions lÃ©gales de Kidenzo Media : identification de l'Ã©diteur, directeur de publication, hÃ©bergement cloud Vercel et propriÃ©tÃ© intellectuelle.",
  alternates: {
    canonical: "https://www.kidenzo.store/mentions-legales",
  },
};

export default function MentionsLegalesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ label: "Mentions LÃ©gales", href: "/mentions-legales" }]} />

      <header className="space-y-4 border-b border-slate-200 pb-8">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Mentions LÃ©gales
        </h1>
        <p className="text-slate-600">
          DerniÃ¨re mise Ã  jour : 27 octobre 2026. Informations rÃ©glementaires rÃ©gissant l&apos;accÃ¨s et l&apos;utilisation du portail Kidenzo.store.
        </p>
      </header>

      <section className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
        <h2 className="text-xl font-bold text-slate-900">1. Ã‰diteur de la Plateforme</h2>
        <p>
          Le site internet <strong>kidenzo.store</strong> est Ã©ditÃ© par la sociÃ©tÃ© <strong>Kidenzo Media</strong>, publication indÃ©pendante de presse numÃ©rique et de guides pratiques :
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>DÃ©nomination :</strong> Kidenzo Media &amp; Consulting</li>
          <li><strong>SiÃ¨ge Ã©ditorial :</strong> Douala (Littoral) &amp; YaoundÃ© (Centre), RÃ©publique du Cameroun</li>
          <li><strong>Directeur de la Publication :</strong> Fabrice William</li>
          <li><strong>Contact rÃ©daction :</strong> contact@kidenzo.store / direction@kidenzo.store</li>
          <li><strong>Ligne d&apos;assistance directe :</strong> +237 693 845 941 (WhatsApp Business Desk)</li>
        </ul>

        <h2 className="text-xl font-bold text-slate-900 pt-4">2. HÃ©bergement Technique de l&apos;Infrastructure</h2>
        <p>
          L&apos;application web et les bases de donnÃ©es statiques du portail sont hÃ©bergÃ©es sur l&apos;infrastructure de cloud computing haute performance de :
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>HÃ©bergeur :</strong> Vercel Inc.</li>
          <li><strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, Ã‰tats-Unis</li>
          <li><strong>Site officiel :</strong> https://vercel.com</li>
          <li><strong>RÃ©seau CDN mondial :</strong> Cloudflare &amp; Vercel Edge Network</li>
        </ul>

        <h2 className="text-xl font-bold text-slate-900 pt-4">3. PropriÃ©tÃ© Intellectuelle &amp; Droits d&apos;Auteur</h2>
        <p>
          L&apos;ensemble des Ã©lÃ©ments constituant le portail Kidenzo Media (textes originaux, analyses comparatives, infographies, structures de bases de donnÃ©es, logotypes et composants interactifs) sont protÃ©gÃ©s par les conventions internationales sur le droit d&apos;auteur et la propriÃ©tÃ© intellectuelle. Toute reproduction, diffusion, extraction ou rÃ©utilisation totale ou partielle des contenus sans accord prÃ©alable Ã©crit de l&apos;Ã©diteur est formellement interdite.
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">4. ResponsabilitÃ© &amp; Avertissement</h2>
        <p>
          Les informations, barÃ¨mes et dÃ©marches administratives diffusÃ©s sur ce site sont collectÃ©s auprÃ¨s de sources officielles publiques et d&apos;observations de terrain. Kidenzo Media met tout en Å“uvre pour assurer l&apos;exactitude des renseignements au moment de leur mise en ligne. Toutefois, les rÃ©glementations gouvernementales, calendriers de concours et tarifs pouvant Ã©voluer rapidement, l&apos;utilisateur est invitÃ© Ã  vÃ©rifier la concordance auprÃ¨s des administrations de rÃ©fÃ©rence. Les avis de tests d&apos;Ã©quipements reflÃ¨tent l&apos;apprÃ©ciation indÃ©pendante de notre Ã©quipe de testeurs.
        </p>
      </section>
    </div>
  );
}

