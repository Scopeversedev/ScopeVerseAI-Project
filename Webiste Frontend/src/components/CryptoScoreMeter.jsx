'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'


const CryptoScoreMeter = ({ score }) => {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    setAnimatedScore(score)
  }, [score])

  const getColor = (value) => {
    if (value <= 3) return '#FF4136' // Red
    if (value <= 7) return '#FFDC00' // Yellow
    return '#2ECC40' // Green
  }

  const angle = (animatedScore - 1) * 18 - 90 // -90 to 90 degrees

  return (
    <div className="w-84 h-84 relative">
      <svg viewBox="0 0 100 50" className="w-full">
        {/* Meter background */}
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke="#D397F8"
          strokeWidth="8"
        />
        
        {/* Colored sections */}
        <path
          d="M 10 50 A 40 40 0 0 1 34 15.36"
          fill="none"
          stroke="#B95CF4"
          strokeWidth="8"
        />
        <path
          d="M 34 15.36 A 40 40 0 0 1 66 15.36"
          fill="none"
          stroke="#A020F0"
          strokeWidth="8"
        />
        <path
          d="M 66 15.36 A 40 40 0 0 1 90 50"
          fill="none"
          stroke="#570987"
          strokeWidth="8"
        />

        {/* Needle */}
        <motion.line
          x1="50"
          y1="48"
          x2="50"
          y2="10"
          stroke="#FFFFFF"
          strokeWidth="2"
          initial={{ rotate: -90 }}
          animate={{ rotate: angle }}
          transition={{ type: 'spring', stiffness: 50 }}
          style={{ originX: '50px', originY: '50px' }}
        />

        {/* Center point */}
        <circle cx="50" cy="48" r="3" fill="#FFFFFF" />

        {/* Score text */}
        <text x="50" y="65" textAnchor="middle" fontSize="10" fill="#333">
          Score: {score.toFixed(1)}
        </text>
      </svg>

      {/* Labels */}
      <div className="absolute  left-0 text-lg text-purple-200">Poor      </div>
      <div className="absolute   left-1/2 -translate-x-1/2 text-lg text-purple-400">Moderate</div>
      <div className="absolute  right-0 text-lg text-purple-600">Excellent</div>
    </div>
  )
}

export default CryptoScoreMeter

