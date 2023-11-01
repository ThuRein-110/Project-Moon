import React from 'react'
import { supabase } from '@/superbaseConfig'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'

  import { Button, ButtonGroup } from '@chakra-ui/react'

function Signup() {

    const submit = async()=>{
        const { data, error } = await supabase.auth.signUp({
            email: 'example@email.com',
            password: 'example-password',
          })

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

export default Signup