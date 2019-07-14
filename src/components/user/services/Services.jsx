import React from 'react';
import { LanguageContext } from '../../common/languagesContext/LanguageContext';

// Partials
import PageHeader from '../common/headers/PageHeader';
import ServicesMain from './partials/ServicesMain';
import ServicesDescription from './partials/ServicesDescription';
import ServicesSkills from './partials/ServicesSkills';
import ServicesWork from './partials/ServicesWork';
import ServicesContact from './partials/ServicesContact';

class Services extends React.Component {

	render () {

		let activeLanguage = this.context.language;

		return (
			<div id="services" className='container-fluid'>

				<PageHeader language={activeLanguage} pageName='services'/>

				<ServicesMain language={activeLanguage}/>

				<ServicesDescription language={activeLanguage}/>

				<ServicesSkills language={activeLanguage}/>

				<ServicesWork language={activeLanguage}/>

				<ServicesContact language={activeLanguage}/>

			</div>

		);
	}
}

Services.contextType = LanguageContext;

export default Services;