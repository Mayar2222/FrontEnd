import React from 'react';
import StockTransactionsTable from './StockTransactionsTable';

const Historique = () => {
  // Exemple de données de transaction
  const transactions = [
    {
      commande: '12345',
      produit: 'Produit A',
      ajustementQuantite: '+10',
      quantiteRestante: '50',
      message: 'Réapprovisionnement',
      lieuRetrait: 'Entrepôt A',
      dateCreation: '2024-07-29 10:00:00',
    },
    {
      commande: '12346',
      produit: 'Produit B',
      ajustementQuantite: '-5',
      quantiteRestante: '20',
      message: 'Vente',
      lieuRetrait: 'Entrepôt B',
      dateCreation: '2024-07-29 12:00:00',
    },
    // Ajoutez plus de transactions si nécessaire
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Historique des Transactions</h2>
      <StockTransactionsTable transactions={transactions} />
    </div>
  );
};

export default Historique;
