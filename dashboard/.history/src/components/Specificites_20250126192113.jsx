import axios from "axios";
import React, { useEffect, useState } from "react";

function Specificities() {
    const [categories, setCategories] = useState([]);
    const [specificities, setSpecificities] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [specificityName, setSpecificityName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [editingSpecificityId, setEditingSpecificityId] = useState(null);

    useEffect(() => {
        fetchCategories();
        fetchSpecificities();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8088/api/categories");
            console.log("API Response:", response.data);
            setCategories(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories:", error);
            setErrorMessage("Erreur de chargement des catégories.");
        } finally {
            setLoading(false);
        }
    };

    const fetchSpecificities = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8088/api/specificites");
            setSpecificities(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des spécificités:", error);
            setErrorMessage("Erreur de chargement des spécificités.");
        } finally {
            setLoading(false);
        }
    };

    const handleEditSpecificity = (specificity) => {
        if (specificity && specificity.category) {
            setSpecificityName(specificity.specificiteName);
            setSelectedCategory(specificity.category.id);
            setEditingSpecificityId(specificity.id);
            setShowModal(true);
        } else {
            console.error("Erreur: La spécificité n'a pas de catégorie associée.");
            setErrorMessage("Erreur: La spécificité sélectionnée n'a pas de catégorie.");
        }
    };
    

        try {
            if (editingSpecificityId) {
                // Modification
                await axios.put(`http://localhost:8088/api/specificites/${editingSpecificityId}`, specificityData);
                setSpecificities((prev) =>
                    prev.map((specificity) =>
                        specificity.id === editingSpecificityId ? { ...specificity, ...specificityData } : specificity
                    )
                );
            } else {
                // Ajout
                const response = await axios.post("http://localhost:8088/api/specificites/add", specificityData);
                setSpecificities((prev) => [...prev, response.data]);
            }
            resetForm();
            setShowModal(false);
        } catch (error) {
            console.error("Erreur lors de l'ajout ou de la modification de la spécificité:", error.response ? error.response.data : error);
            setErrorMessage("Une erreur s'est produite, veuillez réessayer.");
        }
    };

    const handleEditSpecificity = (specificity) => {
        setSpecificityName(specificity.specificiteName);
        setSelectedCategory(specificity.category.id);
        setEditingSpecificityId(specificity.id);
        setShowModal(true);
    };

    const handleDeleteSpecificity = async (id) => {
        try {
            await axios.delete(`http://localhost:8088/api/specificites/${id}`);
            setSpecificities((prev) => prev.filter((specificity) => specificity.id !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression de la spécificité:", error.response ? error.response.data : error);
            setErrorMessage("Une erreur s'est produite lors de la suppression.");
        }
    };

    const resetForm = () => {
        setSpecificityName("");
        setSelectedCategory("");
        setEditingSpecificityId(null);
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-5 bg-white rounded-md shadow-md relative">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-2xl font-bold">Spécificités</h1>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    onClick={() => {
                        setShowModal(true);
                        resetForm();
                    }}
                >
                    Ajouter nouvelle spécificité
                </button>
            </div>
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            {loading ? (
                <div className="spinner">Chargement...</div>
            ) : (
                <ul>
                    {specificities.length > 0 ? (
                        specificities.map((specificity) => (
                            <li key={specificity.id} className="p-2 border-b border-gray-200 flex justify-between items-center">
                                <span>{specificity.specificiteName} ({specificity.category?.name || "Non spécifié"})</span>
                                <div>
                                    <button
                                        className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2"
                                        onClick={() => handleEditSpecificity(specificity)}
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded-md"
                                        onClick={() => handleDeleteSpecificity(specificity.id)}
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>Aucune spécificité trouvée.</p>
                    )}
                </ul>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-5 rounded-md shadow-md w-full max-w-sm">
                        <h2 className="text-xl font-bold mb-4">{editingSpecificityId ? "Modifier" : "Ajouter"} une spécificité</h2>
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
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="" disabled>Sélectionnez une catégorie</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
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
                                    {editingSpecificityId ? "Modifier" : "Ajouter"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Specificities;
