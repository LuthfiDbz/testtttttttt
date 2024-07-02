import GlassmorphCard from "@/components/UI/card/GlassmorphCard";
import { createTranslation } from "@/i18n/server";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: {
    template: '%s | Superkul',
    default: "About US",
  },
  description: "About Us",
  applicationName: "Superkul's Blog",
  authors: [{ name: "Superkul" }],
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  creator: 'Superkul',
  publisher: 'Superkul',
  metadataBase: new URL(`${process.env.REACT_APP_WEB_URL}`),
  alternates: {
    canonical: `/about-us`,
  }
};

const AboutUs = async () => {
  const { t } = await createTranslation('home');
  return (
    <main className="w-screen bg-glassmorph bg-cover px-26 pt-20 pb-40">
      <GlassmorphCard className="flex flex-col border-2 rounded-3xl mt-10 w-full h-fit mx-auto px-20 py-10 gap-10 text-text-primary">
        <h3 className="text-center text-4xl font-semibold">{t('about.title')}</h3>
        <Image
          src={'/assets/img/img-about.png'}
          alt={'about-image'}
          width={300}
          height={300}
          className="w-full rounded-[2rem]"
        />
        <h4 className="text-lg leading-7">{t('about.desc1')}</h4>
        <h4 className="-mt-6 text-lg leading-7">{t('about.desc2')}</h4>
      </GlassmorphCard>
    </main>
  );
}

export default AboutUs