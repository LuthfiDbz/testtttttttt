'use client'

import GlassmorphCard from "@/components/UI/card/GlassmorphCard";
import Image from "next/image";
import { useState } from "react";

type ProductsType = {
  id: string
}

type DataType = {
  id: number,
  alt: string,
  imgUrl: string,
  name: string,
  desc: string
}

const productsData: DataType[] = [
  {
    id: 1,
    alt: 'meat',
    imgUrl: '/assets/img/products/product1-meat.png',
    name: 'Daging',
    desc: 'Daging hewan dapat bertahan lama apabila disimpan pada suhu penyimpanan mulai dari -18 °C hingga -22 °C atau diatasnya (freze & deep freze). Sebelum dikirim, daging sebaiknya dikemas dengan bahan yang tahan air, rapi, dan kedap udara.'
  },
  {
    id: 2,
    alt: 'seafood',
    imgUrl: '/assets/img/products/product2-seafood.png',
    name: 'Hasil Laut',
    desc: 'Hasil laut dapat bertahan lama apabila disimpan pada suhu penyimpanan beku mulai dari -18 °C hingga -22 °C. Sedangkan, untuk hasil laut segar yang ingin segera dikonsumsi, sebaiknya dikirim dengan suhu 0 °C sampai 8 °C (Chill). Sebelum dikirim, hasil laut sebaiknya dikemas dengan bahan yang tahan air, rapi, dan kedap udara.'
  },
  {
    id: 3,
    alt: 'dairy',
    imgUrl: '/assets/img/products/product3-dairy.png',
    name: 'Produk Dairy',
    desc: 'Produk dairy adalah produk dari susu & olahan turunannya. Suhu penyimpanannya tergantung jenis produknya. Akan tetapi, mayoritas produk dairy baik disimpan dalam suhu 0 °C sampai 8 °C (Chill). Sebelum melalukan pengiriman, pastikan pengemasan dilakukan menggunakan bahan yang tahan air, kedap udara, serta dikemas dengan rapat agar produk tetap steril.'
  },
  {
    id: 4,
    alt: 'icecream',
    imgUrl: '/assets/img/products/product4-icecream.png',
    name: 'Ice Cream',
    desc: 'Ice Cream merupakan salah satu produk  yang rentan jika kaitannya dengan suhu. Suhu yang terlalu rendah akan merusak teksture ice cream, sedangkan suhu yang terlalu tinggi akan menyebabkan ice cream meleleh. Ice cream juga memiliki beberapa jenis tertentu. Akan tetapi, ice cream rata-rata disimpan pada suhu mulai dari -1 °C hingga -18 °C.'
  },
  {
    id: 5,
    alt: 'fruitveggie',
    imgUrl: '/assets/img/products/product5-fruitveggie.png',
    name: 'Buah dan Sayuran',
    desc: 'Buah dan sayuran merupakan bahan makanan alami yang memiliki banyak serat. Untuk menjaga kesegarannya, buah dan sayuran perlu disimpan dalam suhu mulai dari 0 °C sampai 8 °C (Chill).'
  },
  {
    id: 6,
    alt: 'beverages',
    imgUrl: '/assets/img/products/product6-beverages.png',
    name: 'Minuman',
    desc: 'Minuman memiliki banyak macam seperti jus buah, jus sayur, minuman fermentasi, dan minuman lain. Salah satu ciri minuman memerlukan suhu penyimpanan khusus adalah dari kadar gula yang ada di minuman. Minuman dapat disimpan dalam suhu mulai dari 0 °C sampai 8 °C (Chill) untuk menjaga kualitas minuman tersebut.'
  },
  {
    id: 7,
    alt: 'medic',
    imgUrl: '/assets/img/products/product7-medic.png',
    name: 'Obat & Alat Medis',
    desc: 'Obat dan alat medis merupakan barang yang harus steril karena akan digunakan ke pasien. Salah satu cara untuk menjaga steril adalah dengan menyimpan obat & alat medis di suhu tertentu yang relatif lebih dingin ketimbang suhu ruangan.'
  },
  {
    id: 8,
    alt: 'misc',
    imgUrl: '/assets/img/products/product8-misc.png',
    name: 'Barang lain',
    desc: 'Kami juga bisa mengirim jenis barang selain yang telah disebutkan sebelumnya, seperti vaksin, pengkat elektonik, kue, makanan kemasan, dan produk lain yang membutuhkan penanganan khusus terutama dalam suhu pengiriman.'
  }
]

const Products = (props: ProductsType) => {
  const [selectedProduct, setSelectedProduct] = useState(productsData[0])

  return (
    <div id={props.id} className="bg-products bg-cover px-26 pt-16 pb-24">
      <h3 className="text-text-primary text-4xl font-semibold text-center">Produk Yang Kami Tangani</h3>
      <GlassmorphCard className="border-2 rounded-3xl mt-10 w-fit h-[42vh] mx-auto px-5 py-5 flex gap-[3.56rem] text-text-primary justify-center">
        <Image
          src={selectedProduct?.imgUrl}
          alt={selectedProduct?.alt}
          width={300}
          height={300}
          className="mx-auto"
        />
        <div className="w-[27vw]">
          <h4 className="text-2xl font-medium">{selectedProduct?.name}</h4>
          <h5 className="text-lg leading-[1.625rem] mt-3">{selectedProduct?.desc}</h5>
        </div>
      </GlassmorphCard>
      <GlassmorphCard className="flex overflow-x-auto gap-5 w-full justify-between mt-5 px-5 py-0 rounded-3xl border-2 no-scrollbar">
        {productsData.map((data, index) => {
          if (selectedProduct?.id == data?.id) {
            return (
              <GlassmorphCard
                className="glass rounded-none w-[14%] shrink-0 border-0 hover:cursor-pointer px-5 py-5"
                key={data?.id}
              >
                <div className="flex flex-col text-black text-center w-100 gap-3">
                  <Image
                    src={data?.imgUrl}
                    alt={data?.alt}
                    width={100}
                    height={100}
                    className="mx-auto"
                  />
                </div>
              </GlassmorphCard>
            )
          } else {
            return (
              <div
                className="flex rounded-none w-[14%] shrink-0 border-0 justify-center items-center hover:cursor-pointer hover:bg-glass-white-20 hover:backdrop-blur-custom hover:shadow-glass transition-all hover:transition-all duration-300 px-5 py-5"
                key={data?.id}
                onClick={() => setSelectedProduct(data)}
              >
                <div className="flex flex-col text-black text-center w-100 gap-3">
                  <Image
                    src={data?.imgUrl}
                    alt={data?.alt}
                    width={100}
                    height={100}
                    className="mx-auto"
                  />
                </div>
              </div>
            )
          }
        })}
      </GlassmorphCard>
    </div>
  )
}

export default Products;