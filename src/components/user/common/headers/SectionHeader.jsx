import React from 'react';
import PropTypes from 'prop-types';

// Constants
import { USER_PAGES_TEXT } from '../../../../constants/constants';

// Utils
import UTILS from '../../../../utils/utils';

class PageHeader extends React.Component {

	render () {

		let {language, pageName, sectionName, showSectionName} = this.props;

		return (

			<div className='section-header'>

				{showSectionName &&
				<h4 className='section-name'
				    dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT[pageName][language].sections[sectionName].name)}/>
				}

				<h2 className="section-title"
				    dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT[pageName][language].sections[sectionName].headline)}/>

				<p className="section-text"
				   dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT[pageName][language].sections[sectionName].text)}/>

			</div>
		);
	}
}

export default PageHeader;

PageHeader.propTypes = {
	language: PropTypes.string,
	pageName: PropTypes.string,
	sectionName: PropTypes.string,
	showSectionName: PropTypes.bool
};