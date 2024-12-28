"use client"
import Layout from '@/components/layout'
import { useEffect, useState } from 'react'
import axios from 'axios'


export default function UserFeedback() {
    const [isAdmin, setisAdmin] = useState("")
  const adminPassword=""
    const [feedbackData, setfeedbackData] = useState([])
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    

    const fetchFeedbacks = async () => {
        const feedbackresult = await axios.get(`${backendUrl}/api/v1/feedback`)
        console.log(feedbackresult)
        setfeedbackData(feedbackresult.data.data)
        
    
      }
    
      useEffect(() => {
        fetchFeedbacks()
    
      }, [])
  return (
    <>
    {
        isAdmin!=adminPassword?
        <div className="bg-bgprimary flex h-screen w-screen justify-center items-center">
        <input type="password" placeholder="Enter your Password" className="w-[20rem] p-2 h-10 rounded-lg " value={isAdmin} onChange={(e)=>{setisAdmin(e.target.value)}} />
      </div>
        :
        <Layout>
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">User Feedback</h1>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {feedbackData.map((feedback,index) => (
                <tr key={feedback._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{feedback.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feedback.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feedback.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    }

   
    </>
  )
}

