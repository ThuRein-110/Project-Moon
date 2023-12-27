"use client"

import React,{useState,useEffect} from 'react'
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
  import 'react-toastify/dist/ReactToastify.css'
  import { ToastContainer } from 'react-toastify'
  import axios from 'axios'
  import {ImSpinner8} from 'react-icons/im'

function Signup() {

    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[name,setName] = useState('')
    const [level,setLevel] = useState('')
    const [dept,setDept] = useState('')
    const [matno, setMat] = useState('')
    const [phone, setPhone] = useState('')
    const [semester, setSemester] = useState("")
    const [isError, setError] = useState(false)
    const[loading,setLoading] = useState(false)
    const [errMessage, setErrorMessage] = useState('')
    const [success,setSuccess] = useState(false)

     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   

    const router = useRouter();

    const submit = async(e)=>{
      e.preventDefault();
      setSuccess(true)

      if(name !== "" || email !== "" || phone !== "" || dept !=="" || level !== "" || semester !== "" || matno !== ""){

        if(isNaN(phone) == false){
                    if(phone.length < 11){
                      
                         toast('Phone digits must have at least 11 characters',{autoClose:1000,type:'error',position:'top-right'})
                         setSuccess(false)
                        return;
                    }

        }

        else{
            toast('Phone number is not valid',{autoClose:1000,type:'error',position:'top-right'})
            setSuccess(false)
        return;
    }

    if(emailRegex.test(email) == false){
        toast('Email is not valid',{autoClose:1000,type:'error',position:'top-right'})
        setSuccess(false);
        return;
    }

    axios.post("/api/signup",{
      username:name,
      email:email,
      password:password,
      level:level,
      dept:dept,
      semester:semester,
      matno:matno,
      phone: phone
    },
   ).then((response)=>{
        setSuccess(false)
        setReg(true)
        setEmail('')
        setName('')
        setPhone('')
        setMat('')
        setPassword('')
        setLevel('')
        setDept('')
        setSemester('')
        toast(response.data.message, {autoClose:1000, type:'success', position:'top-right'})
        localStorage.setItem('userData', response.data.userData)
    }).catch((err)=>{
        if(err){
            toast(err.message,{autoClose:1000,type:'error',position:'top-right'})
        }
        setSuccess(false)
        
    })

}

     else{
   
      toast('Fields are empty, check',{autoClose:1000,type:'error',position:'top-right'})
      setSuccess(false)
      isError(true)
     }
       
    }
  return (
    <>
 <div className="w-[50%] m-auto mt-[10%]">
 <div>
            <h2 className="text-center text-2xl font-bold">Sign Up</h2>
          </div>
<br/>
          <div className="flex flex-row gap-3">
          <FormControl>
      <FormLabel>Name</FormLabel>
      <Input type='text' value={name} onChange={(e)=>setName(e.target.value)}  placeholder="Aderoju Muhammed"/>
      
    </FormControl>

    <FormControl>
      <FormLabel>Department</FormLabel>
      <Input type='email' value={dept} onChange={(e)=>setDept(e.target.value)}  placeholder="Information Technology"/>
     
    </FormControl>

          </div>

<div className="flex flex-row gap-3 ">
<FormControl>
      <FormLabel>Level</FormLabel>
      <Input type='text' value={email} onChange={(e)=>setLevel(e.target.value)}  placeholder="200 lvl" />
      
    </FormControl>

    
    <FormControl>
      <FormLabel>Matric no</FormLabel>
      <Input type='text' value={matno} onChange={(e)=>setMat(e.target.value)}  placeholder="ift/17/2763"/>
     
    </FormControl>
</div>
    

    <div className="flex gap-3">

     <FormControl>
      <FormLabel>Email</FormLabel>
      <Input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder="Email"/>
     
    </FormControl>
    <FormControl>
      <FormLabel>Semester</FormLabel>
      <Input type='text' value={semester} onChange={(e)=>setSemester(e.target.value)} placeholder="first semester" />
      
    </FormControl></div>

    <Button colorScheme='blue' onClick={submit}>{success ?<ImSpinner8 className="text-white animate-spin w-[30px] "/>:<p className="text-[17px]">Register</p>}</Button>
    <div className="flex justify-center items-center">
              <p>Already have an account? <span className="text-red-600 cursor-pointer" onClick={()=> router.push("/authentication/login")}>login</span></p>
             
        </div>

    </div>
    </>
  )
}

export default Signup