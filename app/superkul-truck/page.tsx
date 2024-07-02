import Faq from "@/components/Page/Home/Faq";
import Definition from "@/components/Page/Services/SuperkulTruck/Definition";
import Hero from "@/components/Page/Services/SuperkulTruck/Hero";
import ServicesTypes from "@/components/Page/Services/SuperkulTruck/ServicesType";
import VehicleType from "@/components/Page/Services/SuperkulTruck/VehicleType";
import WhyTruck from "@/components/Page/Services/SuperkulTruck/WhyTruck";
import PrimaryButton from "@/components/UI/button/PrimaryButton";
import GlassmorphCard from "@/components/UI/card/GlassmorphCard";
import { createTranslation } from "@/i18n/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: '%s | Superkul',
    default: "Superkul Truck",
  },
  description: "Kirim barang berpendingin ke seluruh wilayah Jawa, Bali, dan Sumatera dengan Superkul. Harga bersaing, pengiriman aman, hatipun tenang.",
  applicationName: "Superkul's Blog",
  authors: [{ name: "Superkul" }],
  generator: 'Next.js',
  keywords: ['cold stuff', 'cold chain', 'cold', 'cold chain delivery', 'cold stuff delivery', 'logistic', 'motor berpendingin', 'barang dingin', 'logistik'],
  referrer: 'origin-when-cross-origin',
  creator: 'Superkul',
  publisher: 'Superkul',
  metadataBase: new URL(`${process.env.REACT_APP_WEB_URL}`),
  alternates: {
    canonical: `/superkul-truck`,
  }
};

export default async function SamedayDelivery() {
  const { t } = await createTranslation('home')

  // Create Text in here for sending it to Client Component
  const vehicleTypeData = {
    title: t('superkulTruck.type.title'),
    vehicleInfo: t('superkulTruck.type.vehicleInfo'),
    dimension: t('superkulTruck.type.dimension'),
    maxWeight: t('superkulTruck.type.maxWeight'),
    temp: t('superkulTruck.type.temp'),
    tripArea: t('superkulTruck.type.tripArea')
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-primary-white">
      <Hero id="dedicated-hero-section" />
      <Definition id="definition-section" />
      <section className="w-screen bg-glassmorph bg-cover px-26 py-10">
        <ServicesTypes id="service-type-section" />
        <WhyTruck id="why-dedicated-section" />
        <VehicleType
          id="vehicle-type-section"
          textData={vehicleTypeData}
        />
      </section>
      <section className="w-screen bg-cover ">
        <div id='CTA-section' className="bg-products bg-cover px-26 py-60 w-full text-center">
          <GlassmorphCard className="border-2 rounded-3xl w-full h-fit mx-auto px-10 py-9  text-text-primary flex flex-col items-center">
            <h3 className="text-text-primary text-4xl font-semibold text-center">{t('superkulTruck.CTA.title')}</h3>
            <h4 className="text-text-primary text-xl mt-4 mb-4 font-normal text-center">{t('superkulTruck.CTA.text')}</h4>
            <PrimaryButton
              text={t('superkulTruck.CTA.button')}
              icon={'/assets/icon/ic-whatsapp-btn.png'}
            />
          </GlassmorphCard>
        </div>
        <Faq id="faq-section" />
      </section>
    </main>
  );
}