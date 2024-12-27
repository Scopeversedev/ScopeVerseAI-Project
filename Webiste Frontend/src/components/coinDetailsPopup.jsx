import React, { useEffect, useRef } from 'react';
import Image from "next/image";
import { ClipboardIcon, XIcon } from 'lucide-react';

const CoinDetailsPopup = ({
  isOpen,
  onClose,
  name,
  address,
  oldMarketCap,
  marketCap,
  aiScore,
  multiplier,
  img,
}) => {
  const popupRef = useRef();

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(address).then(() => {
      alert("Address copied to clipboard!");
    });
  };

  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        ref={popupRef}
        className="p-6 w-full max-w-md shadow-xl transform transition-all duration-300 ease-in-out"
        style={{
          border: "2px solid rgba(225, 138, 255, 0.3)",
          background: "linear-gradient(151.91deg, rgba(116, 0, 225, 0.9) 15.01%, rgba(153, 88, 215, 0.9) 82.6%)",
          borderRadius: "15px"
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Image
              src={img||"/chatbot.png"}
              height={40}
              width={40}
              alt="coin-image"
              className="rounded-full border-2 border-purple-400/1 mr-3"
            />
            <h2 className="text-2xl font-bold text-white">{name}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors duration-200">
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-white">Address:</span>
            <div className="flex items-center">
              <span className="text-sm text-gray-200 mr-2 truncate max-w-[150px]">{address}</span>
              <button
                onClick={handleCopyToClipboard}
                className="text-purple-300 hover:text-white transition-colors duration-200"
              >
                <ClipboardIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-white">Old Market Cap:</span>
            <span className="text-gray-200">{oldMarketCap}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-white">New Market Cap:</span>
            <span className="text-gray-200">{marketCap}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-white">AI Score:</span>
            <span className="text-gray-200">{aiScore}/100</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-white">Multiplier:</span>
            <span className="text-purple-300 font-bold">{multiplier}x</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetailsPopup;

