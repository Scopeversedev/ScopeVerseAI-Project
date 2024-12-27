"use client";
import Image from "next/image";
import Link from "next/link";
import Roadmap from "../components/Roadmap";
import { useEffect, useState } from "react";

import axios from "axios";
import BenifitsCards from "@/components/BenifitsCards";
import AnalysisCard from "@/components/AnaylsisCards";
import FAQ from "@/components/FAQ";
import StatsBar from "@/components/StatsBar";
import CryptoScoreMeter from "@/components/CryptoScoreMeter";
import AiRecommendation from "@/components/AiRecommendation";
import { toast, Bounce } from "react-toastify";
import DesktopNotice from "@/components/DesktopNotice";
import FeedbackCard from "@/components/FeedBackCard";
import { ProgressBar } from "@/components/ProgressBar";

import { File } from "lucide-react";
import TopAnalysis from "@/components/topAnalysis";

const benfitsData = [
  {
    title: "AI POWERED",
    description:
      "Advanced machine learning ensures accurate, data-driven insights for smarter, safer trading decisions.",
  },
  {
    title: "Lightning Fast",
    description:
      " Real-time analysis delivers actionable insights instantly, keeping you ahead in dynamic memecoin markets.",
  },
  {
    title: "Conversation Based",
    description:
      "Engaging AI with a witty personality provides insights, guidance, and entertainment for every trading journey.",
  },
  {
    title: "Trusted by Thousands ",
    description:
      "Join a growing community of users relying on ScopeVerse AI for informed and confident trading. More coming soon👀",
  },
];

