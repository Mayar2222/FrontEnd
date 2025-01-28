import React, { useState, useEffect } from 'react';
import {
  fetchCommandes,
  addCommande,
  updateCommande,
  deleteCommande,
  fetchProduits,
  fetchLocalisations,
} from '../api'; // Assurez-vous que le chemin est correct

const Commande = () => {
  const [formState, setFormState] = useState({
    clientName: '',
    phoneNumber: '',
    gender: 'male',
    address: '',
    product: '',
    quantity: '',
    promotion: '',
    pickupAddress: '',
  });

  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [locations, setLocations] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commandes = await fetchCommandes();
        setOrders(commandes);
        const produits = await fetchProduits();
        setProducts(produits);
        const localisations = await fetchLocalisations();
        setLocations(localisations);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleAddOrder = async (e) => {
    e.preventDefault();

    if (
      !formState.clientName ||
      !formState.phoneNumber ||
      !formState.address ||
      !formState.quantity ||
      !formState.pickupAddress
    ) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    const newOrder = {
      ...formState,
      code: `CMD-${Math.floor(Math.random() * 10000)}`,
      status: 'commande',
    };

    try {
      if (isEditing) {
        await updateCommande(orders[editIndex].id, newOrder);
        const updatedOrders = [...orders];
        updatedOrders[editIndex] = newOrder;
        setOrders(updatedOrders);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        const addedOrder = await addCommande(newOrder);
        setOrders([...orders, addedOrder]);
      }
      resetForm();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la commande:', error);
    }
  };

  const resetForm = () => {
    setFormState({
      clientName: '',
      phoneNumber: '',
      gender: 'male',
      address: '',
      quantity: '',
      promotion: '',
      pickupAddress: '',
    });
  };

  const handleDeleteOrder = async (index) => {
    try {
      await deleteCommande(orders[index].id);
      const updatedOrders = orders.filter((_, i) => i !== index);
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Erreur lors de la suppression de la commande:', error);
    }
  };

  const handleEditOrder = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setFormState({
      clientName: orders[index].clientName,
      phoneNumber: orders[index].phoneNumber,
      gender: orders[index].gender,
      address: orders[index].address,
      product: orders[index].product,
      quantity: orders[index].quantity,
      promotion: orders[index].promotion,
      pickupAddress: orders[index].pickupAddress,
    });
    setShowForm(true);
    setActiveTab(1);
  };

  const calculateTotalAmount = (order) => {
    const baseAmount = order.quantity * 10; // Ajustez le prix unitaire si nécessaire
    const discount = baseAmount * (order.promotion / 100);
    return baseAmount - discount;
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/4">
        {/* Sidebar content */}
      </div>
      <div className="w-3/4 p-6 ml-4 overflow-y-auto">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Liste des commandes</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            onClick={() => {
              setShowForm(true);
              setIsEditing(false);
              resetForm();
              setActiveTab(1);
            }}
          >
            Ajouter une commande
          </button>
        </div>

        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Code de la commande</th>
              <th className="border border-gray-300 px-4 py-2">Nombre de produits</th>
              <th className="border border-gray-300 px-4 py-2">Nom du client</th>
              <th className="border border-gray-300 px-4 py-2">Valeur totale de la commande</th>
              <th className="border border-gray-300 px-4 py-2 border-l-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="bg-white">
                <td className="border border-gray-300 px-4 py-2">{order.code}</td>
                <td className="border border-gray-300 px-4 py-2">{order.quantity}</td>
                <td className="border border-gray-300 px-4 py-2">{order.clientName}</td>
                <td className="border border-gray-300 px-4 py-2">{calculateTotalAmount(order).toFixed(2)} €</td>
                <td className="border border-gray-300 px-4 py-2 border-l-2">
                  <div className="flex space-x-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                      onClick={() => handleEditOrder(index)}
                    >
                      Modifier
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                      onClick={() => handleDeleteOrder(index)}
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showForm && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center overflow-y-auto">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-2xl max-h-screen overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">
                {isEditing ? 'Modifier la commande' : 'Ajouter une nouvelle commande'}
              </h2>
              {/* Formulaire */}
              <div className="flex mb-4">
                <button
                  className={`w-1/3 py-2 px-4 text-center rounded-t-lg ${activeTab === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => setActiveTab(1)}
                >
                  Détails Client
                </button>
                <button
                  className={`w-1/3 py-2 px-4 text-center rounded-t-lg ${activeTab === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => setActiveTab(2)}
                >
                  Détails Commande
                </button>
                <button
                  className={`w-1/3 py-2 px-4 text-center rounded-t-lg ${activeTab === 3 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => setActiveTab(3)}
                >
                  Pickup
                </button>
              </div>

              {/* Onglet 1 - Détails Client */}
              {activeTab === 1 && (
                <div className="space-y-4">
                  <label>
                    Nom et prénom :
                    <input
                      type="text"
                      name="clientName"
                      value={formState.clientName}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                      required
                    />
                  </label>
                  <label>
                    Numéro de téléphone :
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formState.phoneNumber}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                      required
                    />
                  </label>
                  <label>
                    Genre :
                    <select
                      name="gender"
                      value={formState.gender}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                    >
                      <option value="male">Homme</option>
                      <option value="female">Femme</option>
                      <option value="other">Autre</option>
                    </select>
                  </label>
                  <label>
                    Adresse :
                    <input
                      type="text"
                      name="address"
                      value={formState.address}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                      required
                    />
                  </label>
                </div>
              )}

              {/* Onglet 2 - Détails Commande */}
              {activeTab === 2 && (
                <div className="space-y-4">
                  <label>
                    Produit :
                    <select
                      name="product"
                      value={formState.product}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">Sélectionnez un produit</option>
                      {products.length > 0 ? (
                        products.map((product, index) => (
                          <option key={index} value={product.id}>
                            {product.name} {/* Assurez-vous que 'name' est une propriété valide */}
                          </option>
                        ))
                      ) : (
                        <option disabled>Aucun produit disponible</option>
                      )}
                    </select>
                  </label>
                  <label>
                    Quantité :
                    <input
                      type="number"
                      name="quantity"
                      value={formState.quantity}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                      required
                    />
                  </label>
                  <label>
                    Promotion (% de réduction) :
                    <input
                      type="number"
                      name="promotion"
                      value={formState.promotion}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                    />
                  </label>
                </div>
              )}

              {/* Onglet 3 - Pickup */}
              {activeTab === 3 && (
                <div className="space-y-4">
                  <label>
                    Adresse de pickup :
                    <select
                      name="pickupAddress"
                      value={formState.pickupAddress}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">Sélectionnez une adresse</option>
                      {locations.map((location, index) => (
                        <option key={index} value={location.address}>
                          {location.address} {/* Affichez l'adresse */}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              )}

              <div className="mt-6 flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                  onClick={handleAddOrder}
                >
                  {isEditing ? 'Mettre à jour' : 'Ajouter la commande'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Commande;