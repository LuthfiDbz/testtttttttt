import GlassmorphCard from "@/components/UI/card/GlassmorphCard";
import { createTranslation } from "@/i18n/server";
import { url } from "inspector";
import Image from "next/image";
import Link from "next/link";
import { title } from "process";

type WhySuperkulType = {
  id: string
}

type DataType = {
  id: number,
  name: string,
  icon: string,
  alt: string,
  class: string
}


const WhySuperkul = async (props: WhySuperkulType) => {
  const { t } = await createTranslation('home')

  const data: DataType[] = [
    {
      id: 1,
      name: t('home.whySuperkul.reason1'),
      icon: "/assets/icon/why-superkul/reason-1.png",
      alt: 'reason-1',
      class: 'right-10 bottom-6'
    },
    {
      id: 2,
      name: t('home.whySuperkul.reason2'),
      icon: "/assets/icon/why-superkul/reason-2.png",
      alt: 'reason-2',
      class: 'right-80 bottom-6'
    },
    {
      id: 3,
      name: t('home.whySuperkul.reason3'),
      icon: "/assets/icon/why-superkul/reason-3.png",
      alt: 'reason-3',
      class: 'right-96 top-6'
    },
    {
      id: 4,
      name: t('home.whySuperkul.reason4'),
      icon: "/assets/icon/why-superkul/reason-4.png",
      alt: 'reason-4',
      class: 'right-24 top-10'
    },
    {
      id: 5,
      name: t('home.whySuperkul.reason5'),
      icon: "/assets/icon/why-superkul/reason-5.png",
      alt: 'reason-5',
      class: 'left-10 bottom-6'
    },
    {
      id: 6,
      name: t('home.whySuperkul.reason6'),
      icon: "/assets/icon/why-superkul/reason-6.png",
      alt: 'reason-6',
      class: 'left-80 bottom-6'
    },
    {
      id: 7,
      name: t('home.whySuperkul.reason7'),
      icon: "/assets/icon/why-superkul/reason-7.png",
      alt: 'reason-7',
      class: 'left-96 top-6'
    },
    {
      id: 8,
      name: t('home.whySuperkul.reason8'),
      icon: "/assets/icon/why-superkul/reason-8.png",
      alt: 'reason-8',
      class: 'left-24 top-10'
    },
  ]
  return (
    <div id={props.id} className="relative z-0">
      <h3 className="mt-40 mb-24 text-text-primary text-4xl font-semibold text-center">{t('home.whySuperkul.title')}</h3>
      <div className="absolute ms-[32%] grid grid-rows-4 grid-flow-col w-fit mx-auto gap-1">
        {data.map((val) => {
          return (
            <GlassmorphCard
              key={val?.id}
              className={`relative flex items-center justify-between gap-2 rounded-[1.25rem] border-2 w-[14.375rem] h-fit px-3 py-3 ${val?.class}`}
            >
              <Image
                src={val?.icon}
                alt=""
                width={50}
                height={50}
              />
              <h4 className="text-text-primary text-lg font-medium">{val?.name}</h4>
            </GlassmorphCard>
          )
        })}
      </div>
      <Image
        src={"/assets/img/vehicles/vehicle-whyus.png"}
        alt=""
        width={500}
        height={500}
        className="mx-auto relative z-10 mb-40 mt-36"
      />
    </div>
  )
}

export default WhySuperkul;