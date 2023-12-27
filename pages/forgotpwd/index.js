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

function ResetPwd() {
const [email,setEmail] = useState("")
const [newpassword,setnewPassword] = useState("")
const [confirmPwd, setconfirmPwd] = useState('')
const [isError, setError] = useState(false)
const [loading, setLoading]= useState('')
const [errMessage, setErrorMessage] = useState('')
const [success,setSuccess] = useState(false)
const router = useRouter()
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



  const resetPwd = async(e)=>{
    e.preventDefault();

    setSuccess(true)
    if(newpassword !== "" || email !== "" || confirmPwd !== ""  ){

      if(newpassword !== confirmPwd){
        toast("Passwords are not the same", {autoClose:1000,type:'error',position:'top-right'})
        setSuccess(false);
        return;
      }
      if(emailRegex.test(email) == false){
        toast('Email is not valid',{autoClose:1000,type:'error',position:'top-right'})
        setSuccess(false);
        return;
    }

    try{
      await axios.post("/api/forgotpwd",{
        
         email:email,
         newpassword:newpassword,
         confirmPwd:confirmPwd
       }).then((response)=>{
        toast(response.data.message,{autoClose:1000,type:'success',position:'top-right'})
         console.log(response.data.message);
         router.push("/authentication/login")
        
       


       }).catch((err)=>{
        toast(err.message,{autoClose:1000,type:'error',position:'top-right'})
           console.log(err.message)
       })
   }

   catch(error){
       console.log(error.message)
   } 
   finally{
     setSuccess(false)
   }
    }
   
    
    
   
  }
  return (
   
    
  
        <>
        <div className="w-[50%] m-auto mt-[10%]">
          <div>
            <h2 className="text-center text-2xl font-bold">Reset Password</h2>
          </div>
         <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        
        </FormControl>
        <FormControl>
          <FormLabel> New Password</FormLabel>
          <Input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
         
          
        </FormControl>

        <FormControl>
          <FormLabel> Confirm Password</FormLabel>
          <Input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
        

           <Button colorScheme='blue' onClick={resetPwd}>{success ?<ImSpinner8 className="text-white animate-spin w-[30px] "/>:<p className="text-[17px]">Reset Password</p>}</Button>
        </FormControl>

       
       
        </div>
        </>
      )
    }
    
        
  


export default ResetPwd;