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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'category') {
      setSelectedSpecificities(specificities[value] ? specificities[value].reduce((acc, spec) => {
        acc[spec] = ''; // Initialiser toutes les spécificités à une chaîne vide
        return acc;
      }, {}) : {});
    }
  };

  const handleSpecificityChange = (specName, value) => {
    setSelectedSpecificities(prevState => ({
      ...prevState,
      [specName]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormState(prevState => ({
      ...prevState,
      images: Array.from(e.target.files), // Convertir le FileList en tableau
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!formState.productName || !formState.category) {
      setErrorMessage("Le nom du produit et la catégorie sont obligatoires.");
      return;
    }

    const formData = new FormData();
    Object.entries(formState).forEach(([key, value]) => {
      if (key === 'images') {
        value.forEach(file => {
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
        response = await axios.put(`http://localhost:8088/api/produits/${products[editIndex].id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const updatedProducts = [...products];
        updatedProducts[editIndex] = response.data;
        setProducts(updatedProducts);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        response = await axios.post("http://localhost:8088/api/produits/add", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setProducts([...products, response.data]);
      }
      resetForm();
    } catch (error) {
      console.error("Erreur lors de l'ajout ou de la mise à jour du produit:", error);
      setErrorMessage("Erreur lors de l'ajout ou de la mise à jour du produit.");
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
      console.error("Erreur lors de la suppression du produit:", error);
      setErrorMessage("Erreur lors de la suppression du produit.");
    }
  };

  const handleShowDetails = (product) => {
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
      <div className="w-1/4">{/* Sidebar content */}</div>
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
                    onClick={() => handleShowDetails(product)}
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
              <p><strong>Description :</strong> {productDetails.description}</p>
              <p><strong>Catégorie :</strong> {productDetails.category?.name || 'Non spécifiée'}</p>
              <p><strong>Prix d'achat :</strong> {productDetails.purchasePrice}</p>
              <p><strong>Prix de vente :</strong> {productDetails.salePrice}</p>
              <p><strong>Quantité minimale pour alerte de stock :</strong> {productDetails.minStockAlert}</p>
              <div>
                <h3 className="text-lg font-semibold">Images :</h3>
                <div className="flex space-x-2">
                  {productDetails.images?.map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:8088/uploads/${image}`}
                      alt={`Produit ${index}`}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mt-4"
                onClick={() => setShowDetails(false)}
              >
                Fermer
              </button>
            </div>
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center overflow-y-auto">
            {/* Formulaire pour ajouter/modifier un produit */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Produit;
