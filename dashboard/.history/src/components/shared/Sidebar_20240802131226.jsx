// src/components/shared/Sidebar.js
import React, { useState } from 'react';
import { AiOutlineDown, AiOutlineRight } from 'react-icons/ai';
import { FcBullish } from 'react-icons/fc';
import { HiOutlineLogout } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './../AuthContext'; // Import useAuth
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../../lib/consts/navigation';

const linkClasses =
  'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-800 hover:no-underline active:bg-neutral-600 rounded-sm text-base text-gray-300';

const titleClasses = 'flex items-center gap-2 px-1 py-3 text-neutral-100 text-lg';

export default function Sidebar() {
  const { pathname } = useLocation();
  const [isCatalogueOpen, setIsCatalogueOpen] = useState(false);
  const [isGestionOpen, setIsGestionOpen] = useState(false);
  const { logout } = useAuth(); // Destructure logout function from useAuth

  const toggleCatalogue = () => {
    setIsCatalogueOpen(!isCatalogueOpen);
  };

  const toggleGestion = () => {
    setIsGestionOpen(!isGestionOpen);
  };

  return (
    <div className="bg-neutral-900 w-70 p-3 flex flex-col text-white h-full fixed">
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
                Stock
              </Link>
              <Link to="/loc" className={linkClasses}>
                Mes localisations
              </Link>
            </div>
          )}
        </div>
        
        <div>
          <button onClick={toggleGestion} className={linkClasses}>
            <span className="text-xl">📋</span>
            <span>Gestion de commande</span>
            {isGestionOpen ? <AiOutlineDown /> : <AiOutlineRight />}
          </button>
          {isGestionOpen && (
            <div className="ml-6 mt-2">
              <Link to="/ajoutercomm" className={linkClasses}>
                Ajouter commande
              </Link>
              <Link to="/listecomm" className={linkClasses}>
                Liste des commandes
              </Link>
            </div>
          )}
        </div>

        {DASHBOARD_SIDEBAR_LINKS.filter(link => link.label !== "Catalogue Produit" && link.label !== "Gestion de commande").map(({ key, path, icon, label }) => (
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
        <button
          onClick={logout}
          className={linkClasses}
        >
          <HiOutlineLogout className="text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
