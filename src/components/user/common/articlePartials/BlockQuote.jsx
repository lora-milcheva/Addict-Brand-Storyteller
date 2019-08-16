import React from 'react';
import PropTypes from 'prop-types';

// HOC
import AnimateOnScroll from '../../HOC/AnimateOnScroll';

// Constants
import { USER_PAGES_TEXT } from '../../../../constants/constants';

// Utils
import UTILS from '../../../../utils/utils';

class BlockQuote extends React.Component {

	render () {

		let {language, pageName, sectionName} = this.props;

		return (

			<section className='blockquote section-padding-all'>

				<h3 className="quote"
				    dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT[pageName][language].sections[sectionName].quoteText)}/>

				<p className="author"
				   dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT[pageName][language].sections[sectionName].author)}/>
			</section>
		);
	}
}

const WrappedComponent = AnimateOnScroll(BlockQuote);

export default WrappedComponent;

BlockQuote.propTypes = {
	language: PropTypes.string,
	pageName: PropTypes.string,
	sectionName: PropTypes.string,
};