import axios from "axios";
import React, { useEffect, useState } from "react";

function C() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    description: "",
    category: "",
    sku: "",
    purchasePrice: "",
    salePrice: "",
    minStockAlert: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8087/api/produits");
      setProducts(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.productName.trim()) return;

    try {
      if (isEditing) {
        if (!editId) {
          console.error("ID du produit à modifier est manquant");
          return;
        }
        // Modifier un produit existant
        const response = await axios.put(
          `http://localhost:8087/api/produits/${editId}`,
          newProduct
        );
        // Mise à jour de la liste des produits après modification
        setProducts(
          products.map((product) =>
            product.id === editId ? { ...product, ...response.data } : product
          )
        );
        setIsEditing(false);
        setEditId(null);
      } else {
        // Ajouter un nouveau produit
        const response = await axios.post("http://localhost:8087/api/produits", newProduct);
        setProducts([...products, response.data]);
      }
      setNewProduct({
        productName: "",
        description: "",
        category: "",
        sku: "",
        purchasePrice: "",
        salePrice: "",
        minStockAlert: "",
      });
      setShowModal(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout ou de la modification du produit:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8087/api/produits/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du produit:", error);
    }
  };

  const handleEditProduct = (id, product) => {
    setNewProduct(product);
    setEditId(id);
    setIsEditing(true);
    setShowModal(true);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5 bg-white rounded-md shadow-md relative">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Produits</h1>
        <button
          style={{ backgroundColor: "#4033FF" }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          onClick={() => {
            setShowModal(true);
            setIsEditing(false);
            setNewProduct({
              productName: "",
              description: "",
              category: "",
              sku: "",
              purchasePrice: "",
              salePrice: "",
              minStockAlert: "",
            });
          }}
        >
          Ajouter un nouveau produit
        </button>
      </div>

      <input
        type="text"
        placeholder="Rechercher un produit..."
        className="w-full mb-4 p-2 border border-gray-300 rounded-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul>
        {products
          .filter((product) =>
            product.productName.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((product) => (
            <li key={product.id} className="p-2 border-b border-gray-200 flex justify-between items-center">
              <span>{product.productName}</span>
              <div>
                <button
                  className="bg-yellow-400 text-white px-2 py-1 rounded-md mr-2 hover:bg-yellow-500 transition duration-200"
                  onClick={() => handleEditProduct(product.id, product)}
                >
                  Modifier
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition duration-200"
                  onClick={() => handleDeleteProduct(product.id)}
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
              {isEditing ? "Modifier le produit" : "Ajouter un nouveau produit"}
            </h2>
            <form onSubmit={handleAddProduct}>
              <label className="block mb-4">
                Nom du produit
                <input
                  type="text"
                  name="productName"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  value={newProduct.productName}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, productName: e.target.value })
                  }
                />
              </label>
              <label className="block mb-4">
                Description
                <textarea
                  name="description"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, description: e.target.value })
                  }
                />
              </label>
              <label className="block mb-4">
                Catégorie
                <input
                  type="text"
                  name="category"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                />
              </label>
              <label className="block mb-4">
                SKU
                <input
                  type="text"
                  name="sku"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  value={newProduct.sku}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, sku: e.target.value })
                  }
                />
              </label>
              <label className="block mb-4">
                Prix d'achat
                <input
                  type="number"
                  name="purchasePrice"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  value={newProduct.purchasePrice}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, purchasePrice: e.target.value })
                  }
                />
              </label>
              <label className="block mb-4">
                Prix de vente
                <input
                  type="number"
                  name="salePrice"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  value={newProduct.salePrice}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, salePrice: e.target.value })
                  }
                />
              </label>
              <label className="block mb-4">
                Alerte de stock minimale
                <input
                  type="number"
                  name="minStockAlert"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  value={newProduct.minStockAlert}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, minStockAlert: e.target.value })
                  }
                />
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
                  {isEditing ? "Mettre à jour" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
