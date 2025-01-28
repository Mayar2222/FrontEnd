import React, { useState } from 'react';

function Categories() {
    const [categories, setCategories] = useState(['Catégorie 1', 'Catégorie 2', 'Catégorie 3']);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const handleAddCategory = (e) => {
        e.preventDefault();
        if (newCategory.trim() !== '') {
            if (isEditing) {
                const updatedCategories = [...categories];
                updatedCategories[editIndex] = newCategory;
                setCategories(updatedCategories);
                setIsEditing(false);
                setEditIndex(null);
            } else {
                setCategories([...categories, newCategory]);
            }
            setNewCategory('');
            setShowModal(false);
        }
    };

    const handleDeleteCategory = (index) => {
        setCategories(categories.filter((_, i) => i !== index));
    };

    const handleEditCategory = (index) => {
        setNewCategory(categories[index]);
        setEditIndex(index);
        setIsEditing(true);
        setShowModal(true);
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-5 bg-white rounded-md shadow-md relative  ">
            <div className="flex justify-between justify-center items-center mb-5">
                <h1 className="text-2xl font-bold">Catégories du produit</h1>
                <button
                    style={{ backgroundColor: "#4033FF"}}

                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    onClick={() => {
                        setShowModal(true);
                        setIsEditing(false);
                        setNewCategory('');
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
                {categories
                    .filter((category) =>
                        category.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((category, index) => (
                        <li key={index} className="p-2 border-b border-gray-200 flex justify-between items-center">
                            <span>{category}</span>
                            <div>
                                <button
                                    className="bg-yellow-400 text-white px-2 py-1 rounded-md mr-2 hover:bg-yellow-500 transition duration-200"
                                    onClick={() => handleEditCategory(index)}
                                >
                                    Modifier
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition duration-200"
                                    onClick={() => handleDeleteCategory(index)}
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
                            {isEditing ? 'Modifier la catégorie' : 'Ajouter une nouvelle catégorie'}
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
                                    {isEditing ? 'Modifier' : 'Ajouter'}
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
