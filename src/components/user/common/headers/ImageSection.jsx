import React from 'react';
import PropTypes from 'prop-types';

// Constants
import { USER_PAGES_TEXT } from '../../../../constants/constants';

// Utils
import UTILS from '../../../../utils/utils';

class ImageSection extends React.Component {

	render () {

		let {language, pageName, imgUrl} = this.props;

		return (
			<section className='img-section'>

				<img className="" src={imgUrl} alt=''/>

				<h2 className="page-title"
				    dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT[pageName][language].title)}/>

			</section>
		);
	}
}

export default ImageSection;

ImageSection.propTypes = {
	language: PropTypes.string,
	pageName: PropTypes.string,
	imgUrl: PropTypes.string
};