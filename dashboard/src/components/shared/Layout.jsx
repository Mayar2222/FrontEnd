import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout() {
    return (
        <div className="flex flex-col bg-white h-screen">
            {/* Container principal avec Sidebar et contenu */}
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <Header />
                    <div className="p-4 overflow-y-auto flex-1">
                        {/* Le contenu principal */}
                        <Outlet />
                    </div>
                </div>
            </div>

            {/* Footer - Centré en bas */}
            <footer className=" py-4 text-center">
                <p>©2024 ShipFlow. All Rights Reserved.</p>
            </footer>
        </div>
    );
}
