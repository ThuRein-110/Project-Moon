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
  import {toast} from "react-toastify"
  import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import axios from 'axios'
import {ImSpinner8} from 'react-icons/im'
import {createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {firebaseapp} from "../../../Firebase"
import {getFirestore} from "firebase/firestore"
import {getAuth} from  "firebase/auth";
import {setDoc,doc} from "firebase/firestore"

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
    const projectfirestore = getFirestore(firebaseapp)
    const auth = getAuth(firebaseapp)

     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   

    const router = useRouter();

    const submit = async(e)=>{
      e.preventDefault();
      setSuccess(true);

      if(name !== "" || email !== "" || phone !== "" || dept !=="" || level !== "" || semester !== "" || matno !== ""){

        if(isNaN(phone) == false){
                    if(phone.length < 11){
                      
                         toast('Phone digits must have at least 11 characters',{autoClose:1000,type:'error',position:"top-right"})
                         setSuccess(false)
                         setErrorMessage("Phone digits must have at least 11 characters")
                        return;
                    }

        }

        else{
            toast('Phone number is not valid',{autoClose:1000,type:'error',position:'top-right'})
            setErrorMessage("Phone is not valid")
            setSuccess(false)
        return;
    }

    if(emailRegex.test(email) == false){
        toast('Email is not valid',{autoClose:1000,type:'error',position:'top-right'})
        setErrorMessage("Email is not valid")
        setSuccess(false);
        return;
    }

    await createUserWithEmailAndPassword(auth,email,password).then((response)=>{
      console.log(response)
      //localStorage.setItem('token', JSON.stringify(response.user.refreshToken))
      setSuccess(false)
      alert("Done")
         setEmail('')
         setName('')
         setPhone('')
         setMat('')
         setPassword('')
         setLevel('')
         setDept('')
         setSemester('')
         toast("Sign Up Successfully", {autoClose:1000, type:'success', position:'top-right'})
     
    //console.log(response)
 setDoc(
      doc(projectfirestore, "users",response.user.email),{
        Name:name,
        Email:email,
        Matno : matno,
        semester:semester,
        dept:dept,
        id:response.user.uid,
        level:level
      
      });
      setDoc(doc(projectfirestore,'singleUserCourses', `${email}`),{
        saveCourses:[]
       })
    }).catch((err)=>{
        if(err){
            toast(err.message,{autoClose:1000,type:'error',position:'top-right'})
            setErrorMessage(err.errMessage)
        }
        setSuccess(false)
        
    })
 setTimeout(()=>{
          router.push("/authentication/login")
        }, 3000)
}

     else{
   
      toast('Fields are empty, check',{autoClose:1000,type:'error',position:toast.POSITION.TOP_RIGHT})
      setErrorMessage("Field are empty, check")
      setSuccess(false)
 
     }
       
    }
  return (
    <>
 <div className="w-[50%] m-auto md:mt-[50px] flex flex-col items-center align-center mt-[60px]">
 <div>
            <h2 className="text-center text-2xl font-bold">Sign Up</h2>
          </div>
<br/><br/>
          <div className="flex flex-col gap-3 mt-[20px] text-sm">
          <FormControl>
      <FormLabel>Name</FormLabel>
      <Input type='text' value={name} onChange={(e)=>setName(e.target.value)}  placeholder="Aderoju Muhammed"/>
      
    </FormControl>

    <FormControl>
      <FormLabel>Department</FormLabel>
      <Input type='text' value={dept} onChange={(e)=>setDept(e.target.value)}  placeholder="Information Technology"/>
     
    </FormControl>

          </div><br/><br/>

<div className="flex flex-col gap-3 text-sm mt-[15px] ">
<FormControl>
      <FormLabel>Level</FormLabel>
      <Input type='text' value={level} onChange={(e)=>setLevel(e.target.value)}  placeholder="200 lvl" />
      
    </FormControl>

    
    <FormControl>
      <FormLabel>Matric no</FormLabel>
      <Input type='text' value={matno} onChange={(e)=>setMat(e.target.value)}  placeholder="ift/17/2763"/>
     
    </FormControl>
</div>
    <br/><br/>

    <div className="flex gap-3 text-sm mt-[15px] flex-col">

     <FormControl>
      <FormLabel>Email</FormLabel>
      <Input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder="Email"/>
     
    </FormControl>

   
    <FormControl>
      <FormLabel>Semester</FormLabel>
      <Input type='text' value={semester} onChange={(e)=>setSemester(e.target.value)} placeholder="first semester" />
      
    </FormControl></div><br/><br/>

    <div className="flex gap-3 text-sm mt-[15px] flex-col">

<FormControl>
 <FormLabel>Phone No</FormLabel>
 <Input type='text' value={phone} onChange={(e)=>setPhone(e.target.value)}  placeholder="Email"/>

</FormControl>

<FormControl>
      <FormLabel>Password</FormLabel>
      <Input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="password"/>
     
    </FormControl>
</div>
<br/><br/>

<div className="text-red-900 text-[12px] mt-[12px]">{errMessage ?<p>{errMessage}</p>: null}</div>
    <Button colorScheme='red' onClick={submit} className="w-[250px] mt-[20px]">{success ?<ImSpinner8 className="text-white animate-spin w-[30px]  "/>:<p className="text-[17px]">Register</p>}</Button>
    <div className="flex justify-center items-center mt-3 text-sm">
              <p>Already have an account? <span className="text-red-600 cursor-pointer font-bold text-sm" onClick={()=> router.push("/authentication/login")}>login</span></p>
             
        </div>

    </div>
    </>
  )
}

export default Signup