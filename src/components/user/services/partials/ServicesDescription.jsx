import React from 'react';
import PropTypes from 'prop-types';

// HOC
import AnimateOnScroll from '../../HOC/AnimateOnScroll';

// Partials
import Article from '../../common/articlePartials/Article';


class ServicesDescription extends React.Component {

	render () {

		let activeLanguage = this.props.language;

		return (

			<section id='services-description' className='container section-padding-bottom'>


				<div id='articles'>

					<Article language={activeLanguage}
					         pageName='services'
					         sectionName='main'
					         subSectionName='brandStory'/>

					<Article language={activeLanguage}
					         pageName='services'
					         sectionName='main'
					         subSectionName='tailorMadeProduction'/>

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

const WrappedComponent = AnimateOnScroll(ServicesDescription);

export default WrappedComponent;

ServicesDescription.propTypes = {
	language: PropTypes.string
};