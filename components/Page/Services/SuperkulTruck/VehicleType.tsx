'use client'

import GlassmorphCard from "@/components/UI/card/GlassmorphCard";
import Image from "next/image";
import { useState } from "react";

type ProductsType = {
  id: string,
  textData: any
}

type DataType = {
  id: number,
  name: string,
  length: number,
  width: number,
  height: number,
  weight: number,
  tempDown: number,
  tempUp: number
  area: string,
  imgUrl: string,
  alt: string,
}

// const vehicleTypeData: DataType[] = [
//   {
//     id: 1,
//     alt: 'meat',
//     imgUrl: '/assets/img/products/product1-meat.png',
//     name: 'Daging',
//     desc: 'Daging hewan dapat bertahan lama apabila disimpan pada suhu penyimpanan mulai dari -18 °C hingga -22 °C atau diatasnya (freze & deep freze). Sebelum dikirim, daging sebaiknya dikemas dengan bahan yang tahan air, rapi, dan kedap udara.'
//   },
//   {
//     id: 2,
//     alt: 'seafood',
//     imgUrl: '/assets/img/products/product2-seafood.png',
//     name: 'Hasil Laut',
//     desc: 'Hasil laut dapat bertahan lama apabila disimpan pada suhu penyimpanan beku mulai dari -18 °C hingga -22 °C. Sedangkan, untuk hasil laut segar yang ingin segera dikonsumsi, sebaiknya dikirim dengan suhu 0 °C sampai 8 °C (Chill). Sebelum dikirim, hasil laut sebaiknya dikemas dengan bahan yang tahan air, rapi, dan kedap udara.'
//   },
//   {
//     id: 3,
//     alt: 'dairy',
//     imgUrl: '/assets/img/products/product3-dairy.png',
//     name: 'Produk Dairy',
//     desc: 'Produk dairy adalah produk dari susu & olahan turunannya. Suhu penyimpanannya tergantung jenis produknya. Akan tetapi, mayoritas produk dairy baik disimpan dalam suhu 0 °C sampai 8 °C (Chill). Sebelum melalukan pengiriman, pastikan pengemasan dilakukan menggunakan bahan yang tahan air, kedap udara, serta dikemas dengan rapat agar produk tetap steril.'
//   },
//   {
//     id: 4,
//     alt: 'icecream',
//     imgUrl: '/assets/img/products/product4-icecream.png',
//     name: 'Ice Cream',
//     desc: 'Ice Cream merupakan salah satu produk  yang rentan jika kaitannya dengan suhu. Suhu yang terlalu rendah akan merusak teksture ice cream, sedangkan suhu yang terlalu tinggi akan menyebabkan ice cream meleleh. Ice cream juga memiliki beberapa jenis tertentu. Akan tetapi, ice cream rata-rata disimpan pada suhu mulai dari -1 °C hingga -18 °C.'
//   },
//   {
//     id: 5,
//     alt: 'fruitveggie',
//     imgUrl: '/assets/img/products/product5-fruitveggie.png',
//     name: 'Buah dan Sayuran',
//     desc: 'Buah dan sayuran merupakan bahan makanan alami yang memiliki banyak serat. Untuk menjaga kesegarannya, buah dan sayuran perlu disimpan dalam suhu mulai dari 0 °C sampai 8 °C (Chill).'
//   },
//   {
//     id: 6,
//     alt: 'beverages',
//     imgUrl: '/assets/img/products/product6-beverages.png',
//     name: 'Minuman',
//     desc: 'Minuman memiliki banyak macam seperti jus buah, jus sayur, minuman fermentasi, dan minuman lain. Salah satu ciri minuman memerlukan suhu penyimpanan khusus adalah dari kadar gula yang ada di minuman. Minuman dapat disimpan dalam suhu mulai dari 0 °C sampai 8 °C (Chill) untuk menjaga kualitas minuman tersebut.'
//   },
//   {
//     id: 7,
//     alt: 'medic',
//     imgUrl: '/assets/img/products/product7-medic.png',
//     name: 'Obat & Alat Medis',
//     desc: 'Obat dan alat medis merupakan barang yang harus steril karena akan digunakan ke pasien. Salah satu cara untuk menjaga steril adalah dengan menyimpan obat & alat medis di suhu tertentu yang relatif lebih dingin ketimbang suhu ruangan.'
//   },
//   {
//     id: 8,
//     alt: 'misc',
//     imgUrl: '/assets/img/products/product8-misc.png',
//     name: 'Barang lain',
//     desc: 'Kami juga bisa mengirim jenis barang selain yang telah disebutkan sebelumnya, seperti vaksin, pengkat elektonik, kue, makanan kemasan, dan produk lain yang membutuhkan penanganan khusus terutama dalam suhu pengiriman.'
//   }
// ]

