// src/App.js
import React from 'react';
import './App.css';
import StockTransactionsTable from './components/StockTransactionsTable';

const transactions = [
  {
    id: 1,
    orderNumber: 'CMD001',
    productName: 'Produit A',
    quantityAdjustment: '+10',
    remainingQuantity: '90',
    message: 'Réception de stock',
    location: 'Entrepôt 1',
    createdAt: '2024-07-29 10:00',
  },
  // Ajoutez d'autres transactions ici
];

function Historique() {
  return (
    <div className="app-container">
      <div className="sidebar">
        <h2>Sidebar</h2>
        {/* Contenu de la sidebar */}
      </div>
      <div className="main-content">
        <h1>Transactions de Stock</h1>
        <StockTransactionsTable transactions={transactions} />
      </div>
    </div>
  );
}

export default Historique;
