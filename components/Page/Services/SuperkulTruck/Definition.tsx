import PrimaryButton from "@/components/UI/button/PrimaryButton";
import { createTranslation } from "@/i18n/server";
import Image from "next/image";

type HeroType = {
  id: string
}

const Definition = async (props: HeroType) => {
  const { t } = await createTranslation('home');
  return (
    <div id={props.id} className="w-full text-center bg-products bg-cover px-80 py-32">
      <h3 className="text-text-primary text-4xl font-semibold tracking-[0.12rem]">{t('superkulTruck.definition.title')}</h3>
      <h4 className="text-text-primary text-xl font-normal tracking-[0.05rem] leading-[1.6875rem] mt-6">{t('superkulTruck.definition.text')}</h4>
    </div>
  )
}

export default Definition;