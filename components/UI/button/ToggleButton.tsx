'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { switchLocaleAction } from '@/actions/switch-locale'

const ToggleButton = ({ locale }: any) => {
  const [switchActive, setSwitchActive] = useState(locale)

  const handleLocaleChange = (event: any) => {
    switchActive === 'id' ? setSwitchActive('en') : setSwitchActive('id')
    switchLocaleAction(switchActive === 'id' ? 'en' : 'id');
  };

  return (
    <button
      className='relative bg-glass-white-20 backdrop-blur-custom rounded-2lg w-24 mx-auto px-3 py-2 text-text-primary flex text-xl items-center justify-between font-bold'
      onClick={handleLocaleChange}
    >
      <Image
        src={'/assets/icon/ic-flag-id.png'}
        alt='id'
        width={35}
        height={35}
        className={`absolute transition-all ${switchActive === 'id' ? 'ms-0' : 'ms-[40%]'} top-1`}
      />
      <div className='w-1/2'>EN</div>
      <div className='w-1/2'>ID</div>
    </button>
  )
}

export default ToggleButton;