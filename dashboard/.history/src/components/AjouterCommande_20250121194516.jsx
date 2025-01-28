import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
  const [viewProductsIndex, setViewProductsIndex] = useState(null);
  const [locations, setLocations] = useState(['Akouda,sousse', 'Location 2']);
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, []);

  // Récupération des commandes
  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders'); // Remplacez par l'URL correcte de votre backend
      setOrders(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes :', error);
    }
  };

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
      !formState.product ||
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
        await axios.put(`/api/orders/${orders[editIndex].id}`, newOrder); // Remplacez par votre API
        alert('Commande mise à jour avec succès.');
      } else {
        await axios.post('/api/orders', newOrder); // Remplacez par votre API
        alert('Commande ajoutée avec succès.');
      }

      fetchOrders(); // Rafraîchir les commandes
      setShowForm(false);
      setIsEditing(false);
      setEditIndex(null);
    } catch (error) {
      console.error('Erreur lors de l\'ajout/mise à jour de la commande :', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  const handleDeleteOrder = async (index) => {
    try {
      const orderId = orders[index].id; // Assurez-vous que vos commandes ont un champ `id`
      await axios.delete(`/api/orders/${orderId}`); // Remplacez par votre API
      alert('Commande supprimée avec succès.');
      fetchOrders(); // Rafraîchir les commandes
    } catch (error) {
      console.error('Erreur lors de la suppression de la commande :', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
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

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/4">{/* Sidebar content */}</div>
      <div className="w-3/4 p-6 ml-4 overflow-y-auto">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Liste des commandes</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            onClick={() => {
              setShowForm(true);
              setIsEditing(false);
              setFormState({
                clientName: '',
                phoneNumber: '',
                gender: 'male',
                address: '',
                product: '',
                quantity: '',
                promotion: '',
                pickupAddress: '',
              });
              setActiveTab(1);
            }}
          >
            Ajouter une commande
          </button>
        </div>

        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Code</th>
              <th className="border border-gray-300 px-4 py-2">Produits</th>
              <th className="border border-gray-300 px-4 py-2">Client</th>
              <th className="border border-gray-300 px-4 py-2">Total</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="bg-white">
                <td className="border border-gray-300 px-4 py-2">{order.code}</td>
                <td className="border border-gray-300 px-4 py-2">{order.quantity}</td>
                <td className="border border-gray-300 px-4 py-2">{order.clientName}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {(order.quantity * 10 - order.promotion * 0.1).toFixed(2)} €
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
                    onClick={() => handleEditOrder(index)}
                  >
                    Modifier
                  </button>
                  <button
                    className="ml-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                    onClick={() => handleDeleteOrder(index)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Commande;
