"use client"; 

import { SegmentedProgress } from './segmentedProgress'
import Image from 'next/image'


const analysisSections = [
  {
    text: "we've got GOATseus Maximus on our radar and it's scoring a solid 8/10. Why, you ask? Well, for starters, the smarmoney is showing up  to the party. We've counted 15 significant transactions, which clearly shows that the big players see potential here.",
  },
  {
    text: "On top of that, the sentiment score is looking as sunny as a Greek island in summer, clocking in at 0.75. Folks are quite bullish about this one, which tends to be a good sign.",
  },
  {
    text: "Liquidity pool? Burned to a crisp. This should give investors some peace of mind since it reduces the chances of a rug pull.",
  },
  {
    text: "Now, before we get too excited, let's talk about the elephant in the room - the top 10 holders owning a meager 4.123% of the supply as of, oh, about 30 seconds ago. Centralization isn't a big concern here, but with such small ownership, it may lead to price volatility.",
  },
  {
    text: "Wrapping it up, GOATseus Maximus is showing promise, but remember, even Hercules had his challenges. Here's hoping that this goat doesn't turn into a sacrifice at the altar of the crypto gods. Keep those eyes peeled, folks!",
  },
]

const  AIAnalysisReport = ()=> {
  return (
    <div className='border-1 p-[1px] rounded-[20px] bg-gradient-to-r from-[#C07EFF]/30 via-[#C07EFF]/30 to-[#C07EFF]/30'>

    <div className="w-full max-w-[1268px] rounded-[20px] p-6 space-y-6 "
    style={{
        background: 'linear-gradient(191.61deg, #14071D 35.15%, #1B0927 140.24%)',
        
      }}
      >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
         <Image src='/analysis-star.png' width={34} height={30} alt='icon'/>
          <h2 className="text-white text-[19px] font-700 leading-[28px]">AI Analysis Report</h2>
        </div>
        <SegmentedProgress value={60} maxValue={100} segments={15} />
      </div>

      <div className="space-y-4">
        {analysisSections.map((section, index) => (
          <div key={index} className="flex gap-3">
            <Image src='/arrow-point.png' alt='icon' width={47.29} height={39.71} />
            <p className="text-white/80  text-[17px] font-Inter  leading-[23px] text-left">
              {section.text}
            </p>
          </div>
        ))}
      </div>
    </div>
      </div>
  )
}

export default AIAnalysisReport;