import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatingBtn from "@/components/WhatsAppFloatingBtn";
import CookieBanner from "@/components/CookieBanner";
import BlackFridayTopBar from "@/components/BlackFridayTopBar";

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    template: "%s | Kidenzo Media",
    default: "Kidenzo Media | Guides Officiels, Concours, Énergie Solaire & Comparatifs Tech",
  },
  description:
    "Portail éditorial de référence : concours administratifs au Cameroun, démarches officielles, tarifs Eneo/Camwater, énergie solaire, hébergement Cloud et tests d'équipements tech & espresso.",
  metadataBase: new URL("https://www.kidenzo.store"),
  alternates: {
    canonical: "https://www.kidenzo.store",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Kidenzo Media | Guides Officiels, Concours, Énergie Solaire & Comparatifs Tech",
    description:
      "Portail éditorial de référence : concours administratifs au Cameroun, démarches officielles, tarifs Eneo/Camwater, énergie solaire, hébergement Cloud et tests d'équipements tech & espresso.",
    url: "https://www.kidenzo.store",
    siteName: "Kidenzo Media",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Kidenzo Media Logo Officiel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kidenzo Media | Guides Officiels, Concours & Comparatifs Tech",
    description:
      "Portail éditorial de référence : concours administratifs au Cameroun, démarches officielles, tarifs Eneo/Camwater, énergie solaire et tests d'équipements tech.",
    site: "@KidenzoMedia",
    creator: "@KidenzoMedia",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "c5dc6c64480779bb",
  },
  other: {
    "google-adsense-account": "ca-pub-3034343595064419",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3034343595064419"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        <BlackFridayTopBar />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppFloatingBtn />
        <CookieBanner />
      </body>
    </html>
  );
}
