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
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchSpecificities();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8088/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
    }
  };

  const fetchSpecificities = async () => {
    try {
      const response = await axios.get('http://localhost:8088/api/specificites');
      const specs = {};
      response.data.forEach((spec) => {
        specs[spec.category] = specs[spec.category] || [];
        specs[spec.category].push(spec.name);
      });
      setSpecificities(specs);
    } catch (error) {
      console.error('Erreur lors de la récupération des spécificités:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8088/api/produits');
      setProducts(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'category') {
      setSelectedSpecificities(
        specificities[value]
          ? specificities[value].reduce((acc, spec) => {
              acc[spec] = '';
              return acc;
            }, {})
          : {}
      );
    }
  };

  const handleSpecificityChange = (specName, value) => {
    setSelectedSpecificities((prevState) => ({
      ...prevState,
      [specName]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormState((prevState) => ({
      ...prevState,
      images: Array.from(e.target.files),
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!formState.productName || !formState.category) {
      setErrorMessage('Le nom du produit et la catégorie sont obligatoires.');
      return;
    }

    const formData = new FormData();
    Object.entries(formState).forEach(([key, value]) => {
      if (key === 'images') {
        value.forEach((file) => {
          formData.append('images', file);
        });
      } else {
        formData.append(key, value);
      }
    });

    Object.entries(selectedSpecificities).forEach(([key, value]) => {
      formData.append(`specificities[${key}]`, value);
    });

    try {
      let response;
      if (isEditing) {
        response = await axios.put(
          `http://localhost:8088/api/produits/${products[editIndex].id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        const updatedProducts = [...products];
        updatedProducts[editIndex] = response.data;
        setProducts(updatedProducts);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        response = await axios.post('http://localhost:8088/api/produits/add', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setProducts([...products, response.data]);
      }
      resetForm();
    } catch (error) {
      console.error('Erreur lors de l\'ajout ou de la mise à jour du produit:', error);
      setErrorMessage('Erreur lors de l\'ajout ou de la mise à jour du produit.');
    }
  };

  const handleEditProduct = (index) => {
    setFormState(products[index]);
    setSelectedSpecificities(products[index].specificities || {});
    setIsEditing(true);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDeleteProduct = async (index) => {
    try {
      await axios.delete(`http://localhost:8088/api/produits/${products[index].id}`);
      setProducts(products.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
      setErrorMessage('Erreur lors de la suppression du produit.');
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
                    onClick={() => setShowDetails(product)}
                  >
                    Détails
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>

        {showDetails && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
              <h2 className="text-xl font-bold mb-4">{showDetails.productName}</h2>
              <p><strong>Description :</strong> {showDetails.description}</p>
              <p><strong>Catégorie :</strong> {showDetails.category?.name || 'Non spécifiée'}</p>
              <p><strong>Prix d'achat :</strong> {showDetails.purchasePrice}</p>
              <p><strong>Prix de vente :</strong> {showDetails.salePrice}</p>
              <p><strong>Quantité minimale :</strong> {showDetails.minStockAlert}</p>
              <h3 className="text-lg font-semibold mt-4">Images :</h3>
              <div className="flex flex-wrap gap-2">
                {showDetails.images && showDetails.images.length > 0 ? (
                  showDetails.images.map((image, idx) => (
                    <img
                      key={idx}
                      src={`http://your-backend-url/${image.url}`} alt="Produit" />
 // Assurez-vous que `image.url` correspond au chemin d'accès
                      alt={`Produit ${idx}`}
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  ))
                ) : (
                  <p>Aucune image disponible.</p>
                )}
              </div>
              <button
                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={() => setShowDetails(null)}
              >
                Fermer
              </button>
            </div>
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <form
              onSubmit={handleAddProduct}
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            >
              <h2 className="text-xl font-bold mb-4">{isEditing ? 'Modifier' : 'Ajouter'} un produit</h2>
              <input
                type="text"
                name="productName"
                value={formState.productName}
                onChange={handleChange}
                placeholder="Nom du produit"
                className="border rounded w-full p-2 mb-4"
              />
              <textarea
                name="description"
                value={formState.description}
                onChange={handleChange}
                placeholder="Description"
                className="border rounded w-full p-2 mb-4"
              />
              <select
                name="category"
                value={formState.category}
                onChange={handleChange}
                className="border rounded w-full p-2 mb-4"
              >
                <option value="">Sélectionnez une catégorie</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              <h3 className="text-lg font-semibold mb-2">Spécificités :</h3>
              {Object.keys(selectedSpecificities).map((spec, index) => (
                <div key={index} className="mb-2">
                  <label>{spec}</label>
                  <input
                    type="text"
                    value={selectedSpecificities[spec]}
                    onChange={(e) => handleSpecificityChange(spec, e.target.value)}
                    className="border rounded w-full p-2"
                  />
                </div>
              ))}
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="border rounded w-full p-2 mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  {isEditing ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Produit;
