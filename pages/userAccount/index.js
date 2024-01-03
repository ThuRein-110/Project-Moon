"use client"

import {useRouter} from "next/navigation"
import React, {useEffect,useState} from "react"
import axios from "axios"
import { Button, ButtonGroup } from '@chakra-ui/react'
import { MdEdit } from "react-icons/md";

function UserAccount(){
    const[user, setUser] = useState({})
    const [course,setCourse] = useState('');
    const [time,setTime] = useState('')
    const [userToken, setToken] = useState('')
    const router = useRouter();
    const[dummy, setDummy] = useState([
        {
        course:"IFT 506",
        time:"10:00am - 12pm",
        venue:"CSC Lab",
        day:"Monday"
    },
    {
        course:"CSC 508",
        time:"4:00pm - 6:00pm",
        venue:"CSC Lab",
        day:"Monday"
    },

    {
        course:"IFT 504",
        time:"2:00pm - 4:00pm",
        venue:"IFT Lab",
        day:"Tuesday"
    },
    {
        course:"IFT 512",
        time:"9:00am - 10:00am",
        venue:"IFT LR2",
        day:"Wednesday"
    },
    {
        course:"IFT 502",
        time:"2:00pm - 4:00pm",
        venue:"CSC Lab",
        day:"Wednesday"
    },
    {
        course:"IFT 508",
        time:"10:00am - 12:00pm",
        venue:"IFT Lab",
        day:"Thursday"
    },
    {
        course:"IFT 510",
        time:"2:00pm - 4:00pm",
        venue:"EFT",
        day:"Thursday"
    },
    {
        course:"CSC 514",
        time:"4:00pm - 6:00pm",
        venue:"CSC Lab",
        day:"Thursday"
    }


])



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
useEffect(()=>{
    

    if(localStorage.getItem("userData") !== undefined  || localStorage.getItem("token") !== undefined){
        const userData = JSON.parse(localStorage.getItem("userData"))
        const token = JSON.parse(localStorage.getItem("token"))
        setToken(token)
        setUser(userData)
    }

    else{
        const userData = {}
        setUser(userData)
       router.push("/authentication/login");
    
    }

},[])




 return(

        <>
       <div className="mt-[100px] w-[50%] m-auto flex justify-center align-center text-sm ">

        <div className="h-[50px] flex flex-col ">
        
            <div className="bg-red-600 text-white w-[500px] pl-[10px] pt-[10px] pr-[10px] pb-[10px] text-sm text-bold flex justify-between align-center">
                <div><h1>{user?.name} Ekweaga Charles - 500lvl <span>{user?.matno} </span></h1>
                <div>
                <span>{user?.dept} Information Technology</span>
                </div>
                
                 </div>

                 <div>
                <span>{user?.dept} IFT/17/2433</span><br/>
                <button colorScheme='white' onClick={logout}><p className="text-[13px] bg-white text-red-600 p-[3px]">Logout</p></button>
                </div>
                
            </div>

            <div className="mt-[20px]">
                <h1 className="mb-[10px] font-bold">MONDAY</h1>
                {
                    
                    dummy.map((item)=>{
                       if(item.day == "Monday"){
                        return(
                            <div className="mb-[10px] flex gap-3">{item.course} &nbsp;<span className="text-red-600 font-bold">||</span>  {item.time} &nbsp;<span className="text-red-600 font-bold">||</span>  {item.venue} <MdEdit /></div>
                        )
                       }
                    })
                }
            </div>
<br/>



            <div>
                <h1 className="mb-[10px] font-bold">TUESDAY</h1>
                {
                    
                    dummy.map((item)=>{
                       if(item.day == "Tuesday"){
                        return(
                            <div className="mb-[10px] flex gap-3">{item.course} &nbsp;<span className="text-red-600 font-bold">||</span>  {item.time} &nbsp;<span className="text-red-600 font-bold">||</span>  {item.venue} <MdEdit /></div>
                        )
                       }
                    })
                }
            </div>

<br/>

            <div>
                <h1 className="mb-[10px] font-bold">WEDNESDAY</h1>
                {
                    
                    dummy.map((item)=>{
                       if(item.day == "Wednesday"){
                        return(
                            <div className="mb-[10px] flex gap-3">{item.course} &nbsp;<span className="text-red-600 font-bold">||</span>  {item.time} &nbsp;<span className="text-red-600 font-bold">||</span>  {item.venue} <MdEdit /></div>
                        )
                       }
                    })
                }
            </div>



<br/>

            <div>
                <h1 className="mb-[10px] font-bold">THURSDAY</h1>
                {
                    
                    dummy.map((item)=>{
                       if(item.day == "Thursday"){
                        return(
                            <div className="mb-[10px] gap-3 flex">{item.course} &nbsp;<span className="text-red-600 font-bold">||</span>   {item.time} &nbsp;<span className="text-red-600 font-bold">||</span>  {item.venue} <MdEdit /></div>
                        )
                       }
                    })
                }
            </div>


        </div>


        <div>

        
            


        </div>


       </div>
        </>
    )


   
}

export default UserAccount;