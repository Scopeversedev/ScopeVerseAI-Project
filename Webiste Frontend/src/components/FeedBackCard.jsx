import React, { useState } from 'react';
import { X } from 'lucide-react';


export default function FeedbackCard({ onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, message });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#14071D] rounded-lg shadow-xl w-full max-w-md relative text-white">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-gray-300"
        >
          <X size={24} />
        </button>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <h2 className="text-2xl font-bold mb-4">We'd love your feedback!</h2>
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-[#2A0E3A] border border-[#3D1456] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B2A95] text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-[#2A0E3A] border border-[#3D1456] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B2A95] text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="feedback" className="block text-sm font-medium mb-1">
              Your Feedback
            </label>
            <textarea
              id="feedback"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 bg-[#2A0E3A] border border-[#3D1456] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B2A95] text-white"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#6B2A95] text-white py-2 px-4 rounded-md hover:bg-[#8A37BF] focus:outline-none focus:ring-2 focus:ring-[#8A37BF] focus:ring-offset-2 focus:ring-offset-[#14071D]"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}

