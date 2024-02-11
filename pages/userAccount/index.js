"use client"

import {useRouter} from "next/navigation"
import React, {useEffect,useState,useContext} from "react"
import axios from "axios"
import { Button, ButtonGroup } from '@chakra-ui/react'
import { MdEdit } from "react-icons/md";
import { collection,   onSnapshot,query } from "firebase/firestore";
import {firebaseapp} from "../../Firebase"
import {getFirestore} from "firebase/firestore"
import { Auth } from '../../Firebase/context';
import {ImSpinner8} from 'react-icons/im'
import {setDoc,doc,updateDoc} from "firebase/firestore"

function UserAccount(){
    const[userDetails, setUserDetails] = useState({})
    const [course,setCourse] = useState('');
    const [time,setTime] = useState('')
    const [userToken, setToken] = useState('')
    const router = useRouter();
    const [courses,setCourses] = useState([]);
    const [loading, setLoading] = useState(true)
    const projectfirestore = getFirestore(firebaseapp)
const {user} = useContext(Auth)

const goNav = ()=>{
    router.push("/createTimeTable");
    return;
  }

const logout = ()=>{
    //localStorage.removeItem("token")
    router.push("/authentication/login")
}



const getUserTimeTable = async ()=>{
    setLoading(true)
    try{
     onSnapshot(doc(projectfirestore, "singleUserCourses", `${user?.email}`), (doc) => {
          
           setLoading(false)
            setCourses(doc.data()?.saveCourses)
          
        });
          } 
         catch(err){
          console.log(err.message)
        }

        console.log(courses)
  }

  const getUserDetails = async()=>{
     setLoading(true)
    try{
 onSnapshot(doc(projectfirestore, "users", `${user?.email}`), (doc) => {
            
             setLoading(false)
              setUserDetails(doc.data())
            
          });
            } 
           catch(err){
            console.log(err.message)
          }
  
          console.log(userDetails)
  }

  useEffect(()=>{
   
    getUserTimeTable();
  },[user])

  useEffect(()=>{
     getUserDetails();
  },[user])

  if(loading){
    return(
<div className="flex items-center justify-center mt-[350px]"><ImSpinner8 className="text-red-700 animate-spin w-[300px] text-[60px] "/></div>
    )
  }
  else{
   
   

    
 return(

        <>
       <div className="md:mt-[40px] md:w-[50%] m-auto flex justify-center align-center text-sm flex-col mt-[0px]">

        <div className="h-[50px] flex flex-col ">
        
            <div className="bg-red-600 text-white w-[500px] pl-[10px] pt-[10px] pr-[10px] pb-[10px] text-sm text-bold flex justify-between align-center">
                <div><h1 className="font-bold">{userDetails?.Name}  <span>{userDetails?.Matno} </span></h1>
                <div>
                <span>{userDetails?.dept}</span>
                </div>
                
                 </div>

                 <div>
                <span>{userDetails?.semester} semester</span><br/><span> {userDetails?.level}  </span>
              
                </div>
                
            </div>

            
            
         {courses ? (<div>
   <div className="mt-[20px] md:p-0 p-3">
               
                {
                    
                    courses?.map((item,index)=>{
                       if(item.courseDay == "Monday"){
                        return(
                            <>
                            <div className="mb-[10px] font-bold">{item.courseDay ? <h1>{item.courseDay}</h1>:null}</div>
                            <div className="mb-[10px] flex gap-3" key={index}>{item?.courseName} &nbsp;<span className="text-red-600 font-bold" >||</span>  {item.startTime} - {item.endTime} &nbsp;<span className="text-red-600 font-bold">||</span>  {item.courseVenue} <MdEdit /></div>
                            </>
                        )
                       }
                    })
                }
            </div>
<br/>

   <div className=" md:p-0 p-3">
               
                {
                    
                    courses?.map((item,index)=>{
                       if(item.courseDay == "Tuesday"){
                        return(
                            <>
                            <div className="mb-[10px] font-bold">{item.courseDay ? <h1>{item.courseDay}</h1>:null}</div>
                            <div className="mb-[10px] flex gap-3" key={index}>{item?.courseName} &nbsp;<span className="text-red-600 font-bold" >||</span>  {item?.startTime} - {item?.endTime} &nbsp;<span className="text-red-600 font-bold">||</span>  {item.courseVenue} <MdEdit /></div>
                            </>
                        )
                       }
                    })
                }
            </div>

<br/>


 <div className=" md:p-0 p-3">
               
                {
                    
                courses?.map((item,index)=>{
                       if(item.courseDay == "Wednesday"){
                        return(
                            <>
                            <div className="mb-[10px] font-bold">{item.courseDay ? <h1>{item.courseDay}</h1>:null}</div>
                            <div className="mb-[10px] flex gap-3" key={index}>{item?.courseName} &nbsp;<span className="text-red-600 font-bold" >||</span>  {item.startTime} - {item.endTime} &nbsp;<span className="text-red-600 font-bold">||</span>  {item.courseVenue} <MdEdit /></div>
                            </>
                        )
                       }
                    })
                }
            </div>



<br/>

   <div className=" md:p-0 p-3">
              
                {
                    
                    courses?.map((item,index)=>{
                       if(item.courseDay == "Thursday"){
                        return(
                            <>
                            <div className="mb-[10px] font-bold">{item.courseDay ? <h1>{item.courseDay}</h1>:null}</div>
                            <div className="mb-[10px] flex gap-3" key={index}>{item?.courseName} &nbsp;<span className="text-red-600 font-bold" >||</span>  {item.startTime} - {item.endTime} &nbsp;<span className="text-red-600 font-bold">||</span>  {item.courseVenue} <MdEdit /></div>
                            </>
                        )
                       }
                    })
                }
            </div>
<br/>

<div className=" md:p-0 p-3">
               
                {
                    
                    courses?.map((item,index)=>{
                       if(item.courseDay == "Friday"){
                        return(
                            <>
                            <div className="mb-[10px] font-bold">{item.courseDay ? <h1>{item.courseDay}</h1>:null}</div>
                            <div className="mb-[10px] flex gap-3" key={index}>{item?.courseName} &nbsp;<span className="text-red-600 font-bold" >||</span>  {item.startTime} - {item.endTime} &nbsp;<span className="text-red-600 font-bold">||</span>  {item.courseVenue} <MdEdit /></div>
                            </>
                        )
                       }
                    })
                }
            </div>
<br/>


 
         </div>): 
         
         ( <div className="flex flex-col gap-3 items-center justify-center mt-[150px]"><p>No course details available</p>
            <button colorScheme='white' onClick={goNav}><p className="text-[13px] border-[1px] border-red-700 p-[2px] w-[160px] font-bold text-2xl">Enter Course Details</p></button>
            </div>)
            
            
            }  
            
          



         

           
<br/>
         

<div className="flex items-center justify-center mt-3 ">

<button colorScheme='white' onClick={logout}><p className="text-[13px] p-[2px] border-red-700 rounded-2xl font-bold text-2xl border-[1px] w-[100px]">Logout</p></button></div>
           







        </div>
      

        <div>

        
        


        </div>

      
       </div>
      
        </>

       
        
        
    )
          

            }
   
}

export default UserAccount;