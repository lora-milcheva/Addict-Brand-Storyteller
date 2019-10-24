import React from 'react';
import PropTypes from 'prop-types';


// Partials
import Article from './Article';
import ArticleSectionBlockQuote from './partials/ArticleSectionBlockQuote';

// Utils
import UTILS from '../../../../utils/utils';

class ArticleSection extends React.Component {

	render () {

		let quote = UTILS.generateMarkup('accent', this.props);

		let {language, pageName, sectionName, subSectionName} = this.props;

		return (

			<section className='article-section'>


				<ArticleSectionBlockQuote quote={quote}/>


				<Article language={language}
				         pageName={pageName}
				         sectionName={sectionName}
				         subSectionName={subSectionName}/>

			</section>

		);
	}
}

// const WrappedComponent = AnimateOnScroll(ArticleSection, 'fadeIn', 200, 2);

export default ArticleSection;

ArticleSection.propTypes = {
	language: PropTypes.string,
	pageName: PropTypes.string,
	sectionName: PropTypes.string,
	subSectionName: PropTypes.string,
	subSubSectionName: PropTypes.string
};