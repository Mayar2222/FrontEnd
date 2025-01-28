import React from 'react'
import { Outlet } from 'react-router-dom'
export default function Layout() {
  return (
    <div className='flex flex-row'>
      <div  className='bg-sky-100'>sidebar</div>
      <div className='bg-teal-200'>header</div>
      <div>{<Outlet/>}</div>
      <p>footer</p>
    </div>
  )
}
