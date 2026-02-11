import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
