import React from 'react';
import { FcBullish } from 'react-icons/fc';
import { DASHBOARD_SIDEBAR_LINKS } from '../../lib/consts/navigation';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const linkClasses =
  'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base';

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
            className={clsx(linkClasses, {
              'bg-neutral-700': pathname === path,
            })}
          >
            {icon && <span className="text-xl">{icon}</span>}
            <span>{label}</span>
          </Link>
        ))}
      </div>
      <div>bottom part</div>
    </div>
  );
}