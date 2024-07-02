import GlassmorphCard from "@/components/UI/card/GlassmorphCard";
import { createTranslation } from "@/i18n/server";
import Image from "next/image";

type ServicesType = {
  id: string
}

type DataType = {
  id: number,
  title: string,
  desc: string,
  imgUrl: string,
  alt: string
}

const ServicesTypes = async (props: ServicesType) => {
  const { t } = await createTranslation('home')

  const servicesData: DataType[] = [
    {
      id: 1,
      alt: 'service-type',
      imgUrl: '/assets/img/vehicles/vehicle-sameday.png',
      title: t('dedicated.serviceType.service1'),
      desc: t('dedicated.serviceType.desc1')
    },
    {
      id: 2,
      alt: 'service-type',
      imgUrl: '/assets/img/vehicles/vehicle-dedicated.png',
      title: t('dedicated.serviceType.service2'),
      desc: t('dedicated.serviceType.desc2')
    },
    {
      id: 3,
      alt: 'service-type',
      imgUrl: '/assets/img/vehicles/vehicle-only.png',
      title: t('dedicated.serviceType.service3'),
      desc: t('dedicated.serviceType.desc3')
    }
  ]
  return (
    <div id={props.id}>
      <h3 className="mt-10 text-text-primary text-4xl font-semibold text-center">{t('dedicated.serviceType.title')}</h3>
      <div className=" flex gap-12 w-full justify-between mt-10 ">
        {servicesData.map((data, index) => {
          return (
            <GlassmorphCard
              className="rounded-[1.25rem] border-2 w-full px-5 py-5 text-center"
              key={index}
            >
              <div className="flex flex-col w-100 gap-4 text-text-primary">
                <Image
                  src={data?.imgUrl}
                  alt={data?.alt}
                  width={300}
                  height={300}
                  className="mx-auto"
                />
                <h4 className="text-2xl font-semibold">{data?.title}</h4>
                <h5 className="text-lg font-normal leading-6">{data?.desc}</h5>
              </div>
            </GlassmorphCard>
          )
        })}
      </div>
    </div>
  )
}

export default ServicesTypes;