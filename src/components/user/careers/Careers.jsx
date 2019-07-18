import React from 'react';
import { LanguageContext } from '../../common/languagesContext/LanguageContext';

// Partials
import PageHeader from '../common/headers/PageHeader';
import SectionHeader from '../common/headers/SectionHeader';


class Careers extends React.Component {

	render () {

		let activeLanguage = this.context.language;

		return (
			<div id="careers" className='container-fluid'>

				<PageHeader language={activeLanguage} pageName='careers'/>

				<section className='container'>
					<SectionHeader pageName='careers' language={activeLanguage} sectionName='content'/>
					<SectionHeader pageName='careers' language={activeLanguage} sectionName='callToAction'/>
				</section>

			</div>

		);
	}
}

Careers.contextType = LanguageContext;

export default Careers;