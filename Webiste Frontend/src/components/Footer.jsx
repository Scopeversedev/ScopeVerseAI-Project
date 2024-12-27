import Link from "next/link"
import { DiscIcon as Discord, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-bgprimary text-white ">

      <div className=" mx-auto px-4 py-8 shadow-xl  "
        style={{ boxShadow: "0 -10px 100px rgba(128, 0, 128, 0.4)" }}
      >
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          {/* Left Section - Logo & Description */}
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-2 mb-4">
              <img src={"/logo.png"} className="w-12 h-12 rounded-lg" />
              <h2 className="text-xl font-semibold">ScopeVerse AI</h2>
            </div>
            <p className="text-gray-400 max-w-xs">
              The advanced Solana token analysis powered by artificial intelligence
            </p>
          </div>

          {/* Center Section - Navigation */}
          <nav className="mb-6 md:mb-0">
            <h3 className="text-gray-500 mb-4">Menu</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#benefits" className="text-gray-400 hover:text-white transition-colors">
                  Benefits
                </Link>
              </li>
              <li>
                <Link href="#roadmap" className="text-gray-400 hover:text-white transition-colors">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link href="#recentanalysis" className="text-gray-400 hover:text-white transition-colors">
                  Recent Analysis
                </Link>
              </li>
              <li>
                <Link href="https://docs.scopeverse.ai/"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right Section - Social Icons */}
          <div className="flex gap-4">
            <Link
              href="https://x.com/ScopeVerseAI"
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="w-6 h-6" />
              <span className="sr-only">Twitter</span>
            </Link>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            All rights reserved, ScopeVerse AI 2024
          </p>

        </div>
      </div>
    </footer>
  )
}

