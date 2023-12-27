"use client"


import {useRouter} from "next/navigation"
import React, {useEffect,useState} from "react"
import axios from "axios"

function UserAccount(){
    const[user, setUser] = useState({})
    const [course,setCourse] = useState('');
    const [time,setTime] = useState('')
    const [userToken, setToken] = useState('')
    const router = useRouter();



const createTimer = async()=>{
    await axios.post("api/scheduler",{
        email:user?.email,
        course:course,
        time:time
    }).then((response)=>{
        console.log("time")
    })
}
const logout = ()=>{
    localStorage.removeItem("token")
    router.push("/authentication/login")
}
useEffect(async()=>{

    if(JSON.parse(localStorage.getItem("userData")) !== undefined  || JSON.parse(localStorage.getItem("token")) !== undefined){
        const userData = JSON.parse(localStorage.getItem("userData"))
        const token = JSON.parse(localStorage.getItem("token"))
        setToken(token)
        setUser(userData)
    }

    else{
        const userData = {}
        setUser(userData)
    }

   setUser(userData)
},[user])

if(!userToken || userToken == ""){
    router.push("/authentication/login");

    return
}

else{
 return(

        <>
       <div className="">

        <div>

        </div>


        <div>

        <div><label>Enter course title</label>
        <input type="text" value={course} onChange={(e)=>setCourse(e.target.value)}/></div>
            <div><label for="appt">Choose a time for your course:</label>

          <input type="time" id="appt" name="appt"  required value={time} onChange={(e)=>setTime(e.target.value)} /></div>


        </div>


       </div>
        </>
    )
}

   
}

export default UserAccount;