import React from 'react'

function AiRecommendation({comments}) {
  return (
    <div className="flex items-center justify-center p-4 mt-10 mb-40  ">
    <div className="relative rounded-[32px] p-[1px] bg-gradient-to-r from-purple-600/30 via-purple-500/30 to-purple-600/30">
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-[32px] blur-md bg-purple-500/20" aria-hidden="true" />
      <div className="relative w-full  bg-bgCard rounded-[31px] p-8 backdrop-blur-sm overflow-hidden">
        {/* Analysis Report Section */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-5 h-5 text-white"
            >
              <path
                d="M9 3H4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 3h-5a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 14H4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 14h-5a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">AI Analysis Report</h1>
        </div>



        <div className="space-y-4 text-left ">
          {
            // AIresult?
            comments.map((text, index) => (
              <div key={index} className="flex gap-3 items-start">
                <img src="/arrow.png" className="w-6 h-6  flex-shrink-0 mt-1" />
                <p className="text-white text-lg leading-relaxed normal-case">{text.charAt(0).toUpperCase() + text.slice(1)}</p>
              </div>
            ))


          }
        </div>
      </div>
    </div>

  </div>
  )
}

export default AiRecommendation