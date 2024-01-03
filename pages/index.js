import Image from 'next/image'
import { Poppins } from 'next/font/google'
import Navbar from '@/components/navbar'
import {useRouter} from "next/navigation"
import Link from "next/link"

const inter = Poppins({ subsets: ['poppins'] })

export default function Home() {

  const router = useRouter()
  return (
  
            
        <>
       

        <div className="flex items-center justify-center flex-col mt-[250px]">
          <div>
            <h1 className='text-red-600 bold text-3xl text-center'>RemindMe</h1>
            <p className="text-center text-[20px] mt-[2px] ">Get notified ahead of time of your events</p>
            
            
          </div>
          <div className="mt-[20px]">
            <button className="bg-red-600 text-white p-2 w-[200px] " onClick={()=> router.push('/authentication/login')}>Get Started</button>
          </div>
        </div>

        </>
    
  )
}
