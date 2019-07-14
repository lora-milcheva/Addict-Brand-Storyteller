import React from 'react';
import PropTypes from 'prop-types';


// Partials
import SectionHeader from '../../common/headers/SectionHeader';

// Constants
import { USER_PAGES_TEXT } from '../../../../constants/constants';

// Utils
import UTILS from '../../../../utils/utils';




class ServicesMain extends React.Component {

	render () {

		let activeLanguage = this.props.language;

		return (

			<section id='services-main' className='container'>

				<SectionHeader pageName='services' language={activeLanguage} sectionName='main'/>

				<section id='services-scheme'>

						<span className='scheme'
						      dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT.services[activeLanguage].sections.main.tailorMadeProduction.title)}/>

					<span className='scheme'
					      dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT.services[activeLanguage].sections.main.brandStory.title)}/>

					<span className='scheme'
					      dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT.services[activeLanguage].sections.main.brandConcept.title)}/>

					<span className='scheme'
					      dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT.services[activeLanguage].sections.main.integratedCampaigns.title)}/>

					<span className='scheme'
					      dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT.services[activeLanguage].sections.main.brandAchievements.title)}/>
				</section>

				<h2 className="section-title text-center"
				    dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT.services[activeLanguage].sections.main.brandConcept.text)}/>

			</section>
		);
	}
}

export default ServicesMain;

ServicesMain.propTypes = {
	language: PropTypes.string
};