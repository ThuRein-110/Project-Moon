"use client"

import React from 'react'
import Link from "next/link"
import {useState,useEffect} from "react"
import axios from "axios"
//import React from 'react'
   //import { supabase } from '@/superbaseConfig'
    import {
        FormControl,
        FormLabel,
        FormErrorMessage,
        FormHelperText,
        Input
      } from '@chakra-ui/react'
    
      import { Button, ButtonGroup } from '@chakra-ui/react'
      import {useRouter} from "next/navigation"

function Login() {
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [isError, setError] = useState(false)
const [loading, setLoading]= useState('')
const [errMessage, setErrorMessage] = useState('')
const router = useRouter()

  const loginInUser = async()=>{
    try{
      await axios.post("/api/login",{
        
         email:email,
         password:password,
       }).then((response)=>{
         console.log(response)
        const userToken = localStorage.getItem("token")
        if(!userToken){
          localStorage.setItem("token", response.data.token)
         
        }
        else{
          return
        }


       }).catch((err)=>{
           console.log(err.message)
       })
   }

   catch(error){
       console.log(error.message)
   } 
   finally{
     setLoading(false)
   }
    
   
  }
  return (
   
    
  
        <>
        <div className="w-[50%] m-auto mt-[10%]">
          <div>
            <h2 className="text-center text-2xl font-bold">Login</h2>
          </div>
         <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
          {!isError ? (
            <FormHelperText>
              Enter your registered email
            </FormHelperText>
          ) : (
            <FormErrorMessage className="text-red-800">Email is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
          {!isError ? (
            <FormHelperText>
              Enter your password
            </FormHelperText>
          ) : (
            <FormErrorMessage className="text-red-800">Password is required.</FormErrorMessage>
          )}

           <Button colorScheme='blue' onClick={loginInUser}>Buttons</Button>
        </FormControl>

        <div className="flex justify-between">
              <p>Do not have an account? <span className="text-red-600 cursor-pointer" onClick={()=> router.push("/authentication/signup")}>sign up</span></p>
              <p className="text-red-600 cursor-pointer">Forgot password?</p>
        </div>
       
        </div>
        </>
      )
    }
    
        
  


export default Login