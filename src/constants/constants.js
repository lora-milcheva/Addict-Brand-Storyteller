
const LANGUAGES = {
	bg: 'bg',
	en: 'en'
};

const MENU = {
	bg: {
		projects: 'Проекти',
		contact: 'Контакти',
		clients: 'Клиенти',
		categories: 'Категории',
		logout: 'Изход'
	},
	en: {
		projects: 'Projects',
		contact: 'Contacts',
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