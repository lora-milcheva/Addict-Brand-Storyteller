import React from 'react';
import PropTypes from 'prop-types';

// Partials
import Article from '../../common/articlePartials/Article';

class ServicesDescription extends React.Component {

	render () {

		let activeLanguage = this.props.language;

		return (

			<section id='services-description' className='container section-padding-top-bottom'>


				<div id='articles'>
					<Article language={activeLanguage}
					         pageName='services'
					         sectionName='main'
					         subSectionName='tailorMadeProduction'/>

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