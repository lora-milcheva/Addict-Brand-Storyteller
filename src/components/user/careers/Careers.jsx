import React from 'react';
import { LanguageContext } from '../../common/languagesContext/LanguageContext';


// Partials
import PageHeader from '../common/headers/PageHeader';


class Careers extends React.Component {

	render () {

		let activeLanguage = this.context.language;

		return (
			<div id="careers" className='container-fluid'>

				<PageHeader language={activeLanguage} pageName='careers' />

			</div>

		);
	}
}

Careers.contextType = LanguageContext;

export default Careers;