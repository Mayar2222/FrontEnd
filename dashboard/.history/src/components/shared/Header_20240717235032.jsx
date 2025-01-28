import React from 'react'

export default function Header() {
  return (
    <div className='bg-white h-16 px-4 flex justify-between items-center'>  
    <div><input type="text" placeholder='Search...' className='text-sm focus:outline' ></input></div>
    <div>side buttons</div>
    </div>

  )
}
