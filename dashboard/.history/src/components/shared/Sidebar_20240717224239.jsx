import React from 'react';
import { FcBullish } from 'react-icons/fc';
import { Link, useLocation } from 'react-router-dom';
import { DASHBOARD_SIDEBAR_LINKS,DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../../lib/consts/navigation';
import { HiOutlineLogout } from 'react-icons/hi';

const linkClasses =
  'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base text-white';

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <div className="bg-neutral-900 w-60 p-3 flex flex-col text-white">
      <div className="flex items-center gap-2 px-1 py-3">
        <FcBullish />
        <span className="text-neutral-100 text-lg">Logistics</span>
      </div>
      <div className="flex-1">
        {DASHBOARD_SIDEBAR_LINKS.map(({ key, path, icon, label }) => (
          <Link
            key={key}
            to={path}
            className={`${linkClasses} ${pathname === path ? 'bg-neutral-700' : ''}`}
          >
            {icon && <span className="text-xl">{icon}</span>}
            <span>{label}</span>
          </Link>
        ))}
      </div>
      <div>{DASHBOARD_SIDEBAR_BOTTOM_LINKS.map(({ key, path, icon, label }) => (
          <Link
            key={key}
            to={path}
            className={`${linkClasses} ${pathname === path ? 'bg-neutral-700' : ''}`}
          >
            {icon && <span className="text-xl">{icon}</span>}
            <span>{label}</span>
            <span className='text-xl'><HiOutlineLogout</span>
          </Link>
        ))} </div>
    </div>
  );
}