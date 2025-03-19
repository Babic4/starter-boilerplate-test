import {
	DashboardOutlined,
	ShoppingCartOutlined,
	ShoppingOutlined,
	UserOutlined,
	GiftOutlined,
	ShopOutlined,
	FundProjectionScreenOutlined,
	TeamOutlined,
	MailOutlined,
	SettingOutlined,
	MobileOutlined,
	FileExclamationOutlined,
} from '@ant-design/icons'
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [
	{
		key: 'home',
		path: `${APP_PREFIX_PATH}/home`,
		title: 'home',
		icon: DashboardOutlined,
		breadcrumb: false,
		submenu: [],
	},
]

const mainNavTree = [
	{
		key: 'main',
		path: `${APP_PREFIX_PATH}/`,
		title: 'Основные',
		icon: DashboardOutlined,
		breadcrumb: false,
		submenu: [
			{
				key: 'main-dashboard',
				path: `${APP_PREFIX_PATH}/dashboard`,
				title: 'Дашборд',
				icon: DashboardOutlined,
				breadcrumb: true,
				submenu: [],
			},
			{
				key: 'main-catalog',
				path: `${APP_PREFIX_PATH}/catalog`,
				title: 'Каталог',
				icon: ShoppingCartOutlined,
				breadcrumb: true,
				submenu: [
					{
						key: 'main-catalog-goods',
						path: `${APP_PREFIX_PATH}/catalog/goods`,
						title: 'Товары',
						icon: '',
						breadcrumb: true,
						submenu: [],
					},
					{
						key: 'main-catalog-categories',
						path: `${APP_PREFIX_PATH}/catalog/categories`,
						title: 'Категории',
						icon: '',
						breadcrumb: true,
						submenu: [],
					},
					{
						key: 'main-catalog-collections',
						path: `${APP_PREFIX_PATH}/catalog/collections`,
						title: 'Коллекции',
						icon: '',
						breadcrumb: true,
						submenu: [],
					},
					{
						key: 'main-catalog-combo',
						path: `${APP_PREFIX_PATH}/catalog/combo`,
						title: 'Комбо',
						icon: '',
						breadcrumb: true,
						submenu: [],
					},
				],
			},
			{
				key: 'main-orders',
				path: `${APP_PREFIX_PATH}/orders`,
				title: 'Заказы',
				icon: ShoppingOutlined,
				breadcrumb: true,
				submenu: [],
			},
			{
				key: 'main-clients',
				path: `${APP_PREFIX_PATH}/clients`,
				title: 'Клиенты',
				icon: UserOutlined,
				breadcrumb: true,
				submenu: [
					{
						key: 'main-clients-client-list',
						path: `${APP_PREFIX_PATH}/clients/client-list`,
						title: 'Список клиентов',
						icon: '',
						breadcrumb: true,
						submenu: [],
					},
					{
						key: 'main-clients-clients-groups',
						path: `${APP_PREFIX_PATH}/clients/clients-groups`,
						title: 'Группы клиентов',
						icon: '',
						breadcrumb: true,
						submenu: [],
					},
				],
			},
			{
				key: 'main-banners',
				path: `${APP_PREFIX_PATH}/banners`,
				title: 'Баннеры',
				icon: FundProjectionScreenOutlined,
				breadcrumb: true,
				submenu: [],
			},
			{
				key: 'main-promo',
				path: `${APP_PREFIX_PATH}/promo`,
				title: 'Промокоды',
				icon: GiftOutlined,
				breadcrumb: true,
				submenu: [],
			},
			{
				key: 'main-offline-point',
				path: `${APP_PREFIX_PATH}/offline-point`,
				title: 'Оффлайн точка',
				icon: ShopOutlined,
				breadcrumb: true,
				submenu: [
					{
						key: 'main-offline-point-addresses',
						path: `${APP_PREFIX_PATH}/offline-point/addresses`,
						title: 'Адреса',
						icon: '',
						breadcrumb: true,
						submenu: [],
					},
					{
						key: 'main-offline-point-geofences',
						path: `${APP_PREFIX_PATH}/offline-point/geofences`,
						title: 'Геозоны',
						icon: '',
						breadcrumb: true,
						submenu: [],
					},
				],
			},
			{
				key: 'main-employees',
				path: `${APP_PREFIX_PATH}/employees`,
				title: 'Сотрудники',
				icon: TeamOutlined,
				breadcrumb: true,
				submenu: [],
			},
			{
				key: 'main-mailings',
				path: `${APP_PREFIX_PATH}/mailings`,
				title: 'Рассылки',
				icon: MailOutlined,
				breadcrumb: true,
				submenu: [],
			},
		],
	},
]

const systemNavTree = [
	{
		key: 'system',
		path: `${APP_PREFIX_PATH}/systems`,
		title: 'Системные',
		icon: DashboardOutlined,
		breadcrumb: false,
		submenu: [
			{
				key: 'system-settings',
				path: `${APP_PREFIX_PATH}/systems/settings`,
				title: 'Настройки',
				icon: SettingOutlined,
				breadcrumb: true,
				submenu: [],
			},
			{
				key: 'system-mobile',
				path: `${APP_PREFIX_PATH}/systems/mobile`,
				title: 'Мобильное приложение',
				icon: MobileOutlined,
				breadcrumb: true,
				submenu: [],
			},
			{
				key: 'system-logs',
				path: `${APP_PREFIX_PATH}/systems/logs`,
				title: 'Логи',
				icon: FileExclamationOutlined,
				breadcrumb: true,
				submenu: [],
			},
		],
	},
]

const navigationConfig = [...mainNavTree, ...systemNavTree]

export default navigationConfig
