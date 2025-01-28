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
  const [categories, setCategories] = useState([]);
  const [specificities, setSpecificities] = useState({});
  const [selectedSpecificities, setSelectedSpecificities] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

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
    <div className="w-3/4 p-6 ml-4 overflow-y-auto">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Liste des produits</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          onClick={() => setShowForm(true)}
        >
          Ajouter un produit
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddProduct} className="p-6 bg-white rounded shadow-md">
          <div className="mb-4">
            <label htmlFor="productName" className="block font-bold mb-2">Nom du produit</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formState.productName}
              onChange={handleChange}
              className="border rounded w-full px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block font-bold mb-2">Catégorie</label>
            <select
              id="category"
              name="category"
              value={formState.category}
              onChange={handleChange}
              className="border rounded w-full px-3 py-2"
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="images" className="block font-bold mb-2">Images</label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              onChange={handleFileChange}
              className="border rounded w-full px-3 py-2"
            />
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
            {isEditing ? 'Modifier le produit' : 'Ajouter le produit'}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2"
          >
            Annuler
          </button>
        </form>
      )}
    </div>
  );
};

export default Produit;
