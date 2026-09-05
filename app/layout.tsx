import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// Both fonts below are self-hosted at build time via next/font (no runtime
// calls to Google Fonts, satisfying the "fonts self-hostées" requirement).
//
// Satoshi (the brief's specified body face) is not distributed on Google
// Fonts — it's a Fontshare font. Inter is wired up here as the working
// fallback out of the box. To use real Satoshi, download the variable
// woff2 from fontshare.com, drop it in /public/fonts, and swap this for:
//   import localFont from "next/font/local";
//   const satoshi = localFont({ src: "../public/fonts/Satoshi-Variable.woff2", variable: "--font-satoshi" });
// then swap `inter.variable` for `satoshi.variable` below.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://qavyon.com"),
  title: {
    default: "QAVYON — Make complexity work.",
    template: "%s | QAVYON",
  },
  description:
    "QAVYON connecte les systèmes complexes (ERP, Data, IA, OT) des industriels européens mid-market. Ingénierie senior, nearshore France–Maroc.",

  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "QAVYON",
    title: "QAVYON — Make complexity work.",
    description:
      "QAVYON connecte les systèmes complexes (ERP, Data, IA, OT) des industriels européens mid-market.",
    url: "https://qavyon.com",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "QAVYON — Make complexity work." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "QAVYON — Make complexity work.",
    description:
      "QAVYON connecte les systèmes complexes (ERP, Data, IA, OT) des industriels européens mid-market.",
    images: ["/og-default.png"],
  },
  robots: {
    index: process.env.NEXT_PUBLIC_ENV === "production",
    follow: process.env.NEXT_PUBLIC_ENV === "production",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "QAVYON",
  url: "https://qavyon.com",
  slogan: "Make complexity work.",
  description:
    "Partenaire d'ingénierie qui connecte les systèmes complexes (ERP, Data, IA, OT) des industriels européens mid-market.",
  areaServed: "Europe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="signal-grid-bg min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-cyan focus:text-obsidian focus:px-4 focus:py-2 focus:rounded-sm"
        >
          Aller au contenu principal
        </a>
        <Nav />
        <main id="main-content" className="min-h-0 flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
