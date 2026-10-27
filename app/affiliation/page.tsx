import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Déclaration d'Affiliation & Transparence Partenaires | Kidenzo Media",
  description:
    "Transparence totale sur le modèle économique de Kidenzo Media : programme Partenaires Amazon, réductions Hostinger, réservations hôtelières et indépendance éditoriale.",
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
          Déclaration d&apos;Affiliation &amp; Déontologie
        </h1>
        <p className="text-slate-600">
          En application des directives de la Federal Trade Commission (FTC) et des bonnes pratiques de transparence de l&apos;Union Européenne, Kidenzo Media expose clairement son modèle de rémunération.
        </p>
      </header>

      <section className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
        <h2 className="text-xl font-bold text-slate-900">1. Notre Modèle Économique</h2>
        <p>
          L&apos;accès à l&apos;ensemble de nos 1 400+ articles, comparatifs, guides de démarches et simulateurs est <strong>100 % gratuit pour tous nos lecteurs</strong>. Afin de financer les coûts d&apos;infrastructure serveurs, les tests d&apos;équipements en laboratoire et la rémunération de nos rédacteurs et consultants, notre portail participe à plusieurs programmes d&apos;affiliation rigoureusement sélectionnés.
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">2. Programme Partenaires Amazon (Amazon Associates)</h2>
        <p>
          Kidenzo Media participe au <strong>Programme Partenaires d&apos;Amazon EU et Amazon Services LLC</strong>, un programme d&apos;affiliation d&apos;arbitrage conçu pour permettre à des sites éditoriaux indépendants de percevoir une rémunération par la création de liens vers Amazon.fr et Amazon.com :
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Identifiant Partenaire Europe (Amazon FR) :</strong> <code>kidenzo202208-21</code></li>
          <li><strong>Identifiant Partenaire International (Amazon US) :</strong> <code>kidenzo202205-20</code></li>
        </ul>
        <p className="bg-amber-50 p-4 border-l-4 border-amber-500 rounded-r-md text-sm text-amber-900 font-medium">
          <em>« En tant que Partenaire Amazon, Kidenzo Media réalise un bénéfice sur les achats remplissant les conditions requises. »</em>
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">3. Partenariats d&apos;Hébergement Web &amp; Services (Hostinger &amp; Stay22)</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Hostinger Cloud &amp; VPS :</strong> Nous recommandons les solutions d&apos;hébergement web Hostinger via notre lien officiel certifié (Code promo exclusif <code>XVCFABRICNC4</code> offrant jusqu&apos;à -20 % de remise immédiate). Nous percevons une commission d&apos;apporteur d&apos;affaires sans aucun surcoût pour le souscripteur.</li>
          <li><strong>Réservations Hôtelières Stay22 :</strong> Dans nos guides d&apos;expatriation et de demande de visas, les suggestions d&apos;hôtels confirmés avec annulation gratuite permettent de percevoir une commission d&apos;affiliation lorsqu&apos;un utilisateur finalise sa réservation.</li>
        </ul>

        <h2 className="text-xl font-bold text-slate-900 pt-4">4. Impact sur le Prix pour l&apos;Acheteur : Zéro Surcoût</h2>
        <p>
          L&apos;utilisation de nos liens d&apos;affiliation <strong>ne modifie en aucun cas le prix final payé par l&apos;acheteur</strong>. Au contraire, nos codes partenaires exclusifs (comme sur Hostinger ou les coupons promotionnels Amazon identifiés) permettent fréquemment d&apos;obtenir des réductions immédiates supplémentaires par rapport au tarif public habituel.
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">5. Notre Engagement d&apos;Objectivité Éditoriale</h2>
        <p>
          La présence d&apos;un lien d&apos;affiliation n&apos;influence jamais nos conclusions de test. Si un appareil chauffe de manière anormale, présente un taux de panne élevé ou si un service administratif comporte des pièges, nous le mentionnons explicitement dans notre encadré de mise en garde. Notre priorité absolue reste la fidélité et la sécurité de notre lectorat.
        </p>
      </section>
    </div>
  );
}
