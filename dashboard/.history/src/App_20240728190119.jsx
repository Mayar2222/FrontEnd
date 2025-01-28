import React, { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

const Produit = () => {
  const [formState, setFormState] = useState({
    productName: '',
    description: '',
    category: '',
    sku: '',
    purchasePrice: '',
    salePrice: '',
    minStockAlert: '',
    images: [],
    specificities: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormState({
      ...formState,
      images: [...e.target.files],
    });
  };

  return (
    <div className="p-6">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>Produit</span>
              <span>{open ? <AiOutlineMinus /> : <AiOutlinePlus />}</span>
            </Disclosure.Button>
            <Disclosure.Panel className="p-4 mt-2 bg-gray-200 rounded-lg">
              <div className="space-y-4 mx-auto max-w-lg">
                <label>
                  Nom du produit:
                  <input
                    type="text"
                    name="productName"
                    value={formState.productName}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                  />
                </label>
                <label>
                  Description:
                  <textarea
                    name="description"
                    value={formState.description}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                  />
                </label>
                <label>
                  Catégorie du produit:
                  <input
                    type="text"
                    name="category"
                    value={formState.category}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                  />
                </label>
                <label>
                  SKU:
                  <input
                    type="text"
                    name="sku"
                    value={formState.sku}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                  />
                </label>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 mt-2 text-sm font-medium text-left text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>Prix</span>
              <span>{open ? <AiOutlineMinus /> : <AiOutlinePlus />}</span>
            </Disclosure.Button>
            <Disclosure.Panel className="p-4 mt-2 bg-gray-200 rounded-lg">
              <div className="space-y-4 mx-auto max-w-lg">
                <label>
                  Prix d'achat:
                  <input
                    type="number"
                    name="purchasePrice"
                    value={formState.purchasePrice}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                  />
                </label>
                <label>
                  Prix de vente:
                  <input
                    type="number"
                    name="salePrice"
                    value={formState.salePrice}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                  />
                </label>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 mt-2 text-sm font-medium text-left text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>Stock</span>
              <span>{open ? <AiOutlineMinus /> : <AiOutlinePlus />}</span>
            </Disclosure.Button>
            <Disclosure.Panel className="p-4 mt-2 bg-gray-200 rounded-lg">
              <div className="space-y-4 mx-auto max-w-lg">
                <label>
                  Quantité minimale pour alerte de stock:
                  <input
                    type="number"
                    name="minStockAlert"
                    value={formState.minStockAlert}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                  />
                </label>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 mt-2 text-sm font-medium text-left text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>Images</span>
              <span>{open ? <AiOutlineMinus /> : <AiOutlinePlus />}</span>
            </Disclosure.Button>
            <Disclosure.Panel className="p-4 mt-2 bg-gray-200 rounded-lg">
              <div className="space-y-4 mx-auto max-w-lg">
                <label>
                  Images du produit:
                  <input
                    type="file"
                    multiple
                    name="images"
                    onChange={handleFileChange}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                  />
                </label>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 mt-2 text-sm font-medium text-left text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>Spécificités</span>
              <span>{open ? <AiOutlineMinus /> : <AiOutlinePlus />}</span>
            </Disclosure.Button>
            <Disclosure.Panel className="p-4 mt-2 bg-gray-200 rounded-lg">
              <div className="space-y-4 mx-auto max-w-lg">
                <label>
                  Spécificités:
                  <textarea
                    name="specificities"
                    value={formState.specificities}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                  />
                </label>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Produit;
