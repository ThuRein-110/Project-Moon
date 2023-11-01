"use client"

import React from 'react'
import Link from "next/link"
import {useState,useEffect} from "react"

function Login() {
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
  const loginInUser = ()=>{

  }
  return (
    <div className='flex items-center justify-center text-white'>
    <div className='  h-[500px] w-[350px] mt-[100px] rounded-md  p-4 flex items-center justify-center flex-col bg-[#1D4645] shadow-2xl' >
      <h1 className='font-bold text-2xl mb-[10px]'>Welcome back!</h1>
      <p>Please login to continue</p>
      <form className='flex flex-col gap-[30px] items-center justify-center mt-[15px]' onSubmit={loginInUser}>
        <div>
          <input type="email" placeholder='Email' className='bg-transparent text-white border-[1px] border-white w-[300px] px-2 h-[40px]' value={email} onChange={(e)=>setEmail(e.target.value)}/>

        </div>

        <div>
        <input type="password" placeholder='your password' className='bg-transparent text-white border-[1px] border-white w-[300px] px-2 h-[40px]' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div>
        <button className="bg-[#E8C5B0] text-black w-[280px] rounded-full p-2">Get Started</button>
        </div>
        <div className="text-white text-sm">
          <p>Dont have an account ? <Link href="/views/Signup" className='text-[#14f2fe] font-bold'>SignUp</Link></p>
        </div>
        <div className="text-white text-sm">
          <p><Link href="/">Go back home</Link></p>
        </div>
      </form>

    </div>
   </div>
  )
}

export default Login