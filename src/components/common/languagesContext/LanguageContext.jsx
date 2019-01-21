import React from 'react';

export const languages = {
	bg: 'bg',
	en: 'en'
};

export const LanguageContext = React.createContext(
	languages.bg // default value
);