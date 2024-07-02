import GlassmorphCard from "@/components/UI/card/GlassmorphCard";
import { url } from "inspector";
import Image from "next/image";
import Link from "next/link";
import { title } from "process";

type ServicesType = {
  id: string
}

const servicesData = [
  {
    alt: 'services',
    imgUrl: '/assets/img/vehicles/vehicle-sameday.png',
    title: 'Superkul Sameday Delivery',
    desc: 'Kirim barang dingin dengan motor Superkul. Bisa kirim langsung lebih dari satu alamat, sehari sampai!',
    url: '/sameday-delivery'
  },
  {
    alt: 'services',
    imgUrl: '/assets/img/vehicles/vehicle-dedicated.png',
    title: 'Sewa Motor Superkul',
    desc: 'Sewa motor & driver Superkul, bisa harian maupun bulanan. Kirim sepuasnya, tanpa biaya tambahan!',
    url: '/dedicated'
  },
  {
    alt: 'services',
    imgUrl: '/assets/img/vehicles/vehicle-truck.png',
    title: 'Superkul Truck',
    desc: 'Kirim dengan truk berpendingin, tersedia pengiriman per kg (LTL) maupun full muatan (FTL)',
    url: '/superkul-truck'
  }
]

const Services = (props: ServicesType) => {
  return (
    <div id={props.id}>
      <h3 className="mt-20 text-text-primary text-4xl font-semibold text-center">Layanan Kami</h3>
      <div className=" flex gap-12 w-full justify-between mt-10 ">
        {servicesData.map((data, index) => {
          return (
            <GlassmorphCard
              className="rounded-[1.25rem] border-2 w-full px-5 py-5"
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
                <Link href={data?.url} className="text-end text-primary-600 flex justify-end items-center">Lihat selengkapnya
                  <span className="ms-3">
                    <svg
                      className={`w-5 h-5 text-primary-600 transition-all -rotate-90`}
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </span>
                </Link>
              </div>
            </GlassmorphCard>
          )
        })}
      </div>
    </div>
  )
}

export default Services;