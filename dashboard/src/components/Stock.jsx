// src/App.js
import React, { useState } from 'react';
import './../App.css';
import StockTable from './../components/StockTable';

const initialProducts = [
  {
    id: 1,
    name: 'Produit A',
    quantity: 100,
  },
  {
    id: 2,
    name: 'Produit B',
    quantity: 50,
  },
  // Ajoutez d'autres produits ici
];

function Stock() {
  const [products, setProducts] = useState(initialProducts);

  const handleLoadStock = (productId) => {
    // Logique pour charger le stock du produit
    alert(`Charger le stock pour le produit avec l'ID ${productId}`);
    
    // Vous pouvez également mettre à jour la quantité de stock ici
    // const updatedProducts = products.map(product =>
    //   product.id === productId ? { ...product, quantity: product.quantity + 10 } : product
    // );
    // setProducts(updatedProducts);
  };

  return (
    <div className="app-container">


      <div className="main-content" style={{marginLeft:'22rem'}}>
        <h1 className="text-2xl font-bold">Tableau de Stock</h1>
        <StockTable products={products} onLoadStock={handleLoadStock} />
      </div>
    </div>
  );
}

export default Stock;
