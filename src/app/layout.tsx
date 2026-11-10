import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import MainHeader from "@/components/MainHeader";
import MainFooter from "@/components/MainFooter";
import { Suspense } from "react";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "INKSPACE — Write. Share. Inspire.",
  description:
    "Discover thoughtful stories, share your perspective and connect with a community of writers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="min-h-screen font-sans antialiased">
        <Suspense fallback={null}>
          <MainHeader />
        </Suspense>
        {children}
        <MainFooter />
      </body>
    </html>
  );
}