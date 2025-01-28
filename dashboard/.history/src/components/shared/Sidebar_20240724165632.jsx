import React from 'react';
import { FcBullish } from 'react-icons/fc';
import { HiOutlineLogout } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../../lib/consts/navigation';

const linkClasses =
  'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base text-gray-300';

const titleClasses = 'flex items-center gap-2 px-1 py-3 text-neutral-100 text-lg';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="bg-neutral-900 w-full p-3 flex items-center text-white fixed top-0 z-10">
      <div className={`${titleClasses} mr-auto`}>
        <FcBullish />
        <span>Logistics</span>
      </div>
      <div className="flex space-x-4">
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
      <div className="flex space-x-4 ml-auto">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map(({ key, path, icon, label }) => (
          <Link
            key={key}
            to={path}
            className={`${linkClasses} ${pathname === path ? 'bg-neutral-700' : ''}`}
          >
            {icon && <span className="text-xl">{icon}</span>}
            <span>{label}</span>
          </Link>
        ))}
        <Link
          to="/logout" // Adjust the path as needed
          className={linkClasses}
        >
          <HiOutlineLogout className="text-xl" />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
}
