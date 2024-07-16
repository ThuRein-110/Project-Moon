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
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input
} from '@chakra-ui/react'

function UserAccount(){
    
    const [course,setCourse] = useState('');
    const [startTime,setStartTime] = useState('')
    const [endTime,setEndTime] = useState('')
    const [userToken, setToken] = useState('')
    const[venue,setVenue] = useState('')
    const[courseDate, setcourseDate] = useState('')
    const [courseDay,setDay] = useState('')
    const [success,setSuccess] = useState(false)
    const[errMessage,setErrorMessage] = useState('')
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
   setSuccess(true);
   setLoading(true)
if(venue == "" || course == "" || courseDate == "" || courseDay == "" || startTime == "" || endTime == ""){
setErrorMessage("Fields cannot be empty")
setLoading(false)
return;
}

else{
  await updateDoc(doc(projectfirestore,"singleUserCourses",`${user?.email}`),{
    saveCourses:arrayUnion({
        courseName:course,
        startTime:startTime,
        endTime:endTime,
        courseVenue:venue,
        courseDate:courseDate,
        courseDay: courseDay
        //userId:user.id
    })
  })
  setCourse('')
  setStartTime('')
  setEndTime('')
  setVenue('')
  setDay('')
  setcourseDate('')
  setSuccess(false);
  setLoading(false);
}
   
  
     
    
}
   
useEffect(()=>{

},[])




 return(

        <>
       <div className="md:mt-[60px] w-[50%] m-auto flex justify-center align-center text-sm mt-[20px] ">

        
            


        <div>

            <h1 className="font-bold text-[20px] mb-[30px] text-left">ENTER COURSE DETAILS</h1>

       <div className="flex-col flex md:flex-row gap-3">
       <div><label className="font-bold text-red-600 mb-[10px] text-[13px]">Course title</label><br/>
       <Input type="text" value={course} onChange={(e)=>setCourse(e.target.value)} className="  w-[300px]"/></div>

       <div><label className="font-bold text-red-600 mb-[10px] text-[13px]" >Venue</label><br/> 
        <Input type="text" value={venue} onChange={(e)=>setVenue(e.target.value)} className="  w-[300px]"/></div>
       </div>
       
        

       
  <div><br/>
    <h1 className="text-left text-[15px] font-bold mt-[10px] mb-[20px]">LECTURE DURATION</h1>

    <div className="flex-col flex md:flex-row gap-3">
    <div><label for="appt" className="font-bold text-red-600 mb-[10px] text-[13px]"> Start Time</label><br/>

<Input type="time" id="appt" name="appt" className="w-[250px]" required value={startTime} onChange={(e)=>setStartTime(e.target.value)} />

</div>
<div><label for="appt" className="font-bold text-red-600 mb-[10px] text-[13px]"> End Time</label><br/>

<Input type="time" id="appt" name="appt" className="w-[250px]" required value={endTime} onChange={(e)=>setEndTime(e.target.value)} />

</div>
    </div>
           

  </div> <br/>
  <h1 className="text-left text-[15px] font-bold mt-[10px] mb-[20px]">DAY OF LECTURE</h1>
  <div className="flex-col flex md:flex-row gap-3">
  <div>
          <label for="appt" className="font-bold text-red-600 mb-[10px] text-[13px]">Date</label><br/>
          <Input type="date" id="appt" name="appt"  required value={courseDate} onChange={(e)=>setcourseDate(e.target.value)} className="w-[200px] mt-2" />
          </div>

          <div>
          <label for="appt" className="font-bold text-red-600 mb-[10px] text-[13px]">Day of the week</label><br/>
          <Input type="text" id="appt" name="appt"  required value={courseDay} onChange={(e)=>setDay(e.target.value)} className="w-[200px] mt-2" placeholder="Monday"/>
          </div>
  </div>

           
         
<br/>
<div className="text-red-900 text-[12px] mt-[12px]">{errMessage ?<p>{errMessage}</p>: null}</div>
          <Button colorScheme='red' onClick={createTimer} className="w-[250px] mt-3">{loading ?<ImSpinner8 className="text-white animate-spin w-[30px] "/>:<p className="text-[17px]">Save</p>}</Button>
          
          &nbsp; &nbsp;
          <Button colorScheme='red' onClick={goNav} className="w-[250px] mt-3"><p className="text-[17px]">Load Time-Table</p></Button>

        </div>


       </div>
        </>
    )


   
}

export default UserAccount;