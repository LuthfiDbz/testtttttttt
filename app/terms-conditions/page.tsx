import Terms from "@/components/Page/Terms";
import { createTranslation } from "@/i18n/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: '%s | Superkul',
    default: "Terms and Conditions",
  },
  description: "Terms and Conditions",
  applicationName: "Superkul's Blog",
  authors: [{ name: "Superkul" }],
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  creator: 'Superkul',
  publisher: 'Superkul',
  metadataBase: new URL(`${process.env.REACT_APP_WEB_URL}`),
  alternates: {
    canonical: `/terms-conditions`,
  }
};


const TermsConditions = async ({ product }: any) => {
  const { t } = await createTranslation('home');

  const text = {
    title: t('termsCond')
  }

  return (
    <Terms text={text} />
  );
}

export default TermsConditions