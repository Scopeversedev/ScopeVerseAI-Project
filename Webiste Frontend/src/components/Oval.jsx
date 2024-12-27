import React from "react";

const GlowingOval = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="relative w-64 h-32 rounded-full bg-gradient-to-b from-gray-800 to-gray-600 overflow-hidden">
        {/* Glowing Bottom Border */}
        <div className="absolute bottom-0 left-0 w-full h-1 shadow-neon">
          <div className="w-full h-full bg-white blur-lg opacity-75"></div>
        </div>
      </div>
    </div>
  );
};

export default GlowingOval;
