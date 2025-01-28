import axios from "axios";
import React, { useEffect, useState } from "react";

function Categories() {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // New states for specificity
    const [specificityName, setSpecificityName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isColor, setIsColor] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8087/api/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories:", error);
            setErrorMessage("Erreur de chargement des catégories.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddSpecificity = async (e) => {
        e.preventDefault();
        if (specificityName.trim() === "" || !selectedCategory) return;

        setErrorMessage(""); // Reset error message
        try {
            const response = await axios.post("http://localhost:8087/api/specificites", {
                specificiteName: specificityName,
                category: { id: selectedCategory },
                isColor: isColor,
            });
            // Handle success (e.g., update local state)
            setSpecificityName("");
            setSelectedCategory(null);
            setIsColor(false);
            setShowModal(false);
        } catch (error) {
            console.error("Erreur lors de l'ajout de la spécificité:", error);
            setErrorMessage("Une erreur s'est produite, veuillez réessayer.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-5 bg-white rounded-md shadow-md relative">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-2xl font-bold">Catégories du produit</h1>
                <button
                    style={{ backgroundColor: "#4033FF" }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    onClick={() => {
                        setShowModal(true);
                        setSpecificityName("");
                        setSelectedCategory(null);
                        setIsColor(false);
                    }}
                >
                    Ajouter nouvelle spécificité
                </button>
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {/* Render category list here */}

            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-5 rounded-md shadow-md w-full max-w-sm">
                        <h2 className="text-xl font-bold mb-4">Ajouter une nouvelle spécificité</h2>
                        <form onSubmit={handleAddSpecificity}>
                            <label className="block mb-4">
                                Nom de la spécificité
                                <input
                                    type="text"
                                    className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                                    value={specificityName}
                                    onChange={(e) => setSpecificityName(e.target.value)}
                                />
                            </label>
                            <label className="block mb-4">
                                Catégorie
                                <select
                                    className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                                    value={selectedCategory || ""}
                                    onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
                                >
                                    <option value="" disabled>Sélectionnez une catégorie</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    checked={isColor}
                                    onChange={() => setIsColor(!isColor)}
                                />
                                <span className="ml-2">Couleur</span>
                            </label>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="mr-2 bg-gray-500 text-white px-4 py-2 rounded-md"
                                    onClick={() => setShowModal(false)}
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                                >
                                    Ajouter
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