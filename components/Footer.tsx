import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-emerald-400 flex items-center justify-center text-white font-black text-xl">
                P
              </span>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Portail<span className="text-blue-400">Unifié</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Portail média indépendant de référence. Guides officiels de concours, démarches administratives, analyses économiques CEMAC, comparatifs technologiques et tutoriels certifiés.
            </p>
            <div className="pt-2 text-xs text-slate-500">
              <p>📍 Siège éditorial : Douala & Yaoundé, Cameroun</p>
              <p>📞 Assistance Directe WhatsApp : +237 693 845 941</p>
            </div>
          </div>

          {/* Hub Cameroun */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              🇨🇲 Cameroun & Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/concours" className="hover:text-blue-400 transition">Concours Administratifs</Link></li>
              <li><Link href="/tarifs-demarches" className="hover:text-blue-400 transition">Tarifs Eneo & Camwater</Link></li>
              <li><Link href="/emploi" className="hover:text-blue-400 transition">Offres d'Emploi & BTP</Link></li>
              <li><Link href="/energie-solaire" className="hover:text-blue-400 transition">Énergie Solaire & Kits</Link></li>
              <li><Link href="/foncier-terrains" className="hover:text-blue-400 transition">Titre Foncier & Terrains</Link></li>
              <li><Link href="/douane-ports" className="hover:text-blue-400 transition">Transit Port de Douala</Link></li>
            </ul>
          </div>

          {/* Hub Tech & IA */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              ⚡ Tech, IA & Outils
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/actualite-ia" className="hover:text-blue-400 transition">Actualités IA & Modèles</Link></li>
              <li><Link href="/tutoriels-ia" className="hover:text-blue-400 transition">Tutoriels & Automatisation</Link></li>
              <li><Link href="/statut-logiciels" className="hover:text-blue-400 transition">Pannes Logiciels & SaaS</Link></li>
              <li><Link href="/cybersecurite-web" className="hover:text-blue-400 transition">Cybersécurité Web</Link></li>
              <li><Link href="/hebergement-web" className="hover:text-blue-400 transition">Smart Hostinger (-20%)</Link></li>
              <li><Link href="/gadgets-amazon" className="hover:text-blue-400 transition">Gadgets Tech Amazon</Link></li>
            </ul>
          </div>

          {/* Hub Guides Pratiques */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              🧭 Guides & Vie
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/visas" className="hover:text-blue-400 transition">Visas Schengen & Canada</Link></li>
              <li><Link href="/espresso-cafe" className="hover:text-blue-400 transition">Machines Espresso Guide</Link></li>
              <li><Link href="/sante-preventive" className="hover:text-blue-400 transition">Santé Préventive</Link></li>
              <li><Link href="/vie-de-couple" className="hover:text-blue-400 transition">Vie de Couple</Link></li>
              <li><Link href="/savoir-insolite" className="hover:text-blue-400 transition">Savoirs Insolites</Link></li>
              <li><Link href="/alertes-arnaques" className="hover:text-blue-400 transition">Anti-Arnaques Web</Link></li>
            </ul>
          </div>
        </div>

        {/* Directory All 33 Categories */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Toutes les rubriques du portail (33 Thématiques Silotées) :
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              >
                {c.icon} {c.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} Kidenzo Media. Tous droits réservés.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/a-propos" className="hover:text-blue-400 transition">
              À Propos &amp; Équipe
            </Link>
            <Link href="/mentions-legales" className="hover:text-blue-400 transition">
              Mentions Légales
            </Link>
            <Link href="/confidentialite" className="hover:text-blue-400 transition">
              Confidentialité &amp; RGPD
            </Link>
            <Link href="/affiliation" className="hover:text-blue-400 transition">
              Déclaration d&apos;Affiliation
            </Link>
            <Link href="/contact" className="hover:text-blue-400 transition text-emerald-400 font-semibold">
              Contact &amp; Assistance WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
