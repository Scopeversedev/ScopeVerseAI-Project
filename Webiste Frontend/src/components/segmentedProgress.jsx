'use client'

import { useEffect, useState } from 'react'

export function SegmentedProgress({ value, maxValue = 100, segments = 10 }) {
  const [currentValue, setCurrentValue] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isIncrementing, setIsIncrementing] = useState(true) // Direction of animation

  useEffect(() => {
    if (value == null) {
      // Placeholder animation: increment and decrement continuously
      setIsAnimating(true)
      const animationDuration = 1000 // Total animation duration in milliseconds
      const steps = 60 // Number of steps in the animation
      const stepDuration = animationDuration / steps // Time per step
      const valueIncrement = maxValue / steps // Increment per step

      const intervalId = setInterval(() => {
        setCurrentValue((prevValue) => {
          if (prevValue >= maxValue && isIncrementing) {
            setIsIncrementing(false) // Switch to decrementing
            return prevValue - valueIncrement
          } else if (prevValue <= 0 && !isIncrementing) {
            setIsIncrementing(true) // Switch to incrementing
            return prevValue + valueIncrement
          } else {
            return isIncrementing
              ? prevValue + valueIncrement
              : prevValue - valueIncrement
          }
        })
      }, stepDuration)

      return () => clearInterval(intervalId)
    } else {
      // Stop placeholder animation and transition to the actual value
      setIsAnimating(false)
      const animationDuration = 1000 // Total animation duration in milliseconds
      const steps = 60 // Number of steps in the animation
      const stepDuration = animationDuration / steps // Time per step
      const valueIncrement = (value - currentValue) / steps // Increment per step

      let step = 0
      const intervalId = setInterval(() => {
        if (step < steps) {
          setCurrentValue((prevValue) => prevValue + valueIncrement)
          step++
        } else {
          setCurrentValue(value)
          clearInterval(intervalId)
        }
      }, stepDuration)

      return () => clearInterval(intervalId)
    }
  }, [value, currentValue, maxValue, isIncrementing])

  const activeSegments = Math.round((currentValue / maxValue) * segments)

  return (
    <div className="flex flex-col items-center">
      {/* Score display */}
      <div className="flex justify-between w-[184px]">
        <span className="text-[#8B8B9C] text-[15px] leading-[28px] font-medium">
          Your Score
        </span>
        <span className="text-white text-[15px] leading-[28px] font-semibold">
          {Math.round(currentValue)}
        </span>
      </div>

      {/* Progress bar */}
      <div
        className="relative w-[184px] h-4 rounded-full overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.3)] border border-white/5"
        style={{
          background: 'linear-gradient(191.61deg, #14071D 35.15%, #1B0927 140.24%)',
        }}
      >
        <div className="absolute inset-0 flex items-center px-1 pl-2 gap-[3px]">
          {Array.from({ length: segments }).map((_, i) => (
            <div
              key={i}
              className={`h-2.5 flex-1 transition-all duration-300 ease-in-out ${
                i === 0 ? 'rounded-l-full' : ''
              } ${
                i === segments - 1 ? 'rounded-r-full' : ''
              } ${
                i < activeSegments
                  ? 'bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.4)]'
                  : 'bg-transparent'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
