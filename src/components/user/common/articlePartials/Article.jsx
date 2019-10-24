import React from 'react';
import PropTypes from 'prop-types';

// HOC
import AnimateOnScroll from '../../HOC/AnimateOnScroll';

// Utils
import UTILS from '../../../../utils/utils';


class Article extends React.Component {

	render () {

		return (

			<article className='article-box'>
				<h4 className='article-headline'
				    dangerouslySetInnerHTML={UTILS.generateMarkup('title', this.props)}/>
				<p className='article-text'
				   dangerouslySetInnerHTML={UTILS.generateMarkup('text', this.props)}/>
			</article>

		);
	}
}

const WrappedComponent = AnimateOnScroll(Article, 'fadeIn' ,200, 2);

export default WrappedComponent;

Article.propTypes = {
	language: PropTypes.string,
	pageName: PropTypes.string,
	sectionName: PropTypes.string,
	subSectionName: PropTypes.string,
	subSubSectionName: PropTypes.string
};