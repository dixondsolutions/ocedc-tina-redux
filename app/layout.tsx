import React from "react";
import { Metadata } from "next";
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

export const metadata: Metadata = {
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Ogle County Economic Development Corporation",
    description:
      "Economic destination for growth and prosperity in Northern Illinois.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(fontSans.variable, nunito.variable, lato.variable, playfair.variable)}>
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
