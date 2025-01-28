import {
	HiOutlineCog,
	HiOutlineCube,
	HiOutlineQuestionMarkCircle
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	
	{
		key: 'CatalogueProduits',
		label: 'Catalogue Produit',
		path: '/CatalogueProduits',
		icon: <HiOutlineCube />
	},
	
	
	
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