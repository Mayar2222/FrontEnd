import React from 'react';

const StockTransactionsTable = ({ transactions }) => {
  return (
    <div className="overflow-x-auto h-full">
      <table className="w-1/4 bg-white border border-gray-200 ">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Commande</th>
            <th className="px-4 py-2 border-b">Produit</th>
            <th className="px-4 py-2 border-b">A. Quantité</th>
            <th className="px-4 py-2 border-b">Quantité restante</th>
            <th className="px-4 py-2 border-b">Message</th>
            <th className="px-4 py-2 border-b">Lieu de retrait</th>
            <th className="px-4 py-2 border-b">Créé le</th>
          </tr>
        </thead>
        <tbody className="overflow-y-auto h-full">
          {transactions.map((transaction, index) => (
            <tr key={index} className="h-auto">
              <td className="px-4 py-2 border-b">{transaction.commande}</td>
              <td className="px-4 py-2 border-b">{transaction.produit}</td>
              <td className="px-4 py-2 border-b">{transaction.ajustementQuantite}</td>
              <td className="px-4 py-2 border-b">{transaction.quantiteRestante}</td>
              <td className="px-4 py-2 border-b">{transaction.message}</td>
              <td className="px-4 py-2 border-b">{transaction.lieuRetrait}</td>
              <td className="px-4 py-2 border-b">{transaction.dateCreation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTransactionsTable;