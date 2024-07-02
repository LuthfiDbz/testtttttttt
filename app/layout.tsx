import type { Metadata } from "next";
import { ReactNode } from 'react'
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";
import { getLocale } from "@/i18n/server";
import { get } from "http";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

type Props = {
  children: ReactNode
  params: { locale: string }
}

export const metadata: Metadata = {
  title: {
    template: '%s | Superkul',
    default: "Superkul Cold Stuff Delivery",
  },
  description: "Superkul merupakan penyedia layanan pengiriman barang/produk yang membutuhkan suhu dingin dengan menggunakan motor dan truck berpendingin Superkul.",
  applicationName: "Superkul's Blog",
  authors: [{ name: "Superkul" }],
  generator: 'Next.js',
  keywords: ['cold stuff', 'cold chain', 'cold', 'cold chain delivery', 'cold stuff delivery', 'logistic', 'motor berpendingin', 'barang dingin', 'logistik'],
  referrer: 'origin-when-cross-origin',
  creator: 'Superkul',
  publisher: 'Superkul',
  metadataBase: new URL(`${process.env.REACT_APP_WEB_URL}`),
  alternates: {
    canonical: `./`,
  }
};

export default async function RootLayout({
  children,
}: Props) {

  const locale = getLocale();

  return (
    <html lang="id">
      <body className={roboto.className}>
        <Header locale={locale} />
        {children}
        <Footer />
      </body>
    </html>
  );
}