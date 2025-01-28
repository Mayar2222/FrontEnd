import React from 'react'
function CatalogueProduits() {
  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded-md shadow-md">
    <h1 className="text-2xl font-bold mb-5">Catégories du produit</h1>
    <form>
      <label className="block mb-4">
        Nom de la catégorie:
        <input
          type="text"
          name="categoryName"
          className="w-full mt-2 p-2 border border-gray-300 rounded-md"
        />
      </label>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Ajouter
      </button>
    </form>
  </div>
  )
}

export default CatalogueProduits
