import React from 'react'
import { HiOutlineSearch } from 'react-icons/hi'

export default function Header() {
  return (
    <div className='bg-white h-16 px-4 flex justify-between items-center'>  
    <div className='relative'>
        <HiOutlineSearch fontSize={20} className='text-gray-400 absolute'/>
        <input type="text" placeholder='Search...' className='text-sm focus:outline-none active:outline-none h-10 w-[24rem] border-gray-300 rounded-sm px-4' ></input></div>
    <div>side buttons</div>
    </div>

  )
}
