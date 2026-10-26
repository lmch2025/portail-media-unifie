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
    template: "%s | Portail Unifié Média",
    default: "Portail Unifié Média | Guides Officiels, Concours, Énergie & Tech",
  },
  description: "Portail de référence pour les concours administratifs au Cameroun, démarches, tarifs Eneo/Camwater, énergie solaire, comparatifs tech et guides pratiques officiels.",
  metadataBase: new URL("https://portail-unifie.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Portail Unifié Média | Guides Officiels, Concours, Énergie & Tech",
    description: "Portail de référence pour les concours administratifs au Cameroun, démarches, tarifs Eneo/Camwater, énergie solaire, comparatifs tech et guides pratiques officiels.",
    siteName: "Portail Unifié Média",
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
