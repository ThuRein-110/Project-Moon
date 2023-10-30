import React from 'react'

function Navbar() {
  return (
    <>
    <nav class="">
        <div class="flex justify-between">
            <div class="logo">
                <h2 class="text-[#DC4405] " style={{fontWeight:'800'}}>SCHEDULER</h2>

            </div>

            <div class="navigation">
                <ul class="flex gap-4 text-black">
                    <li>
                        WorkSpace
                    </li>

                    <li>
                        Products
                    </li>

                    <li>
                        Products
                    </li>

                    <li>
                        Products
                    </li>
                </ul>

            </div>



            <div class="btn">
                <button class="text-black">Login</button>
                <button class="text-white bg-blue-700 ">Contact us</button>
            </div>




        </div>
    </nav>
    </>
  )
}

export default Navbar
