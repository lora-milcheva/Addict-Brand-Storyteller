import React from 'react';
import PropTypes from 'prop-types';

// HOC
import AnimateOnScroll from '../../HOC/AnimateOnScroll';

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

			<section id='services-main' className='container section-padding-bottom'>

				<SectionHeader pageName='services' language={activeLanguage} sectionName='main'/>

				<section id='services-scheme'>

					<span className='scheme left'
					      dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT.services[activeLanguage].sections.main.schemeText.tailorMadeProduction)}/>

					<span className='scheme left'
					      dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT.services[activeLanguage].sections.main.schemeText.brandStory)}/>

					<div className='scheme center'>
						<span dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT.services[activeLanguage].sections.main.schemeText.brandConcept)}/>
						<span className='small' dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT.services[activeLanguage].sections.main.brandConcept.text)}/>
					</div>

					<span className='scheme right'
					      dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT.services[activeLanguage].sections.main.schemeText.integratedCampaigns)}/>

					<span className='scheme right'
					      dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT.services[activeLanguage].sections.main.schemeText.brandAchievements)}/>
				</section>

				<section id='scheme-description'>
					<span className='scheme-description'
					      dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT.services[activeLanguage].sections.main.schemeText.architecture)}/>

					<span className='scheme-description'
					      dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT.services[activeLanguage].sections.main.schemeText.startPoint)}/>

					<span className='scheme-description'
					      dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT.services[activeLanguage].sections.main.schemeText.marketingCommunications)}/>
				</section>

			</section>
		);
	}
}

const WrappedComponent = AnimateOnScroll(ServicesMain);

export default WrappedComponent;

ServicesMain.propTypes = {
	language: PropTypes.string
};