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
    images: [],
    specificities: {},
  });

  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const categorySpecificities = {
    electronics: ['Couleur', 'Taille de l\'écran', 'Marque'],
    clothing: ['Taille', 'Couleur', 'Matériau'],
    homeAppliances: ['Marque', 'Puissance', 'Couleur'],
  };

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8087/api/produits');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSpecificityChange = (specName, value) => {
    setFormState({
      ...formState,
      specificities: {
        ...formState.specificities,
        [specName]: value,
      },
    });
  };

  const handleFileChange = (e) => {
    setFormState({
      ...formState,
      images: [...e.target.files],
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const productData = new FormData();
    productData.append('productName', formState.productName);
    productData.append('description', formState.description);
    productData.append('category', formState.category);
    productData.append('sku', formState.sku);
    productData.append('purchasePrice', formState.purchasePrice);
    productData.append('salePrice', formState.salePrice);
    productData.append('minStockAlert', formState.minStockAlert);
    for (let image of formState.images) {
      productData.append('images', image);
    }
    Object.entries(formState.specificities).forEach(([key, value]) => {
      productData.append(`specificities[${key}]`, value);
    });

    try {
      if (isEditing) {
        await axios.put(`http://localhost:8087/api/produits/${products[editIndex].id}`, productData);
        const updatedProducts = [...products];
        updatedProducts[editIndex] = formState;
        setProducts(updatedProducts);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        const response = await axios.post('http://localhost:8087/api/produits', productData);
        setProducts([...products, response.data]);
      }
      setFormState({
        productName: '',
        description: '',
        category: '',
        sku: '',
        purchasePrice: '',
        salePrice: '',
        minStockAlert: '',
        images: [],
        specificities: {},
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding or updating product:', error);
    }
  };

  const handleEditProduct = (index) => {
    setFormState(products[index]);
    setIsEditing(true);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDeleteProduct = async (index) => {
    try {
      await axios.delete(`http://localhost:808/api/produits/${products[index].id}`);
      setProducts(products.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div style={{ paddingTop: '1rem' }} className="flex h-screen overflow-hidden">
      <div className="w-1/4">
        {/* Sidebar content */}
      </div>
      <div className="w-3/4 p-6 ml-4 overflow-y-auto">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Liste des produits</h1>
          <button
            style={{ backgroundColor: '#4033FF' }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            onClick={() => {
              setShowForm(true);
              setIsEditing(false);
              setFormState({
                productName: '',
                description: '',
                category: '',
                sku: '',
                purchasePrice: '',
                salePrice: '',
                minStockAlert: '',
                images: [],
                specificities: {},
              });
            }}
          >
            Ajouter un produit
          </button>
        </div>

        <ul className="space-y-4">
          {products.map((product, index) => (
            <li key={index} className="p-4 bg-white shadow-lg rounded-lg">
              <h2 className="text-lg font-bold">{product.productName}</h2>
              <p><strong>Catégorie :</strong> {product.category}</p>
              <p><strong>Description :</strong> {product.description}</p>
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
              </div>
            </li>
          ))}
        </ul>

        {showForm && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center overflow-y-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">
                {isEditing ? 'Modifier le produit' : 'Ajouter un nouveau produit'}
              </h2>
              <form onSubmit={handleAddProduct}>
                <div className="space-y-4">
                  {/* Form fields */}
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    className="mr-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    onClick={() => setShowForm(false)}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    {isEditing ? 'Modifier' : 'Ajouter'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Produit;
