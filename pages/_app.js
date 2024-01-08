import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './Firebase/context'

export default function App({ Component, pageProps }) {

  
  return (
    <ChakraProvider>

      <AuthProvider>
<Component {...pageProps} /> 
</AuthProvider>

</ChakraProvider>
  )
  
  
}
