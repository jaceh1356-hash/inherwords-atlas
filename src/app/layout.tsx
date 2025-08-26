import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://inherwords.org'), // Will update with actual domain
  title: {
    default: "InHerWords - Interactive Gender Equality Atlas & Women's Stories",
    template: "%s | InHerWords"
  },
  description: "Discover gender inequality worldwide through our interactive Gender Inequality Index (GII) map. Read inspiring women's stories, share your experience, and connect with organizations fighting for gender equality globally.",
  keywords: [
    "gender equality",
    "women's rights", 
    "gender inequality index",
    "interactive world map",
    "women's stories",
    "global gender equality",
    "women empowerment",
    "gender gap visualization",
    "women's voices",
    "gender equality atlas",
    "feminist organizations",
    "women's advocacy",
    "gender inequality data",
    "women's experiences worldwide"
  ],
  authors: [{ name: "InHerWords Team" }],
  creator: "InHerWords",
  publisher: "InHerWords",
  category: "Social Impact",
  classification: "Women's Rights & Gender Equality",
  openGraph: {
    title: "InHerWords - Interactive Gender Equality Atlas & Women's Stories",
    description: "Explore gender inequality worldwide through interactive data visualization. Read, share, and amplify women's stories for positive change.",
    type: "website",
    locale: "en_US",
    url: "https://inherwords.org", // Will update with actual domain
    siteName: "InHerWords",
    images: [
      {
        url: "/og-image.jpg", // Will create this
        width: 1200,
        height: 630,
        alt: "InHerWords Gender Equality Interactive Atlas"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@InHerWords", // Will update with actual handle
    creator: "@InHerWords",
    title: "InHerWords - Interactive Gender Equality Atlas",
    description: "Explore gender inequality worldwide through interactive data. Read inspiring women's stories and share your voice for change.",
    images: ["/twitter-card.jpg"] // Will create this
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
  alternates: {
    canonical: "https://inherwords.org", // Will update with actual domain
    languages: {
      "en-US": "https://inherwords.org",
      "x-default": "https://inherwords.org"
    }
  },
  verification: {
    google: "your-google-verification-code", // Will add when setting up Search Console
    // bing: "your-bing-verification-code", // Optional
  },
  other: {
    "msapplication-TileColor": "#dc2626",
    "theme-color": "#ffffff"
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "InHerWords",
    "url": "https://inherwords.org",
    "description": "Interactive Gender Equality Atlas showcasing women's stories and gender inequality data worldwide",
    "publisher": {
      "@type": "Organization",
      "name": "InHerWords",
      "url": "https://inherwords.org"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://inherwords.org/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "Dataset",
      "name": "Gender Inequality Index Interactive Map",
      "description": "Comprehensive visualization of global gender inequality using official Gender Inequality Index data",
      "keywords": "gender equality, women's rights, gender inequality index, global data",
      "url": "https://inherwords.org"
    }
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="canonical" href="https://inherwords.org" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#dc2626" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        {children}
      </body>
    </html>
  );
}
