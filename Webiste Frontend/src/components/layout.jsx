import Link from 'next/link'
import { LayoutDashboard, MessageSquare, Settings } from 'lucide-react'

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          <Link href="/admin" className="block px-4 py-2 text-gray-600 hover:bg-gray-200 flex items-center">
            <LayoutDashboard className="mr-2" size={20} />
            Dashboard
          </Link>
          <Link href="/feedback" className="block px-4 py-2 text-gray-600 hover:bg-gray-200 flex items-center">
            <MessageSquare className="mr-2" size={20} />
            User Feedback
          </Link>
          <Link href="/settings" className="block px-4 py-2 text-gray-600 hover:bg-gray-200 flex items-center">
            <Settings className="mr-2" size={20} />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-lg font-semibold text-gray-900">Welcome, Admin</h1>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
