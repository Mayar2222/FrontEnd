import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Commande = () => {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState({
    name: '',
    phone: '',
    city: '',
    postalCode: '',
    address: '',
  });

  // Charger les localisations au démarrage
  useEffect(() => {
    fetchLocations();
  }, []);

  // Méthode pour récupérer toutes les localisations
  const fetchLocations = async () => {
    try {
      const response = await axios.get('/api/localisations'); // API GET
      setLocations(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des localisations:', error);
    }
  };

  // Méthode pour ajouter une localisation
  const handleAddLocation = async () => {
    try {
      const response = await axios.post('/api/localisations/add', newLocation); // API POST
      setLocations([...locations, response.data]); // Mise à jour de l'état local
      setNewLocation({ name: '', phone: '', city: '', postalCode: '', address: '' }); // Réinitialiser le formulaire
    } catch (error) {
      console.error('Erreur lors de l’ajout d’une localisation:', error);
    }
  };

  // Méthode pour mettre à jour une localisation existante
  const handleUpdateLocation = async (id, updatedLocation) => {
    try {
      const response = await axios.put(`/api/localisations/${id}`, updatedLocation); // API PUT
      setLocations(locations.map(loc => (loc.id === id ? response.data : loc))); // Mise à jour de l'état local
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la localisation:', error);
    }
  };

  // Méthode pour supprimer une localisation
  const handleDeleteLocation = async (id) => {
    try {
      await axios.delete(`/api/localisations/${id}`); // API DELETE
      setLocations(locations.filter(loc => loc.id !== id)); // Mise à jour de l'état local
    } catch (error) {
      console.error('Erreur lors de la suppression de la localisation:', error);
    }
  };

  return (
    <div>
      <h2>Liste des Localisations</h2>
      <ul>
        {locations.map(location => (
          <li key={location.id}>
            {location.name} ({location.city})
            <button onClick={() => handleDeleteLocation(location.id)}>Supprimer</button>
            {/* Bouton pour la mise à jour */}
            <button
              onClick={() => {
                const updatedLocation = {
                  ...location,
                  name: prompt('Nom:', location.name),
                };
                handleUpdateLocation(location.id, updatedLocation);
              }}
            >
              Modifier
            </button>
          </li>
        ))}
      </ul>

      <h2>Ajouter une nouvelle localisation</h2>
      <input
        type="text"
        placeholder="Nom"
        value={newLocation.name}
        onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Téléphone"
        value={newLocation.phone}
        onChange={(e) => setNewLocation({ ...newLocation, phone: e.target.value })}
      />
      <input
        type="text"
        placeholder="Ville"
        value={newLocation.city}
        onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
      />
      <input
        type="text"
        placeholder="Code Postal"
        value={newLocation.postalCode}
        onChange={(e) => setNewLocation({ ...newLocation, postalCode: e.target.value })}
      />
      <input
        type="text"
        placeholder="Adresse"
        value={newLocation.address}
        onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
      />
      <button onClick={handleAddLocation}>Ajouter</button>
    </div>
  );
};

export default Commande;
