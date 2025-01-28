import React from 'react'
import { HiOutlineSearch } from 'react-icons/hi'

export default function Header() {
  return (
    <div className='bg-white h-16 px-4 flex justify-between items-center border-b border'>  
    <div className='relative'>
        <HiOutlineSearch fontSize={20} className='text-gray-400 absolute top-1/2 -translate-y-1/2'/>
        <input type="text" placeholder='Search...' className='text-sm focus:outline-none active:outline-none h-10 w-[24rem] border-gray-300 rounded-sm pl-7 pr-4' ></input></div>
    <div>side buttons</div>
    </div>

  )
}
