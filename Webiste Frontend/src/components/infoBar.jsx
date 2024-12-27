"use client"; 

import React from 'react'
import { InfoCard } from './infoCard'

const dummyData = [
    {
        iconsSrc: '/security-score.png',
        title: 'Security Score',
        text: '7/10'
    },
    {
        iconsSrc: '/liquidity.png',
        title: 'Liquidity',
        text: '$1.9M'
    },
    {
        iconsSrc: '/holder-count.png',
        title: 'Holder Count',
        text: '1,484'
    },
    {
        iconsSrc: '/latest-change.png',
        title: 'Latest Change',
        text: '+12.5%'
    },
    {
        iconsSrc: '/market-cap.png',
        title: 'Market Cap',
        text: '$11.279M'
    },
]

const InfoBar = () => {
    return (
      <div className="flex justify-center w-full max-w-[1270px] rounded-[20px] p-[1px] bg-gradient-to-r from-[#C07EFF]/30 via-[#C07EFF]/30 to-[#C07EFF]/30">
        
        <div
          className="flex justify-between items-center h-[148px] rounded-[20px] w-full max-w-[1270px] px-[20px] "
          style={{
            background: 'linear-gradient(191.61deg, #14071D 35.15%, #1B0927 140.24%)',
            border: '1px solid  radial-gradient(32.1% 32.1% at 62.81% 31.38%, #C07EFF 0%, rgba(192, 126, 255, 0) 100%)', // Ensure fallback for unsupported borders
            borderRadius: '20px', // Add matching border-radius for smoother edges
            borderImage: `
              linear-gradient(0deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.07)), 
             `,
            borderImageSlice: 1,
          }}
        >
          {dummyData.map((data, index) => (
            <InfoCard key={index} iconSrc={data.iconsSrc} title={data.title} text={data.text} />
          ))}
        </div>
      </div>
    );
  };
  
  


export default InfoBar