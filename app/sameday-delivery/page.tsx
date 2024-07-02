import Faq from "@/components/Page/Home/Faq";
import Definition from "@/components/Page/Services/SamedayDelivery/Definition";
import Feature from "@/components/Page/Services/SamedayDelivery/Feature";
import GetApps from "@/components/Page/Services/SamedayDelivery/GetApps";
import Hero from "@/components/Page/Services/SamedayDelivery/Hero";
import Process from "@/components/Page/Services/SamedayDelivery/Process";
import WhySameday from "@/components/Page/Services/SamedayDelivery/WhySameday";
import { createTranslation } from "@/i18n/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: '%s | Superkul',
    default: "Sameday Delivery",
  },
  description: "Kirim barang berpendingin pakai motor superkul, bisa atur suhu, barang aman sampai tujuan, dan cepat sampainya",
  applicationName: "Superkul's Blog",
  authors: [{ name: "Superkul" }],
  generator: 'Next.js',
  keywords: ['cold stuff', 'cold chain', 'cold', 'cold chain delivery', 'cold stuff delivery', 'logistic', 'motor berpendingin', 'barang dingin', 'logistik'],
  referrer: 'origin-when-cross-origin',
  creator: 'Superkul',
  publisher: 'Superkul',
  metadataBase: new URL(`${process.env.REACT_APP_WEB_URL}`),
  alternates: {
    canonical: `/sameday-delivery`,
  }
};

export default async function SamedayDelivery() {
  const { t } = await createTranslation('home')

  // Create Text in here because Feature Component is Client Component
  const featureTextData = [
    t('samedayDelivery.feature.title'),
    {
      f: t('samedayDelivery.feature.feature1'),
      d: t('samedayDelivery.feature.desc1'),
      u: '/assets/img/feature-sameday/feature1.png'
    },
    {
      f: t('samedayDelivery.feature.feature2'),
      d: t('samedayDelivery.feature.desc2'),
      u: '/assets/img/feature-sameday/feature2.png'
    },
    {
      f: t('samedayDelivery.feature.feature3'),
      d: t('samedayDelivery.feature.desc3'),
      u: '/assets/img/feature-sameday/feature3.png'
    },
    {
      f: t('samedayDelivery.feature.feature4'),
      d: t('samedayDelivery.feature.desc4'),
      u: '/assets/img/feature-sameday/feature4.png'
    },
    {
      f: t('samedayDelivery.feature.feature5'),
      d: t('samedayDelivery.feature.desc5'),
      u: '/assets/img/feature-sameday/feature5.png'
    },
    {
      f: t('samedayDelivery.feature.feature6'),
      d: t('samedayDelivery.feature.desc6'),
      u: '/assets/img/feature-sameday/feature6.png'
    },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-primary-white">
      <Hero id="sameday-hero-section" />
      <Definition id="definition-section" />
      <section className="w-screen bg-glassmorph bg-cover px-26 py-10">
        <WhySameday id="why-sameday-section" />
        <Feature id="feature-section" textData={featureTextData} />
      </section>
      <section className="w-screen bg-cover ">
        <Process id="process-section" />
        <GetApps id="getapps-section" />
        <Faq id="faq-section" />
      </section>
    </main>
  );
}