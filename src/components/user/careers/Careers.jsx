import React from 'react';
import { LanguageContext } from '../../common/languagesContext/LanguageContext';

// Partials
import PageHeader from '../common/headers/PageHeader';
import SectionHeader from '../common/headers/SectionHeader';
import ImagePageHeader from '../common/headers/ImagePageHeader';
import ArticleSection from '../common/articlePartials/ArticleSection';


class Careers extends React.Component {

	render () {

		let activeLanguage = this.context.language;

		return (
			<div id="careers" className='container-fluid'>

				{/*<PageHeader language={activeLanguage} pageName='careers'/>*/}

				<ImagePageHeader language={activeLanguage}
				                 pageName='careers'
				                 sectionName='content'
				                 imgUrl='images/bgs/team.jpg'/>

				<div className='container'>
					<ArticleSection language={activeLanguage}
					                pageName='careers'
					                sectionName='content'/>

					<SectionHeader pageName='careers' language={activeLanguage} sectionName='callToAction'/>
				</div>

			</div>

		);
	}
}

Careers.contextType = LanguageContext;

export default Careers;