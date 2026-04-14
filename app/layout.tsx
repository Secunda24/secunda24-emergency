import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";

import { Providers } from "@/components/shared/providers";
import { getBrandingSettings } from "@/lib/branding";

import "./globals.css";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans"
});

const fontDisplay = Fraunces({
  subsets: ["latin"],
  variable: "--font-display"
});

export async function generateMetadata(): Promise<Metadata> {
  const branding = getBrandingSettings();
  return {
    title: `${branding.portalName} | Emergency Response Demo`,
    description:
      "A polished front-end prototype for verified emergency reporting, local partner routing, and dispatcher workflows in Secunda."
  };
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const branding = getBrandingSettings();
  const style = {
    "--brand": branding.accentHsl
  } as CSSProperties;

  return (
    <html lang="en" suppressHydrationWarning style={style}>
      <body className={`${fontSans.variable} ${fontDisplay.variable} min-h-screen font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
