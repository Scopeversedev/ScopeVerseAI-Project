"use client"; 

import React from 'react'
import Image from 'next/image'


export const InfoCard = ({ iconSrc, title, text }) => {
  return (
    <div className="info-card mx-[7px] h-[92px] w-full max-w-[213px] rounded-[10px] font-Inter flex flex-col justify-center items-center  border-none"
        style={{
            background: 'rgba(29, 12, 41, 1)',
        }}

    >
     <span className='flex '>

      <Image src={iconSrc} alt={title} width={20} height={20} />

      <p className='text-[12px] leading-[28px] text-[#ffff]/50 font-400 ml-2'>{title}</p>
     </span>
      <p className='text-[#fff] font-700 text-[23px] leading-[28px] w-full text-center'>{text}</p>
    </div>
  )
}