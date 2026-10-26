export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
  blogNum: number;
  featuredTopic: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: "concours",
    name: "Concours Administratifs Cameroun",
    description: "Guides officiels, arrêtés MINFOPRA, MINDEF, DGSN et composition des dossiers de concours.",
    icon: "🎓",
    blogNum: 1,
    featuredTopic: "Concours Douanes, Police, EMIA & ENS",
    color: "from-blue-600 to-indigo-700"
  },
  {
    slug: "tarifs-demarches",
    name: "Tarifs & Démarches Cameroun",
    description: "Prix officiels, devis de raccordement Eneo, Camwater, matériaux de construction et formalités.",
    icon: "📋",
    blogNum: 2,
    featuredTopic: "Branchements Eneo, Prix Fer à Béton, Passeport",
    color: "from-emerald-600 to-teal-700"
  },
  {
    slug: "info-pratique",
    name: "Info Pratique du Jour",
    description: "Démarches administratives, renouvellement CNI, permis de conduire et casier judiciaire.",
    icon: "💡",
    blogNum: 3,
    featuredTopic: "Casier Judiciaire N°3, Perte CNI, Permis",
    color: "from-cyan-600 to-blue-700"
  },
  {
    slug: "emploi",
    name: "Opportunités Emploi & Stages",
    description: "Offres de recrutement vérifiées à Douala et Yaoundé, BTP, finance SYSCOHADA et ONG.",
    icon: "💼",
    blogNum: 4,
    featuredTopic: "Comptables, Ingénieurs Génie Civil, ONG",
    color: "from-amber-600 to-orange-700"
  },
  {
    slug: "visas",
    name: "Visas & Voyages Internationaux",
    description: "Procédures de visa Schengen, France TLScontact, Canada IRCC et formulaires eVisa mondiaux.",
    icon: "✈️",
    blogNum: 5,
    featuredTopic: "Visa Court Séjour France, Canada, Thaïlande",
    color: "from-sky-600 to-blue-800"
  },
  {
    slug: "aides-sociales",
    name: "Aides & Gestion du Quotidien",
    description: "Barèmes Camwater, tranches sociales, RSA, prime d'activité et subventions d'énergie.",
    icon: "🤝",
    blogNum: 6,
    featuredTopic: "Tarifs Camwater, ARE, Prime Activité",
    color: "from-teal-600 to-emerald-800"
  },
  {
    slug: "actualite-ia",
    name: "Actualités Intelligence Artificielle",
    description: "Dernières évolutions des modèles de fondation, OpenAI, Claude 3.5, Google Gemini et open source.",
    icon: "🤖",
    blogNum: 7,
    featuredTopic: "Claude 3.5 Sonnet, Perplexity Pro, OpenAI o1",
    color: "from-violet-600 to-purple-800"
  },
  {
    slug: "tutoriels-ia",
    name: "Tutoriels Solutions IA",
    description: "Guides pas-à-pas pour automatiser vos tableurs Excel, créer des agents autonomes et coder avec l'IA.",
    icon: "⚡",
    blogNum: 8,
    featuredTopic: "Automatiser Excel avec l'IA, n8n, Ollama",
    color: "from-purple-600 to-indigo-800"
  },
  {
    slug: "statut-logiciels",
    name: "Statut Logiciels & SaaS",
    description: "Pannes en direct, incidents serveurs Notion, GitHub Actions, Slack et diagnostics immédiats.",
    icon: "💻",
    blogNum: 9,
    featuredTopic: "Panne GitHub Actions, Statut Notion, Slack",
    color: "from-slate-600 to-gray-800"
  },
  {
    slug: "alertes-arnaques",
    name: "Vérification des Arnaques Web",
    description: "Détection des faux recrutements par Mobile Money, fausses convocations de police et arnaques SMS.",
    icon: "🛡️",
    blogNum: 10,
    featuredTopic: "Faux Recrutements MoMo, Faux Mails Police",
    color: "from-rose-600 to-red-800"
  },
  {
    slug: "securite-numerique",
    name: "Sécurité Numérique & Comptes",
    description: "Chiffrement WhatsApp de bout en bout, clés de sécurité U2F YubiKey et protection anti-SIM swapping.",
    icon: "🔐",
    blogNum: 11,
    featuredTopic: "Chiffrement 64 chiffres WhatsApp, Clés YubiKey",
    color: "from-blue-700 to-indigo-900"
  },
  {
    slug: "pannes-reseaux",
    name: "Alertes Pannes Réseaux & Télécoms",
    description: "Incidents fibre optique, coupures 4G Orange et MTN, voyants box clignotants et solutions.",
    icon: "📡",
    blogNum: 12,
    featuredTopic: "Fibre Orange en Panne, Réseau MTN 4G",
    color: "from-orange-600 to-red-700"
  },
  {
    slug: "depannage-smartphone",
    name: "Solutions Pannes Smartphone",
    description: "Diagnostic écran noir qui vibre, nettoyage port USB-C encrassé et récupération tactile.",
    icon: "📱",
    blogNum: 13,
    featuredTopic: "Écran Noir Téléphone, Port USB-C Faux Contact",
    color: "from-sky-700 to-cyan-900"
  },
  {
    slug: "statut-applications",
    name: "Statut des Applis Mobiles",
    description: "Bugs TikTok espace disque saturé, WhatsApp Web déconnexion QR code et crashs d'applications.",
    icon: "📲",
    blogNum: 14,
    featuredTopic: "Cache TikTok Trop Lourd, WhatsApp Web Bloqué",
    color: "from-pink-600 to-rose-700"
  },
  {
    slug: "systeme-mobile",
    name: "Système & Batterie Mobile",
    description: "Résolution décharge rapide nocturne, surchauffe de batterie en charge rapide et étalonnage.",
    icon: "🔋",
    blogNum: 15,
    featuredTopic: "Décharge Batterie Nocturne, Surchauffe Charge",
    color: "from-green-600 to-emerald-800"
  },
  {
    slug: "gadgets-amazon",
    name: "Gadgets & Tech Amazon US",
    description: "Tests indépendants des meilleurs hubs USB-C UGREEN, batteries externes Anker et chargeurs GaN.",
    icon: "🛒",
    blogNum: 16,
    featuredTopic: "UGREEN Revodok Pro 109, Anker 737 GaN 140W",
    color: "from-amber-500 to-orange-700"
  },
  {
    slug: "tests-produits",
    name: "Comparatifs & Quel Produit FR",
    description: "Avis détaillés sur les friteuses sans huile Ninja Foodi, robots aspirateurs Dreame et éclairage Philips Hue.",
    icon: "⭐",
    blogNum: 17,
    featuredTopic: "Ninja Foodi DualZone, Dreame L10s Ultra Gen 2",
    color: "from-blue-600 to-indigo-800"
  },
  {
    slug: "espresso-cafe",
    name: "Le Guide des Machines Espresso",
    description: "Comparatifs machines manuelles et automatiques, Breville Barista Touch, De'Longhi Dedica et moulins Baratza.",
    icon: "☕",
    blogNum: 18,
    featuredTopic: "Breville Barista Touch, De'Longhi Dedica EC685",
    color: "from-amber-700 to-yellow-900"
  },
  {
    slug: "savoir-insolite",
    name: "Savoirs Insolites & Sciences",
    description: "Explications scientifiques captivantes : géotropisme des bananes, sommeil unijambiste des flamants roses, neige blanche.",
    icon: "🧠",
    blogNum: 19,
    featuredTopic: "Pourquoi les Bananes Sont Courbées, Flamants Roses",
    color: "from-purple-600 to-violet-800"
  },
  {
    slug: "hebergement-web",
    name: "Smart Hostinger & Web Hosting",
    description: "Guides VPS KVM NVMe Docker, création boutique WooCommerce et migration WordPress sans coupure (-20% XVCFABRICNC4).",
    icon: "🌐",
    blogNum: 20,
    featuredTopic: "VPS KVM Hostinger, WooCommerce, Coupon -20%",
    color: "from-violet-700 to-indigo-900"
  },
  {
    slug: "voyages-monde",
    name: "Voyages Autour du Monde",
    description: "Itinéraires détaillés, budgets réels, Road Trip Route 66 aux USA et circuit 15 jours au Japon en train JR Pass.",
    icon: "🗺️",
    blogNum: 21,
    featuredTopic: "Road Trip Route 66, Circuit Japon 15 Jours",
    color: "from-blue-600 to-cyan-700"
  },
  {
    slug: "univers-jeux-casino",
    name: "Jeux & Casinos en Ligne",
    description: "Stratégies prouvées pour jeux de crash Aviator/JetX, tableau de base du Blackjack et retraits Mobile Money.",
    icon: "🎲",
    blogNum: 22,
    featuredTopic: "Jeux de Crash Aviator, Stratégie Blackjack",
    color: "from-emerald-600 to-green-800"
  },
  {
    slug: "energie-solaire",
    name: "Énergie Solaire Cameroun",
    description: "Dimensionnement kits 3kVA pour frigo/congélateur, comparatif batteries Lithium LiFePO4 vs Gel et pompage agricole.",
    icon: "☀️",
    blogNum: 23,
    featuredTopic: "Batteries Lithium LiFePO4, Kit Solaire 3kVA",
    color: "from-amber-500 to-yellow-700"
  },
  {
    slug: "immobilier-logement",
    name: "Observatoire Logement Cameroun",
    description: "Baromètre des loyers par quartier à Yaoundé et Douala, traitement des infiltrations d'eau et diagnostic fissures.",
    icon: "🏠",
    blogNum: 24,
    featuredTopic: "Prix Loyers Yaoundé 2026, Traitement Humidité",
    color: "from-teal-600 to-cyan-800"
  },
  {
    slug: "foncier-terrains",
    name: "Foncier & Terrains Cameroun",
    description: "Guide d'obtention du titre foncier par immatriculation directe, risques d'abandon coutumier et bornage contradictoire.",
    icon: "📜",
    blogNum: 25,
    featuredTopic: "Immatriculation Titre Foncier, Achat Terrain Sans Risque",
    color: "from-emerald-700 to-teal-900"
  },
  {
    slug: "vie-de-couple",
    name: "Vie de Couple & Psychologie",
    description: "Gérer l'ingérence de la belle-famille, impact des réseaux sociaux sur le couple et rebâtir la complicité après 10 ans.",
    icon: "❤️",
    blogNum: 26,
    featuredTopic: "Ingérence Belle-Famille, Micro-Trahisons Réseaux",
    color: "from-rose-500 to-pink-700"
  },
  {
    slug: "mysteres-faits-reels",
    name: "Faits Paranormaux & Énigmes Réelles",
    description: "Enquêtes scientifiques sur l'incident du col Dyatlov, pierres mouvantes de Death Valley et phare d'Eilean Mor.",
    icon: "🌌",
    blogNum: 27,
    featuredTopic: "Mystère Col Dyatlov, Pierres Mouvantes",
    color: "from-indigo-800 to-slate-900"
  },
  {
    slug: "cybersecurite-web",
    name: "Cybersécurité Web & Serveurs",
    description: "Sécurisation WordPress contre les attaques Brute Force, audit de vulnérabilités OWASP Top 10 et headers HTTP stricts.",
    icon: "🛡️",
    blogNum: 28,
    featuredTopic: "Sécurisation WordPress Login, Headers HTTP CSP",
    color: "from-slate-700 to-blue-900"
  },
  {
    slug: "informatique-depannage",
    name: "Informatique & Matériel Cameroun",
    description: "Remplacement dalles d'écran PC cassé, changement pâte thermique surchauffe et passage du HDD au SSD x10.",
    icon: "🖥️",
    blogNum: 29,
    featuredTopic: "Réparation Écran PC Yaoundé/Douala, SSD x10",
    color: "from-blue-600 to-indigo-800"
  },
  {
    slug: "automobile-mecanique",
    name: "Comprendre Sa Voiture au Cameroun",
    description: "Diagnostic voyant moteur allumé OBD2, fumée bleue aux queues de soupapes et purge complète du liquide de frein.",
    icon: "🚗",
    blogNum: 30,
    featuredTopic: "Voyant Moteur Check Engine, Fumée Bleue Échappement",
    color: "from-red-600 to-amber-700"
  },
  {
    slug: "douane-ports",
    name: "Logistique & Ports Cameroun",
    description: "Barèmes du groupage maritime LCL au m3, frais de surestaries au Port de Douala-Bonabéri et choix d'un transitaire CEMAC.",
    icon: "⚓",
    blogNum: 31,
    featuredTopic: "Groupage Maritime Port Douala, Surestaries Dépassement",
    color: "from-blue-700 to-cyan-900"
  },
  {
    slug: "sciences-curiosites",
    name: "Sciences du Quotidien",
    description: "Pourquoi les feuilles rougissent en automne, pourquoi les bateaux en acier flottent et pourquoi les pigeons hochent la tête.",
    icon: "🔬",
    blogNum: 32,
    featuredTopic: "Flottabilité Navires Acier, Dégradation Chlorophylle",
    color: "from-teal-600 to-blue-800"
  },
  {
    slug: "sante-preventive",
    name: "Santé Préventive au Quotidien",
    description: "Dépistage précoce diabète type 2 sur la peau, inversion stéatose hépatique foie gras et posologie vitamine D3/K2.",
    icon: "🩺",
    blogNum: 33,
    featuredTopic: "Diabète de Type 2 Silencieux, Foie Gras Stéatose",
    color: "from-emerald-600 to-green-700"
  }
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find(c => c.slug === slug);
}
