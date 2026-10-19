import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuoteProvider } from "@/lib/quote";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "HSS Distributors | Wholesale FMCG in Nairobi",
    template: "%s | HSS Distributors",
  },
  description:
    "HSS Distributors supplies FMCG products wholesale in Nairobi. Browse the catalogue and request a quote on WhatsApp.",
  metadataBase: 
    new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <QuoteProvider>
        <body className="flex min-h-full flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </QuoteProvider>
    </html>
  );
}