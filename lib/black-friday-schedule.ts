/**
 * unified-portal/lib/black-friday-schedule.ts
 *
 * Moteur Temporel & Catalogue Vérifié de la Campagne Planifiée Black Friday / Cyber Week 2026
 * Conçu pour fonctionner à 100% en export statique (Zéro Fast Origin Transfer Vercel)
 * avec bascule automatique de phase et extinction propre après le Cyber Monday.
 */

export type BlackFridayPhaseId =
  | "early_bf"
  | "black_friday_peak"
  | "bf_weekend"
  | "cyber_monday"
  | "post_campaign";

export type DealSegment = "all" | "hosting" | "home_fr" | "tech_us" | "cameroon";

export interface BlackFridayPhase {
  id: BlackFridayPhaseId;
  isActive: boolean;
  stepIndex: number; // 0..3 for the 4 active phases, 4 when ended
  badgeLabel: string;
  shortTitle: string;
  topBarMessage: string;
  countdownLabel: string;
  targetIso: string;
  accentGradient: string;
  ctaLabel: string;
}

export interface TimelineMilestone {
  id: Exclude<BlackFridayPhaseId, "post_campaign">;
  stepNumber: number;
  title: string;
  dateRangeLabel: string;
  shortDesc: string;
  icon: string;
}

export interface BlackFridayDeal {
  id: string;
  segment: Exclude<DealSegment, "all">;
  icon: string;
  badge: string;
  title: string;
  simpleSubtitle: string;
  normalPrice: string;
  promoPrice: string;
  savingsBadge: string;
  transparencyNote: string;
  couponCode?: string;
  ctaLabel: string;
  affiliateUrl: string;
  isSponsored: boolean;
  guideHref: string;
  guideLabel: string;
  highlights: string[];
}

export interface SavingsPreset {
  id: string;
  icon: string;
  label: string;
  whoIsItFor: string;
  beforePrice: string;
  nowPrice: string;
  savedAmount: string;
  actionLabel: string;
  actionUrl: string;
  couponCode?: string;
}

// Bornes temporelles officielles en heure d'Afrique Centrale / France (UTC+1)
export const BF_CAMPAIGN_START_ISO = "2026-11-20T00:00:00+01:00";
export const BF_PEAK_START_ISO = "2026-11-27T00:00:00+01:00";
export const BF_PEAK_END_ISO = "2026-11-27T23:59:59+01:00";
export const BF_WEEKEND_END_ISO = "2026-11-29T23:59:59+01:00";
export const BF_CYBER_END_ISO = "2026-12-01T23:59:59+01:00";

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    id: "early_bf",
    stepNumber: 1,
    title: "Avant-Première",
    dateRangeLabel: "24 au 26 Nov.",
    shortDesc: "Premières baisses de prix déjà ouvertes sans attendre la foule.",
    icon: "🔥",
  },
  {
    id: "black_friday_peak",
    stepNumber: 2,
    title: "Jour J Black Friday",
    dateRangeLabel: "Vendredi 27 Nov.",
    shortDesc: "Prix au plus bas de toute l'année sur nos sélections testées.",
    icon: "🚨",
  },
  {
    id: "bf_weekend",
    stepNumber: 3,
    title: "Week-End Prolongé",
    dateRangeLabel: "28 & 29 Nov.",
    shortDesc: "Dernières pièces en stock maintenues à tarif réduit.",
    icon: "⚡",
  },
  {
    id: "cyber_monday",
    stepNumber: 4,
    title: "Cyber Monday",
    dateRangeLabel: "30 Nov. & 1er Déc.",
    shortDesc: "Dernière chance sur les serveurs web, PC, SSD et solaire.",
    icon: "💻",
  },
];

