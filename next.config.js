/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // ─── OPTIMISATION FAST ORIGIN TRANSFER ─────────────────────────────────────
  // Ce projet génère 95% du Fast Origin Transfer de l'équipe (8.16 GB/10 GB).
  // 1. compress:true → Brotli/Gzip divise par 3-4 les octets transmis CDN←→Origin
  // 2. output:"export" → pages 100% statiques, zéro requête vers le serveur
  //    après le build → Fast Origin Transfer tombera à ~0 après redéploiement.
  // Source : https://vercel.com/docs/manage-cdn-usage#fast-origin-transfer
  output: 'export',
  compress: true,
  trailingSlash: false,
  // ─── IMAGES : désactiver l'optimisation Next.js (incompatible output:export) ─
  // Les images restent servies depuis leurs URLs externes (CDN tiers).
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' }
    ]
  },
  // ─── HEADERS Sécurité : conservés via vercel.json (non supportés en export) ─
};

module.exports = nextConfig;
