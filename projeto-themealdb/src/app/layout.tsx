import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { Raleway, Source_Sans_3 } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"], weight: ["300","400","500","600", "700"] });
const sourceSans = Source_Sans_3({ subsets: ["latin"], weight: ["300","400","500", "700"] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Melhores Receitas",
  description: "Site de Receitas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={raleway.className}>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}