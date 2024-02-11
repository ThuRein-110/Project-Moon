import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '../Firebase/context'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {

  
  return (
    <ChakraProvider>

      <AuthProvider>
<Component {...pageProps} /> 
</AuthProvider>

</ChakraProvider>
  )
  
  
}
