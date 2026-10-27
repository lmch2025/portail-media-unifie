import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Mentions Légales & Informations Éditeur | Kidenzo Media",
  description:
    "Mentions légales de Kidenzo Media : identification de l'éditeur, directeur de publication, hébergement cloud Vercel et propriété intellectuelle.",
  alternates: {
    canonical: "https://www.kidenzo.store/mentions-legales",
  },
};

export default function MentionsLegalesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ label: "Mentions Légales", href: "/mentions-legales" }]} />

      <header className="space-y-4 border-b border-slate-200 pb-8">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Mentions Légales
        </h1>
        <p className="text-slate-600">
          Dernière mise à jour : 27 octobre 2026. Informations réglementaires régissant l&apos;accès et l&apos;utilisation du portail Kidenzo.store.
        </p>
      </header>

      <section className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
        <h2 className="text-xl font-bold text-slate-900">1. Éditeur de la Plateforme</h2>
        <p>
          Le site internet <strong>kidenzo.store</strong> est édité par la société <strong>Kidenzo Media</strong>, publication indépendante de presse numérique et de guides pratiques :
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Dénomination :</strong> Kidenzo Media &amp; Consulting</li>
          <li><strong>Siège éditorial :</strong> Douala (Littoral) &amp; Yaoundé (Centre), République du Cameroun</li>
          <li><strong>Directeur de la Publication :</strong> Fabrice William</li>
          <li><strong>Contact rédaction :</strong> contact@kidenzo.store / direction@kidenzo.store</li>
          <li><strong>Ligne d&apos;assistance directe :</strong> +237 693 845 941 (WhatsApp Business Desk)</li>
        </ul>

        <h2 className="text-xl font-bold text-slate-900 pt-4">2. Hébergement Technique de l&apos;Infrastructure</h2>
        <p>
          L&apos;application web et les bases de données statiques du portail sont hébergées sur l&apos;infrastructure de cloud computing haute performance de :
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Hébergeur :</strong> Vercel Inc.</li>
          <li><strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
          <li><strong>Site officiel :</strong> https://vercel.com</li>
          <li><strong>Réseau CDN mondial :</strong> Cloudflare &amp; Vercel Edge Network</li>
        </ul>

        <h2 className="text-xl font-bold text-slate-900 pt-4">3. Propriété Intellectuelle &amp; Droits d&apos;Auteur</h2>
        <p>
          L&apos;ensemble des éléments constituant le portail Kidenzo Media (textes originaux, analyses comparatives, infographies, structures de bases de données, logotypes et composants interactifs) sont protégés par les conventions internationales sur le droit d&apos;auteur et la propriété intellectuelle. Toute reproduction, diffusion, extraction ou réutilisation totale ou partielle des contenus sans accord préalable écrit de l&apos;éditeur est formellement interdite.
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">4. Responsabilité &amp; Avertissement</h2>
        <p>
          Les informations, barèmes et démarches administratives diffusés sur ce site sont collectés auprès de sources officielles publiques et d&apos;observations de terrain. Kidenzo Media met tout en œuvre pour assurer l&apos;exactitude des renseignements au moment de leur mise en ligne. Toutefois, les réglementations gouvernementales, calendriers de concours et tarifs pouvant évoluer rapidement, l&apos;utilisateur est invité à vérifier la concordance auprès des administrations de référence. Les avis de tests d&apos;équipements reflètent l&apos;appréciation indépendante de notre équipe de testeurs.
        </p>
      </section>
    </div>
  );
}
