import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Contact & Desk Rédactionnel | Kidenzo Media",
  description:
    "Prenez contact avec la rédaction de Kidenzo Media : assistance démarches, devis solaire et B2B au Cameroun, partenariats presse et signalements d'erreurs.",
  alternates: {
    canonical: "https://www.kidenzo.store/contact",
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Kidenzo Media",
    "url": "https://www.kidenzo.store/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "Kidenzo Media",
      "telephone": "+237693845941",
      "email": "contact@kidenzo.store",
      "address": [
        {
          "@type": "PostalAddress",
          "streetAddress": "Akwa, Boulevard de la Liberté",
          "addressLocality": "Douala",
          "addressCountry": "CM",
        },
        {
          "@type": "PostalAddress",
          "streetAddress": "Bastos, Avenue Charles de Gaulle",
          "addressLocality": "Yaoundé",
          "addressCountry": "CM",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />

        <header className="space-y-4 border-b border-slate-200 pb-8">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">
            Écoute &amp; Assistance Réactive
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Contacter la Rédaction
          </h1>
          <p className="text-lg text-slate-600">
            Une question sur un concours, un devis d&apos;énergie solaire, une demande d&apos;orientation administrative ou une suggestion d&apos;article ? Notre équipe vous répond sous 24 heures.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Direct WhatsApp Channel */}
          <div className="p-6 bg-gradient-to-br from-emerald-500 to-teal-700 text-white rounded-2xl shadow-lg space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                💬
              </div>
              <h2 className="text-2xl font-black">Desk WhatsApp Direct</h2>
              <p className="text-sm text-emerald-50 leading-relaxed">
                Le moyen le plus rapide pour joindre un consultant local (Douala &amp; Yaoundé) pour vos questions de démarches administratives, devis kits solaires, formalités foncières ou transit douanier.
              </p>
              <div className="pt-2 font-mono text-lg font-bold">
                +237 693 845 941
              </div>
              <p className="text-xs text-emerald-100">
                Ouvert du lundi au samedi de 08h00 à 19h00 (Heure de Douala / GMT+1).
              </p>
            </div>
            <a
              href="https://wa.me/237693845941"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full py-3.5 px-6 rounded-xl bg-white text-emerald-800 font-extrabold hover:bg-emerald-50 transition shadow-md"
            >
              Ouvrir la discussion WhatsApp &rarr;
            </a>
          </div>

          {/* Email & Editorial Desk */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-6">
            <div>
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-3">
                ✉️
              </div>
              <h2 className="text-xl font-bold text-slate-900">Courrier Électronique</h2>
              <p className="text-sm text-slate-500 mt-1">
                Pour toute communication officielle, proposition de partenariat média ou signalement d&apos;erreur.
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="font-semibold text-slate-900">Rédaction &amp; Informations :</p>
                <a href="mailto:contact@kidenzo.store" className="text-blue-600 font-medium hover:underline">
                  contact@kidenzo.store
                </a>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="font-semibold text-slate-900">Direction de la Publication :</p>
                <a href="mailto:direction@kidenzo.store" className="text-blue-600 font-medium hover:underline">
                  direction@kidenzo.store
                </a>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="font-semibold text-slate-900">Protection des Données (DPO) :</p>
                <a href="mailto:dpo@kidenzo.store" className="text-blue-600 font-medium hover:underline">
                  dpo@kidenzo.store
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Physical Locations */}
        <section className="pt-8 border-t border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4">📍 Bureaux de Correspondance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-slate-600">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
              <h3 className="font-bold text-slate-900 mb-1">Bureau Douala (Littoral)</h3>
              <p>Boulevard de la Liberté, Akwa</p>
              <p>BP 1248 Douala, République du Cameroun</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
              <h3 className="font-bold text-slate-900 mb-1">Bureau Yaoundé (Centre)</h3>
              <p>Avenue Charles de Gaulle, Quartier Bastos</p>
              <p>Yaoundé, République du Cameroun</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