const protectpassword = "123";
export default function Page() {
  // Get the base URL from .env.local
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const aiurl = process.env.NEXT_PUBLIC_AI_MODEL;

  // State variables
  const [passwordEntered, setpasswordEntered] = useState("");
  const [tokenAddress, settokenAddress] = useState("");
  const [tokenOverviewDetails, settokenOverviewDetails] = useState(null);
  const [AIresult, setAIresult] = useState(null);
  const [isAnalyzing, setisAnalyzing] = useState(false);
  const [dexscreenerData, setdexscreenerData] = useState(null);
  const [recentAnalysis, setrecentAnalysis] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [handlePopup, sethandlePopup] = useState(false);
  const [hasClicked, sethasClicked] = useState(false);

  const [score, setScore] = useState(5);
  useEffect(() => {
    // Detect mobile based on screen width
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 700); // Adjust width as needed
    };

    checkMobile(); // Initial check
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setScore(Math.random() * 9 + 1); // Random score between 1 and 10
    }, 1000); // Change score every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const fetchRecentAnalysis = async () => {
    const recentAnalysis = await axios.get(
      `${backendUrl}/api/v1/recent-analysis`
    );
    setrecentAnalysis(recentAnalysis.data.result);
  };

  useEffect(() => {
    fetchRecentAnalysis();
  }, []);

  function formatNumber(num) {
    if (num < 1000) return num.toString(); // No formatting for numbers less than 1,000

    const suffixes = ["", "K", "M", "B", "T"]; // Thousand, Million, Billion, Trillion
    let tier = Math.floor(Math.log10(Math.abs(num)) / 3); // Determine the suffix tier

    if (tier > suffixes.length - 1) tier = suffixes.length - 1; // Limit to largest suffix available

    const scaled = num / Math.pow(10, tier * 3); // Scale the number down to its tier
    const formatted = scaled.toFixed(1).replace(/\.0$/, ""); // Format with one decimal point, remove trailing .0

    return formatted + suffixes[tier];
  } // Get the base URL from .env.local

  useEffect(() => {
    const SaveData = async () => {
      const change = await axios.post(`${backendUrl}/api/v1/recent-analysis`, {
        name: tokenOverviewDetails["tokenOverview"]["data"]["name"],
        address: dexscreenerData["data"]["pairs"][0]["baseToken"]["address"],
        symbol: tokenOverviewDetails["tokenOverview"]["data"]["symbol"],
        marketcap: 
          dexscreenerData["data"]["pairs"][0]["marketCap"],
        img: dexscreenerData["data"]["pairs"][0]["info"]["imageUrl"],
        change24hr: dexscreenerData["data"]["pairs"][0]["priceChange"]["h24"],
        aiScore: AIresult.rating,
      });
    };
    if (tokenOverviewDetails && AIresult) {
      SaveData();
    }
  }, [AIresult, tokenOverviewDetails]);

  const AIMODEL = async (details) => {
    const result = await axios.post(`${aiurl}/coin-rating`, details);
    setisAnalyzing(false);
    const points = result.data.comment
      .split(/\n\s*\n|(?<=\.)\s{2,}/) // Split on double newlines or multiple spaces after periods
      .map((point) => point.trim()) // Trim whitespace
      .filter((point) => point.length > 0); // Remove empty entries
    result.data.comments = points;
    setAIresult(result.data);

    // doing update for latest analysis of coins.
  };

  const handleButtonclick = async () => {
    if (!tokenAddress) {
      toast.error("Please provide a token address.");
      return;
    }

    sethasClicked(true);
    setisAnalyzing(true);

 

    setAIresult(null);
    settokenOverviewDetails(null);
    try {
      const dexScreenerResult = await axios.get(
        `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`
      );
      setdexscreenerData(dexScreenerResult);
      // Request to /api/v1/token-details
      const tokenDetailsResponse = await axios.post(
        `${backendUrl}/api/v1/token-details`,
        { token: tokenAddress }
      );

      // Request to /api/v1/bundle-check
      const bundleCheckResponse = await axios.post(
        `${backendUrl}/api/v1/bundle-check`,
        { token: tokenAddress }
      );

      // Request to /api/v1/smart-money
      const smartMoneyResponse = await axios.post(
        `${backendUrl}/api/v1/smart-money`,
        { token: tokenAddress }
      );
      let burndata = "frozen";
      if (
        tokenDetailsResponse["data"]["data"]["burnData"]["data"]["items"] != []
      ) {
        burndata = "burnt";
      }

      settokenOverviewDetails(tokenDetailsResponse.data.data);
      let detailsForAImodel = {
        address: tokenAddress,
        market_cap: dexScreenerResult["data"]["pairs"][0]["marketCap"],
        symbol:
          tokenDetailsResponse["data"]["data"]["tokenOverview"]["data"][
            "symbol"
          ],
        name: tokenDetailsResponse["data"]["data"]["tokenOverview"]["data"][
          "name"
        ],
        volume: dexScreenerResult["data"]["pairs"][0]["volume"]["h24"],
        price_change: {
          last_24h: dexScreenerResult["data"]["pairs"][0]["priceChange"]["h24"],
          last_6h: dexScreenerResult["data"]["pairs"][0]["priceChange"]["h6"],
          last_1h: dexScreenerResult["data"]["pairs"][0]["priceChange"]["h1"],
        },
        volumeDetails: {
          "24h": {
            total: dexScreenerResult["data"]["pairs"][0]["volume"]["h24"],
            sell: dexScreenerResult["data"]["pairs"][0]["txns"]["h24"]["sells"],
            buy: dexScreenerResult["data"]["pairs"][0]["txns"]["h24"]["buys"],
          },
          "6h": {
            total: dexScreenerResult["data"]["pairs"][0]["volume"]["h6"],
            sell: dexScreenerResult["data"]["pairs"][0]["txns"]["h6"]["sells"],
            buy: dexScreenerResult["data"]["pairs"][0]["txns"]["h6"]["buys"],
          },
        },

        liquidity: {
          lp_status: burndata,
        },
        holder_distribution: {
          top_10_holders_percent:
            tokenDetailsResponse["data"]["data"]["securityData"]["data"][
              "top10UserPercent"
            ] * 100,
        },
        smart_money_activity: {
          significant_transactions:
            smartMoneyResponse["data"]["significantTransaction"],
        },
        bundling: bundleCheckResponse["data"]["is_bundled"],
        sentiment_analysis: {
          positive_sentiment_score: parseFloat(
            tokenDetailsResponse["data"]["data"]["LunarSentimentAnalysis"]
          ),
        },
      };

      const airesult = await AIMODEL(detailsForAImodel);
    } catch (error) {
      toast.error("Something Wents Wrong! Please Check Token Address.");

      setisAnalyzing(false);
    }
  };
  const onClose = () => {
    sethandlePopup(false);
  };
  const onSubmit = async (data) => {
    const result = await axios.post(`${backendUrl}/api/v1/feedback`, data);
    if (result.data) {
      toast.success("Thank you for your Feedback 😊");
    }
  };
  return (
    <>
      {isMobile ? (
        <DesktopNotice />
      ) : (
        <div className="min-h-screen bg-bgprimary">
          {/* Navigation */}
          {handlePopup ? (
            <FeedbackCard onClose={onClose} onSubmit={onSubmit} />
          ) : (
            ""
          )}
          <nav className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              <img
                src={"/logo.png"}
                className="w-[60px] h-[60px] mb-2 rounded-lg"
              />
              <span className="text-white font-semibold">ScopeVerse AI</span>
            </div>

            <div className="flex items-center gap-8 relative">
              <Link
                href="#benefits"
                scroll={true}
                className="text-gray-400 hover:text-white transition-colors z-20"
              >
                Benefits
              </Link>
              <Link
                href="#roadmap"
                scroll={true}
                className="text-gray-400 hover:text-white transition-colors z-20"
              >
                Roadmap
              </Link>
              <Link
                href="#recentanalysis"
                scroll={true}
                className="text-gray-400 hover:text-white transition-colors z-20"
              >
                Recent Analysis
              </Link>
              <button
                onClick={() => {
                  sethandlePopup(!handlePopup);
                }}
                className="text-gray-400 hover:text-white transition-colors z-20"
              >
                FeedBack
              </button>
              <Link
                href="https://docs.scopeverse.ai/"
                target="_blank"
                className="flex items-centre justify-center px-4 py-2 bg-[#1A1225] text-white rounded-lg hover:bg-[#251A33] transition-colors z-20"
              >
                <File height={16} className="mt-[2px]" />
                <span className=""> Documentation</span>
              </Link>
            </div>
          </nav>
          <img
            src="/stars.png"
            alt="Background"
            className="absolute inset-0 w-full h-[70%] object-cover my-auto "
          />
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
            <svg
              width="935"
              height="502"
              viewBox="0 0 935 502"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.7">
                <path
                  d="M934.5 251C934.5 320.039 882.371 382.656 797.836 428.043C713.321 473.419 596.531 501.5 467.5 501.5C338.469 501.5 221.679 473.419 137.164 428.043C52.6286 382.656 0.5 320.039 0.5 251C0.5 181.961 52.6286 119.344 137.164 73.9567C221.679 28.5809 338.469 0.5 467.5 0.5C596.531 0.5 713.321 28.5809 797.836 73.9567C882.371 119.344 934.5 181.961 934.5 251Z"
                  fill="url(#paint0_linear_19_2239)"
                  fillOpacity="0.35"
                />
                <path
                  d="M934.5 251C934.5 320.039 882.371 382.656 797.836 428.043C713.321 473.419 596.531 501.5 467.5 501.5C338.469 501.5 221.679 473.419 137.164 428.043C52.6286 382.656 0.5 320.039 0.5 251C0.5 181.961 52.6286 119.344 137.164 73.9567C221.679 28.5809 338.469 0.5 467.5 0.5C596.531 0.5 713.321 28.5809 797.836 73.9567C882.371 119.344 934.5 181.961 934.5 251Z"
                  stroke="url(#paint1_linear_19_2239)"
                  strokeOpacity="0.3"
                />
                <path
                  d="M934.5 251C934.5 320.039 882.371 382.656 797.836 428.043C713.321 473.419 596.531 501.5 467.5 501.5C338.469 501.5 221.679 473.419 137.164 428.043C52.6286 382.656 0.5 320.039 0.5 251C0.5 181.961 52.6286 119.344 137.164 73.9567C221.679 28.5809 338.469 0.5 467.5 0.5C596.531 0.5 713.321 28.5809 797.836 73.9567C882.371 119.344 934.5 181.961 934.5 251Z"
                  stroke="url(#paint2_radial_19_2239)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_19_2239"
                  x1="467.5"
                  y1="6.661e-07"
                  x2="461.5"
                  y2="398.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#1B0927" />
                  <stop offset="1" stopColor="#1B0927" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_19_2239"
                  x1="467.5"
                  y1="8.95956e-06"
                  x2="468"
                  y2="190.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#E18AFF" />
                  <stop offset="1" stopColor="#E18AFF" stopOpacity="0" />
                </linearGradient>
                <radialGradient
                  id="paint2_radial_19_2239"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(468 46.5) rotate(99.4623) scale(82.1173 152.948)"
                >
                  <stop stopColor="#E18AFF" />
                  <stop offset="1" stopColor="#E18AFF" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>
          {/* Hero Section */}
          <main className=" relative overflow-hidden max-w-6xl mx-auto px-6 pt-20 text-center h-auto">
            {/* <MovingStars/> */}
            <div className="absolute top-[30%] left-[0%] w-[7rem] h-[2px] rounded-3xl bg-gradient-to-r  from-transparent to-purple-500 -rotate-45 animate-shooting-star "></div>
            <div className="absolute top-[40%] left-[90%] w-[7rem] h-[2px] rounded-3xl bg-gradient-to-r  from-transparent to-purple-500 rotate-45 animate-shooting-star"></div>
            <div className="space-y-6">
              <span
                className="text-purple-500 text-sm border-[2px] py-2 px-5 rounded-[15px] border-white/10  linear-gradient(90deg, #C944F7 0%, #C07EFF 100%)
"
              >
                New Features Coming Soon
              </span>

              <h1 className="text-5xl font-bold text-white">
                The simple and <br />
                intelligent token{" "}
                <span className="bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">
                  analysis
                </span>
              </h1>

              <p className="text-gray-400 max-w-xl mx-auto">
                The advanced Solana token analysis powered by
                <br />
                artificial intelligence
              </p>

              <div className="flex items-center justify-center gap-4 max-w-xl mx-auto mt-8 pt-4">
                <input
                  type="text"
                  placeholder="Enter Token Address"
                  value={tokenAddress}
                  onChange={(e) => settokenAddress(e.target.value)}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-[#14071D] to-[#1B0927] rounded-lg text-white border border-purple-500/20 focus:outline-none focus:border-purple-500"
                />
                <div className="border border-white/10 p-1 rounded-lg">
                  <div className="border border-white/10 p-1 rounded-md">
                    <button
                      className="relative px-6 py-2 w-32 h-12 text-white rounded-md overflow-hidden transition-all duration-300 ease-in-out"
                      style={{
                        background:
                          "linear-gradient(151.91deg, #7400E1 15.01%, #9958D7 82.6%)",
                      }}
                      onClick={handleButtonclick}
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <div className="flex items-center justify-center space-x-1">
                          <div
                            className="w-2 h-2 bg-white rounded-full animate-bounce"
                            style={{ animationDelay: "0s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-white rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-white rounded-full animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      ) : (
                        <span className="inline-block transition-all duration-300 ease-in-out group-hover:scale-110">
                          Analyze
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              {hasClicked ? (
                isAnalyzing ? (
                  <ProgressBar maxValue={100} segments={15} />
                ) : (
                  <ProgressBar
                    value={AIresult?.rating}
                    maxValue={100}
                    segments={15}
                  />
                )
              ) : (
                ""
              )}
            </div>

            {/* <div className="w-100% flex items-center justify-center mt-5">
                {
                  AIresult ?
                    <CryptoScoreMeter score={AIresult.rating} />
                    :
                    <CryptoScoreMeter score={score} />

                }


              </div> */}

            <div
              style={{ boxShadow: "0 -10px 100px rgba(128, 0, 128, 0.4)" }}
            ></div>
          </main>

          {/* Stats Section */}
          <div className="w-full justify-center items-center flex flex-col ">
          <div className="w-full max-w-[1280px] flex flex-col justify-center items-center  ">
            {AIresult ? (
              <>
                <StatsBar
                  aiScore={AIresult?.rating}
                  liquidity={formatNumber(
                    dexscreenerData["data"]["pairs"][0]["liquidity"]["usd"]
                  )}
                  marketCap={formatNumber(
                    dexscreenerData["data"]["pairs"][0]["marketCap"]
                  )}
                  latestChange={dexscreenerData["data"]["pairs"][0][
                    "priceChange"
                  ]["h1"].toFixed(3)}
                  holderCount={
                    tokenOverviewDetails["tokenOverview"]["data"]["holder"]
                  }
                />
                <AiRecommendation comments={AIresult.comments} />
              </>
            ) : (
              ""
            )}
          </div>
          </div>

          <div className="my-20 flex flex-col justify-center items-center gap-y-[60px]">
            <TopAnalysis />
          </div>

          {/* benfits section */}
          <div
            className="flex flex-col items-center justify-center mt-40"
            id="benefits"
          >
            <h1 className="relative text-white text-[40px] font-600 mt-40 w-full text-center ">
              The Benifits
            </h1>
            <div className="flex flex-row m-20 mt-3">
              {benfitsData.map((value, index) => (
                <BenifitsCards key={value.id || index} {...value} />
              ))}
            </div>
          </div>

          <div
            className="flex flex-col  justify-start m-10"
            id="recentanalysis"
          >
            <div className="flex items-center gap-7">
              <h1 className="text-white text-2xl font-bold">Recent Analysis</h1>

              <div className="flex-1 h-[0.1px] bg-purple-400 opacity-1"></div>
            </div>

            <div className="grid grid-cols-5 grid-rows-2 mt-10 gap-4 ">
              {recentAnalysis.map((value, index) => (
                <AnalysisCard key={value.id || index} data={value} />
              ))}
            </div>
          </div>
          <div className="mt-20" id="roadmap">
            <Roadmap />
          </div>

          <FAQ />
        </div>
      )}
    </>
  );
}
