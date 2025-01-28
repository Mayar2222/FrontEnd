// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8087/api'; // Remplacez par l'URL de votre API

export const fetchCommandes = async () => {
  const response = await axios.get(`${API_URL}/commandes`);
  return response.data;
};

export const addCommande = async (commande) => {
  const response = await axios.post(`${API_URL}/commandes/add`, commande);
  return response.data;
};

export const updateCommande = async (id, commande) => {
  const response = await axios.put(`${API_URL}/commandes/${id}`, commande);
  return response.data;
};

export const deleteCommande = async (id) => {
  await axios.delete(`${API_URL}/commandes/${id}`);
};

export const fetchProduits = async () => {
  const response = await axios.get(`${API_URL}/produits`);
  return response.data;
};

export const fetchLocalisations = async () => {
  const response = await axios.get(`${API_URL}/localisations`);
  return response.data;
};