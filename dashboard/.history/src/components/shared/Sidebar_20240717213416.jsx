import React from 'react'
import { FcBullish } from 'react-icons/fc'

export default function Sidebar() {
  return (
    <div className='bg-neutral-900 w-60 p-3 flex flex-col text-white' >
        <div className='flex'>
            <FcBullish/>
            <span></span>

        </div>
    <div className='flex-1'>top part</div>
      <div>bottom part</div>


    </div>
  )
}
