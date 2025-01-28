import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Produit = () => {
  const [formState, setFormState] = useState({
    productName: '',
    description: '',
    category: '',
    sku: '',
    purchasePrice: '',
    salePrice: '',
    minStockAlert: '',
    specificities: {},
    images: [],
  });

  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [categories, setCategories] = useState([]);
  const [specificities, setSpecificities] = useState({});
  const [selectedSpecificities, setSelectedSpecificities] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchSpecificities();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8088/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };

  const fetchSpecificities = async () => {
    try {
      const response = await axios.get("http://localhost:8088/api/specificites");
      const specs = {};
      response.data.forEach(spec => {
        specs[spec.category] = specs[spec.category] || [];
        specs[spec.category].push(spec.name);
      });
      setSpecificities(specs);
    } catch (error) {
      console.error("Erreur lors de la récupération des spécificités:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8088/api/produits");
      setProducts(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
    }
  };

  const handleDetails = (product) => {
    setProductDetails(product);
    setShowDetails(true);
  };

  const resetForm = () => {
    setFormState({
      productName: '',
      description: '',
      category: '',
      sku: '',
      purchasePrice: '',
      salePrice: '',
      minStockAlert: '',
      specificities: {},
      images: [],
    });
    setSelectedSpecificities({});
    setShowForm(false);
    setErrorMessage('');
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/4">
        {/* Sidebar content */}
      </div>
      <div className="w-3/4 p-6 ml-4 overflow-y-auto">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Liste des produits</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
          >
            Ajouter un produit
          </button>
        </div>

        {errorMessage && <div className="text-red-500">{errorMessage}</div>}

        <ul className="space-y-4">
          {products.length === 0 ? (
            <li>Aucun produit trouvé.</li>
          ) : (
            products.map((product, index) => (
              <li key={index} className="p-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-lg font-bold">{product.productName}</h2>
                <p><strong>Catégorie :</strong> {product.category?.name || 'Non spécifiée'}</p>
                <p><strong>Description :</strong> {product.description || 'Aucune description'}</p>
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    className="bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500"
                    onClick={() => handleEditProduct(index)}
                  >
                    Modifier
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    onClick={() => handleDeleteProduct(index)}
                  >
                    Supprimer
                  </button>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                    onClick={() => handleDetails(product)}
                  >
                    Détails
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>

        {showDetails && productDetails && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center overflow-y-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Détails du produit</h2>
              <p><strong>Nom :</strong> {productDetails.productName}</p>
              <p><strong>Catégorie :</strong> {productDetails.category?.name || 'Non spécifiée'}</p>
              <p><strong>Description :</strong> {productDetails.description || 'Aucune description'}</p>
              <p><strong>Prix d'achat :</strong> {productDetails.purchasePrice}</p>
              <p><strong>Prix de vente :</strong> {productDetails.salePrice}</p>
              <p><strong>Alerte stock minimale :</strong> {productDetails.minStockAlert}</p>

              {productDetails.specificities && (
                <div>
                  <h3 className="text-lg font-semibold">Spécificités :</h3>
                  <ul className="list-disc list-inside">
                    {Object.entries(productDetails.specificities).map(([key, value], idx) => (
                      <li key={idx}><strong>{key}:</strong> {value}</li>
                    ))}
                  </ul>
                </div>
              )}

              {productDetails.images && productDetails.images.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mt-4">Images :</h3>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    {productDetails.images.map((image, idx) => (
                      <img
                        key={idx}
                        src={`http://localhost:8088/uploads/${image}`}
                        alt={`Produit ${idx}`}
                        className="w-full h-32 object-cover rounded-md"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-4">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  onClick={() => setShowDetails(false)}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Produit;
