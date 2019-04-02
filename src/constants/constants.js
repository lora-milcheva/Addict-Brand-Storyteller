
const LANGUAGES = {
	bg: 'bg',
	en: 'en'
};

const MENU = {
	bg: {
		projects: 'Проекти',
		contact: 'Контакт',
		clients: 'Клиенти',
		categories: 'Категории',
		logout: 'Изход'
	},
	en: {
		projects: 'Projects',
		contact: 'Contact',
		clients: 'Clients',
		categories: 'Categories',
		logout: 'Logout'
	}
};

const CREATE_PROJECT_INPUTS = {
	bg: {
		name: 'Име на проекта',
		description: 'Описание',
		client: 'Клиент',
		year: 'Година',
		webPage: 'Уеб страница',
		isStar: 'Топ проект',
		category: 'Категория',
		thumbnail: 'Тъмбнейл',
		images: 'Изображения',
		videos: 'Видеа'
	},
	en: {
		name: 'Project name',
		description: 'Description',
		client: 'Client',
		year: 'Year',
		webPage: 'Web Page',
		isStar: 'Top Project',
		category: 'Category',
		thumbnail: 'Thumbnail',
		images: 'Images',
		videos: 'Videos'
	}
};

const CATEGORY_INPUTS = {
	bg: {
		name: 'Име на категорията',
	},
	en: {
		name: 'Category name',
	}
};

const CLIENT_INPUTS = {
	bg: {
		name: 'Име на клиента',
	},
	en: {
		name: 'Client name',
	}
};

const BUTTONS = {
	bg: {
		create: 'Създай',
		edit: 'Редакция',
		delete: 'Изтриване',
		cancel: 'Отказ',
		view: 'Разгледай',
		confirm: 'OK',
		close: 'Затвори',

		newProject: 'Нов проект',
		newClient: 'Нов клиент',
		newCategory: 'Нова категория'
	},
	en: {
		create: 'Create',
		edit: 'Edit',
		delete: 'Delete',
		cancel: 'Cancel',
		view: 'View More',
		confirm: 'OK',
		close: 'Close',

		newProject: 'New Project',
		newClient: 'New Client',
		newCategory: 'New Category'
	}
};

const CONFIRM_DIALOG_MESSAGES = {
	bg: {
		confirmDeleteProject: 'Желаете ли да изтриете този проект?',
	},
	en: {
		confirmDeleteProject: 'Delete this project?',
	}
};

const NOTIFICATIONS = {
	bg: {
		projectCreated: 'Проектът беше създаден.',
		projectDeleted: 'Проектът беше изтрит.',

		categoryCreated: 'Категорията е създадена.',
		categoryDeleted: 'Категорията беше изтрита.',

		clientCreated: 'Клиентът е създаден.',
		clientDeleted: 'Клиентът беше изтрит.',

		successEdit: 'Успешна редакция.',

	},
	en: {
		projectCreated: 'Project created.',
		projectDeleted: 'Project deleted.',

		categoryCreated: 'Category created.',
		categoryDeleted: 'Category deleted.',

		clientCreated: 'Client created.',
		clientDeleted: 'Client deleted.',

		successEdit: 'Successful edit.',
	}
};

const ADMIN_PAGES_TEXT = {
	project: {
		bg: {
			thumbnail: 'Тъмбнейл',
			images: 'Изображения',
			videos: 'Видеа',
			editProject: 'Редакция на проект',
			createProject: 'Създаване на проект',
			allProjects: 'Всички проекти'
		},
		en: {
			thumbnail: 'Thumbnail',
			images: 'Images',
			videos: 'Videos',
			editProject: 'Edit Project',
			createProject: 'Create New Project',
			allProjects: 'All Projects'
		}
	},
	client: {
		bg: {
			editClient: 'Редакция на клиент',
			createClient: 'Създаване на клиент',
			allClients: 'Всички клиенти'
		},
		en: {
			editClient: 'Edit Client',
			createClient: 'Create New Client',
			allClients: 'All Clients'
		}
	},
	category: {
		bg: {
			editCategory: 'Редакция на категория',
			createCategory: 'Създаване на категория',
			allCategories: 'Всички категории'
		},
		en: {
			editCategory: 'Edit Category',
			createCategory: 'Create New Category',
			allCategories: 'All Categories'
		}
	}

};

