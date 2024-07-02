'use client'

import GlassmorphCard from "@/components/UI/card/GlassmorphCard"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

type FeatureType = {
  id: string,
  textData: any
}

type DataType = {
  id: number,
  question: string,
  answer: string,
  imgUrl: string
}


const Feature = (props: FeatureType) => {
  const [selectedQuestion, setSelectedQuestion] = useState(
    {
      id: 1,
      question: props?.textData[1]?.f,
      answer: props?.textData[1]?.d,
      imgUrl: props?.textData[1]?.u
    },
  )

  const featuresData: DataType[] = [
    {
      id: 1,
      question: props?.textData[1]?.f,
      answer: props?.textData[1]?.d,
      imgUrl: props?.textData[1]?.u
    },
    {
      id: 2,
      question: props?.textData[2]?.f,
      answer: props?.textData[2]?.d,
      imgUrl: props?.textData[2]?.u
    },
    {
      id: 3,
      question: props?.textData[3]?.f,
      answer: props?.textData[3]?.d,
      imgUrl: props?.textData[3]?.u
    },
    {
      id: 4,
      question: props?.textData[4]?.f,
      answer: props?.textData[4]?.d,
      imgUrl: props?.textData[4]?.u
    },
    {
      id: 5,
      question: props?.textData[5]?.f,
      answer: props?.textData[5]?.d,
      imgUrl: props?.textData[5]?.u
    },
    {
      id: 6,
      question: props?.textData[6]?.f,
      answer: props?.textData[6]?.d,
      imgUrl: props?.textData[6]?.u
    },
  ]
  return (
    <div id={props.id} className="mt-32 py-12  text-text-primary">
      <GlassmorphCard className="border-2 rounded-[2rem] mt-10 w-full mx-auto px-10 py-10 text-text-primary backdrop-blur-custom">
        <h3 className="text-text-primary text-4xl font-semibold text-center mb-10">{props?.textData[0]}</h3>
        <div className="flex justify-between items-start">
          <Image
            src={selectedQuestion?.imgUrl}
            alt="feature-sameday"
            width={400}
            height={400}
            className="w-1/2 rounded-3xl"
          />
          <ul className="shadow-box mb-10 w-1/2">
            {featuresData.map(dat => {
              return (
                <li className="relative border-gray-200 ">
                  <button
                    type="button"
                    className="w-full px-6 py-4 text-left"
                    onClick={() => selectedQuestion?.id == dat?.id ? setSelectedQuestion({
                      id: 0,
                      question: '',
                      answer: '',
                      imgUrl: selectedQuestion?.imgUrl
                    }) : setSelectedQuestion(dat)}
                  >
                    <div className="flex items-center justify-between text-2xl font-medium"> <span>{dat?.question}</span>
                      <svg
                        className={`w-7 h-7 text-text-primary transition-all ${selectedQuestion?.id == dat?.id ? '-rotate-180' : 'rotate-0'}`}
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
                    className={`relative overflow-hidden transition-all duration-700 ${selectedQuestion?.id == dat?.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="px-6 pb-6">
                      <p className="text-xl text-text-primary leading-[1.625rem]">{dat?.answer}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </GlassmorphCard>
    </div>
  )
}

export default Feature;