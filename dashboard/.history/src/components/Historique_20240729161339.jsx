import React from 'react';

class Historique extends React.Component {
  render() {
    const { transactions } = this.props;

    return (
      <div className="table-container overflow-x-auto p-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Commande</th>
              <th className="px-4 py-2 border-b">Produit</th>
              <th className="px-4 py-2 border-b">Ajustement de quantité</th>
              <th className="px-4 py-2 border-b">Quantité restante</th>
              <th className="px-4 py-2 border-b">Message</th>
              <th className="px-4 py-2 border-b">Lieu de retrait</th>
              <th className="px-4 py-2 border-b">Créé le</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border-b">{transaction.commande}</td>
                  <td className="px-4 py-2 border-b">{transaction.produit}</td>
                  <td className="px-4 py-2 border-b">{transaction.ajustementQuantite}</td>
                  <td className="px-4 py-2 border-b">{transaction.quantiteRestante}</td>
                  <td className="px-4 py-2 border-b">{transaction.message}</td>
                  <td className="px-4 py-2 border-b">{transaction.lieuRetrait}</td>
                  <td className="px-4 py-2 border-b">{transaction.dateCreation}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-2 border-b text-center">Aucune transaction disponible</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Historique;
