"use client";

import Image from "next/image";



export default function BenefitsCards({ title, description }) {
  return (
    <div className="flex items-center justify-center p-4 ">
      {/* Card container with gradient border */}
      <div
        className="relative rounded-[20px] p-[1px] w-[268px] h-[204px] bg-gradient-to-r border-[0.4px]  border-[#E18AFF]/10"  
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-[20px] blur-md bg-purple-500/20"
          style={{ opacity: "0px" }}
          aria-hidden="true"
        />

        {/* Main card content */}
        <div
          className="relative w-full h-full bg-gradient-to-b from-[#14071D] to-[#1B0927] rounded-[20px] p-4 overflow-hidden"
        >
          <div className="flex flex-col ">
            {/* Icon */}
            <div className="mb-0Hello. ">
           <Image src='/analysis-star.png' width={31} height={33} alt="icon" />
            </div>

            {/* Title */}
            <h2 className="text-[18px] font-600 w-full text-white">
              {title}
            </h2>
          </div>
          {/* Description */}
          <p className="text-gray-400 text-[13.5px] font-400 leading-relaxed mt-2 ">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
