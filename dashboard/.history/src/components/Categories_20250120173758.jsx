import React, { useState, useEffect } from "react";
import axios from "axios";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Charger les catégories au chargement du composant
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fonction pour récupérer les catégories depuis l'API
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories :", error);
    }
  };

  // Fonction pour ajouter ou modifier une catégorie
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (newCategory.trim() !== "") {
      try {
        if (isEditing) {
          // Modifier une catégorie existante
          await axios.put(`http://localhost:8080/api/categories/${editId}`, {
            name: newCategory,
          });
        } else {
          // Ajouter une nouvelle catégorie
          await axios.post("http://localhost:8080/api/categories", {
            name: newCategory,
          });
        }
        fetchCategories(); // Actualiser la liste
        setNewCategory("");
        setIsEditing(false);
        setShowModal(false);
      } catch (error) {
        console.error("Erreur lors de l'ajout/modification de la catégorie :", error);
      }
    }
  };

  // Fonction pour supprimer une catégorie
  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/categories/${id}`);
      fetchCategories(); // Actualiser la liste
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie :", error);
    }
  };

  // Fonction pour préparer l'édition d'une catégorie
  const handleEditCategory = (id, name) => {
    setNewCategory(name);
    setEditId(id);
    setIsEditing(true);
    setShowModal(true);
  };

  // Fonction pour rechercher une catégorie
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5 bg-white rounded-md shadow-md relative">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Catégories du produit</h1>
        <button
          style={{ backgroundColor: "#4033FF" }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          onClick={() => {
            setShowModal(true);
            setIsEditing(false);
            setNewCategory("");
          }}
        >
          Ajouter nouvelle catégorie
        </button>
      </div>
      <input
        type="text"
        placeholder="Rechercher une catégorie..."
        className="w-full mb-4 p-2 border border-gray-300 rounded-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredCategories.map((category) => (
          <li
            key={category.id}
            className="p-2 border-b border-gray-200 flex justify-between items-center"
          >
            <span>{category.name}</span>
            <div>
              <button
                className="bg-yellow-400 text-white px-2 py-1 rounded-md mr-2 hover:bg-yellow-500 transition duration-200"
                onClick={() => handleEditCategory(category.id, category.name)}
              >
                Modifier
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition duration-200"
                onClick={() => handleDeleteCategory(category.id)}
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-md shadow-md w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Modifier la catégorie" : "Ajouter une nouvelle catégorie"}
            </h2>
            <form onSubmit={handleAddCategory}>
              <label className="block mb-4">
                Nom de la catégorie
                <input
                  type="text"
                  name="newCategory"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </label>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
                  onClick={() => setShowModal(false)}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  {isEditing ? "Modifier" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;
