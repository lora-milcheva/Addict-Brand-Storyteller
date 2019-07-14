import React from 'react';
import PropTypes from 'prop-types';

// Constants
import { USER_PAGES_TEXT } from '../../../../constants/constants';

// Utils
import UTILS from '../../../../utils/utils';

class Article extends React.Component {

	generateMarkup = (type) => {
		let {language, pageName, sectionName, subSectionName, subSubSectionName} = this.props;

		if (subSubSectionName) {
			return UTILS.createMarkup(USER_PAGES_TEXT[pageName][language].sections[sectionName][subSectionName][subSubSectionName][type]);
		}

		return UTILS.createMarkup(USER_PAGES_TEXT[pageName][language].sections[sectionName][subSectionName][type]);
	};

	render () {

		return (

			<article className='article-box'>
				<h4 className='article-headline'
				    dangerouslySetInnerHTML={this.generateMarkup('title')}/>
				<p className='article-text'
				   dangerouslySetInnerHTML={this.generateMarkup('text')}/>
			</article>

		);
	}
}

export default Article;

Article.propTypes = {
	language: PropTypes.string,
	pageName: PropTypes.string,
	sectionName: PropTypes.string,
	subSectionName: PropTypes.string,
	subSubSectionName: PropTypes.string
};