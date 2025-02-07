import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"], weight: ["300","400","500","600", "700"] });

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