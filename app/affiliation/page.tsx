export const revalidate = false;
export const dynamic = "force-static";

import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "DÃ©claration d'Affiliation & Transparence Partenaires | Kidenzo Media",
  description:
    "Transparence totale sur le modÃ¨le Ã©conomique de Kidenzo Media : programme Partenaires Amazon, rÃ©ductions Hostinger, rÃ©servations hÃ´teliÃ¨res et indÃ©pendance Ã©ditoriale.",
  alternates: {
    canonical: "https://www.kidenzo.store/affiliation",
  },
};

export default function AffiliationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ label: "Transparence d'Affiliation", href: "/affiliation" }]} />

      <header className="space-y-4 border-b border-slate-200 pb-8">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          DÃ©claration d&apos;Affiliation &amp; DÃ©ontologie
        </h1>
        <p className="text-slate-600">
          En application des directives de la Federal Trade Commission (FTC) et des bonnes pratiques de transparence de l&apos;Union EuropÃ©enne, Kidenzo Media expose clairement son modÃ¨le de rÃ©munÃ©ration.
        </p>
      </header>

      <section className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
        <h2 className="text-xl font-bold text-slate-900">1. Notre ModÃ¨le Ã‰conomique</h2>
        <p>
          L&apos;accÃ¨s Ã  l&apos;ensemble de nos 1 400+ articles, comparatifs, guides de dÃ©marches et simulateurs est <strong>100 % gratuit pour tous nos lecteurs</strong>. Afin de financer les coÃ»ts d&apos;infrastructure serveurs, les tests d&apos;Ã©quipements en laboratoire et la rÃ©munÃ©ration de nos rÃ©dacteurs et consultants, notre portail participe Ã  plusieurs programmes d&apos;affiliation rigoureusement sÃ©lectionnÃ©s.
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">2. Programme Partenaires Amazon (Amazon Associates)</h2>
        <p>
          Kidenzo Media participe au <strong>Programme Partenaires d&apos;Amazon EU et Amazon Services LLC</strong>, un programme d&apos;affiliation d&apos;arbitrage conÃ§u pour permettre Ã  des sites Ã©ditoriaux indÃ©pendants de percevoir une rÃ©munÃ©ration par la crÃ©ation de liens vers Amazon.fr et Amazon.com :
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Identifiant Partenaire Europe (Amazon FR) :</strong> <code>kidenzo202208-21</code></li>
          <li><strong>Identifiant Partenaire International (Amazon US) :</strong> <code>kidenzo202205-20</code></li>
        </ul>
        <p className="bg-amber-50 p-4 border-l-4 border-amber-500 rounded-r-md text-sm text-amber-900 font-medium">
          <em>Â« En tant que Partenaire Amazon, Kidenzo Media rÃ©alise un bÃ©nÃ©fice sur les achats remplissant les conditions requises. Â»</em>
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">3. Partenariats d&apos;HÃ©bergement Web &amp; Services (Hostinger &amp; Stay22)</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Hostinger Cloud &amp; VPS :</strong> Nous recommandons les solutions d&apos;hÃ©bergement web Hostinger via notre lien officiel certifiÃ© (Code promo exclusif <code>XVCFABRICNC4</code> offrant jusqu&apos;Ã  -20 % de remise immÃ©diate). Nous percevons une commission d&apos;apporteur d&apos;affaires sans aucun surcoÃ»t pour le souscripteur.</li>
          <li><strong>RÃ©servations HÃ´teliÃ¨res Stay22 :</strong> Dans nos guides d&apos;expatriation et de demande de visas, les suggestions d&apos;hÃ´tels confirmÃ©s avec annulation gratuite permettent de percevoir une commission d&apos;affiliation lorsqu&apos;un utilisateur finalise sa rÃ©servation.</li>
        </ul>

        <h2 className="text-xl font-bold text-slate-900 pt-4">4. Impact sur le Prix pour l&apos;Acheteur : ZÃ©ro SurcoÃ»t</h2>
        <p>
          L&apos;utilisation de nos liens d&apos;affiliation <strong>ne modifie en aucun cas le prix final payÃ© par l&apos;acheteur</strong>. Au contraire, nos codes partenaires exclusifs (comme sur Hostinger ou les coupons promotionnels Amazon identifiÃ©s) permettent frÃ©quemment d&apos;obtenir des rÃ©ductions immÃ©diates supplÃ©mentaires par rapport au tarif public habituel.
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">5. Notre Engagement d&apos;ObjectivitÃ© Ã‰ditoriale</h2>
        <p>
          La prÃ©sence d&apos;un lien d&apos;affiliation n&apos;influence jamais nos conclusions de test. Si un appareil chauffe de maniÃ¨re anormale, prÃ©sente un taux de panne Ã©levÃ© ou si un service administratif comporte des piÃ¨ges, nous le mentionnons explicitement dans notre encadrÃ© de mise en garde. Notre prioritÃ© absolue reste la fidÃ©litÃ© et la sÃ©curitÃ© de notre lectorat.
        </p>
      </section>
    </div>
  );
}

