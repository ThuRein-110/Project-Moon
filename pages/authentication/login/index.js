"use client"

import React, { useState } from 'react'
import { useRouter } from "next/navigation"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { ImSpinner8 } from 'react-icons/im'
import {
  FormControl,
  FormLabel,
  Input,
  Button
} from '@chakra-ui/react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { firebaseapp } from "../../../Firebase"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errMessage, setErrorMessage] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const auth = getAuth(firebaseapp)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const loginInUser = async (e) => {
    e.preventDefault()
    setErrorMessage("")
    setLoading(true)
    setSuccess(true)
    console.log("Login button clicked") // Debug log

    if (email === "" || password === "") {
      toast('Fields are empty, check', { autoClose: 1000, type: 'error', position: 'top-right' })
      setErrorMessage("Fields are empty, check")
      setLoading(false)
      setSuccess(false)
      return
    }

    if (!emailRegex.test(email)) {
      toast('Email is not valid', { autoClose: 1000, type: 'error', position: 'top-right' })
      setErrorMessage("Email is not valid")
      setLoading(false)
      setSuccess(false)
      return
    }

    try {
      const response = await signInWithEmailAndPassword(auth, email, password)
      console.log("Login response:", response)
      toast('Login successful!', { autoClose: 1000, type: 'success', position: 'top-right' })
      setTimeout(() => {
        router.push("/createTimeTable")
      }, 1500)
    } catch (err) {
      console.log("Login error:", err)
      setErrorMessage(err.message)
      toast(err.message, { autoClose: 2000, type: 'error', position: 'top-right' })
    } finally {
      setLoading(false)
      setSuccess(false)
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="w-[50%] m-auto md:mt-[10%] mt-[200px]">
        <div>
          <h2 className="text-center text-2xl font-bold">Sign In</h2>
        </div>
        <form onSubmit={loginInUser}>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </FormControl>
          <Button
            colorScheme='red'
            type="submit"
            isLoading={loading}
            className="w-[200px] mt-[30px] md:ml-[0px] p-[20px]"
          >
            {success ? <ImSpinner8 className="text-white animate-spin w-[30px]" /> : <span className="text-[17px]">Login</span>}
          </Button>
        </form>
        <div className="text-red-900 text-[12px] mt-[12px]">
          {errMessage ? <p>{errMessage}</p> : null}
        </div>
        <div className="flex justify-between flex-col mt-3 text-sm">
          <p>
            Do not have an account?{" "}
            <span
              className="text-red-600 cursor-pointer text-sm font-bold"
              onClick={() => router.push("/authentication/signup")}
            >
              sign up
            </span>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login