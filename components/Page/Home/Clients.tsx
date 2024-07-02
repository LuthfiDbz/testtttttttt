import GlassmorphCard from "@/components/UI/card/GlassmorphCard";
import Image from "next/image";

type ClientsType = {
  id: string
}

const clientData = [
  {
    alt: 'chiayo',
    imgUrl: '/assets/icon/client/chiayo.png'
  },
  {
    alt: 'goodheart',
    imgUrl: '/assets/icon/client/goodheart.png'
  },
  {
    alt: 'amazing',
    imgUrl: '/assets/icon/client/amazing.png'
  },
  {
    alt: 'flashcoffee',
    imgUrl: '/assets/icon/client/flashcoffee.png'
  },
  {
    alt: 'campina',
    imgUrl: '/assets/icon/client/campina.png'
  },
  {
    alt: 'tigaraksa',
    imgUrl: '/assets/icon/client/tigaraksa.png'
  },
  {
    alt: 'haagen',
    imgUrl: '/assets/icon/client/haagen.png'
  },
  {
    alt: 'prima',
    imgUrl: '/assets/icon/client/prima.png'
  },
  {
    alt: 'threefolks',
    imgUrl: '/assets/icon/client/threefolks.png'
  },
  // {
  //   alt: 'freshfactory',
  //   imgUrl: '/assets/icon/client/freshfactory.png'
  // },
  // {
  //   alt: 'sekarbumi',
  //   imgUrl: '/assets/icon/client/sekarbumi.png'
  // },
  {
    alt: 'maza',
    imgUrl: '/assets/icon/client/maza.png'
  },
  {
    alt: 'karajo',
    imgUrl: '/assets/icon/client/karajo.png'
  },
  {
    alt: 'sidoagung',
    imgUrl: '/assets/icon/client/sidoagung.png'
  },
  {
    alt: 'primafood',
    imgUrl: '/assets/icon/client/primafood.png'
  },
  {
    alt: 'frozendept',
    imgUrl: '/assets/icon/client/frozendept.png'
  },
  {
    alt: 'kanemory',
    imgUrl: '/assets/icon/client/kanemory.png'
  },
  {
    alt: 'lesglacee',
    imgUrl: '/assets/icon/client/lesglacee.png'
  },
  {
    alt: 'venchi',
    imgUrl: '/assets/icon/client/venchi.png'
  },
  {
    alt: 'joyday',
    imgUrl: '/assets/icon/client/joyday.png'
  },
  {
    alt: 'sewu',
    imgUrl: '/assets/icon/client/sewu.png'
  },
  {
    alt: 'batamindo',
    imgUrl: '/assets/icon/client/batamindo.png'
  },
  {
    alt: 'mcdeli',
    imgUrl: '/assets/icon/client/mcdeli.png'
  },
  {
    alt: 'bakersun',
    imgUrl: '/assets/icon/client/bakersun.png'
  },
  {
    alt: 'beleaf',
    imgUrl: '/assets/icon/client/beleaf.png'
  },
  {
    alt: 'vilo',
    imgUrl: '/assets/icon/client/vilo.png'
  },
  {
    alt: 'fore',
    imgUrl: '/assets/icon/client/fore.png'
  },
]

const Clients = (props: ClientsType) => {
  return (
    <div id={props.id}>
      <h3 className="mt-20 text-text-primary text-4xl font-semibold text-center">Dipercaya Oleh Ribuan Pengguna</h3>
      <div className=" flex px-4 pb-10 overflow-x-auto gap-10 w-full justify-between mt-10">
        {clientData.map((data, index) => {
          return (
            <GlassmorphCard
              className="rounded-[0.75rem] w-[12%] shrink-0 border-2 px-3 py-1"
              key={index}
            >
              <div className="flex flex-col text-black text-center w-100 gap-3">
                <Image
                  src={data?.imgUrl}
                  alt={data?.alt}
                  width={150}
                  height={150}
                  className="mx-auto"
                />
              </div>
            </GlassmorphCard>
          )
        })}
      </div>
    </div>
  )
}

export default Clients;