
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
		sections: 'Секциии',
		logout: 'Изход'
	},
	en: {
		projects: 'Projects',
		contact: 'Contact',
		clients: 'Clients',
		categories: 'Categories',
		sections: 'Sections',
		logout: 'Logout'
	}
};

const CREATE_PROJECT_INPUTS = {
	bg: {
		name: 'Име на проекта',
		description: 'Описание',
		info: 'Информация',
		client: 'Клиент',
		year: 'Година',
		textSectionName: 'Име на секцията',
		textBG: 'Текст БГ',
		textEN: 'Текст EN',
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
		info: 'Info',
		client: 'Client',
		year: 'Year',
		textSectionName: 'Text Section Name',
		textBG: 'Text BG',
		textEN: 'Text EN',
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

const SECTION_INPUTS = {
	bg: {
		name: 'Име на секцията',
	},
	en: {
		name: 'Section name',
	}
};

const BUTTONS = {
	bg: {
		create: 'Създай',
		edit: 'Редакция',
		saveChanges: 'Запази промените',
		add: 'Добави',
		delete: 'Изтриване',
		cancel: 'Отказ',
		view: 'Разгледай',
		confirm: 'OK',
		close: 'Затвори',
		addSection: 'Добави секция',

		createProject: 'Нов проект',
		createClient: 'Нов клиент',
		createCategory: 'Нова категория',
		createSection: 'Създай секция',
	},
	en: {
		create: 'Create',
		edit: 'Edit',
		saveChanges: 'Save Changes',
		add: 'Add',
		delete: 'Delete',
		cancel: 'Cancel',
		view: 'View More',
		confirm: 'OK',
		close: 'Close',
		addSection: 'Add Section',

		createProject: 'New Project',
		createClient: 'New Client',
		createCategory: 'New Category',
		createSection: 'Create Section',
	}
};

const CONFIRM_DIALOG_MESSAGES = {
	bg: {
		confirmDeleteProject: 'Желаете ли да изтриете този проект?',
		conformDelete: 'Изтриване?',
		confirmDeleteSection: 'Изтриване на секцията?',
	},
	en: {
		confirmDeleteProject: 'Delete this project?',
		conformDelete: 'Confirm delete',
		confirmDeleteSection: 'Delete section?',
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

		sectionCreated: 'Секцията е създадена',
		sectionDeleted: 'Секцията беше изтрита',

		successEdit: 'Успешна редакция.',

		selectSectionName: 'Моля, изберете име на секция.'

	},
	en: {
		projectCreated: 'Project created.',
		projectDeleted: 'Project deleted.',

		categoryCreated: 'Category created.',
		categoryDeleted: 'Category deleted.',

		clientCreated: 'Client created.',
		clientDeleted: 'Client deleted.',

		sectionCreated: 'Section created',
		sectionDeleted: 'Section deleted',

		successEdit: 'Successful edit.',

		selectSectionName: 'Please, select section name.'
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
			clients: 'Клиенти',
			editClient: 'Редакция на клиент',
			createClient: 'Създаване на клиент',
			allClients: 'Всички клиенти'
		},
		en: {
			clients: 'Clients',
			editClient: 'Edit Client',
			createClient: 'Create New Client',
			allClients: 'All Clients'
		}
	},
	category: {
		bg: {
			categories: 'Категории',
			editCategory: 'Редакция на категория',
			createCategory: 'Създаване на категория',
			allCategories: 'Всички категории'
		},
		en: {
			categories: 'Categories',
			editCategory: 'Edit Category',
			createCategory: 'Create New Category',
			allCategories: 'All Categories'
		}
	},
	section: {
		bg: {
			sections: 'Секции',
			editSection: 'Редакция на инфо секция',
			createSection: 'Създаване на инфо секция',
			allSection: 'Всички секции'
		},
		en: {
			sections: 'Sections',
			editSection: 'Edit Info Section',
			createSection: 'Create New Info Section',
			allSection: 'All Sections'
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
			cliche: 'Клишето',
			year: 'Година',
			client: 'Клиент',
			project: 'Проектът',
			otherProjects: 'Други проекти',
		},
		en: {
			cliche: 'Cliche',
			year: 'Year',
			client: 'Client',
			project: 'Project',
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
	SECTION_INPUTS,
	BUTTONS,
	CONFIRM_DIALOG_MESSAGES,
	NOTIFICATIONS,
	ADMIN_PAGES_TEXT,
	USER_PAGES_TEXT
}