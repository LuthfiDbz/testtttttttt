import GlassmorphCard from "@/components/UI/card/GlassmorphCard";
import { createTranslation } from "@/i18n/server";
import Image from "next/image";

type ProcessType = {
  id: string
}

type DataType = {
  id: number,
  step: string,
  desc: string
}


const Process = async (props: ProcessType) => {
  const { t } = await createTranslation('home')

  const processData: DataType[] = [
    {
      id: 1,
      step: t('samedayDelivery.process.step1'),
      desc: t('samedayDelivery.process.desc1')
    },
    {
      id: 2,
      step: t('samedayDelivery.process.step2'),
      desc: t('samedayDelivery.process.desc2')
    },
    {
      id: 3,
      step: t('samedayDelivery.process.step3'),
      desc: t('samedayDelivery.process.desc3')
    },
    {
      id: 4,
      step: t('samedayDelivery.process.step4'),
      desc: t('samedayDelivery.process.desc4')
    }
  ]
  return (
    <div id={props.id} className="bg-products bg-cover px-26 pt-16 pb-24">
      <h3 className="text-text-primary text-4xl font-semibold text-center">{t('samedayDelivery.process.title')}</h3>
      <div className="flex justify-between items-center w-full gap-24 mt-10">
        <GlassmorphCard className="border-2 rounded-3xl w-3/5 h-fit mx-auto px-10 py-9 flex gap-[3.56rem] text-text-primary justify-center">
          <ol>
            {processData.map((val) => {
              return (
                <li key={val?.id} className="w-full mb-4 last:mb-0">
                  <h4 className="text-2xl font-medium">{val?.id}. {val?.step}</h4>
                  <h5 className="text-xl leading-[1.625rem] mt-1.5 ms-7">{val?.desc}</h5>
                </li>
              )
            })}
          </ol>
        </GlassmorphCard>
        <Image
          src='/assets/img/img-process-sameday.png'
          alt="process-sameday"
          width={150}
          height={150}
          className="w-2/5 h-full"
        />
      </div>
    </div>
  )
}

export default Process;