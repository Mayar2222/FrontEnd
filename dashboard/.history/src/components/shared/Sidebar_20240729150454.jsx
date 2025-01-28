import React, { useState } from 'react';
import { AiOutlineDown, AiOutlineRight } from 'react-icons/ai';
import { FcBullish } from 'react-icons/fc';
import { HiOutlineLogout } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import './../../indexindex.css'; // Importer le CSS de la barre latérale

const linkClasses =
  'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-800 hover:no-underline active:bg-neutral-600 rounded-sm text-base text-gray-300';

const titleClasses = 'flex items-center gap-2 px-1 py-3 text-neutral-100 text-lg';

export default function Sidebar() {
  const { pathname } = useLocation();
  const [isCatalogueOpen, setIsCatalogueOpen] = useState(false);
  const [isGestionOpen, setIsGestionOpen] = useState(false);

  const toggleCatalogue = () => {
    setIsCatalogueOpen(!isCatalogueOpen);
  };

  const toggleGestion = () => {
    setIsGestionOpen(!isGestionOpen);
  };

  return (
    <div className="sidebar">
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
      </div>
      <div className="mt-4">
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
