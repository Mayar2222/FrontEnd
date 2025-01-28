import React, { useState } from 'react';
import { AiOutlineDown, AiOutlineRight } from 'react-icons/ai';
import { FcBullish } from 'react-icons/fc';
import { HiOutlineLogout } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './../AuthContext'; // Import useAuth
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../../lib/consts/navigation';

const linkClasses =
    'flex items-center gap-2 font-light px-5 py-2 hover:bg-neutral-800 hover:no-underline active:bg-neutral-600 rounded-sm text-base text-gray-300';

const titleClasses = 'flex gap-2 px-1 py-2 text-neutral-100 text-lg';

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
        <div
            style={{
                backgroundColor: "#4033FF",
                marginTop: "20px",  // Ajout de marge en haut
                marginBottom: "20px",  // Ajout de marge en bas
                marginLeft: "40px",  // Ajout de marge à gauche
                marginRight: "20px",  // Ajout de marge à droite
                borderRadius: "15px",  // Coins arrondis
                height: 'calc(100vh - 40px)',  // Ajustement de la hauteur (en tenant compte des marges)
            }}
            className="w-130 p-3 flex flex-col text-white fixed"
        >
            <div className={titleClasses}>
                <img src="./logo.png" style={{ width: '90px', height: '60px' }} />
                <span className="text-2xl font-bold" style={{ marginTop: "26px",textDecoration:'#ECEBFF' }}>ShipFlow</span>
            </div>

            {/* Trait sous le logo et texte "ShipFlow", déplacé plus haut */}
            <div className="border-b-2 border-gray-300 mt-1 mb-2"></div>

            <div className="flex-1 mt-4">
                <div>
                    <button onClick={toggleCatalogue} className={linkClasses}>
                        <span className="text-xl">📦</span>
                        <span className="text-xl font-bold">Catalogue Produit</span>
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
                        <span className="text-xl font-bold">Gestion de commande</span>
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
