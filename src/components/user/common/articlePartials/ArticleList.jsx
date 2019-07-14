import React from 'react';
import PropTypes from 'prop-types';

// Constants
import { USER_PAGES_TEXT } from '../../../../constants/constants';

// Utils
import UTILS from '../../../../utils/utils';

class ArticleList extends React.Component {

	render () {

		let {language, pageName, sectionName, subSectionName} = this.props;

		return (

			<article className='article-box'>

				<h4 className='article-headline'
				    dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT[pageName][language].sections[sectionName][subSectionName].title)}/>

				<ul className='article-text'
				    dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT[pageName][language].sections[sectionName][subSectionName].text)}/>

			</article>
		);
	}
}

export default ArticleList;

ArticleList.propTypes = {
	language: PropTypes.string,
	pageName: PropTypes.string,
	sectionName: PropTypes.string,
	subSectionName: PropTypes.string
};