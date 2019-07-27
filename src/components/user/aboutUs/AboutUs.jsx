import React from 'react';
import { LanguageContext } from '../../common/languagesContext/LanguageContext';

// Partials
import PageHeader from '../common/headers/PageHeader';
import StoryArchetypes from './partials/StoryArchetypes';
import BlockQuote from '../common/articlePartials/BlockQuote';


class AboutUs extends React.Component {

	render () {

		let activeLanguage = this.context.language;

		return (
			<div id="about-us" className='container-fluid'>

				<PageHeader language={activeLanguage} pageName='aboutUs' />

				<BlockQuote language={activeLanguage}
				            pageName='aboutUs'
				            sectionName='quote'/>

				<StoryArchetypes language={activeLanguage} />

			</div>

		);
	}
}

AboutUs.contextType = LanguageContext;

export default AboutUs;