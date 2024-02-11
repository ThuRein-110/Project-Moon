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
import {ImSpinner8} from 'react-icons/im'

function UserAccount(){
    
    const [course,setCourse] = useState('');
    const [startTime,setStartTime] = useState('')
    const [endTime,setEndTime] = useState('')
    const [userToken, setToken] = useState('')
    const[venue,setVenue] = useState('')
    const[courseDate, setcourseDate] = useState('')
    const [courseday,setDay] = useState('')
    const [success,setSuccess] = useState(false)
    const router = useRouter();
    const[loading,setLoading] = useState(false)
    const projectfirestore = getFirestore(firebaseapp)
const auth = getAuth(firebaseapp)


const {user} = useContext(Auth)

const goNav = ()=>{
  router.push("/userAccount");
  return;
}
const createTimer = async(e)=>{
   e.preventDefault();
   setSuccess(true)

   await updateDoc(doc(projectfirestore,"singleUserCourses",`${user?.email}`),{
      saveCourses:arrayUnion({
          courseName:course,
          startTime:startTime,
          endTime:endTime,
          courseVenue:venue,
          courseDate:courseDate,
          courseDay: courseday
          //userId:user.id
      })
    })
  
      setCourse('')
      setStartTime('')
      setEndTime('')
      setVenue('')
      setDay('')
      setcourseDate('')
      setSuccess(false)
    
}
   
useEffect(()=>{

},[])




 return(

        <>
       <div className="md:mt-[140px] w-[50%] m-auto flex justify-center align-center text-sm mt-[100px] ">

        
            


        <div>

            <h1 className="font-bold text-[20px] mb-[25px] text-center">Enter Your Lectures Details</h1>

        <div><label className="font-bold text-red-600 mb-[10px] text-[13px]">Course title</label><br/>
        <input type="text" value={course} onChange={(e)=>setCourse(e.target.value)} className=" border-b-2 w-[300px]"/></div><br/>

        <div><label className="font-bold text-red-600 mb-[10px] text-[13px]" >Venue</label><br/>
        <input type="text" value={venue} onChange={(e)=>setVenue(e.target.value)} className=" border-b-2 w-[300px]"/></div><br/>
  <div>
    <h1 className="text-center text-[15px] font-bold mt-[20px] mb-[20px]">Course Duration</h1>
            <div><label for="appt" className="font-bold text-red-600 mb-[10px] text-[13px]"> Start Time</label><br/>

          <input type="time" id="appt" name="appt" className="w-[250px]" required value={startTime} onChange={(e)=>setStartTime(e.target.value)} />
          
          </div><br/>

          <div><label for="appt" className="font-bold text-red-600 mb-[10px] text-[13px]"> End Time</label><br/>

<input type="time" id="appt" name="appt" className="w-[250px]" required value={endTime} onChange={(e)=>setEndTime(e.target.value)} />

</div></div><br/>

          <div>
          <label for="appt" className="font-bold text-red-600 mb-[10px] text-[13px]">Date</label><br/>
          <input type="date" id="appt" name="appt"  required value={courseDate} onChange={(e)=>setcourseDate(e.target.value)} className="w-[200px] mt-2" />
          </div> <br/>
          <div>
          <label for="appt" className="font-bold text-red-600 mb-[10px] text-[13px]">Day of the week</label><br/>
          <input type="text" id="appt" name="appt"  required value={courseday} onChange={(e)=>setDay(e.target.value)} className="w-[200px] mt-2" placeholder="Monday"/>
          </div>
<br/>
          <Button colorScheme='red' onClick={createTimer} className="w-[250px] mt-3">{success ?<ImSpinner8 className="text-white animate-spin w-[30px] "/>:<p className="text-[17px]">Save</p>}</Button>
          
          
          <Button colorScheme='red' onClick={goNav} className="w-[250px] mt-3"><p className="text-[17px]">Load Time-Table</p></Button>

        </div>


       </div>
        </>
    )


   
}

export default UserAccount;