import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import Cursor from "@/components/Cursor";
import Field from "@/components/Field";
import Intro from "@/components/Intro";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import { profile } from "@/data/portfolio";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const sans = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const title = `${profile.name} — ${profile.role}`;
const description =
  "Mayur Kale — Full Stack Developer in Mumbai. Explore web applications built with React, Next.js and Node.js, with experience in cloud and AI integrations.";

export const metadata: Metadata = {
  title: { default: title, template: `%s — ${profile.name}` },
  description,
  keywords: [
    "Mayur Kale", "Full Stack Developer", "React", "Next.js", "Node.js",
    "TypeScript", "Web Applications", "API Integration", "Mumbai",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_IN",
    siteName: profile.name,
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#05060b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        {/*
          Runs during parse, before the curtain can paint. Without it a repeat
          visitor stares at the intro until React hydrates and the effect runs.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('mk-intro')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('no-intro')}}catch(e){}",
          }}
        />
        <Intro mark={profile.initials} />
        <SmoothScroll />
        <Cursor />
        <ScrollProgress />
        <Field />
        {children}
      </body>
    </html>
  );
}
