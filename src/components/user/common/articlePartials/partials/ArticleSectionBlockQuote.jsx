import React from 'react';
import PropTypes from 'prop-types';

// HOC
import AnimateOnScroll from '../../../HOC/AnimateOnScroll';

class ArticleSectionBlockQuote extends React.Component {

	render () {

		let {quote} = this.props;

		return (
			<div className='blockquote'>
				{quote.__html !== '' &&
				<h2 className='quote' dangerouslySetInnerHTML={quote}/>
				}
			</div>
		);
	}
}

const WrappedComponent = AnimateOnScroll(ArticleSectionBlockQuote, 'fadeIn' , 500, 2);

export default WrappedComponent;

ArticleSectionBlockQuote.propTypes = {
	quote: PropTypes.object
};