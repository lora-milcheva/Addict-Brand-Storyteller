import React from 'react';
import PropTypes from 'prop-types';

// HOC
import AnimateOnScroll from '../../HOC/AnimateOnScroll';


// Constants
import { USER_PAGES_TEXT } from '../../../../constants/constants';

// Utils
import UTILS from '../../../../utils/utils';


class SectionHeader extends React.Component {

	render () {

		let {language, pageName, sectionName, showSectionName } = this.props;

		let sectionText = UTILS.createMarkup(USER_PAGES_TEXT[pageName][language].sections[sectionName].text);

		return (

			<div className='section-header'>

				{showSectionName &&
				<h4 className='section-name'
				    dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT[pageName][language].sections[sectionName].name)}/>
				}

				<h2 className="section-title"
				    dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT[pageName][language].sections[sectionName].headline)}/>

				{sectionText.__html &&
				<p className="section-text"
				   dangerouslySetInnerHTML={sectionText}/>
				}
			</div>
		);
	}
}

const WrappedComponent = AnimateOnScroll(SectionHeader);

export default WrappedComponent;

SectionHeader.propTypes = {
	language: PropTypes.string,
	pageName: PropTypes.string,
	sectionName: PropTypes.string,
	showSectionName: PropTypes.bool
};