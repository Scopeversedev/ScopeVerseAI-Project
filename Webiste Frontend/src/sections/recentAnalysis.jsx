import React from 'react'
import CoinCard from '@/components/coinCard';

const dummyData = [
  {
    icon: '/chatbot.png',
    name: 'Bitcoin',
    address: '0x1234567890',
    marketCap: '$1.9M',
    changeRate: '+12.5%'
  },
  {
    icon: '/chatbot.png',
    name: 'Ethereum',
    address: '0x0987654321',
    marketCap: '$1.5M',
    changeRate: '+10.5%'
  },
  {
    icon: '/chatbot.png',
    name: 'Ripple',
    address: '0x1122334455',
    marketCap: '$1.2M',
    changeRate: '+8.5%'
  },
  {
    icon: '/chatbot.png',
    name: 'Litecoin',
    address: '0x2233445566',
    marketCap: '$1.1M',
    changeRate: '+7.5%'
  },
  {
    icon: '/chatbot.png',
    name: 'Cardano',
    address: '0x3344556677',
    marketCap: '$1.0M',
    changeRate: '+6.5%'
  },
  {
    icon: '/chatbot.png',
    name: 'Bitcoin',
    address: '0x1234567890',
    marketCap: '$1.9M',
    changeRate: '+12.5%'
  },
  {
    icon: '/chatbot.png',
    name: 'Ethereum',
    address: '0x0987654321',
    marketCap: '$1.5M',
    changeRate: '+10.5%'
  },
  {
    icon: '/chatbot.png',
    name: 'Ripple',
    address: '0x1122334455',
    marketCap: '$1.2M',
    changeRate: '+8.5%'
  },
  {
    icon: '/chatbot.png',
    name: 'Litecoin',
    address: '0x2233445566',
    marketCap: '$1.1M',
    changeRate: '+7.5%'
  },
  {
    icon: '/chatbot.png',
    name: 'Cardano',
    address: '0x3344556677',
    marketCap: '$1.0M',
    changeRate: '+6.5%'
  }
]

const RecentAnalysis = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 place-items-center justify-center mx-auto w-full max-w-[1270px] my-[20px]">
      {dummyData.map((coin, index) => (
        <CoinCard
          key={index}
          icon={coin.icon}
          name={coin.name}
          address={coin.address}
          marketCap={coin.marketCap}
          changeRate={coin.changeRate}
        />
      ))}
    </div>
  )
}

export default RecentAnalysis;