export function getBlackFridayPhase(now: Date = new Date()): BlackFridayPhase {
  const ts = now.getTime();
  const peakStart = new Date(BF_PEAK_START_ISO).getTime();
  const peakEnd = new Date(BF_PEAK_END_ISO).getTime();
  const weekendEnd = new Date(BF_WEEKEND_END_ISO).getTime();
  const cyberEnd = new Date(BF_CYBER_END_ISO).getTime();

  if (ts > cyberEnd) {
    return {
      id: "post_campaign",
      isActive: false,
      stepIndex: 4,
      badgeLabel: "✓ Sélection Permanente Vérifiée",
      shortTitle: "Les Meilleurs Tarifs Vérifiés Toute l'Année",
      topBarMessage: "",
      countdownLabel: "Campagne Black Friday 2026 terminée",
      targetIso: BF_CYBER_END_ISO,
      accentGradient: "from-slate-900 via-blue-950 to-slate-900",
      ctaLabel: "Voir les guides comparatifs →",
    };
  }

  if (ts < peakStart) {
    return {
      id: "early_bf",
      isActive: true,
      stepIndex: 0,
      badgeLabel: "🔥 Avant-Première Black Friday 2026",
      shortTitle: "Les Vraies Promos Black Friday Sont Déjà Ouvertes",
      topBarMessage: "🔥 Avant-Première Black Friday : les réductions vérifiées sont déjà actives !",
      countdownLabel: "Jour J Black Friday dans :",
      targetIso: BF_PEAK_START_ISO,
      accentGradient: "from-slate-950 via-indigo-950 to-amber-950",
      ctaLabel: "🎁 Voir les vraies promos →",
    };
  }

  if (ts <= peakEnd) {
    return {
      id: "black_friday_peak",
      isActive: true,
      stepIndex: 1,
      badgeLabel: "🚨 JOUR J • BLACK FRIDAY OFFICIEL",
      shortTitle: "Jour J Black Friday : Les Prix au Plus Bas de 2026",
      topBarMessage: "🚨 JOUR J BLACK FRIDAY : profitez des plus fortes baisses de prix aujourd'hui !",
      countdownLabel: "Fin du Jour J dans :",
      targetIso: BF_PEAK_END_ISO,
      accentGradient: "from-red-950 via-slate-950 to-amber-950",
      ctaLabel: "🔥 Voir les offres du Jour J →",
    };
  }

  if (ts <= weekendEnd) {
    return {
      id: "bf_weekend",
      isActive: true,
      stepIndex: 2,
      badgeLabel: "⚡ Week-End Black Friday Prolongé",
      shortTitle: "Week-End Black Friday : Offres Encore Disponibles",
      topBarMessage: "⚡ Week-End Black Friday : les prix réduits continuent tant qu'il reste du stock !",
      countdownLabel: "Fin du Week-End Promo dans :",
      targetIso: BF_WEEKEND_END_ISO,
      accentGradient: "from-indigo-950 via-slate-950 to-purple-950",
      ctaLabel: "⚡ Voir les offres restantes →",
    };
  }

  return {
    id: "cyber_monday",
    isActive: true,
    stepIndex: 3,
    badgeLabel: "💻 Cyber Monday • Dernières Heures",
    shortTitle: "Cyber Monday 2026 : Dernières Heures Avant Fin des Promos",
    topBarMessage: "💻 Cyber Monday : dernières heures avant le retour aux tarifs normaux !",
    countdownLabel: "Fin définitive des promos dans :",
    targetIso: BF_CYBER_END_ISO,
    accentGradient: "from-blue-950 via-indigo-950 to-slate-950",
    ctaLabel: "⏳ Saisir les dernières offres →",
  };
}

