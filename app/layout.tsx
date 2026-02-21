import React from "react";
import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { Inter as FontSans, Lato, Nunito, Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";
import { VideoDialogProvider } from "@/components/ui/VideoDialogContext";
import VideoDialog from "@/components/ui/VideoDialog";

import "@/styles.css";
import { TailwindIndicator } from "@/components/ui/breakpoint-indicator";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: "400",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

function getScriptOrigins(scriptsData: any): string[] {
  const origins = new Set<string>();
  const customScripts = scriptsData?.customScripts as any[] | undefined;
  customScripts?.forEach((script) => {
    if (script?.enabled && script?.scriptType === 'external' && script?.src) {
      try {
        const url = new URL(script.src);
        origins.add(url.origin);
      } catch {
        // skip invalid URLs
      }
    }
  });
  return Array.from(origins);
}

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config });
  const scriptsData = await payload.findGlobal({ slug: 'scripts' });
  const verification = (scriptsData as any)?.verification;

  return {
    metadataBase: new URL("https://ocedc.org"),
    title: {
      default: "Ogle County Economic Development Corporation",
      template: "%s | Ogle County Economic Development Corporation",
    },
    description:
      "Official site of the Ogle County Economic Development Corporation—connecting site selectors, businesses, and community partners across Northern Illinois.",
    openGraph: {
      title: "Ogle County Economic Development Corporation",
      description:
        "Explore shovel-ready sites, target industries, and business support services in Ogle County, Illinois.",
      type: "website",
      images: [{ url: "/images/ocedc-logo-gold.png", width: 496, height: 207 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Ogle County Economic Development Corporation",
      description:
        "Economic destination for growth and prosperity in Northern Illinois.",
    },
    verification: {
      google: verification?.googleSearchConsole || undefined,
      yandex: verification?.yandex || undefined,
      other: {
        ...(verification?.bingWebmaster
          ? { 'msvalidate.01': verification.bingWebmaster }
          : {}),
        ...(verification?.pinterest
          ? { 'p:domain_verify': verification.pinterest }
          : {}),
      },
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const payload = await getPayload({ config });
  const scriptsData = await payload.findGlobal({ slug: 'scripts' });
  const scriptOrigins = getScriptOrigins(scriptsData);
  const extraSrc = scriptOrigins.length > 0 ? ' ' + scriptOrigins.join(' ') : '';

  const cspContent = [
    `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com${extraSrc}`,
    `connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://*.convex.site${extraSrc}`,
    "img-src 'self' data: blob: https://www.google-analytics.com https://*.public.blob.vercel-storage.com",
  ].join('; ');

  return (
    <html lang="en" className={cn(fontSans.variable, nunito.variable, lato.variable, playfair.variable)}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={cspContent} />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased selection:bg-primary/30">
        <VideoDialogProvider>
          {children}
          <VideoDialog />
        </VideoDialogProvider>
        <TailwindIndicator />
      </body>
    </html>
  );
}
