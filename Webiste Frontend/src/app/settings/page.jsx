'use client'
import Layout from '@/components/layout'
import { useState } from 'react'

export default function Settings() {
    const [isAdmin, setisAdmin] = useState("")
  const adminPassword="Scope!?2891"
  return (
    <>
    {
        
        isAdmin!=adminPassword?
        <div className="bg-bgprimary flex h-screen w-screen justify-center items-center">
        <input type="password" placeholder="Enter your Password" className="w-[20rem] p-2 h-10 rounded-lg " value={isAdmin} onChange={(e)=>{setisAdmin(e.target.value)}} />
      </div>
      :
      <Layout>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Settings</h1>
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="site-name" className="block text-sm font-medium text-gray-700">Site Name</label>
          <input
            type="text"
            id="site-name"
            name="site-name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="My Admin Panel"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700">Admin Email</label>
          <input
            type="email"
            id="admin-email"
            name="admin-email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="admin@example.com"
          />
        </div>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Settings
        </button>
      </div>
    </Layout>
    }
   
    </>
  )
}

