"use client"

import { useRouter } from "next/navigation"
import React, { useEffect, useState, useContext } from "react"
import { Button } from '@chakra-ui/react'
import { MdEdit } from "react-icons/md"
import { onSnapshot, doc, getFirestore } from "firebase/firestore"
import { firebaseapp } from "../../Firebase"
import { Auth } from '../../Firebase/context'
import { ImSpinner8 } from 'react-icons/im'

function UserAccount() {
  const [userDetails, setUserDetails] = useState({})
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const projectfirestore = getFirestore(firebaseapp)
  const { user } = useContext(Auth)

  const goNav = () => {
    router.push("/createTimeTable")
  }

  const logout = () => {
    router.push("/authentication/login")
  }

  const getUserTimeTable = async () => {
    setLoading(true)
    try {
      onSnapshot(doc(projectfirestore, "singleUserCourses", `${user?.email}`), (docSnap) => {
        setLoading(false)
        setCourses(docSnap.data()?.saveCourses || [])
      })
    } catch (err) {
      console.log(err.message)
    }
  }

  const getUserDetails = async () => {
    setLoading(true)
    try {
      onSnapshot(doc(projectfirestore, "users", `${user?.email}`), (docSnap) => {
        setLoading(false)
        setUserDetails(docSnap.data() || {})
      })
    } catch (err) {
      console.log(err.message)
    }
  }

const getNotified = async () => {
  if (!Array.isArray(courses) || courses.length === 0) return; // <-- Add this line

  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dateValue = new Date();
  const day = weekday[dateValue.getDay()];
  const hourofLecture = dateValue.getHours();
  const minuteofLecture = dateValue.getMinutes();
  const timeOflecture = `${hourofLecture}:${minuteofLecture}`;

  for (let i = 0; i < courses.length; i++) {
    const appointLecture = courses[i]?.startTime;
    let nowLecture = appointLecture;

    // Remove leading zero if present
    if (appointLecture && typeof appointLecture === "string" && appointLecture.startsWith("0")) {
      nowLecture = appointLecture.substr(1);
    }

    // Debug logs
    console.log("Comparing:", timeOflecture, "with", nowLecture);
    console.log("Course startTime:", appointLecture);

    if (day === courses[i]?.courseDay && timeOflecture === nowLecture) {
      const notifyMe = `Course Name: ${courses[i]?.courseName}  ||  Lecture Venue: ${courses[i]?.courseVenue}  ||  Duration: ${courses[i]?.startTime} - ${courses[i]?.endTime}`;
      alert(notifyMe);
    }
  }
}
  useEffect(() => {
    if (user) getUserDetails()
  }, [user])

  useEffect(() => {
    if (user) getUserTimeTable()
  }, [user])

  useEffect(() => {
    const interval = setInterval(() => {
      getNotified()
    }, 1000)
    return () => clearInterval(interval)
  }, [courses])

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-[350px]">
        <ImSpinner8 className="text-red-700 animate-spin w-[300px] text-[60px]" />
      </div>
    )
  }

  return (
    <>
      <div className="md:mt-[40px] md:w-[50%] m-auto flex justify-center align-center text-sm flex-col mt-[0px]">
        <div className="h-[50px] flex flex-col ">
          <div className="bg-red-600 text-white w-[500px] pl-[10px] pt-[10px] pr-[10px] pb-[10px] text-sm text-bold flex justify-between align-center">
            <div>
              <h1 className="font-bold">{userDetails?.Name} <span>{userDetails?.Matno} </span></h1>
              <div>
                <span>{userDetails?.dept}</span>
              </div>
            </div>
            <div>
              <span>{userDetails?.semester} semester</span><br /><span> {userDetails?.level}  </span>
            </div>
          </div>
          <h1 className="text-left font-bold text-[20px] mt-[30px]">Courses Schedules</h1>

          {Array.isArray(courses) && courses.length > 0 ? (
            <div className="flex flex-col items-left justify-left">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(day => (
                <div className="md:p-0 p-3" key={day}>
                  {courses.filter(item => item.courseDay === day).map((item, index) => (
                    <React.Fragment key={index}>
                      <div className="mb-[10px] font-bold">{item.courseDay ? <h1>{item.courseDay}</h1> : null}</div>
                      <div className="mb-[10px] flex gap-3">
                        {item?.courseName} &nbsp;
                        <span className="text-red-600 font-bold">||</span> {item.startTime} - {item.endTime} &nbsp;
                        <span className="text-red-600 font-bold">||</span> {item.courseVenue}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3 mt-[50px] items-left justify-left">
              <p>No course details available</p>
              <button onClick={goNav}>
                <p className="text-[13px] text-red-500 p-[2px] w-[160px] font-bold text-2xl mb-3 text-left">Enter Course Details</p>
              </button>
            </div>
          )}

          {Array.isArray(courses) ? (
            <div className="flex items-left justify-left mt-3 gap-3 ">
              <button className="text-[13px] p-[2px] bg-red-600 text-white rounded-2xl font-bold text-2xl w-[100px]" onClick={getNotified}>Notify Me</button>
              <button onClick={logout}>
                <p className="text-[13px] p-[2px] bg-red-600 text-white rounded-2xl font-bold text-2xl w-[100px]">Logout</p>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default UserAccount