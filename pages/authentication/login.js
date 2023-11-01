"use client"

import React from 'react'
import Link from "next/link"
import {useState,useEffect} from "react"
import React from 'react'
   import { supabase } from '@/superbaseConfig'
    import {
        FormControl,
        FormLabel,
        FormErrorMessage,
        FormHelperText,
      } from '@chakra-ui/react'
    
      import { Button, ButtonGroup } from '@chakra-ui/react'

function Login() {
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
  const loginInUser = async()=>{
    try{
      const { data, error } = await supabase.auth.signUp({
        email: 'example@email.com',
        password: 'example-password',
      })
    }
    catch(error){
      
    }
   
  }
  return (
   
    
  
        <>
         <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type='email' value={input} onChange={handleInputChange} />
          {!isError ? (
            <FormHelperText>
              Enter the email you'd like to receive the newsletter on.
            </FormHelperText>
          ) : (
            <FormErrorMessage>Email is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type='password' value={input} onChange={handleInputChange} />
          {!isError ? (
            <FormHelperText>
              Enter the email you'd like to receive the newsletter on.
            </FormHelperText>
          ) : (
            <FormErrorMessage>Email is required.</FormErrorMessage>
          )}
        </FormControl>
        <Button colorScheme='blue'>Button</Button>
        
        </>
      )
    }
    
        
  


export default Login