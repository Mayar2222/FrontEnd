import React, { useState } from 'react';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleAddOrder = (e) => {
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

    if (isEditing) {
      const updatedOrders = [...orders];
      updatedOrders[editIndex] = newOrder;
      setOrders(updatedOrders);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setOrders([...orders, newOrder]);
    }

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
    setShowForm(false);
  };

  const handleConvertToPackage = (index) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = 'colis';
    setOrders(updatedOrders);
    alert(`Commande ${updatedOrders[index].code} convertie en colis.`);
  };

  const calculateTotalAmount = (order) => {
    const baseAmount = order.quantity * 10;
    const discount = baseAmount * (order.promotion / 100);
    return baseAmount - discount;
  };

  const handleDeleteOrder = (index) => {
    const updatedOrders = orders.filter((_, i) => i !== index);
    setOrders(updatedOrders);
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
                  setActiveTab(1); // Réinitialise l'onglet actif à 1
                }}
            >
              Ajouter une commande
            </button>
          </div>

          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              {/* Headers */}
            </thead>
            <tbody>
              {/* Orders List */}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default Commande;
