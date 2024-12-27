'use client'
export default function AnalysisCard({data}) {
  function formatNumber(num) {
    if (num.includes('K') || num.includes('M') || num.includes('B'))  return num
    if (num < 1000) return num.toString(); // No formatting for numbers less than 1,000

    const suffixes = ['', 'K', 'M', 'B', 'T']; // Thousand, Million, Billion, Trillion
    let tier = Math.floor(Math.log10(Math.abs(num)) / 3); // Determine the suffix tier

    if (tier > suffixes.length - 1) tier = suffixes.length - 1; // Limit to largest suffix available

    const scaled = num / Math.pow(10, tier * 3); // Scale the number down to its tier
    const formatted = scaled.toFixed(1).replace(/\.0$/, ''); // Format with one decimal point, remove trailing .0

    return formatted + suffixes[tier];
  }
    return (
      <div className="flex items-center justify-center m-3">
        {/* Gradient border container */}
        <div className="relative rounded-[32px] p-[2px] bg-[#E18AFF] ">
          {/* Main card content */}
          <div className="lg:w-[17rem] md:w-[13rem] h-[13rem]  bg-bgCard rounded-[31px] p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <img className="w-10 h-10  rounded-full" src={data.img}/>
              <div className="space-y-0.5">
                <h2 className="text-white text-sm font-semibold">{data.name} Coin</h2>
                <p className="text-gray-400 text-sm font-mono">{data.address.length > 10 ? data.address.substring(0, 10) + "..." : data.address}</p>
              </div>
            </div>
            
            <div className="flex items-end justify-between relative">
              {/* Vertical divider */}
              <div className="absolute left-1/2 h-12 w-[1px] bg-purple-500/20" />
              
              <div className="space-y-1">
                <p className="text-xl font-bold text-white">{formatNumber(data.marketcap)}</p>
                <p className="text-gray-400 text-sm">Market Cap</p>
              </div>
              
              <div className="text-right space-y-1">
                <p className={`text-xl font-bold ${data.change24hr>0? "text-emerald-400" : "text-red-600"} `}>{data.change24hr}%</p>
                <p className="text-gray-400 text-sm">24 Hr Change</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  