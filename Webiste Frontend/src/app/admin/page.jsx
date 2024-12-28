'use client'
import Layout from '@/components/layout'
import { BarChart, Users, DollarSign } from 'lucide-react'
import { useState } from 'react'

export default function Dashboard() {
    const [isAdmin, setisAdmin] = useState("")
  return (
    <>
    
   {isAdmin!=adminPassword?
        <div className="bg-bgprimary flex h-screen w-screen justify-center items-center">
        <input type="password" placeholder="Enter your Password" className="w-[20rem] p-2 h-10 rounded-lg " value={isAdmin} onChange={(e)=>{setisAdmin(e.target.value)}} />
      </div>
      :
    <Layout>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-500">Total Users</h2>
            <Users className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">1,234</div>
          <p className="text-xs text-gray-500">+10% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-500">Total Revenue</h2>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">$12,345</div>
          <p className="text-xs text-gray-500">+5% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-500">Active Users</h2>
            <BarChart className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">789</div>
          <p className="text-xs text-gray-500">+2% from last week</p>
        </div>
      </div>
    </Layout>
}
    </>
  )
}

