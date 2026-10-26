# 🚀 Portail Unifié Média (Next.js 14 + Vercel)

Architecture moderne, ultra-rapide et indestructible d'un portail média unifié regroupant les 33 thématiques de votre réseau sous **un seul nom de domaine avec des chemins / sous-dossiers dédiés (`/[categorie]/[slug]`)**.

---

## 🌟 Points Forts Techniques & Stratégiques

1. **Architecture par Chemins (Option 1 - Silos Thématiques)** :
   - Tous les articles renforcent l'autorité d'un **seul et unique nom de domaine**.
   - 33 rubriques thématiques isolées sous des chemins clairs (ex: `/concours/`, `/energie-solaire/`, `/espresso-cafe/`, `/hebergement-web/`).
2. **Indépendance & Sécurité Absolue** :
   - Votre code source est sur GitHub, déployé sur le réseau Edge mondial de Vercel.
   - **Zéro risque de suspension arbitraire** : vous êtes propriétaire à 100% de vos contenus, de votre domaine et de vos données.
3. **Vitesse Foudroyante (Core Web Vitals à 100%)** :
   - Pages statiques pré-générées (SSG) servies en **moins de 80 ms**.
   - Score Lighthouse 100/100 sur mobile et desktop.
4. **Monétisation & CRO Intégrés** :
   - *Above-the-Fold Amazon Cashflow Box* (tags officiels `kidenzo202205-20` US & `kidenzo202208-21` FR).
   - *Bannière Partenaire Hostinger* avec copie en un clic du coupon `-20%` (`XVCFABRICNC4`).
   - *Bouton Tactile WhatsApp Flottant (>= 62px)* pré-rempli (`+237 693 845 941`) conforme aux règles d'accessibilité et de conversion pour tous publics.
5. **SEO & AIO Extrêmes (Moteurs de Recherche & IA)** :
   - Schémas JSON-LD automatiques : `Article`, `BreadcrumbList`, `FAQPage`.
   - Bloc de réponse directe AIO *"L'essentiel en 30 secondes"*.
   - Encadré d'expertise vécue avec les 5 marqueurs terrain (`Sur le terrain`, `En pratique`, `Attention :`, `Piège à éviter`, `Chiffre mesuré`).
   - Sitemap dynamique (`sitemap.xml`) et fichier `robots.txt` inclus.

---

## 📂 Structure du Projet

```text
unified-portal/
├── app/
│   ├── [category]/
│   │   ├── [slug]/
│   │   │   └── page.tsx        # Page d'article (SEO, AIO, CRO, FAQ, Schema)
│   │   └── page.tsx            # Hub de la catégorie (Listing & description)
│   ├── globals.css             # Styles Tailwind & typographie prose
│   ├── layout.tsx              # Layout racine (Header, Footer, WhatsApp)
│   ├── page.tsx                # Page d'accueil (Hero, 33 Rubriques, À la une)
│   ├── robots.ts               # Robots.txt dynamique
│   └── sitemap.ts              # Sitemap XML dynamique pour Vercel
├── components/
│   ├── AmazonCashflowBox.tsx   # Composant CRO d'affiliation Amazon
│   ├── ArticleCard.tsx         # Carte d'article responsive
│   ├── Breadcrumbs.tsx         # Fil d'Ariane avec JSON-LD
│   ├── Footer.tsx              # Footer E-E-A-T avec annuaire des 33 catégories
│   ├── Header.tsx              # Header mobile-first avec défilement rapide
│   ├── HostingerBanner.tsx     # Bannière promo Hostinger avec coupon copiable
│   └── WhatsAppFloatingBtn.tsx # Bouton tactile d'assistance WhatsApp
├── lib/
│   ├── articles.ts             # Fournisseur de données et articles vérifiés
│   └── categories.ts           # Configuration officielle des 33 rubriques
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── vercel.json                 # En-têtes de sécurité et configuration Vercel
```

---

## 🚢 Déploiement en 1 Clic sur Vercel

1. **Créer un dépôt GitHub** :
   ```bash
   cd unified-portal
   git init
   git add .
   git commit -m "Initial commit - Unified Media Portal"
   git remote add origin https://github.com/votre-compte/portail-unifie.git
   git push -u origin main
   ```
2. **Connecter à Vercel** :
   - Rendez-vous sur [vercel.com](https://vercel.com) et connectez-vous avec votre compte GitHub.
   - Cliquez sur **« Add New... » -> « Project »**.
   - Sélectionnez votre dépôt `portail-unifie`.
   - Cliquez sur **« Deploy »** sans rien modifier (Next.js est détecté automatiquement).
3. **Ajouter votre Nom de Domaine** :
   - Dans le dashboard Vercel de votre projet, allez dans **Settings -> Domains**.
   - Entrez votre domaine (ex: `mondomaine.com`).
   - Ajoutez les 2 enregistrements DNS (CNAME ou A) indiqués par Vercel chez votre registrar (Hostinger, Namecheap, etc.).
   - Le certificat SSL gratuit est généré en 5 secondes. Votre portail est en ligne !

---

## 📥 Importation de l'Archive Google Takeout

Dès que vous avez téléchargé le fichier ZIP de Takeout :
1. Extrayez le dossier décompressé.
2. Exécutez le script de conversion :
   ```bash
   python tools/import_takeout_to_nextjs.py
   ```
Les articles seront automatiquement injectés dans le format du portail.
