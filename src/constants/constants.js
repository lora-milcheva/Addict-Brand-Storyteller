
const LANGUAGES = {
	BG: 'BG',
	EN: 'EN'
};

const MENU = {
	BG: {
		projects: 'Проекти',
		contact: 'Контакти',
		clients: 'Клиенти',
		categories: 'Категории',
		logout: 'Изход'
	},
	EN: {
		projects: 'Projects',
		contact: 'Contacts',
		clients: 'Clients',
		categories: 'Categories',
		logout: 'Logout'
	}
};

const CREATE_PROJECT_INPUTS = {
	BG: {
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
	EN: {
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
	BG: {
		name: 'Име на категорията',
	},
	EN: {
		name: 'Category name',
	}
};

const CLIENT_INPUTS = {
	BG: {
		name: 'Име на клиента',
	},
	EN: {
		name: 'Client name',
	}
};

const BUTTONS = {
	BG: {
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
	EN: {
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
	BG: {
		confirmDeleteProject: 'Желаете ли да изтриете този проект?',
	},
	EN: {
		confirmDeleteProject: 'Delete this project?',
	}
};

const NOTIFICATIONS = {
	BG: {
		projectCreated: 'Проектът беше създаден.',
		projectDeleted: 'Проектът беше изтрит.',

		categoryCreated: 'Категорията е създадена.',
		categoryDeleted: 'Категорията беше изтрита.',

		clientCreated: 'Клиентът е създаден.',
		clientDeleted: 'Клиентът беше изтрит.',

		successEdit: 'Успешна редакция.',

	},
	EN: {
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
		BG: {
			thumbnail: 'Тъмбнейл',
			images: 'Изображения',
			videos: 'Видеа',
			editProject: 'Редакция на проект',
			createProject: 'Създаване на проект',
			allProjects: 'Всички проекти'
		},
		EN: {
			thumbnail: 'Thumbnail',
			images: 'Images',
			videos: 'Videos',
			editProject: 'Edit Project',
			createProject: 'Create New Project',
			allProjects: 'All Projects'
		}
	},
	client: {
		BG: {
			editClient: 'Редакция на клиент',
			createClient: 'Създаване на клиент',
			allClients: 'Всички клиенти'
		},
		EN: {
			editClient: 'Edit Client',
			createClient: 'Create New Client',
			allClients: 'All Clients'
		}
	},
	category: {
		BG: {
			editCategory: 'Редакция на категория',
			createCategory: 'Създаване на категория',
			allCategories: 'Всички категории'
		},
		EN: {
			editCategory: 'Edit Category',
			createCategory: 'Create New Category',
			allCategories: 'All Categories'
		}
	}

};

const USER_PAGES_TEXT = {
	project: {
		BG: {
			otherProjects: 'Други проекти',
		},
		EN: {
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