const vehicleTypeData: DataType[] = [
  {
    id: 1,
    name: "L300",
    length: 249,
    width: 159,
    height: 120,
    weight: 1,
    tempDown: -22,
    tempUp: 10,
    area: "Jabodetabek",
    imgUrl: '/assets/img/vehicles/L300.png',
    alt: 'img-l300',
  },
  {
    id: 2,
    name: "CDE",
    length: 290,
    width: 150,
    height: 150,
    weight: 2,
    tempDown: -22,
    tempUp: 10,
    area: "Jawa, Bali dan Sumatera",
    imgUrl: '/assets/img/vehicles/CDE.png',
    alt: 'img-cde',
  },
  {
    id: 3,
    name: "CDD",
    length: 400,
    width: 170,
    height: 175,
    weight: 4,
    tempDown: -22,
    tempUp: 10,
    area: "Jawa, Bali dan Sumatera",
    imgUrl: '/assets/img/vehicles/CDD.png',
    alt: 'img-cdd',
  }
]

const VehicleType = (props: ProductsType) => {
  const [selectedProduct, setSelectedProduct] = useState(vehicleTypeData[0])

  return (
    <div id={props.id} className="pt-16 pb-24 mt-24">
      <h3 className="text-text-primary text-4xl font-semibold text-center">{props?.textData?.title}</h3>
      <div className="flex items-center justify-between gap-2 mt-12">
        <GlassmorphCard className="rounded-3xl border-2 no-scrollbar h-[70vh] py-5 overflow-scroll">
          {vehicleTypeData.map((data, index) => {
            if (selectedProduct?.id == data?.id) {
              return (
                <GlassmorphCard
                  className="glass rounded-none shrink-0 border-0 hover:cursor-pointer px-4 py-6"
                  key={data?.id}
                >
                  <div className="flex items-center text-black text-center w-100 gap-4">
                    <Image
                      src={data?.imgUrl}
                      alt={data?.alt}
                      width={180}
                      height={180}
                    />
                    <div className="flex flex-col gap-6">
                      <h4 className="text-xl text-text-primary font-medium text-start">{data?.name}</h4>
                      <h5 className="flex items-center gap-4 text-primary-500 underline">
                        <p>Detail</p>
                        <svg
                          className='w-3 h-3 text-primary-500 transition-all -rotate-90'
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="3"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </h5>
                    </div>
                  </div>
                </GlassmorphCard>
              )
            } else {
              return (
                <div
                  className="flex rounded-none shrink-0 border-0 justify-center items-center hover:cursor-pointer hover:bg-glass-white-20 hover:backdrop-blur-custom hover:shadow-glass transition-all hover:transition-all duration-300 px-4 py-6"
                  key={data?.id}
                  onClick={() => setSelectedProduct(data)}
                >
                  <div className="flex items-center text-black text-center w-100 gap-4">
                    <Image
                      src={data?.imgUrl}
                      alt={data?.alt}
                      width={180}
                      height={180}
                    />
                    <div className="flex flex-col gap-6">
                      <h4 className="text-xl text-text-primary font-medium text-start">{data?.name}</h4>
                      <h5 className="flex items-center gap-4 text-primary-500 underline">
                        <p>Detail</p>
                        <svg
                          className='w-3 h-3 text-primary-500 transition-all -rotate-90'
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="3"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </h5>
                    </div>
                  </div>
                </div>
              )
            }
          })}
        </GlassmorphCard>
        <GlassmorphCard className="border-2 rounded-3xl w-[74%] h-[70vh] py-6 px-16 gap-[3.56rem] text-text-primary justify-center">
          <h4 className="text-text-primary text-[2rem] font-medium">{selectedProduct?.name}</h4>
          <div className="flex mt-10 justify-start gap-8 items-center">
            <Image
              src={selectedProduct?.imgUrl}
              alt={selectedProduct?.alt}
              width={400}
              height={400}
              className="h-fit"
            />
            <div className=" text-text-primary">
              <h5 className="text-xl font-medium mb-4">{props?.textData?.vehicleInfo}</h5>
              <h5 className="text-lg ">{props?.textData?.dimension}</h5>
              <h5 className="text-lg ">{selectedProduct?.length} x {selectedProduct?.width} x {selectedProduct?.height}</h5>
              <br />
              <h5 className="text-lg ">{props?.textData?.maxWeight}</h5>
              <h5 className="text-lg ">{selectedProduct?.weight} Ton</h5>
              <br />
              <h5 className="text-lg ">{props?.textData?.temp}</h5>
              <h5 className="text-lg ">{selectedProduct?.tempDown}&deg;C  sampai  {selectedProduct?.tempUp}&deg;C</h5>
              <br />
              <h5 className="text-lg ">{props?.textData?.tripArea}</h5>
              <h5 className="text-lg ">{selectedProduct?.area}</h5>
            </div>
          </div>
        </GlassmorphCard>
      </div >
    </div >
  )
}

export default VehicleType;