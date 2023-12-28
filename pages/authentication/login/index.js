"use client"

import React from 'react'
import Link from "next/link"
import {useState,useEffect} from "react"
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import axios from 'axios'
import {ImSpinner8} from 'react-icons/im'
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
const [success,setSuccess] = useState(false)
const router = useRouter()
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const loginInUser = async(e)=>{

    e.preventDefault();

    setSuccess(true)

    if(password !== "" || email !== "" ){

      if(emailRegex.test(email) == false){
        toast('Email is not valid',{autoClose:1000,type:'error',position:'top-right'})
        setSuccess(false);
        return;
    }


    try{
      await axios.post("/api/login",{
        
         email:email,
         password:password,
       }).then((response)=>{
         console.log(response)
        const userToken = localStorage.getItem("token")
        if(userToken !== undefined){
          localStorage.setItem("token", response.data.token)
          setTimeout(()=>{
            router.push("/userAccount")
          }, 5000)
         
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


    else{
      
      toast('Fields are empty, check',{autoClose:1000,type:'error',position:'top-right'})
      setSuccess(false)

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
        
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
          

           <Button colorScheme='blue' onClick={loginInUser}>{success ?<ImSpinner8 className="text-white animate-spin w-[30px] "/>:<p className="text-[17px]">Login</p>}</Button>
        </FormControl>

        <div className="flex justify-between">
              <p>Do not have an account? <span className="text-red-600 cursor-pointer" onClick={()=> router.push("/authentication/signup")}>sign up</span></p>
              <p className="text-red-600 cursor-pointer" onClick={()=>router.push("/forgotpwd")}>Forgot password?</p>
        </div>
       
        </div>
        </>
      )
    }
    
        
  


export default Login