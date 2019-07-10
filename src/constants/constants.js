const LANGUAGES = {
	bg: 'bg',
	en: 'en'
};

const RESOLUTIONS = {
	xs: 450,
	sm: 680,
	md: 980,
	bootstrapXS: 768,
	bootstrapSM: 992,
	bootstrapMD: 1200,
	smTopSellers: 640,
	mdTopSellers: 1000,
};

const FORM_VALIDATION = {
	bg: {
		requiredField: 'Това поле е задължително.',
		validMail: 'Моля, въведете валиден имейл.',
	},
	en: {
		requiredField: 'This field is required.',
		validMail: 'Please, enter a valid email.',
	}
};

const MENU = {
	bg: {
		home: 'Начало',
		projects: 'Проекти',
		services: 'Услуги',
		aboutUs: 'За нас',
		careers: 'Кариери',
		contact: 'Контакт',
		clients: 'Клиенти',
		categories: 'Категории',
		sections: 'Секциии',
		login: 'Логин',
		logout: 'Изход'
	},
	en: {
		home: 'Home',
		projects: 'Projects',
		services: 'Services',
		aboutUs: 'About Us',
		careers: 'Careers',
		contact: 'Contact',
		clients: 'Clients',
		categories: 'Categories',
		sections: 'Sections',
		login: 'Login',
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
		name: 'ProjectSimple name',
		description: 'Description',
		info: 'Info',
		client: 'Client',
		year: 'Year',
		textSectionName: 'Text Section Name',
		textBG: 'Text BG',
		textEN: 'Text EN',
		webPage: 'Web Page',
		isStar: 'Top ProjectSimple',
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
		send: 'Изпрати',
		saveChanges: 'Запази промените',
		add: 'Добави',
		delete: 'Изтриване',
		clear: 'Изчисти',
		info: 'Инфо',
		cancel: 'Отказ',
		view: 'Разгледай',
		confirm: 'OK',
		close: 'Затвори',
		addSection: 'Добави секция',

		// Home
		seeWhatWeDo: 'Вижте какво правим',
		readMore: 'Прочетете повече',
		seeProject: 'Към проекта',

		createProject: 'Нов проект',
		createClient: 'Нов клиент',
		createCategory: 'Нова категория',
		createSection: 'Създай секция',

		more: 'Повече'
	},
	en: {
		create: 'Create',
		edit: 'Edit',
		send: 'Send',
		saveChanges: 'Save Changes',
		add: 'Add',
		delete: 'Delete',
		clear: 'Clear',
		info: 'Info',
		cancel: 'Cancel',
		view: 'View More',
		confirm: 'OK',
		close: 'Close',
		addSection: 'Add Section',

		// Home
		seeWhatWeDo: 'See what we do',
		readMore: 'Read more',
		seeProject: 'View this project',

		createProject: 'New ProjectSimple',
		createClient: 'New Client',
		createCategory: 'New Category',
		createSection: 'Create Section',

		more: 'More'
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

		selectSectionName: 'Моля, изберете име на секция.',

		messageSent: 'Съобшението беше изпратено.',
		messageError: 'Грешка. Моля, опитайто отново.',

		fieldsRequired: 'Моля, попълнете следните полета:',

	},
	en: {
		projectCreated: 'ProjectSimple created.',
		projectDeleted: 'ProjectSimple deleted.',

		categoryCreated: 'Category created.',
		categoryDeleted: 'Category deleted.',

		clientCreated: 'Client created.',
		clientDeleted: 'Client deleted.',

		sectionCreated: 'Section created',
		sectionDeleted: 'Section deleted',

		successEdit: 'Successful edit.',

		selectSectionName: 'Please, select section name.',

		messageSent: 'Message sent.',
		messageError: 'Error sending your message.',

		fieldsRequired: 'Please, fill out these fields:',
	}
};

