import React from 'react'
import { Outlet } from 'react-router-dom'
export default function Layout() {
  return (
    <div>
      <div  className='bg-sky-100'>sidebar</div>
      <div>header</div>
      <div>{Outlet}</div>
    </div>
  )
}