const USER_PAGES_TEXT = {

	home: {
		bg: {
			projects: 'Проекти'
		},
		en: {
			projects: 'Projects'
		}
	},

	carousel: {
		bg: {
			slide1: {
				headline: 'Има само истории',
				text: 'Несподелени. Неразказани. Неизживяни. Погубващи, но и... истории, които обикваш, защото нямаш време за неща, които нямат душа. Истории, които събуждат в теб онова малко момче, което има силата да промени света.',
				image: '/images/carouselNew/birds_BW.jpg'
			},
			slide2: {
				headline: 'Има значение кой разказва твоята история',
				text: 'Несподелени. Неразказани. Неизживяни. Погубващи, но и... истории, които обикваш, защото нямаш време за неща, които нямат душа. Истории, които събуждат в теб онова малко момче, което има силата да промени света.',
				image: '/images/carouselNew/violin.jpg'
			},
			slide3: {
				headline: 'Ако не го почувстваш няма да го запомниш',
				text: 'Несподелени. Неразказани. Неизживяни. Погубващи, но и... истории, които обикваш, защото нямаш време за неща, които нямат душа. Истории, които събуждат в теб онова малко момче, което има силата да промени света.',
				image: '/images/carouselNew/typing.jpg'
			}
		},
		en: {
			slide1: {
				headline: 'There are only stories',
				text: 'Несподелени. Неразказани. Неизживяни. Погубващи, но и... истории, които обикваш, защото нямаш време за неща, които нямат душа. Истории, които събуждат в теб онова малко момче, което има силата да промени света.',
				image: '/images/carouselNew/birds_BW.jpg'
			},
			slide2: {
				headline: 'Some test text',
				text: 'Несподелени. Неразказани. Неизживяни. Погубващи, но и... истории, които обикваш, защото нямаш време за неща, които нямат душа. Истории, които събуждат в теб онова малко момче, което има силата да промени света.',
				image: '/images/carouselNew/violin.jpg'
			},
			slide3: {
				headline: 'Another headline',
				text: 'Несподелени. Неразказани. Неизживяни. Погубващи, но и... истории, които обикваш, защото нямаш време за неща, които нямат душа. Истории, които събуждат в теб онова малко момче, което има силата да промени света.',
				image: '/images/carouselNew/typing.jpg'
			}
		}
	},

	company: {
		bg: {
			radio: {
				name: 'Радио',
				text: 'Елементарен примерен текст, използван в печатарската и типографската индустрия. Lorem Ipsum е индустриален стандарт от около 1500 година, когато неизвестен печатар взема няколко печатарски букви и ги разбърква'
			},
			creative: {
				name: 'Криейтив',
				text: 'Елементарен примерен текст, използван в печатарската и типографската индустрия. Lorem Ipsum е индустриален стандарт от около 1500 година, когато неизвестен печатар взема няколко печатарски букви и ги разбърква'
			},
			events: {
				name: 'Събития',
				text: 'Елементарен примерен текст, използван в печатарската и типографската индустрия. Lorem Ipsum е индустриален стандарт от около 1500 година, когато неизвестен печатар взема няколко печатарски букви и ги разбърква'
			}
		},
		en: {
			radio: {
				name: 'Radio',
				text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
			},
			creative: {
				name: 'Creative',
				text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
			},
			events: {
				name: 'Events',
				text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
			}
		}
	},

	project: {
		bg: {
			otherProjects: 'Други проекти',
		},
		en: {
			otherProjects: 'Other Projects',
		}
	}
};



export {
	LANGUAGES,
	MENU,
	CREATE_PROJECT_INPUTS,
	CATEGORY_INPUTS,
	CLIENT_INPUTS,
	BUTTONS,
	CONFIRM_DIALOG_MESSAGES,
	NOTIFICATIONS,
	ADMIN_PAGES_TEXT,
	USER_PAGES_TEXT
}