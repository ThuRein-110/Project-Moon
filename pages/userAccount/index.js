"use client"
import React, {useEffect,useState} from "react"
import axios from "axios"



function UserAccount(){
    const[user, setUser] = useState({})
    const [course,setCourse] = useState('');
    const [time,setTime] = useState('')

const userToken = Json.parse(localStorage.getItem("token"))
const userData = Json.parse(localStorage.getItem("usserData"))

const createTimer = async()=>{
    await axios.post("api/scheduler",{
        email:userData?.email,
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
    await axios.get("api/profile",{
        email:userData.email
    }).then((response)=>{
        setUser(response.data.userData)
    })
},[user])

if(!userToken){
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