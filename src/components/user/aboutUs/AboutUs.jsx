import React from 'react';
import { LanguageContext } from '../../common/languagesContext/LanguageContext';

// HOC
import SEO_MetaTags from "../common/SEO_MetaTags";

// Partials
import PageHeader from '../common/headers/PageHeader';
import StoryArchetypes from './partials/StoryArchetypes';
import BlockQuote from '../common/articlePartials/BlockQuote';


class AboutUs extends React.Component {

	render () {

		let activeLanguage = this.context.language;

		return (
			<div id="about-us" className='container-fluid'>

				{/* eslint-disable-next-line react/jsx-pascal-case */}
				<SEO_MetaTags activeLanguage={activeLanguage} pageName={'about-us'}/>

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