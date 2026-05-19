import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SecApp — Monitoramento de Seca no Amazonas",
  description: "SaaS de monitoramento e previsão de seca no Estado do Amazonas, com foco em impacto logístico fluvial.",
  keywords: "seca, amazonas, monitoramento, rios, logística fluvial, calado, alerta",
  icons: {
    icon: "/SecApp.svg",
    apple: "/SecApp.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body style={{ fontFamily: 'var(--font-inter), Inter, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
