import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
export default function Layout() {
  return (
    <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
<Sidebar/>
     <div className='flex-1'>
      <div >header</div>
      <div>{<Outlet/>}</div>
      <p>footer</p>

      </div>
     
      
    </div>
  )
}
