'use client'
import { Shield, DollarSign, Users, TrendingUp, RefreshCw, TrendingDown } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { useState } from 'react'
import { FaRegEye } from "react-icons/fa6";
import Popup from './Popup';


export default function StatsBar({aiScore,liquidity,holderCount,latestChange,marketCap}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const openPopup = () => setIsPopupOpen(true)
  const closePopup = () => setIsPopupOpen(false)
     const [stats, setstats] = useState([
        {
          label: "Security Score",
          value: `${aiScore}/100`,
          icon: Shield,
          className: "text-purple-400"
        },
        {
          label: "Liquidity",
          value: liquidity,
          icon: DollarSign,
          className: "text-purple-400"
        },
        {
          label: "Holder Count",
          value: holderCount,
          icon: Users,
          className: "text-purple-400"
        },
        {
          label: "Latest Change",
          value: `${latestChange}%`,
          icon: latestChange>0?TrendingUp:TrendingDown ,
          className: latestChange>0?"text-green-400":"text-red-400"
        },
        {
          label: "Market Cap",
          value: marketCap,
          icon: RefreshCw,
          className: "text-purple-400"
        }
      ])
  return (
    <div className="w-full bg-[#14071D] p-5 rounded-xl mt-10">
       <Popup isOpen={isPopupOpen} onClose={closePopup}>
        <h2 className="text-xl text-white font-bold mb-4">Security Score Explanation
        </h2>
        <div className="p-6  rounded-lg shadow-lg">
      <p className="text-white mb-4">
        The Security Score is determined by evaluating multiple factors, including market cap,
        volume, liquidity, smart money activity, and our advanced AI algorithm. This score
        provides a comprehensive analysis of a coin’s performance and stability.
      </p>
      <p className="text-white mb-4">
        Below, the AI analysis offers a deeper insight into the coin’s metrics and overall
        evaluation.
      </p>
      <p className="text-white mb-4">
        The Security Score serves as a guideline for determining whether a coin is a good buy,
        a strong buy, a risky buy, or not recommended at all. While interpretations may vary,
        here’s a helpful baseline:
      </p>
      <ul className="list-disc list-inside text-white mb-4">
        <li>
          <span className="font-medium">80/100 to 100/100:</span> Strong Buy
        </li>
        <li>
          <span className="font-medium">60/100 to 70/100:</span> Buy
        </li>
        <li>
          <span className="font-medium">50/100:</span> Risky Buy
        </li>
      </ul>
      <p className="text-white">
        Use the Security Score to make informed decisions, keeping in mind that it’s one of
        many tools to evaluate a coin’s potential.
      </p>
    </div>
        <button onClick={closePopup}>Close</button>
      </Popup>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="bg-[#1D0C29] border-none p-4 relative">
              <div className="flex flex-col items-center text-center space-y-2">
                <Icon className={`w-5 h-5 ${stat.className}`} />
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className="text-xl font-bold text-white">{stat.value}</p>

                {
                  stat.label=="Security Score"?
                  <button onClick={openPopup} className='absolute bottom-0 right-2 text-gray-400'>

                

                  </button>
                  :""

                }
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

