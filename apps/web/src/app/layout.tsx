import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeaderMenuCloser } from "@/components/HeaderMenuCloser";
import { QuoteProvider } from "@/lib/quote";
import { Bricolage_Grotesque } from "next/font/google";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "HSS Distributors | Wholesale FMCG in Nairobi",
    template: "%s | HSS Distributors",
  },
  description:
    "HSS Distributors supplies FMCG products wholesale in Nairobi. Browse the catalogue and request a quote on WhatsApp.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  applicationName: "HSS Distributors",
  openGraph: { siteName: "HSS Distributors", type: "website", locale: "en_KE" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geist.variable} ${display.variable} h-full antialiased`}>
      <QuoteProvider>
        <body className="flex min-h-full flex-col">
          <HeaderMenuCloser />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </QuoteProvider>
    </html>
  );
}