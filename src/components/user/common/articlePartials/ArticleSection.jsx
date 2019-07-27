import React from 'react';
import PropTypes from 'prop-types';

// Constants
import { USER_PAGES_TEXT } from '../../../../constants/constants';

// Utils
import UTILS from '../../../../utils/utils';

class ArticleSection extends React.Component {


	generateMarkup = (type) => {

		let {language, pageName, sectionName, subSectionName, subSubSectionName} = this.props;

		if (sectionName && subSectionName && subSubSectionName) {
			return UTILS.createMarkup(USER_PAGES_TEXT[pageName][language].sections[sectionName][subSectionName][subSubSectionName][type]);
		}

		if (sectionName && subSectionName) {
			return UTILS.createMarkup(USER_PAGES_TEXT[pageName][language].sections[sectionName][subSectionName][type]);
		}

		return UTILS.createMarkup(USER_PAGES_TEXT[pageName][language].sections[sectionName][type]);
	};

	render () {

		let quote = this.generateMarkup('accent');

		return (

			<section className='article-section'>

				<div className='blockquote'>
					{quote.__html !== '' &&
					<h2 className='quote'
					    dangerouslySetInnerHTML={quote}/>
					}
				</div>


				<div className='article-box'>
					<h4 className='article-headline'
					    dangerouslySetInnerHTML={this.generateMarkup('title')}/>
					<p className='article-text'
					   dangerouslySetInnerHTML={this.generateMarkup('text')}/>
				</div>
			</section>

		);
	}
}

export default ArticleSection;

ArticleSection.propTypes = {
	language: PropTypes.string,
	pageName: PropTypes.string,
	sectionName: PropTypes.string,
	subSectionName: PropTypes.string,
	subSubSectionName: PropTypes.string,
	image: PropTypes.string,
};