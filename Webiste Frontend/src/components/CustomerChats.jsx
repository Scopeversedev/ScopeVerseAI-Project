"use client"
import React, { useState } from 'react'
import axios from 'axios'
function CustomerChats() {
  const aiurl = process.env.NEXT_PUBLIC_AI_MODEL;
    const [showChats, setshowChats] = useState(true)
    const [messages, setmessages] = useState([
        {role:"bot",message:"Hi, Welcome to ScopeVerse AI ! 👋"}
    ])
    const [message, setmessage] = useState("")
    const aiRequest=async()=>{
        const result = await axios.post(
            `${aiurl}/ai-chatbot`,
            {message}
          );
          console.log(result)
        setmessages((prev)=>[...prev,{"role":"bot","message":result.data.message}])
    }
    const handleSendMessage=()=>{
        console.log("sending message to AI  ",message)
        setmessages((prev)=>[...prev,{"role":"user","message":message}])
        console.log(messages)
        setmessage("")
        // sending request for Chat bto
        
        aiRequest()
        

    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage(); // Call submit function
        }
      };
  return (
    <div>
    <div className="fixed bottom-0 right-5 mb-4 mr-4 z-30">
        <button id="open-chat" className="w-20 h-20 " onClick={()=>{setshowChats(!showChats)}}>
            <img src="/chatbot.png" alt="" />
        </button>
    </div>
    <div id="chat-container" className=" fixed bottom-28 right-4 w-96 z-30">
        <div className={`${showChats?"hidden":""} bg-white shadow-md rounded-lg max-w-lg w-full`}>
            <div className="p-4 border-b bg-purple-600 text-white rounded-t-lg flex justify-between items-center">
                <p className="text-lg font-semibold">Scope Bot</p>
                <button onClick={()=>{setshowChats(true)}} id="close-chat" className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div id="chatbox" className="p-4 h-80 overflow-y-auto">
                {
                    messages.map((value,index)=>{
                        if(value.role=="user"){
                            return  <div className="mb-2 text-right" key={index}>
                            <p className="bg-purple-600 text-white rounded-lg py-2 px-4 inline-block">{value.message}</p>
                          </div>
                            
                        }
                        else if(value.role=="bot"){
                            return  <div className="mb-2" key={index}>
                            <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">{value.message}</p>
                          </div>

                        }
                       
                    })
                }
             
            </div>
            <div className="p-4 border-t flex">
                <input onChange={(e)=>{setmessage(e.target.value)}} onKeyDown={handleKeyDown} value={message} id="user-input" type="text" placeholder="Type a message" className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-600"/>
                <button onClick={handleSendMessage} id="send-button" className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300">Send</button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default CustomerChats

    