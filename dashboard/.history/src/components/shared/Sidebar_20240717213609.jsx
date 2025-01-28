import React from 'react'
import { FcBullish } from 'react-icons/fc'

export default function Sidebar() {
  return (
    <div className='bg-neutral-900 w-60 p-3 flex flex-col text-white' >
        <div className='flex items-center gap-2 px-1'>
            <FcBullish/>
            <span>Logistics</span>

        </div>
    <div className='flex-1'></div>
    <div>bottom part</div>


    </div>
  )
}
