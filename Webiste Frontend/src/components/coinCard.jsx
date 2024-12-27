"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ClipboardIcon } from 'lucide-react';
import CoinDetailsPopup from "./coinDetailsPopup";

const CoinCard = ({
  name,
  address,
  marketCap,
  changeRate,
  oldMarketCap,
  aiScore,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCopyToClipboard = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(address).then(() => {
      console.log("Copied to clipboard");
    });
  };

  const handleCardClick = () => {
    setIsPopupOpen(true);
  };
  function formatNumber(num) {
    if (num < 1000) return num.toString(); // No formatting for numbers less than 1,000

    const suffixes = ["", "K", "M", "B", "T"]; // Thousand, Million, Billion, Trillion
    let tier = Math.floor(Math.log10(Math.abs(num)) / 3); // Determine the suffix tier

    if (tier > suffixes.length - 1) tier = suffixes.length - 1; // Limit to largest suffix available

    const scaled = num / Math.pow(10, tier * 3); // Scale the number down to its tier
    const formatted = scaled.toFixed(1).replace(/\.0$/, ""); // Format with one decimal point, remove trailing .0

    return formatted + suffixes[tier];
  }
  return (
    <>
      <div
        className="max-w-[228px] min-w-[228px] w-full  rounded-[15px] p-4 cursor-pointer transition-transform duration-300 hover:scale-105 overflow-hidden bg-clip-padding border-[3px]  border-[#E18AFF]/30"
        style={{
          background: "linear-gradient(151.91deg, rgba(116, 0, 225, 0.1) 15.01%, rgba(153, 88, 215, 0.1) 82.6%)",
        }}
        onClick={handleCardClick}
      >
        <div className="flex items-center">
          <Image
            src="/chatbot.png"
            height={25}
            width={25}
            alt="coin-image"
            className="mr-2 rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-white text-[15px] font-bold font-sans">
              {name}
            </span>
            <div className="flex items-center">
              <span className="text-[11px] font-sans font-normal max-w-[90px] truncate text-gray-400">
                {address}
              </span>
              <button
                onClick={handleCopyToClipboard}
                className="ml-2 text-white hover:text-purple-500 transition-colors duration-200"
              >
                <ClipboardIcon className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-2 mx-1 w-full">
          <div className="flex flex-col">
            <span className="text-white text-[15px] font-bold font-sans">
             {marketCap}
            </span>
            <span className="w-full text-center  text-gray-400 text-[11px] font-sans font-normal">
              Market Cap
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[15px] font-sans text-purple-400 font-bold">
              {changeRate}
            </span>
            <span className=" w-full text-center text-[11px] font-sans font-normal text-gray-400">
              Multiple
            </span>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <CoinDetailsPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          name={name}
          address={address}
          oldMarketCap={formatNumber(parseInt(oldMarketCap))} 
          marketCap={marketCap}
          aiScore={aiScore}
          multiplier={changeRate}
        />
      )}
    </>
  );
};

export default CoinCard;
