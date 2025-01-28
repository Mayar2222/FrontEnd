import React, { useState } from 'react';
import { AiOutlineDown, AiOutlineRight } from 'react-icons/ai';
import { FcBullish } from 'react-icons/fc';
import { HiOutlineLogout } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../../lib/consts/navigation';

const linkClasses =
  'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base text-gray-300';

const titleClasses = 'flex items-center gap-2 px-1 py-3 text-neutral-100 text-lg';

export default function Sidebar() {
  const { pathname } = useLocation();
  const [isCatalogueOpen, setIsCatalogueOpen] = useState(false);

  const toggleCatalogue = () => {
    setIsCatalogueOpen(!isCatalogueOpen);
  };

  return (
    <div className="bg-neutral-900 w-60 p-3 flex flex-col text-white h-full fixed">
      <div className={titleClasses}>
        <FcBullish />
        <span>Logistics</span>
      </div>
      <div className="flex-1 mt-4">
        <div>
          <button onClick={toggleCatalogue} className={linkClasses}>
            <span className="text-xl">📦</span>
            <span>Catalogue Produit</span>
            {isCatalogueOpen ? <AiOutlineDown /> : <AiOutlineRight />}
          </button>
          {isCatalogueOpen && (
            <div className="ml-6 mt-2">
             
              <Link to="/categories" className={linkClasses}>
                Catégories du produit
              </Link>
              <Link to="/produit" className={linkClasses}>
                Produit
              </Link>
              <Link to="/spf" className={linkClasses}>
              Spécificités
              </Link>
              <Link to="/historique" className={linkClasses}>
              Historique de stock
              </Link>
              <Link to="/stock" className={linkClasses}>
              Spécificités
              </Link>
            </div>
          )}
        </div>
        {DASHBOARD_SIDEBAR_LINKS.filter(link => link.label !== "Catalogue Produit").map(({ key, path, icon, label }) => (
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
      <div className="mt-4">
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
    </div>
  );
}
