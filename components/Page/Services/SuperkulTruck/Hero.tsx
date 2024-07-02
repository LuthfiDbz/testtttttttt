import PrimaryButton from "@/components/UI/button/PrimaryButton";
import { createTranslation } from "@/i18n/server";
import Image from "next/image";

type HeroType = {
  id: string
}

const Hero = async (props: HeroType) => {
  const { t } = await createTranslation('home');
  return (
    <div id={props.id} className="h-screen pt-[5vh] flex items-center justify-between px-26 gap-24">
      <div className="w-1/2">
        <h1 className="text-text-primary text-5xl font-semibold tracking-[0.12rem]">{t('superkulTruck.hero.title')}</h1>
        <h2 className="text-text-primary  text-xl font-medium tracking-[0.05rem] mt-2 mb-[5rem]">{t('superkulTruck.hero.text')}</h2>
        <PrimaryButton
          text={t('superkulTruck.hero.button')}
        />
      </div>
      <Image
        src='/assets/img/img-hero-truck.png'
        alt="sameday"
        width={400}
        height={400}
        className="w-1/2"
      />
    </div>
  )
}

export default Hero;