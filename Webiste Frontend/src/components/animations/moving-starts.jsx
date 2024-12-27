import { motion } from "framer-motion";
import React from "react";

const MovingStars = () => {
  // Example configuration for stars
  const stars = Array.from({ length: 20 }); // Adjust the number of stars

  return (
    <div className="hidden h-screen w-screen overflow-hidden bg-transparent">
      {stars.map((_, index) => (
        <motion.img
          key={index}
          src="/moving-star.png"
          alt="star"
          className="absolute w-6 h-6"
          style={{
            top: `${Math.random() * 100}%`, // Random starting vertical position
            left: `${Math.random() * 100}%`, // Random starting horizontal position
          }}
          animate={{
            y: ["-10%", "110%"], // Moves slightly beyond the viewport for smooth looping
          }}
          transition={{
            duration: Math.random() * 5 + 5, // Random duration between 5 and 10 seconds
            repeat: Infinity, // Infinite loop
            ease: "linear", // Linear motion for smooth continuous movement
          }}
        />
      ))}
    </div>
  );
};

export default MovingStars;
