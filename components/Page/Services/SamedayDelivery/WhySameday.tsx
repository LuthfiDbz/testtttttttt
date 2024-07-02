import GlassmorphCard from "@/components/UI/card/GlassmorphCard";
import { createTranslation } from "@/i18n/server";
import Image from "next/image";

type WhySamedayType = {
  id: string
}

type DataType = {
  id: number,
  alt: string,
  imgUrl: string,
  text: string
}


const WhySameday = async (props: WhySamedayType) => {
  const { t } = await createTranslation('home')

  const productsData: DataType[] = [
    {
      id: 1,
      alt: '',
      imgUrl: '/assets/icon/why-sameday/reason-1.png',
      text: t('samedayDelivery.whySameday.reason1')
    },
    {
      id: 2,
      alt: '',
      imgUrl: '/assets/icon/why-sameday/reason-2.png',
      text: t('samedayDelivery.whySameday.reason2')
    },
    {
      id: 3,
      alt: '',
      imgUrl: '/assets/icon/why-sameday/reason-3.png',
      text: t('samedayDelivery.whySameday.reason3')
    },
    {
      id: 4,
      alt: '',
      imgUrl: '/assets/icon/why-sameday/reason-4.png',
      text: t('samedayDelivery.whySameday.reason4')
    },
    {
      id: 5,
      alt: '',
      imgUrl: '/assets/icon/why-sameday/reason-5.png',
      text: t('samedayDelivery.whySameday.reason5')
    },
    {
      id: 6,
      alt: '',
      imgUrl: '/assets/icon/why-sameday/reason-6.png',
      text: t('samedayDelivery.whySameday.reason6')
    },
    {
      id: 7,
      alt: '',
      imgUrl: '/assets/icon/why-sameday/reason-7.png',
      text: t('samedayDelivery.whySameday.reason7')
    },
    {
      id: 8,
      alt: '',
      imgUrl: '/assets/icon/why-sameday/reason-8.png',
      text: t('samedayDelivery.whySameday.reason8')
    },
  ]
  return (
    <div id={props.id} className="mt-4">
      <h3 className="text-text-primary text-4xl font-semibold text-center">Mengapa Menggunakan Superkul Sameday Delivery</h3>
      <div className="mt-20 grid grid-cols-4 gap-10 flex-wrap">
        {productsData.map((val) => {
          return (
            <GlassmorphCard
              key={val?.id}
              className="rounded-[1.2rem] border-2 px-5 py-5 text-text-primary text-center"
            >
              <Image
                src={val?.imgUrl}
                alt={val?.alt}
                width={80}
                height={80}
                className="mx-auto"
              />
              <h5 className="mt-2 text-lg font-normal text-text-primary">
                {val?.text}
              </h5>
            </GlassmorphCard>
          )
        })}
      </div>
    </div>
  )
}

export default WhySameday;