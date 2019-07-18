import React from 'react';
import PropTypes from 'prop-types';

// Partials
import Article from '../../common/articlePartials/Article';
import UTILS from '../../../../utils/utils';
import { USER_PAGES_TEXT } from '../../../../constants/constants';

class ServicesDescription extends React.Component {

	render () {

		let activeLanguage = this.props.language;

		return (

			<section id='services-description' className='container section-padding-top-bottom'>

				<h2 className="section-title text-center"
				    dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT.services[activeLanguage].sections.main.brandConcept.text)}/>


				<div id='articles'>
					<Article language={activeLanguage}
					         pageName='services'
					         sectionName='main'
					         subSectionName='brandStory'/>

					<Article language={activeLanguage}
					         pageName='services'
					         sectionName='main'
					         subSectionName='integratedCampaigns'/>

					<Article language={activeLanguage}
					         pageName='services'
					         sectionName='main'
					         subSectionName='tailorMadeProduction'/>

					<Article language={activeLanguage}
					         pageName='services'
					         sectionName='main'
					         subSectionName='brandAchievements'/>
				</div>

			</section>

		);
	}
}

export default ServicesDescription;

ServicesDescription.propTypes = {
	language: PropTypes.string
};