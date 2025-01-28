// src/App.js
import React from 'react';
import './../App.css';
import StockTransactionsTable from './StockTransactionsTable ';

const transactions = [
  {
    id: 1,
    orderNumber: 'CMD001',
    productName: 'Iphone X',
    quantityAdjustment: '+10',
    remainingQuantity: '20',
    message: 'Réception de stock',
    location: 'Rue yesser arafet,Sahloul,Sousse',
    createdAt: '2024-07-29 10:00',
  },
  {
    id: 2,
    orderNumber: 'CMD002',
    productName: 'Fond de teint',
    quantityAdjustment: '+10',
    remainingQuantity: '30',
    message: 'Réception de stock',
    location: 'Rue yesser arafet,Sahloul,Sousse',
    createdAt: '2024-07-29 10:00',
  },
  {
    id: 3,
    orderNumber: 'CMD003',
    productName: 'Télévision',
    quantityAdjustment: '+17',
    remainingQuantity: '20',
    message: 'Réception de stock',
    location: 'Msaken,Sousse',
    createdAt: '2024-09-29 12:00',
  },
  {
    id: 4,
    orderNumber: 'CMD004',
    productName: 'Télévision',
    quantityAdjustment: '+13',
    remainingQuantity: '20',
    message: 'Réception de stock',
    location: 'Akouda,Sousse',
    createdAt: '2024-09-29 12:00',
  },{
    id: 5,
    orderNumber: 'CMD005',
    productName: 'Pantalon',
    quantityAdjustment: '+25',
    remainingQuantity: '60',
    message: 'Réception de stock',
    location: 'Mourouj5,Tunis',
    createdAt: '2024-04-29 12:00',
  },{
    id: 6,
    orderNumber: 'CMD006',
    productName: 'Chocolat',
    quantityAdjustment: '+55',
    remainingQuantity: '70',
    message: 'Réception de stock',
    location: 'Mourouj5,Tunis',
    createdAt: '2024-04-29 12:00',
  },
];

function Historique() {
  return (
    <div className="app-container">

        {/* Contenu de la sidebar */}
      <div className="main-content" style={{marginLeft:'22rem'}}>
        <h1 className="text-2xl font-bold">Transactions de Stock</h1>
        <StockTransactionsTable transactions={transactions} />
    </div>
    </div>
  );
}

export default Historique;
