import PrimaryButton from "@/components/UI/button/PrimaryButton";
import { createTranslation } from "@/i18n/server";

const Hero = async () => {
  const { t } = await createTranslation('home');
  return (
    <div className="h-fit relative">
      <div className="w-1/2 px-26 absolute mt-[30vh]">
        <h1 className="text-primary-200 text-5xl font-semibold tracking-[0.12rem]">{t('home.hero.title')}</h1>
        <h2 className="text-primary-50 text-xl font-medium tracking-[0.05rem] mt-2 mb-[2.37rem]">{t('home.hero.text')}</h2>
        <PrimaryButton
          text={t('home.hero.button')}
        />
      </div>
      <video className="w-screen" autoPlay loop muted>
        <source src="/assets/vid/hero-video.mp4" type="video/mp4" />
      </video>
    </div>
  )
}

export default Hero;