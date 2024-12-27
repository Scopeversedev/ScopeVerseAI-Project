import React from 'react'

function NavBar() {
  return (
    <div className="flex flex-row items-center bg-bgprimary h-[70px] w-full px-10">
    {/* Logo and Navigation Section */}
    <div className="flex items-center space-x-20">
        <div className="flex items-center space-x-3">
            <img src="" alt="logo" className="h-10 w-10" />
            <h1 className="text-white text-2xl font-bold">ScopeVerse Ai</h1>
        </div>

        <ul className="flex flex-row space-x-5 text-gray-400 text-sm">
            <li className="hover:underline cursor-pointer">Benefits</li>
            <li className="hover:underline cursor-pointer">Roadmap</li>
            <li className="hover:underline cursor-pointer">Recent Analysis</li>
        </ul>
    </div>

    {/* Documentation Button */}
    <button className="ml-auto px-5 py-2 border border-gray-500 text-gray-200 rounded hover:bg-gray-700 transition duration-200">
        Documentation
    </button>
</div>

  )
}

export default NavBar