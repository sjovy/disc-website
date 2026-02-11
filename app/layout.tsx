import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "DISC Assessment | Personality Analysis Tool",
  description: "Discover your personality type with the DISC assessment tool",
  keywords: ["DISC", "personality", "assessment", "workplace dynamics"],
  authors: [{ name: "DISC Website" }],
  openGraph: {
    title: "DISC Assessment",
    description: "Discover your personality type with the DISC assessment tool",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <Header />
        <main className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.48))]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
