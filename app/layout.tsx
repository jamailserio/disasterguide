import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

const description =
  "Ask questions about preparing for and recovering from disasters. Answers from published FEMA publications, with page-level citations you can open and check. Independent project, not affiliated with or endorsed by FEMA.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "DisasterGuide: Disaster Preparedness Q&A",
  description,
  openGraph: {
    title: "DisasterGuide: Disaster Preparedness Q&A",
    description,
    type: "website",
    siteName: "DisasterGuide",
  },
  twitter: {
    card: "summary",
    title: "DisasterGuide: Disaster Preparedness Q&A",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f6f2" },
    { media: "(prefers-color-scheme: dark)", color: "#16181d" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
