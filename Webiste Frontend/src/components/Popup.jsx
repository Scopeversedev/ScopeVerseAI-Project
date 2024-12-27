'use client'
import React from 'react'
import { X } from 'lucide-react'



const Popup= ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-bgCard rounded-lg p-6 max-w-xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-gray-700"
          aria-label="Close popup"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  )
}

export default Popup

