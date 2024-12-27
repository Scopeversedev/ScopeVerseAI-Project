"use client";

import React, { useEffect, useState } from "react";
import axios from 'axios';
import CoinCard from "@/components/coinCard";

const TopAnalysis = () => {
  const [topMovers, setTopMovers] = useState([]);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchTopMovers = async () => {
    const response = await axios.get(`${backendUrl}/api/v1/top-movers`);
    console.log('top movers', response.data);
    setTopMovers(response.data);
  };

  useEffect(() => {
    fetchTopMovers();
  }, []);

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
    <div className="relative mb-20 flex justify-center w-full h-auto max-w-[1270px] rounded-[20px] p-[1px] bg-gradient-to-r from-[#C07EFF]/30 via-[#C07EFF]/30 to-[#C07EFF]/30">
      <div
        className="flex flex-col justify-center gap-y-10 items-center rounded-[20px] w-full max-w-[1270px] px-[20px] py-[30px]"
        style={{
          background: "linear-gradient(191.61deg, #14071D 35.15%, #1B0927 140.24%)",
          border: "1px solid radial-gradient(32.1% 32.1% at 62.81% 31.38%, #C07EFF 0%, rgba(192, 126, 255, 0) 100%)",
          borderRadius: "20px",
          borderImage: "linear-gradient(0deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.07))",
          borderImageSlice: 1,
        }}
      >
        <p className="font-600 text-[22px] leading-[28px] text-white w-full text-center ">
          Top Analysis
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 place-items-center justify-center mx-auto w-full max-w-[1270px] my-[20px]">
          {topMovers?.map((coin) => (
            <CoinCard
              key={coin._id}
              icon={coin.icon}
              name={coin.name}
              address={coin.address}
              marketCap={formatNumber(parseInt(coin.marketcap))} 
              //`${parseFloat(multiplier).toFixed(1)}x`
              changeRate={`${parseFloat(coin.multiplier).toFixed(1)}x`} // Limit to 4 decimals
              aiScore={coin.aiScore}
              oldMarketCap={coin.oldmarketcap}
              img={coin.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopAnalysis;
