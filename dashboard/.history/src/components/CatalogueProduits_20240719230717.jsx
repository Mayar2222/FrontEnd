import React from 'react'
function CatalogueProduits() {
  return (
    <div >
      <h1>Catégories du produit</h1>
      <form>
        <label>
          Nom de la catégorie:
          <input type="text" name="categoryName" />
        </label>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  )
}

export default CatalogueProduits
