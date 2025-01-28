import React from 'react'
import { FcBullish } from 'react-icons/fc'
import { DASHBOARD_SIDEBAR_LINKS } from '../../lib/consts/navigation'
import { Link } from 'react-router-dom'
const linkClasses='flex items-center gap-2 font-light px-3'
export default function Sidebar() {
  return (
    <div className='bg-neutral-900 w-60 p-3 flex flex-col text-white' >
        <div className='flex items-center gap-2 px-1 py-3'>
            <FcBullish/>
            <span className='text-neutral-100 text-lg'>Logistics</span>

        </div>
    <div className='flex-1'>{DASHBOARD_SIDEBAR_LINKS.map((item)=>(<SidebarLink key={item.key} item={item}/>))}
    </div>
    <div>bottom part</div>


    </div>
  )
}
function SidebarLink({item}){
    return(
        <Link to={item.path} className='{linkClasses}'>
        <span className='text-xl'>{item.icon}</span>
        {item.label}
        </Link>
    )
}
