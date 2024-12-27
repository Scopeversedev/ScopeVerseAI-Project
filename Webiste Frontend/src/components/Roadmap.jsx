"use client";
import React from "react";
import Image from "next/image";
const phases = [
  {
    phase: 1,
    title: "Launch Phase",
    description: 'Advanced AI integration, price predictions, and portfolio tracking Multi-chain support, trading automation, developer API',
    position: "right",
  },
  {
    phase: 2,
    title: "Growth Phase",
    description: 'Advanced AI integration, price predictions, and portfolio tracking Multi-chain support, trading automation, developer API',
    position: "left",
  },
  {
    phase: 3,
    title: "Expansion Phase",
    description: 'Advanced AI integration, price predictions, and portfolio tracking Multi-chain support, trading automation, developer API',
    position: "right",
  },
  {
    phase: 4,
    title: "Expansion Phase",
    description: 'Advanced AI integration, price predictions, and portfolio tracking Multi-chain support, trading automation, developer API',
    position: "left",
  },
];

export default function Roadmap() {
  return (
    <div className="relative w-full h-full overflow-hidden mt-10">
      <img
        src="/stars.png"
        alt="Background"
        className="absolute inset-0 w-full h-[70%] object-cover my-auto"
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

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <svg
          width="935"
          height="386"
          viewBox="0 0 935 386"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.7">
            <path
              d="M934.5 193C934.5 166.528 921.507 141.263 897.912 118.234C874.316 95.2025 840.146 74.4388 797.882 56.9906C713.355 22.095 596.548 0.5 467.5 0.5C338.452 0.5 221.645 22.095 137.118 56.9906C94.8538 74.4388 60.6838 95.2025 37.0877 118.234C13.4932 141.263 0.5 166.528 0.5 193C0.5 219.472 13.4932 244.737 37.0877 267.766C60.6838 290.797 94.8538 311.561 137.118 329.009C221.645 363.905 338.452 385.5 467.5 385.5C596.548 385.5 713.355 363.905 797.882 329.009C840.146 311.561 874.316 290.797 897.912 267.766C921.507 244.737 934.5 219.472 934.5 193Z"
              fill="url(#paint0_linear_24_2314)"
              fillOpacity="0.35"
            />
            <path
              d="M934.5 193C934.5 166.528 921.507 141.263 897.912 118.234C874.316 95.2025 840.146 74.4388 797.882 56.9906C713.355 22.095 596.548 0.5 467.5 0.5C338.452 0.5 221.645 22.095 137.118 56.9906C94.8538 74.4388 60.6838 95.2025 37.0877 118.234C13.4932 141.263 0.5 166.528 0.5 193C0.5 219.472 13.4932 244.737 37.0877 267.766C60.6838 290.797 94.8538 311.561 137.118 329.009C221.645 363.905 338.452 385.5 467.5 385.5C596.548 385.5 713.355 363.905 797.882 329.009C840.146 311.561 874.316 290.797 897.912 267.766C921.507 244.737 934.5 219.472 934.5 193Z"
              stroke="url(#paint1_linear_24_2314)"
              strokeOpacity="0.3"
            />
            <path
              d="M934.5 193C934.5 166.528 921.507 141.263 897.912 118.234C874.316 95.2025 840.146 74.4388 797.882 56.9906C713.355 22.095 596.548 0.5 467.5 0.5C338.452 0.5 221.645 22.095 137.118 56.9906C94.8538 74.4388 60.6838 95.2025 37.0877 118.234C13.4932 141.263 0.5 166.528 0.5 193C0.5 219.472 13.4932 244.737 37.0877 267.766C60.6838 290.797 94.8538 311.561 137.118 329.009C221.645 363.905 338.452 385.5 467.5 385.5C596.548 385.5 713.355 363.905 797.882 329.009C840.146 311.561 874.316 290.797 897.912 267.766C921.507 244.737 934.5 219.472 934.5 193Z"
              stroke="url(#paint2_radial_24_2314)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_24_2314"
              x1="467.5"
              y1="386"
              x2="463.952"
              y2="79.5553"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1B0927" />
              <stop offset="1" stopColor="#1B0927" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_24_2314"
              x1="467.5"
              y1="386"
              x2="467.796"
              y2="239.52"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E18AFF" />
              <stop offset="1" stopColor="#E18AFF" stopOpacity="0" />
            </linearGradient>
            <radialGradient
              id="paint2_radial_24_2314"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(468 350.245) rotate(-102.23) scale(63.7292 151.538)"
            >
              <stop stopColor="#E18AFF" />
              <stop offset="1" stopColor="#E18AFF" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Background Image */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 mb-40 ">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-white mb-3">Roadmap</h2>
          <p className="text-gray-400">Follow along our journey</p>
        </div>

        {/* Roadmap Container */}
        <div className="relative">
          {/* Roadmap Path Background */}
          <img
            src="/roadmap-path.png"
            alt="path"
            className="absolute left-[47%] -translate-x-1/2 top-[9%] w-[348px] h-[779px] z-0"
          />


        
          {/* Phase Containers */}
          {phases.map((phase, index) => (
            <div
              key={phase.phase}
              className={`relative w-[400px] ${
                phase.position === "left" ? "mr-auto right-20" : "ml-auto"
              } mb-[30px]`}
            >
              <div
                className="relative p-6 bg-bgCard rounded-[20px] h-full border-[#E18AFF26]/15 border"
                style={{
                  background: `linear-gradient(180deg, rgba(29, 12, 41, 0.9) 0%, rgba(29, 12, 41, 0.8) 100%)`,
                  boxShadow: `0 0 0 1px rgba(225, 138, 255, 0.15)`,
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* Phase Number */}
                <div
                  className={`absolute border-2 border-[#E18AFF1A]/10 ${
                    phase.position === "left"
                      ? "m-auto right-20 left-10 top-2"
                      : "m-auto right-20 left-10 top-1"
                  }  -translate-y-10 w-14 h-14 bg-[#1D0C29] rounded-full flex items-center justify-center text-[#E18AFF]`}
                >
                  {phase.phase}
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center items-center">
                <h3 className="text-[20px] font-600 text-white mb-3 w-full text-center">
                  {phase.title}
                </h3>
                <p className="text-[#8B8B9C] text-[16px] text-Inter text-center font-400 leading-relaxed w-ful max-w-[271px]">
                  {phase.description}
                </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
