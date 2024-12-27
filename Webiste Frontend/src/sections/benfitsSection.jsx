"use client";

import React from 'react'

import BenifitsCards from '@/components/BenifitsCards'

const benfitsData = [
    {
      title: "AI POWERED",
      description: "Advanced machine learning ensures accurate, data-driven insights for smarter, safer trading decisions."
    },
    {
      title: "Lightning Fast",
      description: " Real-time analysis delivers actionable insights instantly, keeping you ahead in dynamic memecoin markets."
    },
    {
      title: "Conversation Based",
      description: "Engaging AI with a witty personality provides insights, guidance, and entertainment for every trading journey."
    },
    {
      title: "Trusted by Thousands ",
      description: "Join a growing community of users relying on ScopeVerse AI for informed and confident trading. More coming soon👀"
    },
  
  
  ]


const BenfitsSection = () => {
  return (
   
               <div className="flex flex-col items-center justify-center mt-40" id="benefits">
                 <h1 className="relative text-white text-5xl font-bold mt-40 ">
                   ScopeVerseAI Benefits
   
                 </h1>
                 <div className="flex flex-row m-20">
                   {benfitsData.map((value, index) => (
                     <BenifitsCards key={value.id || index} {...value} />
                   ))}
                 </div>
   
               </div>
  )
}

export default BenfitsSection;
