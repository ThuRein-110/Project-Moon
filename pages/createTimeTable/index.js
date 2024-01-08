"use client"

import {useRouter} from "next/navigation"
import React, {useEffect,useState,useContext} from "react"
import axios from "axios"
import { Button, ButtonGroup } from '@chakra-ui/react'
import {firebaseapp} from "../../Firebase"
import {getFirestore} from "firebase/firestore"
import {getAuth} from  "firebase/auth";
import {setDoc,doc} from "firebase/firestore"
import { updateDoc,arrayUnion, onSnapshot } from "firebase/firestore"; 
import { getStorage, ref, getDownloadURL, deleteObject, uploadBytesResumable } from "firebase/storage";
import { Auth } from '../../Firebase/context';

function UserAccount(){
    
    const [course,setCourse] = useState('');
    const [time,setTime] = useState('')
    const [userToken, setToken] = useState('')
    const[venue,setVenue] = useState('')
    const[courseDate, setcourseDate] = useState('')
    const router = useRouter();
    const[loading,setLoading] = useState(false)
    const projectfirestore = getFirestore(firebaseapp)
const auth = getAuth(firebaseapp)


const {user} = useContext(Auth)
const createTimer = async(e)=>{
   e.preventDefault();
   setLoading(true)
    updateDoc(doc(projectfirestore,"singleUserCourses",`${user?.email}`),{
      saveCourses:arrayUnion({
          courseName:course,
          courseTime:time,
          courseVenue:venue,
          courseDate:courseDate,
          //userId:user.id
      })
    })
  
      setcourse('')
      setTime('')
      setVenue('')
      setcourseDate('')
      setLoading(false)
    
}
   
useEffect(()=>{

},[])




 return(

        <>
       <div className="md:mt-[140px] w-[50%] m-auto flex justify-center align-center text-sm mt-[200px] ">

        
            


        <div>

            <h1 className="font-bold text-3xl mb-[25px]">Enter Your Lectures Details</h1>

        <div><label className="font-bold text-red-600 mb-[10px] text-[20px]">Course title</label><br/>
        <input type="text" value={course} onChange={(e)=>setCourse(e.target.value)} className=" border-b-2 w-[300px]"/></div><br/>

        <div><label className="font-bold text-red-600 mb-[10px] text-[20px]" >Venue</label><br/>
        <input type="text" value={venue} onChange={(e)=>setVenue(e.target.value)} className=" border-b-2 w-[300px]"/></div><br/>

            <div><label for="appt" className="font-bold text-red-600 mb-[10px] text-[20px]">Time</label><br/>

          <input type="time" id="appt" name="appt" className="w-[250px]" required value={time} onChange={(e)=>setTime(e.target.value)} />
          
          </div><br/>

          <div>
          <label for="appt" className="font-bold text-red-600 mb-[10px] text-[20px]">Date</label><br/>
          <input type="date" id="appt" name="appt"  required value={courseDate} onChange={(e)=>setcourseDate(e.target.value)} className="w-[200px] mt-2" />
          </div>
<br/>
          <Button colorScheme='red' onClick={createTimer} className="w-[300px] mt-3">Save</Button>


        </div>


       </div>
        </>
    )


   
}

export default UserAccount;