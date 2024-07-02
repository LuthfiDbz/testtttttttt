import Privacy from "@/components/Page/Privacy";
import { createTranslation } from "@/i18n/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: '%s | Superkul',
    default: "Privacy Policy",
  },
  description: "Privacy Policy",
  applicationName: "Superkul's Blog",
  authors: [{ name: "Superkul" }],
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  creator: 'Superkul',
  publisher: 'Superkul',
  metadataBase: new URL(`${process.env.REACT_APP_WEB_URL}`),
  alternates: {
    canonical: `/privacy-policy`,
  }
};


const PrivacyPolicy = async ({ product }: any) => {
  const { t } = await createTranslation('home');

  const text = {
    title: t('privacyPolicy')
  }

  return (
    <Privacy text={text} />
  );
}

export default PrivacyPolicy