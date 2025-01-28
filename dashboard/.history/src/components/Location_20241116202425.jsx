import React, { useState } from 'react';

const MesLocalisations = () => {
    const [localisations, setLocalisations] = useState([
        { id: 1, name: 'Entrepôt Principal', phone: '123456789', city: 'Paris', postalCode: '75001', address: '1 Rue de Paris' },
        // Ajouter plus de localisations si nécessaire
    ]);

    const [showForm, setShowForm] = useState(false);
    const [newLocation, setNewLocation] = useState({
        id: null,
        name: '',
        phone: '',
        city: '',
        postalCode: '',
        address: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewLocation({
            ...newLocation,
            [name]: value,
        });
    };

    const handleAddLocation = (e) => {
        e.preventDefault();
        const newLocationData = {
            ...newLocation,
            id: localisations.length + 1, // Génère un ID unique pour chaque nouvelle localisation
        };
        setLocalisations([...localisations, newLocationData]);
        resetForm();
    };

    const handleEditLocation = (e) => {
        e.preventDefault();
        const updatedLocalisations = localisations.map((loc) =>
            loc.id === newLocation.id ? newLocation : loc
        );
        setLocalisations(updatedLocalisations);
        resetForm();
    };

    const handleDeleteLocation = (id) => {
        const updatedLocalisations = localisations.filter((loc) => loc.id !== id);
        setLocalisations(updatedLocalisations);
    };

    const handleEditClick = (loc) => {
        setNewLocation(loc);
        setIsEditing(true);
        setShowForm(true);
    };

    const resetForm = () => {
        setShowForm(false);
        setIsEditing(false);
        setNewLocation({
            id: null,
            name: '',
            phone: '',
            city: '',
            postalCode: '',
            address: '',
        });
    };

    return (
        <div style={{ marginLeft: "22rem" }} className="flex h-screen overflow-hidden">
            {/* Contenu principal */}
            <div className="flex-1 p-6 overflow-y-auto relative">
                <h1 className="text-2xl font-bold">Mes Localisations</h1>

                {/* Affichage de la liste des localisations */}
                <div className="mt-4">
                    <ul className="space-y-4 mt-2">
                        {localisations.map((loc) => (
                            <li key={loc.id} className="p-4 bg-white shadow-md rounded-md">
                                <p><strong>Nom:</strong> {loc.name}</p>
                                <p><strong>Téléphone:</strong> {loc.phone}</p>
                                <p><strong>Ville:</strong> {loc.city}</p>
                                <p><strong>Code postal:</strong> {loc.postalCode}</p>
                                <p><strong>Adresse:</strong> {loc.address}</p>

                                {/* Boutons Modifier et Supprimer */}
                                <div className="flex space-x-2 mt-4">
                                    <button
                                        onClick={() => handleEditClick(loc)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => handleDeleteLocation(loc.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Formulaire d'ajout ou de modification de localisation */}
                {showForm && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-10">
                        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-2xl">
                            <h2 className="text-xl font-bold mb-4">{isEditing ? 'Modifier la localisation' : 'Ajouter une nouvelle localisation'}</h2>
                            <form onSubmit={isEditing ? handleEditLocation : handleAddLocation}>
                                <div className="space-y-4">
                                    <label>
                                        Nom de la localisation:
                                        <input
                                            type="text"
                                            name="name"
                                            value={newLocation.name}
                                            onChange={handleChange}
                                            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </label>
                                    <label>
                                        Numéro de téléphone:
                                        <input
                                            type="text"
                                            name="phone"
                                            value={newLocation.phone}
                                            onChange={handleChange}
                                            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </label>
                                    <label>
                                        Ville:
                                        <input
                                            type="text"
                                            name="city"
                                            value={newLocation.city}
                                            onChange={handleChange}
                                            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </label>
                                    <label>
                                        Code postal:
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={newLocation.postalCode}
                                            onChange={handleChange}
                                            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </label>
                                    <label>
                                        Adresse:
                                        <input
                                            type="text"
                                            name="address"
                                            value={newLocation.address}
                                            onChange={handleChange}
                                            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </label>
                                </div>

                                <div className="flex justify-end mt-4">
                                    <button
                                        type="button"
                                        className="mr-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                        onClick={resetForm}
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
                    </div>
                )}

                {/* Bouton d'ajout de localisation */}
                <button

                    onClick={() => setShowForm(true)}
                    className="absolute top-6 right-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    style={{backgroundColor:'#4033FF'}}
                >
                    Ajouter une nouvelle localisation
                </button>
            </div>
        </div>
    );
};

export default MesLocalisations;
