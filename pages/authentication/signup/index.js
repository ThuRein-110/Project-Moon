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
  import axios from "axios"

function Signup() {

    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[name,setName] = useState('')
    const [level,setLevel] = useState('')
    const [dept,setDept] = useState('')
    const [matno, setMat] = useState('')
    const [semester, setSemester] = useState("")
    const [isError, setError] = useState(false)
    const[loading,setLoading] = useState(false)
    const [errMessage, setErrorMessage] = useState('')
   

    const router = useRouter();

    const submit = async()=>{
      try{
         await axios.post("/api/signup",{
            username:name,
            email:email,
            password:password,
            level:level,
            dept:dept,
            semester:semester,
            matno:matno
          }).then((response)=>{
            console.log(response)
            localStorage.setItem("userData", response.data.userData)

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
            <h2 className="text-center text-2xl font-bold">Sign Up</h2>
          </div>
<br/>
          <div className="flex flex-row gap-3">
          <FormControl>
      <FormLabel>Name</FormLabel>
      <Input type='text' value={name} onChange={(e)=>setName(e.target.value)}  placeholder="Aderoju Muhammed"/>
      {!isError ? (
        <FormHelperText>
          
        </FormHelperText>
      ) : (
        <FormErrorMessage>Name cannot be empty.</FormErrorMessage>
      )}
    </FormControl>

    <FormControl>
      <FormLabel>Department</FormLabel>
      <Input type='email' value={dept} onChange={(e)=>setDept(e.target.value)}  placeholder="Information Technology"/>
      {!isError ? (
        <FormHelperText>
          
        </FormHelperText>
      ) : (
        <FormErrorMessage>Dept is required.</FormErrorMessage>
      )}5
    </FormControl>

          </div>

<div className="flex flex-row gap-3 ">
<FormControl>
      <FormLabel>Level</FormLabel>
      <Input type='text' value={email} onChange={(e)=>setLevel(e.target.value)}  placeholder="200 lvl" />
      {!isError ? (
        <FormHelperText>
          
        </FormHelperText>
      ) : (
        <FormErrorMessage>Your level is required.</FormErrorMessage>
      )}
    </FormControl>

    
    <FormControl>
      <FormLabel>Matric no</FormLabel>
      <Input type='text' value={matno} onChange={(e)=>setMat(e.target.value)}  placeholder="ift/17/2763"/>
      {!isError ? (
        <FormHelperText>
        </FormHelperText>
      ) : (
        <FormErrorMessage>Your matric number is required.</FormErrorMessage>
      )}
    </FormControl>
</div>
    

    <div className="flex gap-3">

     <FormControl>
      <FormLabel>Email</FormLabel>
      <Input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder="Email"/>
      {!isError ? (
        <FormHelperText>
       
        </FormHelperText>
      ) : (
        <FormErrorMessage>Email is required.</FormErrorMessage>
      )}
    </FormControl>
    <FormControl>
      <FormLabel>Semester</FormLabel>
      <Input type='text' value={semester} onChange={(e)=>setSemester(e.target.value)} placeholder="first semester" />
      {!isError ? (
        <FormHelperText>
       
        </FormHelperText>
      ) : (
        <FormErrorMessage>Email is required.</FormErrorMessage>
      )}
    </FormControl></div>

    <Button colorScheme='blue' onClick={submit}>Button</Button>
    <div className="flex justify-center items-center">
              <p>Already have an account? <span className="text-red-600 cursor-pointer" onClick={()=> router.push("/authentication/login")}>login</span></p>
             
        </div>

    </div>
    </>
  )
}

export default Signup