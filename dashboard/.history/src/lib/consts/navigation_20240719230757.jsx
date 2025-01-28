import {
	HiOutlineAnnotation,
	HiOutlineCog,
	HiOutlineCube,
	HiOutlineDocumentText,
	HiOutlineQuestionMarkCircle,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineViewGrid
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'CatalogueProduits',
		label: 'Catalogue Produit',
		path: '/ <div className={styles.categories}>
      <h1>Catégories du produit</h1>
      <form>
        <label>
          Nom de la catégorie:
          <input type="text" name="categoryName" />
        </label>
        <button type="submit">Ajouter</button>
      </form>
    </div>',
		icon: <HiOutlineCube />
	},
	{
		key: 'orders',
		label: 'Orders',
		path: '/orders',
		icon: <HiOutlineShoppingCart />
	},
	{
		key: 'customers',
		label: 'Customers',
		path: '/customers',
		icon: <HiOutlineUsers />
	},
	{
		key: 'transactions',
		label: 'Transactions',
		path: '/transactions',
		icon: <HiOutlineDocumentText />
	},
	{
		key: 'messages',
		label: 'Messages',
		path: '/messages',
		icon: <HiOutlineAnnotation />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]