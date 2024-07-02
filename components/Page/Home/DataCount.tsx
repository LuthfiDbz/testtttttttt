import GlassmorphCard from "@/components/UI/card/GlassmorphCard";
import Image from "next/image";

type DataCountType = {
  id: string
}

const DataCount = (props: DataCountType) => {
  return (
    <div id={props.id} className="flex justify-between gap-10 mt-10">
      <GlassmorphCard
        className="rounded-[1.2rem] border-2 w-full px-5 py-5"
      >
        <div className="flex flex-col text-black text-center w-100 gap-3">
          <Image
            src={'/assets/icon/count-data/data-1.png'}
            alt=""
            width={50}
            height={50}
            className="mx-auto"
          />
          <h4 className="text-[2rem] font-semibold text-primary-800">
            500.000+
          </h4>
          <h5 className="text-xl font-medium text-text-primary">
            Pengiriman
          </h5>
        </div>
      </GlassmorphCard>
      <GlassmorphCard
        className="rounded-[1.2rem] border-2 w-full px-5 py-5"
      >
        <div className="flex flex-col text-black text-center w-100 gap-3 ">
          <Image
            src={'/assets/icon/count-data/data-2.png'}
            alt=""
            width={50}
            height={50}
            className="mx-auto"
          />
          <h4 className="text-[2rem] font-semibold text-primary-800">
            5000+
          </h4>
          <h5 className="text-xl font-medium text-text-primary">
            Customer
          </h5>
        </div>
      </GlassmorphCard>
      <GlassmorphCard
        className="rounded-[1.2rem] border-2 w-full px-5 py-5"
      >
        <div className="flex flex-col text-black text-center w-100 gap-3">
          <Image
            src={'/assets/icon/count-data/data-3.png'}
            alt=""
            width={50}
            height={50}
            className="mx-auto"
          />
          <h4 className="text-[2rem] font-semibold text-primary-800">
            80+
          </h4>
          <h5 className="text-xl font-medium text-text-primary">
            Armada
          </h5>
        </div>
      </GlassmorphCard>
      <GlassmorphCard
        className="rounded-[1.2rem] border-2 w-full px-5 py-5"
      >
        <div className="flex flex-col text-black text-center w-100 gap-3">
          <Image
            src={'/assets/icon/count-data/data-4.png'}
            alt=""
            width={50}
            height={50}
            className="mx-auto"
          />
          <h4 className="text-[2rem] font-semibold text-primary-800">
            8
          </h4>
          <h5 className="text-xl font-medium text-text-primary">
            Hub
          </h5>
        </div>
      </GlassmorphCard>
    </div>
  )
}

export default DataCount;