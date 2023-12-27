"use client"
import React, {useEffect,useState} from "react"
import axios from "axios"



function UserAccount(){
    const[user, setUser] = useState({})
    const [course,setCourse] = useState('')

const userToken = Json.parse(localStorage.getItem("token"))
const userData = Json.parse(localStorage.getItem("usserData"))

const createTimer = async()=>{
    await axios.post("api/scheduler",{
        course:course,
        time:"time"
    }).then((response)=>{
        console.log("time")
    })
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

        </div>
       </div>
        </>
    )
}

   
}

export default UserAccount;