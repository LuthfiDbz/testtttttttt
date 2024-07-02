import Faq from "@/components/Page/Home/Faq";
import Definition from "@/components/Page/Services/Dedicated/Definition";
import Feature from "@/components/Page/Services/Dedicated/Feature";
import Hero from "@/components/Page/Services/Dedicated/Hero";
import ServicesTypes from "@/components/Page/Services/Dedicated/ServicesType";
import WhyDedicated from "@/components/Page/Services/Dedicated/WhyDedicated";
import PrimaryButton from "@/components/UI/button/PrimaryButton";
import GlassmorphCard from "@/components/UI/card/GlassmorphCard";
import { createTranslation } from "@/i18n/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: '%s | Superkul',
    default: "Dedicated",
  },
  description: "Bayar sekali tanpa biaya tambahan apapun (gaji driver, bensin, biaya lain), bisa kirim kemanapun dan dapatkan berbagai manfaat dari fitur Superkul.",
  applicationName: "Superkul's Blog",
  authors: [{ name: "Superkul" }],
  generator: 'Next.js',
  keywords: ['cold stuff', 'cold chain', 'cold', 'cold chain delivery', 'cold stuff delivery', 'logistic', 'motor berpendingin', 'barang dingin', 'logistik'],
  referrer: 'origin-when-cross-origin',
  creator: 'Superkul',
  publisher: 'Superkul',
  metadataBase: new URL(`${process.env.REACT_APP_WEB_URL}`),
  alternates: {
    canonical: `/dedicated`,
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
      <Hero id="dedicated-hero-section" />
      <Definition id="definition-section" />
      <section className="w-screen bg-glassmorph bg-cover px-26 py-10">
        <ServicesTypes id="service-type-section" />
        <WhyDedicated id="why-dedicated-section" />
        <Feature id="feature-section" textData={featureTextData} />
      </section>
      <section className="w-screen bg-cover ">
        <div id='CTA-section' className="bg-products bg-cover px-26 py-60 w-full text-center">
          <GlassmorphCard className="border-2 rounded-3xl w-full h-fit mx-auto px-10 py-9  text-text-primary flex flex-col items-center">
            <h3 className="text-text-primary text-4xl font-semibold text-center">{t('dedicated.CTA.title')}</h3>
            <h4 className="text-text-primary text-xl mt-4 mb-4 font-normal text-center">{t('dedicated.CTA.text')}</h4>
            <PrimaryButton
              text={t('dedicated.CTA.button')}
              icon={'/assets/icon/ic-whatsapp-btn.png'}
            />
          </GlassmorphCard>
        </div>
        <Faq id="faq-section" />
      </section>
    </main>
  );
}