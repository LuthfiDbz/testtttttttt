'use client'

import GlassmorphCard from "@/components/UI/card/GlassmorphCard"
import Link from "next/link"
import { useState } from "react"

type FaqType = {
  id: string
}

const faqData = [
  {
    id: 1,
    question: 'Apa itu Superkul?',
    answer: 'Superkul merupakan penyedia layanan logistik untuk barang-barang yang membutuhkan suhu dingin. Superkul memiliki 3 layanan utama, yaitu Superkul sameday delivery, Sewa motor Superkul, dan Superkul Truck. Untuk menunjang layanan disediakan, Superkul juga menyediakan fitur dan teknologi yang dapat di akses melalui website dan aplikasi mobile Superkul.'
  },
  {
    id: 2,
    question: 'Jam berapa Superkul beroperasi?',
    answer: 'Layanan Superkul berporerasi 24 jam. Akan tetapi untuk pengiriman kami beroperasi dari jam 6 pagi sampai 4 sore, hari Senin sampai Sabtu.'
  },
  {
    id: 3,
    question: 'Superkul ada di area mana saja?',
    answer: 'Layanan superkul saat ini tersedia untuk daerah Jabodetabek, Bandung, Yogyakarta, dan Surabaya.'
  },
  {
    id: 4,
    question: 'Apa saja metode pembayaran Superkul?',
    answer: 'Superkul bekerja sama dengan salah satu penyedia layanan payment gateway terbesar di Indonesia, sehingga kamu dapat melakukan pembayaran dengan menggunakan berbagai metode pembayaran seperti Transfer Bank, Kartu Kredit/Debit, Outlet Ritel, E-wallet/QRIS, dan Debit.'
  }
]

const Faq = (props: FaqType) => {
  const [selectedQuestion, setSelectedQuestion] = useState(0)
  return (
    <div id={props.id} className="px-26 py-12  text-text-primary bg-ice2 bg-cover">
      <GlassmorphCard className="border-2 rounded-[2rem] mt-10 w-fit mx-auto px-10 py-10 text-text-primary backdrop-blur-custom">
        <h3 className="text-text-primary text-4xl font-semibold text-center mb-10">FAQ</h3>
        <ul className="shadow-box mt-6 mb-10">
          {faqData.map(dat => {
            return (
              <GlassmorphCard className="border-2 rounded-[1.25rem] mt-4 w-full mx-auto  text-text-primary">
                <li className="relative border-gray-200 ">
                  <button
                    type="button"
                    className="w-full px-6 py-6 text-left"
                    onClick={() => selectedQuestion == dat?.id ? setSelectedQuestion(0) : setSelectedQuestion(dat?.id)}
                  >
                    <div className="flex items-center justify-between text-2xl font-medium"> <span>{dat?.question}</span>
                      <svg
                        className={`w-7 h-7 text-text-primary transition-all ${selectedQuestion == dat?.id ? '-rotate-180' : 'rotate-0'}`}
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </button>
                  <div
                    className={`relative overflow-hidden transition-all duration-700 ${selectedQuestion == dat?.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="px-6 pb-6">
                      <p className="text-xl text-text-primary leading-[1.625rem]">{dat?.answer}</p>
                    </div>
                  </div>
                </li>
              </GlassmorphCard>
            )
          })}
        </ul>
        <Link href={`/faq`} className=" text-primary-600 flex justify-center items-center">Lihat selengkapnya
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
      </GlassmorphCard>
    </div>
  )
}

export default Faq;