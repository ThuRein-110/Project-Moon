"use client"

import {useRouter} from "next/navigation"
import React, {useEffect,useState} from "react"
import axios from "axios"
import { Button, ButtonGroup } from '@chakra-ui/react'

function UserAccount(){
    
    const [course,setCourse] = useState('');
    const [time,setTime] = useState('')
    const [userToken, setToken] = useState('')
    const[venue,setVenue] = useState('')
    const router = useRouter();



const createTimer = async()=>{
    await axios.post("api/scheduler",{
        email:user?.email,
        course:course,
        time:time,
        venue:venue
    }).then((response)=>{
        console.log("time")
    })
}
   
useEffect(()=>{
    
    if(localStorage.getItem("userData") !== undefined  || localStorage.getItem("token") !== undefined){
       return;
    }

    else{
        
       router.push("/authentication/login");

    }

},[])




 return(

        <>
       <div className="mt-[160px] w-[50%] m-auto flex justify-center align-center text-sm ">

        
            


        <div>

            <h1 className="font-bold text-3xl mb-[20px]">Enter Your Lectures Details</h1>

        <div><label className="font-bold text-red-600 mb-[10px]">Course title</label><br/>
        <input type="text" value={course} onChange={(e)=>setCourse(e.target.value)} className=" border-b-2 w-[300px]"/></div><br/>

        <div><label className="font-bold text-red-600 mb-[10px]" >Venue</label><br/>
        <input type="text" value={venue} onChange={(e)=>setVenue(e.target.value)} className=" border-b-2 w-[300px]"/></div><br/>

            <div><label for="appt" className="font-bold text-red-600 mb-[10px]">Time</label><br/>

          <input type="time" id="appt" name="appt" className="w-[250px]" required value={time} onChange={(e)=>setTime(e.target.value)} />
          
          </div><br/>

          <div>
          <label for="appt" className="font-bold text-red-600 mb-[10px]">Date</label><br/>
          <input type="date" id="appt" name="appt"  required value={time} onChange={(e)=>setTime(e.target.value)} className="w-[200px] mt-2" />
          </div>
<br/>
          <Button colorScheme='red' onClick={createTimer}>Save</Button>


        </div>


       </div>
        </>
    )


   
}

export default UserAccount;