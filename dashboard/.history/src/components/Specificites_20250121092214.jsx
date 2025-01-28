import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Specificites = () => {
  const [formState, setFormState] = useState({
    specificiteName: '',
    category: '',
    isColor: false,
  });
  const [specificites, setSpecificites] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch specificites from the backend
  const fetchSpecificites = async () => {
    const response = await axios.get('/api/specificites');
    setSpecificites(response.data);
  };

  useEffect(() => {
    fetchSpecificites();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`/api/specificites/${specificites[editIndex].id}`, formState);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      await axios.post('/api/specificites', formState);
    }
    setFormState({
      specificiteName: '',
      category: '',
      isColor: false,
    });
    setShowForm(false);
    fetchSpecificites(); // Refresh the list
  };

  const handleEdit = (index) => {
    setFormState(specificites[index]);
    setIsEditing(true);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = async (index) => {
    await axios.delete(`/api/specificites/${specificites[index].id}`);
    fetchSpecificites(); // Refresh the list after deletion
  };

  const filteredSpecificites = specificites.filter(spec =>
    spec.specificiteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spec.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Liste des Spécificités</h2>
        <button
            style={{ backgroundColor: "#4033FF"}}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={() => {
              setShowForm(true);
              setIsEditing(false);
              setFormState({
                specificiteName: '',
                category: '',
                isColor: false,
              });
            }}
        >
          Ajouter une spécificité
        </button>
      </div>
      <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 mt-2 rounded-md w-full"
      />
      <ul className="space-y-4 mt-4">
        {filteredSpecificites.map((spec, index) => (
            <li key={index} className="p-4 bg-gray-100 shadow-md rounded-md">
              <h3 className="text-lg font-semibold">{spec.specificiteName}</h3>
              <p><strong>Catégorie :</strong> {spec.category}</p>
              <p><strong>Couleur :</strong> {spec.isColor ? 'Oui' : 'Non'}</p>
              <div className="flex justify-end space-x-2 mt-2">
                <button
                    className="bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500"
                    onClick={() => handleEdit(index)}
                >
                  Modifier
                </button>
                <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    onClick={() => handleDelete(index)}
                >
                  Supprimer
                </button>
              </div>
            </li>
        ))}
      </ul>

      {showForm && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4">
                {isEditing ? 'Modifier la spécificité' : 'Ajouter une nouvelle spécificité'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom de la spécificité:</label>
                  <input
                      type="text"
                      name="specificiteName"
                      value={formState.specificiteName}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Catégorie:</label>
                  <input
                      type="text"
                      name="category"
                      value={formState.category}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex items-center">
                  <input
                      type="checkbox"
                      name="isColor"
                      checked={formState.isColor}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 block text-sm font-medium text-gray-700">Couleur</label>
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
  );
};

export default Specificites;