const ADMIN_PAGES_TEXT = {
	project: {
		bg: {
			thumbnail: 'Тъмбнейл',
			cover: 'Корица',
			images: 'Изображения',
			videos: 'Видеа',
			editProject: 'Редакция на проект',
			createProject: 'Създаване на проект',
			allProjects: 'Всички проекти'
		},
		en: {
			thumbnail: 'Thumbnail',
			cover: 'Cover',
			images: 'Images',
			videos: 'Videos',
			editProject: 'Edit ProjectSimple',
			createProject: 'Create New ProjectSimple',
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
			title: 'Ние виждаме истории във всичко. Решаваме проблеми като ги разказваме.',
			subtitle: '',

			sections: {

				ourAim: {
					name: 'Нашата цел',
					title: 'Нашата цел е да създаваме и комуникираме бранд истории, които работят за вашата публика и бизнес.',
				},

				ourPhilosophy: {
					name: 'Нашата философия',
					title: 'Story - Telling & Experience',

					sections: {
						creativity: {
							name: 'Водени от креативността',
							text: 'Ние сме пристрастени към качественото изпълнение на поставените задачи. Вярваме, че големите брандове са изградени върху силни и докосващи истории. В една такава бранд история креативността трябва да бъде навсякъде, дори и в най-дребния детайл. Амбиция за най-добрата креативност води всички нас.'
						},
						strategy: {
							name: 'Запленени от стратегията',
							text: 'Ние вярваме, че успехът идва, когато си наясно какво правиш. Креативната стратегия трябва да има ясни и измерими цели, поставени в Бранд Концепцията.'
						},
						system: {
							name: 'Вярващи в системата',
							text: 'От първия ден, в който започнем да работим заедно, през всеки следващ, през всички идеи, разработки и одобрени кампании, ние се опитваме да работим като едно, да дишаме като един организъм. Вярваме, че синхронът е много важен, за да се свържат всички елементи и да видим първоначалната си идея, реализирана възможно най-добре.'
						},
						experience: {
							name: 'Влюбени в историята & преживяването',
							text: 'Ние обичаме да създаваме бранд истории, в които фокусът не е продукт. Продуктът за нас е част от историята. Това, което е важно са ХОРАТА. Вярваме, че нашата индустрия трябва да се насочи към създаване на смислени, ценностни и вдъхновяващи истории и преживявания за хората.n'
						},
					}
				},

				services: {
					name: 'Услуги',
					title: 'Услуги',
					text: 'Ние помагаме на нашите клиенти да изградят своята Бранд Концепция и да я интегрират успешно в комуникациите си.\n' +
						'Важно е, не какво ние казваме на хората, посредством всички сигнали, които брандът ни изпраща, а в какво хората вярват.'
				},

				projects: {
					name: 'Проекти',
					title: ''
				},

				aboutUs: {
					name: 'За нас',
					title: 'За нас',
					text: 'Addict е първата „brand storytelling“агенция в България. Ние обличаме в емоция всичко, което правим, защото държим да докоснем сърцата на хората. Разказването на истории е в кръвта ни – затова на всеки проект гледаме като на предизвикателство да поднесем една нова, оригинална история. Ние създаваме светове и изграждаме силни образи, които носят собствен дух и характер. Така именно в тях оставяме тази различност, толкова важна, за да бъдат те запомнени и откроени. '
				}

			},
		},

		en: {
			title: 'We see stories in everything. We solve problems as we tell them.',
			subtitle: '',

			sections: {

				ourAim: {
					name: 'Our aim',
					title: 'English text here',
				},

				ourPhilosophy: {
					name: 'Our philosophy',
					title: 'Story - Telling & Experience',

					sections: {
						creativity: {
							name: 'Водени от креативността',
							text: 'Ние сме пристрастени към качественото изпълнение на поставените задачи. Вярваме, че големите брандове са изградени върху силни и докосващи истории. В една такава бранд история креативността трябва да бъде навсякъде, дори и в най-дребния детайл. Амбиция за най-добрата креативност води всички нас.'
						},
						strategy: {
							name: 'Запленени от стратегията',
							text: 'Ние вярваме, че успехът идва, когато си наясно какво правиш. Креативната стратегия трябва да има ясни и измерими цели, поставени в Бранд Концепцията.'
						},
						system: {
							name: 'Вярващи в системата',
							text: 'От първия ден, в който започнем да работим заедно, през всеки следващ, през всички идеи, разработки и одобрени кампании, ние се опитваме да работим като едно, да дишаме като един организъм. Вярваме, че синхронът е много важен, за да се свържат всички елементи и да видим първоначалната си идея, реализирана възможно най-добре.'
						},
						experience: {
							name: 'Влюбени в историята & преживяването',
							text: 'Ние обичаме да създаваме бранд истории, в които фокусът не е продукт. Продуктът за нас е част от историята. Това, което е важно са ХОРАТА. Вярваме, че нашата индустрия трябва да се насочи към създаване на смислени, ценностни и вдъхновяващи истории и преживявания за хората.n'
						},
					}
				},

				services: {
					name: 'Services',
					title: 'Services',
					text: 'English text here'
				},

				projects: {
					name: 'Projects',
					title: ''
				},

				aboutUs: {
					name: 'About us',
					title: 'English text here',
					text: 'English text here'
				}

			},
		}
	},

	ourPhilosophy: {
		bg: {
			title: '',
		},
		en: {
			title: '',
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

	projects: {
		bg: {
			title: 'Вдъхновяващи бранд истории. Ефективност, чрез въздействие.',
			subtitle: 'Addict  цели да решава бизнес проблеми по креативен начин. От изграждане на бранд концепции, през разказване на истории до интегрирани кампании, внедрени в бизнес модели, ние създаваме реални отношения с хората, които постигат резултати.\n' +
				'За нас от Addict е много важно да чуем, не само проблемите на бизнеса, но и как тупти сърцето на Компанията. Така надграждаме бизнес модела с бранд история, която докосва посредством неподправеност и емоция.\n'
		},
		en: {
			title: 'Inspiring Brand stories. Effectiveness through impact.',
			subtitle: 'Some text here'
		}
	},

	services: {
		bg: {
			title: 'Бизнес растеж. Бранд концепция в сърцевината.',
			subtitle: 'Ние създаваме бранд истории, комуникации и изживявания за потребителя, които постигат инспириран бизнес растеж с ясно дефинирана Бранд Концепция в сърцевината.\n' +
				'Нашият подход поставя Бранд Концепцията в основата на стратегическото мислене като дефинирането на практическите действия, гарантиращи изпълнение на вашата мисия и ценности ни дават възможност да създадем „STORY“, разгърнато вляво от Бранд Концепцията, „TELLING“, съответно вдясно от Концепцията и на последно място, но не и по значение „EXPERIENCE“, обуславящ връзката между целите ни и реалните бранд постижения.\n'

		},
		en: {
			title: 'Business growth. Brand concept in the very heart.',
			subtitle: ''
		}
	},

	aboutUs: {
		bg: {
			title: 'Извън зоната на комфорт. В търсене на необикновени неща.',
			subtitle: 'Нашата работа е да изкараме хората от зоната им на комфорт и да ги накараме да правят необикновени неща.'
		},
		en: {
			title: 'Outside the Comfort zone. In search of the unusual.',
			subtitle: 'Some text here'
		}
	},

	careers: {
		bg: {
			title: 'Най-добрата история се нуждае от най-добрите разказвачи.',
			subtitle: ''
		},
		en: {
			title: 'The best story requires the best narrators.',
			subtitle: ''
		}
	},

	contact: {
		bg: {
			title: 'Да направим нещо заедно.',
			subtitle: 'Свържи се с нас.'

		},
		en: {
			title: 'Let\'s make something together.',
			subtitle: 'Get in touch'
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
			project: 'ProjectSimple',
			otherProjects: 'Other Projects',
		}
	},

	contactForm: {
		bg: {
			title: 'Свържи се с нас',
			name: 'Име',
			lastName: 'Фамилия',
			email: 'Имейл',
			phone: 'Телефон',
			subject: 'Относно',
			message: 'Въведете Вашето съобщение тук'
		},
		en: {
			title: 'Contact us',
			name: 'First Name',
			lastName: 'Last Name',
			email: 'Email',
			phone: 'Phone',
			subject: 'Subject',
			message: 'Enter Your Message Here'
		}
	}
};

export {
	LANGUAGES,
	RESOLUTIONS,
	FORM_VALIDATION,
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
};