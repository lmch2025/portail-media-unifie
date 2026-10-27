import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatingBtn from "@/components/WhatsAppFloatingBtn";

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
  openGraph: {
    title: "Kidenzo Media | Guides Officiels, Concours, Énergie Solaire & Comparatifs Tech",
    description:
      "Portail éditorial de référence : concours administratifs au Cameroun, démarches officielles, tarifs Eneo/Camwater, énergie solaire, hébergement Cloud et tests d'équipements tech & espresso.",
    url: "https://www.kidenzo.store",
    siteName: "Kidenzo Media",
    locale: "fr_FR",
    type: "website",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppFloatingBtn />
      </body>
    </html>
  );
}
