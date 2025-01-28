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
  const [categories, setCategories] = useState([]);
  const [specificities, setSpecificities] = useState({});

  const API_URL = "http://localhost:8087/api/produits";

  useEffect(() => {
    fetchCategories();
    fetchSpecificities();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8087/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };

  const fetchSpecificities = async () => {
    try {
      const response = await axios.get("http://localhost:8087/api/specificites");
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
      const response = await axios.get("http://localhost:8087/api/produits");
      setProducts(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
    }
  };

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
    try {
      if (isEditing) {
        const response = await axios.put(`${'http://localhost:8087/api/produits'}/${products[editIndex].id}`, formState);
        const updatedProducts = [...products];
        updatedProducts[editIndex] = response.data;
        setProducts(updatedProducts);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        const response = await axios.post(${'http://localhost:8087/api/produits'}, formState);
        setProducts([...products, response.data]);
      }
      resetForm();
    } catch (error) {
      console.error("Erreur lors de l'ajout ou de la mise à jour du produit:", error);
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
      await axios.delete(`${'http://localhost:8087/api/produits'}/${products[index].id}`);
      setProducts(products.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Erreur lors de la suppression du produit:", error);
    }
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
      images: [],
      specificities: {},
    });
    setShowForm(false);
  };

  return (
    <div style={{ paddingTop: "1rem" }} className="flex h-screen overflow-hidden">
      <div className="w-1/4">
        {/* Sidebar content */}
      </div>
      <div className="w-3/4 p-6 ml-4 overflow-y-auto">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Liste des produits</h1>
          <button
            style={{ backgroundColor: "#4033FF" }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            onClick={() => {
              resetForm();
              setShowForm(true);
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
                  <label>
                    Nom du produit:
                    <input
                      type="text"
                      name="productName"
                      value={formState.productName}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                    />
                  </label>
                  <label>
                    Description:
                    <textarea
                      name="description"
                      value={formState.description}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                    />
                  </label>
                  <label>
                    Catégorie du produit:
                    <select
                      name="category"
                      value={formState.category}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    SKU:
                    <input
                      type="text"
                      name="sku"
                      value={formState.sku}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                    />
                  </label>
                  <label>
                    Prix d'achat:
                    <input
                      type="number"
                      name="purchasePrice"
                      value={formState.purchasePrice}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                    />
                  </label>
                  <label>
                    Prix de vente:
                    <input
                      type="number"
                      name="salePrice"
                      value={formState.salePrice}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                    />
                  </label>
                  <label>
                    Quantité minimale pour alerte de stock:
                    <input
                      type="number"
                      name="minStockAlert"
                      value={formState.minStockAlert}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                    />
                  </label>
                  <label>
                    Images du produit:
                    <input
                      type="file"
                      multiple
                      name="images"
                      onChange={handleFileChange}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                    />
                  </label>

                  {formState.category && specificities[formState.category] && (
                    <div>
                      <h3 className="text-lg font-semibold">Spécificités :</h3>
                      {specificities[formState.category].map((spec, idx) => (
                        <div key={idx} className="mt-2">
                          <label>
                            {spec}:
                            <input
                              type="text"
                              value={formState.specificities[spec] || ''}
                              onChange={(e) => handleSpecificityChange(spec, e.target.value)}
                              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                            />
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
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