export interface CountdownParts {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export function getCountdownParts(targetIso: string, now: Date = new Date()): CountdownParts {
  const diff = new Date(targetIso).getTime() - now.getTime();
  if (diff <= 0) {
    return { totalMs: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { totalMs: diff, days, hours, minutes, seconds, isExpired: false };
}

export const DEAL_SEGMENTS: Array<{ id: DealSegment; icon: string; label: string }> = [
  { id: "all", icon: "🌟", label: "Toutes les offres" },
  { id: "hosting", icon: "⚡", label: "Sites Web & Serveurs" },
  { id: "cameroon", icon: "☀️", label: "Solaire & Devis Cameroun" },
  { id: "home_fr", icon: "🏠", label: "Maison & Tech (Amazon FR)" },
  { id: "tech_us", icon: "🔋", label: "Gadgets & Café (Amazon US)" },
];

export const BLACK_FRIDAY_DEALS: BlackFridayDeal[] = [
  {
    id: "hostinger-vps-kvm-bf",
    segment: "hosting",
    icon: "🌐",
    badge: "N°1 Serveurs & Sites Web",
    title: "Hostinger Hébergement Web & Serveurs VPS KVM NVMe",
    simpleSubtitle: "Idéal pour créer ton site internet, ta boutique en ligne ou ton serveur d'automatisation rapide.",
    normalPrice: "13,99 $ / mois",
    promoPrice: "Dès 4,99 $ / mois",
    savingsBadge: "Jusqu'à -75% + -20% avec le code",
    transparencyNote: "Nom de domaine offert la 1re année. Garantie satisfait ou remboursé pendant 30 jours.",
    couponCode: "XVCFABRICNC4",
    ctaLabel: "🌐 Activer la promo Hostinger (-20%)",
    affiliateUrl: "https://www.hostinger.com?REFERRALCODE=XVCFABRICNC4",
    isSponsored: true,
    guideHref: "/hebergement-web/hostinger-kvm-vps-speed-benchmarks-discount-code-review-2026",
    guideLabel: "Lire notre test complet des serveurs Hostinger",
    highlights: [
      "Disques rapides NVMe (4250 Mo/s mesurés au labo)",
      "Installation WordPress, WooCommerce ou n8n en 1 clic",
      "Code XVCFABRICNC4 cumulable au moment de payer",
    ],
  },
  {
    id: "solaire-lifepo4-cameroun-bf",
    segment: "cameroon",
    icon: "☀️",
    badge: "Spécial Cameroun • Douala & Yaoundé",
    title: "Pack Solaire Autonome 3kVA & 5kVA Batterie Lithium LiFePO4",
    simpleSubtitle: "Fini les coupures Eneo : garde ton frigo, ton congélateur et tes lampes allumés jour et nuit.",
    normalPrice: "Étude facturée 35 000 FCFA",
    promoPrice: "Bilan Gratuit + Remise Fin d'Année",
    savingsBadge: "Étude offerte + Garantie 5 ans Lithium",
    transparencyNote: "Devis détaillé envoyé sur WhatsApp en moins de 2 heures. Paiement sécurisé à la livraison / pose.",
    ctaLabel: "💬 Demander mon devis gratuit sur WhatsApp",
    affiliateUrl:
      "https://wa.me/237693845941?text=Bonjour%20Kidenzo%20Media,%20je%20souhaite%20profiter%20de%20l'offre%20Black%20Friday%20pour%20un%20devis%20Kit%20Solaire%20Lithium%20au%20Cameroun.",
    isSponsored: false,
    guideHref: "/energie-solaire/kit-solaire-5kva-cameroun-prix-batterie-lifepo4-douala-yaounde",
    guideLabel: "Voir le guide des prix solaires au Cameroun",
    highlights: [
      "Batteries Lithium LiFePO4 (durée de vie 10 ans, 6000 cycles)",
      "Coffret parafoudre inclus contre les orages",
      "Techniciens agréés disponibles à Douala et Yaoundé",
    ],
  },
  {
    id: "amazon-fr-maison-cuisine-bf",
    segment: "home_fr",
    icon: "🍳",
    badge: "Sélection Amazon France",
    title: "Friteuses Sans Huile Ninja, Cookeo Touch & Aspirateurs Robots",
    simpleSubtitle: "Les appareils de cuisine et de maison les plus fiables pour gagner du temps chaque soir.",
    normalPrice: "249 € à 499 €",
    promoPrice: "Ventes Flash Black Friday FR",
    savingsBadge: "Jusqu'à -35% sur Amazon.fr",
    transparencyNote: "Expédié directement par Amazon France avec garantie constructeur 2 ans et retour gratuit.",
    ctaLabel: "🛒 Voir les prix réduits sur Amazon France",
    affiliateUrl: "https://www.amazon.fr/gp/goldbox?tag=kidenzo202208-21",
    isSponsored: true,
    guideHref: "/tests-produits/robot-cuiseur-intelligent-moulinex",
    guideLabel: "Lire notre comparatif cuisine & maison",
    highlights: [
      "Cuisson rapide avec très peu d'huile (-75% de matière grasse)",
      "Livraison rapide et retours prolongés pour les fêtes",
      "Uniquement des grandes marques testées (Ninja, Moulinex, Dreame)",
    ],
  },
  {
    id: "anker-prime-powerbank-us-bf",
    segment: "tech_us",
    icon: "🔋",
    badge: "Top Hardware Amazon US",
    title: "Batterie Externe Anker Prime 27 650 mAh (250W Ultra-Rapide)",
    simpleSubtitle: "Recharge ton ordinateur portable et ton téléphone à pleine vitesse pendant tes déplacements.",
    normalPrice: "179,99 $",
    promoPrice: "Offre Black Friday Amazon US",
    savingsBadge: "Prix Black Friday + Garantie Anker",
    transparencyNote: "Format 99,54 Wh autorisé en cabine d'avion (norme internationale FAA).",
    ctaLabel: "🔋 Voir l'offre officielle sur Amazon US",
    affiliateUrl: "https://www.amazon.com/dp/B0BYP2F3SG?tag=kidenzo202205-20",
    isSponsored: true,
    guideHref: "/gadgets-amazon/anker-prime-27650mah-power-bank-review-250w-fast-charging",
    guideLabel: "Lire notre test labo Anker Prime 250W",
    highlights: [
      "Recharge un MacBook Pro à 50% en seulement 28 minutes",
      "Écran couleur indiquant la durée restante à la minute près",
      "3 ports actifs en même temps sans surchauffe",
    ],
  },
  {
    id: "espresso-barista-us-bf",
    segment: "tech_us",
    icon: "☕",
    badge: "Sélection Café & Espresso",
    title: "Machines Espresso Breville & Moulins Eureka Mignon",
    simpleSubtitle: "Prépare un vrai café crémeux de coffee-shop à la maison en 3 secondes de chauffe.",
    normalPrice: "499 $ à 999 $",
    promoPrice: "Remises Saisonnières Amazon US",
    savingsBadge: "Jusqu'à -25% sur l'équipement Barista",
    transparencyNote: "Livraison Prime gratuite aux USA et garantie officielle constructeur incluse.",
    ctaLabel: "☕ Voir les machines en promo sur Amazon",
    affiliateUrl: "https://www.amazon.com/s?k=Breville+Espresso+Machine+Black+Friday&tag=kidenzo202205-20",
    isSponsored: true,
    guideHref: "/espresso-cafe/breville-barista-touch-impress-vs",
    guideLabel: "Consulter nos tests de machines espresso",
    highlights: [
      "Pression stable 9 bars pour un espresso doux sans amertume",
      "Mousse de lait automatique prête en 45 secondes",
      "Sélection validée par nos spécialistes barista",
    ],
  },
  {
    id: "ssd-pc-depannage-cameroun-bf",
    segment: "cameroon",
    icon: "🖥️",
    badge: "Informatique & Voyages",
    title: "Remise à Neuf PC (Disque Rapide SSD) & Hôtels Visa Annulables",
    simpleSubtitle: "Rends ton ordinateur 10 fois plus rapide à Douala ou réserve ton hôtel pour un dossier de visa.",
    normalPrice: "Tarif standard atelier",
    promoPrice: "Diagnostic PC Offert sur Rendez-vous",
    savingsBadge: "Gain de vitesse x10 garanti",
    transparencyNote: "Intervention rapide sans perte de tes photos ni de tes documents personnels.",
    ctaLabel: "💬 Parler à un technicien sur WhatsApp",
    affiliateUrl:
      "https://wa.me/237693845941?text=Bonjour%20Kidenzo%20Media,%20je%20souhaite%20un%20renseignement%20promo%20Black%20Friday%20(PC%20SSD%20ou%20Assistance%20Dossier).",
    isSponsored: false,
    guideHref: "/informatique-depannage",
    guideLabel: "Voir nos guides dépannage informatique",
    highlights: [
      "Démarrage de Windows en moins de 12 secondes",
      "Clonage complet de tes fichiers inclus",
      "Réponse directe sur WhatsApp au +237 693 845 941",
    ],
  },
];

export const SAVINGS_PRESETS: SavingsPreset[] = [
  {
    id: "preset-site-web",
    icon: "🌐",
    label: "Créer mon site ou serveur VPS (2 ans)",
    whoIsItFor: "Entrepreneurs, développeurs, e-commerçants et agences",
    beforePrice: "335 $",
    nowPrice: "115 $ environ",
    savedAmount: "220 $ économisés",
    actionLabel: "Activer Hostinger (-20% code XVCFABRICNC4)",
    actionUrl: "https://www.hostinger.com?REFERRALCODE=XVCFABRICNC4",
    couponCode: "XVCFABRICNC4",
  },
  {
    id: "preset-maison-fr",
    icon: "🍳",
    label: "Équiper ma cuisine (Air Fryer / Robot)",
    whoIsItFor: "Familles cherchant à cuisiner vite et sainement",
    beforePrice: "349 €",
    nowPrice: "229 € environ",
    savedAmount: "120 € économisés",
    actionLabel: "Voir les Ventes Flash Amazon France",
    actionUrl: "https://www.amazon.fr/gp/goldbox?tag=kidenzo202208-21",
  },
  {
    id: "preset-solaire-cm",
    icon: "☀️",
    label: "Installer un Kit Solaire Maison au Cameroun",
    whoIsItFor: "Ménages et bureaux à Douala, Yaoundé, Bafoussam et Kribi",
    beforePrice: "Carburant groupe : ~720 000 FCFA / an",
    nowPrice: "Bilan solaire gratuit + 0 FCFA d'essence",
    savedAmount: "Jusqu'à 720 000 FCFA / an épargnés",
    actionLabel: "Recevoir mon étude gratuite sur WhatsApp",
    actionUrl:
      "https://wa.me/237693845941?text=Bonjour,%20je%20veux%20calculer%20mon%20economie%20solaire%20Black%20Friday%20au%20Cameroun.",
  },
  {
    id: "preset-tech-us",
    icon: "🔋",
    label: "Acheter une batterie PC ou machine café (US)",
    whoIsItFor: "Télétravailleurs, voyageurs et amateurs de bon café",
    beforePrice: "649 $",
    nowPrice: "489 $ environ",
    savedAmount: "160 $ économisés",
    actionLabel: "Voir la sélection officielle Amazon US",
    actionUrl: "https://www.amazon.com/gp/goldbox?tag=kidenzo202205-20",
  },
];
