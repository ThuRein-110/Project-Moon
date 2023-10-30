import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
  
            
        <>
       

        <div className="absolute top-[50%] left-[28%]">
          <div>
            <h1 className='text-red-600 bold text-3xl'>SCHEDULER</h1>
            <p class="text-center text-sm mt-[2px] -ml-[30px]">Get notify ahead of time of your events</p>
            < p class="text-center text-sm"></p>
            
          </div>
          <div>
            <button>Get Started</button>
          </div>
        </div>

        </>
    
  )
}
