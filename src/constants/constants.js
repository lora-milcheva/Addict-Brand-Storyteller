
const LANGUAGES = {
	BG: 'BG',
	EN: 'EN'
};

const CREATE_PROJECT_INPUTS = {
	BG: {
		name: 'Име на проекта',
		description: 'Описание',
		client: 'Клиент',
		year: 'Година',
		webPage: 'Уеб страница',
		category: 'Категория',
		thumbnail: 'Thumbnail',
		images: 'Изображения',
		videos: 'Видеа'
	},
	EN: {
		name: 'Project name',
		description: 'Description',
		client: 'Client',
		year: 'Year',
		webPage: 'Web Page',
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
	},
	EN: {
		create: 'Create',
		edit: 'Edit',
		delete: 'Delete',
		cancel: 'Cancel'
	}
};

const CATEGORIES = {
	BG: {
		print: 'печат',
		web: 'уеб',
		radio: 'радио',
		other: 'други'
	},
	EN: {
		print: 'print',
		web: 'web',
		radio: 'radio',
		other: 'other'
	}
};


export {
	LANGUAGES,
	CREATE_PROJECT_INPUTS,
	CATEGORY_INPUTS,
	CLIENT_INPUTS,
	BUTTONS,
	CATEGORIES
}